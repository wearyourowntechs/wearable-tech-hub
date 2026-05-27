import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User reviews and ratings for products
 * Stores user feedback, ratings, and verified purchase information
 */
export const productReviews = mysqlTable("product_reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  reviewSlug: varchar("reviewSlug", { length: 255 }).notNull(), // Unique identifier for the product review
  productName: text("productName").notNull(),
  userName: varchar("userName", { length: 255 }).notNull(),
  userEmail: varchar("userEmail", { length: 320 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment").notNull(),
  isVerifiedPurchase: int("isVerifiedPurchase").default(0).notNull(), // Boolean as int (0 or 1)
  purchaseDate: timestamp("purchaseDate"),
  purchaseAmount: int("purchaseAmount"), // Amount in cents to avoid floating point issues
  productVariant: varchar("productVariant", { length: 255 }),
  helpfulCount: int("helpfulCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductReview = typeof productReviews.$inferSelect;
export type InsertProductReview = typeof productReviews.$inferInsert;
