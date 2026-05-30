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
import { generatePostFromUrl } from "./post-generator";

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

  posts: router({
    generateFromUrl: publicProcedure
      .input(
        z.object({
          productUrl: z.string().url(),
          platforms: z
            .array(z.enum(["facebook", "instagram", "tiktok", "x", "pinterest"]))
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        const AFFILIATE_ID = "weyoowte0d-20";
        const generatedPost = await generatePostFromUrl(
          input.productUrl,
          input.platforms
        );

        let affiliateLink = generatedPost.amazonLink;
        if (affiliateLink && !affiliateLink.includes(AFFILIATE_ID)) {
          affiliateLink = `${affiliateLink}?tag=${AFFILIATE_ID}`;
        }

        return {
          success: true,
          post: {
            caption: generatedPost.caption,
            facebookCaption: generatedPost.facebookCaption,
            instagramCaption: generatedPost.instagramCaption,
            tiktokCaption: generatedPost.tiktokCaption,
            xCaption: generatedPost.xCaption,
            pinterestCaption: generatedPost.pinterestCaption,
            hashtags: generatedPost.hashtags,
            imageUrl: generatedPost.imageUrl,
            amazonLink: generatedPost.amazonLink,
            affiliateLink,
            platforms: generatedPost.platforms,
          },
        };
      }),

    list: publicProcedure
      .input(
        z.object({
          status: z.enum(["draft", "pending_approval", "approved", "scheduled", "posted", "failed"]).optional(),
        }).optional()
      )
      .query(async () => {
        return [];
      }),

    getById: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        return null;
      }),

    getPendingApproval: publicProcedure.query(async () => {
      return [];
    }),

    submitForApproval: publicProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input }) => {
        return { success: true };
      }),

    create: publicProcedure
      .input(
        z.object({
          caption: z.string(),
          facebookCaption: z.string().optional(),
          instagramCaption: z.string().optional(),
          tiktokCaption: z.string().optional(),
          xCaption: z.string().optional(),
          pinterestCaption: z.string().optional(),
          platforms: z.array(z.string()),
          imageUrl: z.string().optional(),
          amazonLink: z.string().optional(),
          hashtags: z.string().optional(),
          scheduledTime: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return { success: true, postId: 1 };
      }),
  }),

  approvals: router({
    getQueue: publicProcedure
      .input(z.object({ status: z.enum(["pending", "approved", "rejected"]).optional() }))
      .query(async () => {
        return [];
      }),
  }),
});

export type AppRouter = typeof appRouter;
