import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { getReviewsBySlug, getAverageRating, getRatingDistribution, addUserReview } from "@/lib/reviewComments";

interface ReviewCommentsSectionProps {
  reviewSlug: string;
  productName: string;
}

export default function ReviewCommentsSection({
  reviewSlug,
  productName,
}: ReviewCommentsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviews = getReviewsBySlug(reviewSlug);
  const averageRating = getAverageRating(reviewSlug);
  const ratingDistribution = getRatingDistribution(reviewSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || formData.rating === 0 || !formData.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    addUserReview(
      reviewSlug,
      formData.name,
      formData.email,
      formData.rating,
      formData.comment
    );

    toast.success("Thank you! Your review has been posted.");
    setFormData({ name: "", email: "", rating: 0, comment: "" });
    setShowForm(false);
    setIsSubmitting(false);

    // Refresh page to show new review
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-12 md:py-16 border-t" style={{ borderColor: "oklch(0.18 0.008 265)" }}>
      <div className="container max-w-3xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mb-8">
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "oklch(0.94 0.005 65)",
            }}
          >
            User Reviews & Ratings
          </h2>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Help others make informed decisions by sharing your thoughts on {productName}.
          </p>
        </motion.div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 rounded-lg"
            style={{
              background: "oklch(0.13 0.008 265)",
              border: "1px solid oklch(0.22 0.008 265)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "oklch(0.85 0.18 195)" }}
                >
                  {averageRating}
                </div>
                <StarRating rating={Math.round(averageRating)} readOnly size="md" showLabel={false} />
                <p
                  className="text-sm mt-2"
                  style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="md:col-span-2 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span
                      className="text-sm font-medium w-12"
                      style={{ color: "oklch(0.65 0.01 285)" }}
                    >
                      {stars} ★
                    </span>
                    <div
                      className="flex-1 h-2 rounded-full"
                      style={{ background: "oklch(0.18 0.008 265)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${reviews.length > 0 ? (ratingDistribution[stars] / reviews.length) * 100 : 0}%`,
                          background: "oklch(0.85 0.18 195)",
                        }}
                      />
                    </div>
                    <span
                      className="text-sm w-8 text-right"
                      style={{ color: "oklch(0.65 0.01 285)" }}
                    >
                      {ratingDistribution[stars]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Review Button */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold w-full md:w-auto"
            >
              Share Your Review
            </Button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-lg"
              style={{
                background: "oklch(0.13 0.008 265)",
                border: "1px solid oklch(0.22 0.008 265)",
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.94 0.005 65)",
                }}
              >
                Write Your Review
              </h3>

              {/* Name */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "oklch(0.85 0.18 195)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-background border transition-colors"
                  style={{
                    borderColor: "oklch(0.22 0.008 265)",
                    color: "oklch(0.94 0.005 65)",
                  }}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "oklch(0.85 0.18 195)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-background border transition-colors"
                  style={{
                    borderColor: "oklch(0.22 0.008 265)",
                    color: "oklch(0.94 0.005 65)",
                  }}
                />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-3"
                  style={{ color: "oklch(0.85 0.18 195)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => setFormData({ ...formData, rating })}
                  size="lg"
                  showLabel={false}
                />
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "oklch(0.85 0.18 195)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Your Review
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-background border transition-colors resize-none"
                  style={{
                    borderColor: "oklch(0.22 0.008 265)",
                    color: "oklch(0.94 0.005 65)",
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
                >
                  {isSubmitting ? "Posting..." : "Post Review"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Reviews List */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {reviews.length === 0 ? (
            <div
              className="p-6 rounded-lg text-center"
              style={{
                background: "oklch(0.13 0.008 265)",
                border: "1px solid oklch(0.22 0.008 265)",
              }}
            >
              <p style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'DM Sans', sans-serif" }}>
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-lg"
                style={{
                  background: "oklch(0.13 0.008 265)",
                  border: "1px solid oklch(0.22 0.008 265)",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: "oklch(0.85 0.18 195 / 0.2)",
                          color: "oklch(0.85 0.18 195)",
                        }}
                      >
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="font-semibold"
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: "oklch(0.94 0.005 65)",
                          }}
                        >
                          {review.userName}
                        </p>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "oklch(0.65 0.01 285)" }}>
                          <Calendar size={12} />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} readOnly size="sm" showLabel={false} />
                </div>

                {/* Comment */}
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "oklch(0.80 0.01 285)",
                    lineHeight: "1.6",
                  }}
                >
                  {review.comment}
                </p>

                {/* Helpful Button */}
                <button
                  className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "oklch(0.65 0.01 285)" }}
                >
                  <ThumbsUp size={14} />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
