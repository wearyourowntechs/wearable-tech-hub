import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.resetModules(); });

async function fixture(consent: string | null) {
  vi.resetModules();
  const scripts: { src?: string; dataset: Record<string, string>; async?: boolean; defer?: boolean }[] = [];
  const listeners = new Map<string, (event?: unknown) => void>();
  const state = { consent };
  const fakeWindow: Record<string, unknown> = {
    location: { origin: "https://wearyourowntechs.com" },
    addEventListener: (name: string, callback: (event?: unknown) => void) => listeners.set(name, callback),
  };
  vi.stubGlobal("window", fakeWindow);
  vi.stubGlobal("localStorage", { getItem: () => state.consent });
  vi.stubGlobal("document", {
    createElement: () => ({ dataset: {} }),
    head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
  });
  vi.stubEnv("VITE_ANALYTICS_ENDPOINT", "https://analytics.example.com");
  vi.stubEnv("VITE_ANALYTICS_WEBSITE_ID", "existing-website-id");
  const { initializeExistingAnalytics } = await import("../consent-analytics");
  initializeExistingAnalytics();
  return { scripts, listeners, state, fakeWindow };
}

describe("existing analytics respects non-essential consent", () => {
  it("loads no tracking before a choice or after rejection", async () => {
    expect((await fixture(null)).scripts).toHaveLength(0);
    expect((await fixture("rejected")).scripts).toHaveLength(0);
  });
  it("retains configured integrations after explicit acceptance without placeholder emails", async () => {
    const f = await fixture("accepted");
    expect(f.scripts.map((script) => script.src)).toEqual(["https://analytics.example.com/umami", "https://s.pinimg.com/ct/core.js"]);
    expect(f.scripts[0].dataset.websiteId).toBe("existing-website-id");
    expect((f.fakeWindow.pintrk as { queue: unknown[][] }).queue).toEqual([["load", "2612617042627"], ["page"]]);
  });
  it("activates once when the existing consent control changes", async () => {
    const f = await fixture(null);
    f.state.consent = "accepted";
    f.listeners.get("wyot:consent-change")?.();
    f.listeners.get("wyot:consent-change")?.();
    expect(f.scripts).toHaveLength(2);
  });
  it("does not track or crash when browser storage is blocked", async () => {
    const f = await fixture(null);
    vi.stubGlobal("localStorage", { getItem: () => { throw new Error("blocked"); } });
    expect(() => f.listeners.get("wyot:consent-change")?.()).not.toThrow();
    expect(f.scripts).toHaveLength(0);
  });
});
