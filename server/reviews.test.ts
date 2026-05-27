import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Create a mock context for testing
function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("reviews router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("reviews.getStats", () => {
    it("should return review statistics for a valid slug", async () => {
      const stats = await caller.reviews.getStats({ slug: "google-pixel-watch-4-review" });

      expect(stats).toHaveProperty("averageRating");
      expect(stats).toHaveProperty("ratingDistribution");
      expect(stats).toHaveProperty("verifiedCount");
      expect(stats).toHaveProperty("verifiedPercentage");

      expect(typeof stats.averageRating).toBe("number");
      expect(typeof stats.verifiedCount).toBe("number");
      expect(typeof stats.verifiedPercentage).toBe("number");
      expect(typeof stats.ratingDistribution).toBe("object");
    });

    it("should return zero stats for non-existent slug", async () => {
      const stats = await caller.reviews.getStats({ slug: "non-existent-product" });

      expect(stats.averageRating).toBe(0);
      expect(stats.verifiedCount).toBe(0);
      expect(stats.verifiedPercentage).toBe(0);
    });

    it("rating distribution should have all rating levels", async () => {
      const stats = await caller.reviews.getStats({ slug: "google-pixel-watch-4-review" });

      expect(stats.ratingDistribution).toHaveProperty("5");
      expect(stats.ratingDistribution).toHaveProperty("4");
      expect(stats.ratingDistribution).toHaveProperty("3");
      expect(stats.ratingDistribution).toHaveProperty("2");
      expect(stats.ratingDistribution).toHaveProperty("1");
    });
  });

  describe("reviews.getBySlug", () => {
    it("should return array of reviews for a valid slug", async () => {
      const reviews = await caller.reviews.getBySlug({ slug: "google-pixel-watch-4-review" });

      expect(Array.isArray(reviews)).toBe(true);
    });

    it("should return empty array for non-existent slug", async () => {
      const reviews = await caller.reviews.getBySlug({ slug: "non-existent-product" });

      expect(Array.isArray(reviews)).toBe(true);
      expect(reviews.length).toBe(0);
    });

    it("review objects should have required fields", async () => {
      const reviews = await caller.reviews.getBySlug({ slug: "google-pixel-watch-4-review" });

      if (reviews.length > 0) {
        const review = reviews[0];
        expect(review).toHaveProperty("id");
        expect(review).toHaveProperty("userName");
        expect(review).toHaveProperty("rating");
        expect(review).toHaveProperty("comment");
        expect(review).toHaveProperty("isVerifiedPurchase");
        expect(review).toHaveProperty("createdAt");
      }
    });
  });

  describe("reviews.create", () => {
    it("should create a new review successfully", async () => {
      const newReview = await caller.reviews.create({
        reviewSlug: "test-product-review",
        productName: "Test Product",
        userName: "Test User",
        userEmail: "test@example.com",
        rating: 5,
        comment: "This is a test review",
      });

      expect(newReview).not.toBeNull();
      expect(newReview?.userName).toBe("Test User");
      expect(newReview?.rating).toBe(5);
      expect(newReview?.comment).toBe("This is a test review");
      expect(newReview?.isVerifiedPurchase).toBe(0);
    });

    it("should create a verified purchase review", async () => {
      const newReview = await caller.reviews.create({
        reviewSlug: "test-verified-product",
        productName: "Test Product",
        userName: "Verified User",
        userEmail: "verified@example.com",
        rating: 4,
        comment: "Great product, verified purchase",
        isVerifiedPurchase: true,
        purchaseAmount: 44999,
        productVariant: "Black",
      });

      expect(newReview).not.toBeNull();
      expect(newReview?.isVerifiedPurchase).toBe(1);
      expect(newReview?.purchaseAmount).toBe(44999);
      expect(newReview?.productVariant).toBe("Black");
    });

    it("should validate email format", async () => {
      try {
        await caller.reviews.create({
          reviewSlug: "test-product",
          productName: "Test Product",
          userName: "Test User",
          userEmail: "invalid-email",
          rating: 5,
          comment: "Test",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should validate rating range (1-5)", async () => {
      try {
        await caller.reviews.create({
          reviewSlug: "test-product",
          productName: "Test Product",
          userName: "Test User",
          userEmail: "test@example.com",
          rating: 10,
          comment: "Test",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should require non-empty comment", async () => {
      try {
        await caller.reviews.create({
          reviewSlug: "test-product",
          productName: "Test Product",
          userName: "Test User",
          userEmail: "test@example.com",
          rating: 5,
          comment: "",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
