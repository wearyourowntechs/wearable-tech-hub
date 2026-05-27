import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, productReviews, InsertProductReview, ProductReview } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// PRODUCT REVIEWS QUERIES
// ============================================================================

/**
 * Get all reviews for a specific product review page
 */
export async function getReviewsBySlug(slug: string): Promise<ProductReview[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get reviews: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(productReviews)
      .where(eq(productReviews.reviewSlug, slug))
      .orderBy(desc(productReviews.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get reviews:", error);
    return [];
  }
}

/**
 * Add a new product review
 */
export async function addProductReview(review: InsertProductReview): Promise<ProductReview | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add review: database not available");
    return null;
  }

  try {
    const result = await db.insert(productReviews).values(review);
    const insertedId = (result as any)[0]?.insertId || (result as any).insertId;
    
    if (insertedId) {
      const newReview = await db
        .select()
        .from(productReviews)
        .where(eq(productReviews.id, insertedId))
        .limit(1);
      return newReview.length > 0 ? newReview[0] : null;
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to add review:", error);
    return null;
  }
}

/**
 * Get average rating for a product review
 */
export async function getAverageRating(slug: string): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get average rating: database not available");
    return 0;
  }

  try {
    const reviews = await getReviewsBySlug(slug);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  } catch (error) {
    console.error("[Database] Failed to get average rating:", error);
    return 0;
  }
}

/**
 * Get rating distribution for a product review
 */
export async function getRatingDistribution(slug: string): Promise<Record<number, number>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get rating distribution: database not available");
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }

  try {
    const reviews = await getReviewsBySlug(slug);
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  } catch (error) {
    console.error("[Database] Failed to get rating distribution:", error);
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }
}

/**
 * Get verified purchase count for a product review
 */
export async function getVerifiedPurchaseCount(slug: string): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get verified purchase count: database not available");
    return 0;
  }

  try {
    const reviews = await getReviewsBySlug(slug);
    return reviews.filter((review) => review.isVerifiedPurchase === 1).length;
  } catch (error) {
    console.error("[Database] Failed to get verified purchase count:", error);
    return 0;
  }
}

/**
 * Get verified purchase percentage for a product review
 */
export async function getVerifiedPurchasePercentage(slug: string): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get verified purchase percentage: database not available");
    return 0;
  }

  try {
    const reviews = await getReviewsBySlug(slug);
    if (reviews.length === 0) return 0;
    const verified = reviews.filter((review) => review.isVerifiedPurchase === 1).length;
    return Math.round((verified / reviews.length) * 100);
  } catch (error) {
    console.error("[Database] Failed to get verified purchase percentage:", error);
    return 0;
  }
}

/**
 * Mark a review as verified purchase (admin function)
 */
export async function markAsVerifiedPurchase(
  reviewId: number,
  purchaseDate: Date,
  purchaseAmount: number,
  productVariant?: string
): Promise<ProductReview | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot mark as verified: database not available");
    return null;
  }

  try {
    await db
      .update(productReviews)
      .set({
        isVerifiedPurchase: 1,
        purchaseDate,
        purchaseAmount,
        productVariant,
        updatedAt: new Date(),
      })
      .where(eq(productReviews.id, reviewId));

    const updated = await db
      .select()
      .from(productReviews)
      .where(eq(productReviews.id, reviewId))
      .limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to mark as verified:", error);
    return null;
  }
}

/**
 * Increment helpful count for a review
 */
export async function incrementHelpfulCount(reviewId: number): Promise<ProductReview | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot increment helpful count: database not available");
    return null;
  }

  try {
    const review = await db
      .select()
      .from(productReviews)
      .where(eq(productReviews.id, reviewId))
      .limit(1);

    if (review.length === 0) return null;

    await db
      .update(productReviews)
      .set({
        helpfulCount: review[0].helpfulCount + 1,
        updatedAt: new Date(),
      })
      .where(eq(productReviews.id, reviewId));

    const updated = await db
      .select()
      .from(productReviews)
      .where(eq(productReviews.id, reviewId))
      .limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to increment helpful count:", error);
    return null;
  }
}
