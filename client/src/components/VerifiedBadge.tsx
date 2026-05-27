import { CheckCircle2 } from "lucide-react";

interface VerifiedBadgeProps {
  variant?: "inline" | "block";
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  purchaseAmount?: number;
  purchaseDate?: string;
  productVariant?: string;
}

export default function VerifiedBadge({
  variant = "inline",
  size = "md",
  showTooltip = true,
  purchaseAmount,
  purchaseDate,
  productVariant,
}: VerifiedBadgeProps) {
  const sizeMap = {
    sm: { icon: 14, text: "text-xs", padding: "px-2 py-1" },
    md: { icon: 16, text: "text-sm", padding: "px-3 py-1.5" },
    lg: { icon: 18, text: "text-base", padding: "px-4 py-2" },
  };

  const { icon: iconSize, text: textSize, padding: paddingClass } = sizeMap[size];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  };

  const tooltipContent = showTooltip && (purchaseAmount || purchaseDate || productVariant) && (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10 pointer-events-none"
      style={{
        background: "oklch(0.13 0.008 265)",
        border: "1px solid oklch(0.22 0.008 265)",
        color: "oklch(0.80 0.01 285)",
      }}
    >
      {purchaseDate && (
        <div>
          <span style={{ color: "oklch(0.85 0.18 195)" }}>Purchased:</span> {formatDate(purchaseDate)}
        </div>
      )}
      {productVariant && (
        <div>
          <span style={{ color: "oklch(0.85 0.18 195)" }}>Variant:</span> {productVariant}
        </div>
      )}
      {purchaseAmount && (
        <div>
          <span style={{ color: "oklch(0.85 0.18 195)" }}>Amount:</span> ${purchaseAmount.toFixed(2)}
        </div>
      )}
    </div>
  );

  if (variant === "block") {
    return (
      <div
        className={`flex items-center gap-2 ${paddingClass} rounded-lg w-fit`}
        style={{
          background: "oklch(0.85 0.18 195 / 0.1)",
          border: "1px solid oklch(0.85 0.18 195 / 0.3)",
        }}
      >
        <CheckCircle2 size={iconSize} style={{ color: "oklch(0.85 0.18 195)" }} />
        <span
          className={`font-semibold ${textSize}`}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "oklch(0.85 0.18 195)",
          }}
        >
          Verified Purchase
        </span>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-1 group">
      <div
        className={`flex items-center gap-1 ${paddingClass} rounded-full`}
        style={{
          background: "oklch(0.85 0.18 195 / 0.15)",
          border: "1px solid oklch(0.85 0.18 195 / 0.3)",
        }}
      >
        <CheckCircle2 size={iconSize} style={{ color: "oklch(0.85 0.18 195)" }} />
        <span
          className={`font-semibold ${textSize}`}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "oklch(0.85 0.18 195)",
          }}
        >
          Verified
        </span>
      </div>
      {tooltipContent}
    </div>
  );
}
