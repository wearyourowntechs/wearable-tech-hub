import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getReviewsBySlug,
  getAverageRating,
  getRatingDistribution,
  getVerifiedPurchaseCount,
  getVerifiedPurchasePercentage,
  addProductReview,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reviews: router({
    // Get all reviews for a specific product review page
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const reviews = await getReviewsBySlug(input.slug);
        return reviews;
      }),

    // Get review statistics (average rating, distribution, verified purchase info)
    getStats: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const [averageRating, ratingDistribution, verifiedCount, verifiedPercentage] = await Promise.all([
          getAverageRating(input.slug),
          getRatingDistribution(input.slug),
          getVerifiedPurchaseCount(input.slug),
          getVerifiedPurchasePercentage(input.slug),
        ]);

        return {
          averageRating,
          ratingDistribution,
          verifiedCount,
          verifiedPercentage,
        };
      }),

    // Add a new review
    create: publicProcedure
      .input(
        z.object({
          reviewSlug: z.string(),
          productName: z.string(),
          userName: z.string(),
          userEmail: z.string().email(),
          rating: z.number().min(1).max(5),
          comment: z.string().min(1),
          isVerifiedPurchase: z.boolean().optional().default(false),
          purchaseDate: z.date().optional(),
          purchaseAmount: z.number().optional(),
          productVariant: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const review = await addProductReview({
          userId: 0,
          reviewSlug: input.reviewSlug,
          productName: input.productName,
          userName: input.userName,
          userEmail: input.userEmail,
          rating: input.rating,
          comment: input.comment,
          isVerifiedPurchase: input.isVerifiedPurchase ? 1 : 0,
          purchaseDate: input.purchaseDate,
          purchaseAmount: input.purchaseAmount,
          productVariant: input.productVariant,
        });
        return review;
      }),
  }),
});

export type AppRouter = typeof appRouter;
