// =============================================================
// REVIEW DETAIL PAGE — Dark Precision design
// Individual SEO review article with social sharing
// =============================================================

import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Clock, User, AlertCircle } from "lucide-react";
import { seoReviews } from "@/lib/seoReviews";
import { products } from "@/lib/products";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

export default function ReviewDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  // Find the review by slug
  const review = seoReviews.find((r) => r.slug === slug);

  if (!review) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-start gap-4 p-6 rounded-lg border"
              style={{
                background: "oklch(0.13 0.008 265)",
                borderColor: "oklch(0.22 0.008 265)",
              }}
            >
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Review Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The review you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => navigate("/seo-reviews")} variant="outline">
                  Back to Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the product for image reference
  const product = products.find((p) => p.id === review.productId);

  // Build the share URL (adjust domain as needed)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/review/${slug}`;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Hero Section with Product Image */}
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 md:h-[500px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, oklch(0.15 0.008 265) 0%, oklch(0.13 0.008 265) 100%)",
          }}
        >
          <img
            src={product.image}
            alt={review.productName}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h1
                className="text-4xl md:text-6xl font-bold mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.94 0.005 65)",
                }}
              >
                {review.productName}
              </h1>
              <p
                className="text-lg"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.85 0.18 195)",
                }}
              >
                Complete Review & Buyer's Guide
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Article Content */}
      <article className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Meta Information */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-8 pb-8 border-b"
            style={{ borderColor: "oklch(0.18 0.008 265)" }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2" style={{ color: "oklch(0.65 0.01 285)" }}>
                <Clock size={16} />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {review.readTime} min read
                </span>
              </div>
              <div className="flex items-center gap-2" style={{ color: "oklch(0.65 0.01 285)" }}>
                <User size={16} />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {review.wordCount.toLocaleString()} words
                </span>
              </div>
              <span style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'DM Sans', sans-serif" }}>
                Updated {new Date(review.lastUpdated).toLocaleDateString()}
              </span>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-6">
              {review.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "oklch(0.85 0.18 195 / 0.1)",
                    color: "oklch(0.85 0.18 195)",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Social Share Buttons */}
            <SocialShareButtons
              title={review.title}
              url={shareUrl}
              description={review.metaDescription}
              image={product?.image || ""}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
            style={{
              "--tw-prose-body": "oklch(0.80 0.01 285)",
              "--tw-prose-headings": "oklch(0.94 0.005 65)",
              "--tw-prose-links": "oklch(0.85 0.18 195)",
              "--tw-prose-code": "oklch(0.85 0.18 195)",
              "--tw-prose-pre-bg": "oklch(0.13 0.008 265)",
              "--tw-prose-pre-code": "oklch(0.80 0.01 285)",
            } as any}
          >
            <Markdown
              components={{
                h1: ({ ...props }: any) => (
                  <h1
                    {...props}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "oklch(0.94 0.005 65)",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                      fontSize: "2.25rem",
                      fontWeight: "bold",
                    }}
                  />
                ),
                h2: ({ ...props }: any) => (
                  <h2
                    {...props}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "oklch(0.94 0.005 65)",
                      marginTop: "1.5rem",
                      marginBottom: "0.75rem",
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                    }}
                  />
                ),
                h3: ({ ...props }: any) => (
                  <h3
                    {...props}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "oklch(0.94 0.005 65)",
                      marginTop: "1.25rem",
                      marginBottom: "0.5rem",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  />
                ),
                p: ({ ...props }: any) => (
                  <p
                    {...props}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.80 0.01 285)",
                      lineHeight: "1.75",
                      marginBottom: "1rem",
                    }}
                  />
                ),
                ul: ({ ...props }: any) => (
                  <ul
                    {...props}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.80 0.01 285)",
                      marginLeft: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  />
                ),
                ol: ({ ...props }: any) => (
                  <ol
                    {...props}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.80 0.01 285)",
                      marginLeft: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  />
                ),
                li: ({ ...props }: any) => (
                  <li
                    {...props}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.80 0.01 285)",
                      marginBottom: "0.5rem",
                    }}
                  />
                ),
                blockquote: ({ ...props }: any) => (
                  <blockquote
                    {...props}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.85 0.18 195)",
                      borderLeft: "4px solid oklch(0.85 0.18 195)",
                      paddingLeft: "1rem",
                      marginLeft: "0",
                      marginBottom: "1rem",
                      fontStyle: "italic",
                    }}
                  />
                ),
                code: ({ inline, ...props }: any) => (
                  <code
                    {...props}
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: inline ? "oklch(0.85 0.18 195)" : undefined,
                      background: inline ? "oklch(0.13 0.008 265)" : undefined,
                      padding: inline ? "0.25rem 0.5rem" : undefined,
                      borderRadius: inline ? "0.25rem" : undefined,
                    }}
                  />
                ),
              }}
            >
              {review.content}
            </Markdown>
          </motion.div>

          {/* Bottom Share Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t"
            style={{ borderColor: "oklch(0.18 0.008 265)" }}
          >
            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.94 0.005 65)",
                }}
              >
                Found this review helpful? Share it!
              </h3>
              <SocialShareButtons
                title={review.title}
                url={shareUrl}
                description={review.metaDescription}
                image={product?.image || ""}
              />
            </div>

            {/* CTA Section */}
            <div
              className="mt-8 p-6 rounded-lg"
              style={{
                background: "oklch(0.13 0.008 265)",
                border: "1px solid oklch(0.22 0.008 265)",
              }}
            >
              <h4
                className="text-lg font-semibold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.94 0.005 65)",
                }}
              >
                Ready to buy {review.productName}?
              </h4>
              <p
                className="text-sm mb-4"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.65 0.01 285)",
                }}
              >
                Find the best prices on Amazon.ca and support our site through affiliate links.
              </p>
              {product && (
                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                    View on Amazon.ca
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </article>

      {/* Back to Reviews CTA */}
      <section className="py-12 md:py-16 border-t" style={{ borderColor: "oklch(0.18 0.008 265)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "oklch(0.94 0.005 65)",
              }}
            >
              Explore More Reviews
            </h2>
            <p
              className="text-muted-foreground mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Check out our other in-depth product reviews and buying guides.
            </p>
            <Button onClick={() => navigate("/seo-reviews")} className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
              Back to All Reviews
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
