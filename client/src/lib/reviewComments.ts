// =============================================================
// REVIEW COMMENTS & RATINGS — User engagement data
// Store user ratings and comments for review articles
// =============================================================

export interface UserReview {
  id: string;
  reviewSlug: string;
  userName: string;
  userEmail: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string; // ISO date string
  helpful: number; // Count of helpful votes
}

// Mock data - in production, this would come from a backend/database
export const userReviews: UserReview[] = [
  {
    id: "review-1",
    reviewSlug: "google-pixel-watch-4-review",
    userName: "Sarah M.",
    userEmail: "sarah@example.com",
    rating: 5,
    comment: "Excellent review! Very detailed and helped me decide to purchase. The battery life section was particularly helpful.",
    createdAt: "2026-05-24T10:30:00Z",
    helpful: 12,
  },
  {
    id: "review-2",
    reviewSlug: "google-pixel-watch-4-review",
    userName: "James T.",
    userEmail: "james@example.com",
    rating: 4,
    comment: "Great comparison with other smartwatches. Would have liked more info on the fitness tracking accuracy.",
    createdAt: "2026-05-23T14:15:00Z",
    helpful: 8,
  },
  {
    id: "review-3",
    reviewSlug: "google-pixel-watch-4-review",
    userName: "Alex K.",
    userEmail: "alex@example.com",
    rating: 5,
    comment: "Exactly what I needed! The pros and cons section made my decision so much easier.",
    createdAt: "2026-05-22T09:45:00Z",
    helpful: 15,
  },
  {
    id: "review-4",
    reviewSlug: "apple-watch-series-10-review",
    userName: "Emma L.",
    userEmail: "emma@example.com",
    rating: 5,
    comment: "Perfect guide for iPhone users. The health features comparison was spot on.",
    createdAt: "2026-05-20T16:20:00Z",
    helpful: 10,
  },
  {
    id: "review-5",
    reviewSlug: "apple-watch-series-10-review",
    userName: "Michael R.",
    userEmail: "michael@example.com",
    rating: 4,
    comment: "Comprehensive review. The price section could have included more Canadian retailers.",
    createdAt: "2026-05-19T11:00:00Z",
    helpful: 6,
  },
];

// Get reviews for a specific article
export function getReviewsBySlug(slug: string): UserReview[] {
  return userReviews
    .filter((review) => review.reviewSlug === slug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Get average rating for a review
export function getAverageRating(slug: string): number {
  const reviews = getReviewsBySlug(slug);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Get rating distribution
export function getRatingDistribution(slug: string): Record<number, number> {
  const reviews = getReviewsBySlug(slug);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  return distribution;
}

// Add a new review (mock - in production would call API)
export function addUserReview(
  slug: string,
  userName: string,
  userEmail: string,
  rating: number,
  comment: string
): UserReview {
  const newReview: UserReview = {
    id: `review-${Date.now()}`,
    reviewSlug: slug,
    userName,
    userEmail,
    rating,
    comment,
    createdAt: new Date().toISOString(),
    helpful: 0,
  };
  userReviews.push(newReview);
  return newReview;
}
