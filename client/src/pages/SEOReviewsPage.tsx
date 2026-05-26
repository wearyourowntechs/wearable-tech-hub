import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, User } from "lucide-react";
import { seoReviews } from "@/lib/seoReviews";
import { Button } from "@/components/ui/button";

export default function SEOReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "news", "guide", "review", "tips"];

  const filteredReviews =
    selectedCategory === "all"
      ? seoReviews
      : seoReviews.filter((review) => review.keywords.some((k) => k.includes(selectedCategory)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              In-Depth Product Reviews
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Comprehensive, long-form reviews of the top wearable tech products. Get expert insights, detailed comparisons, and honest recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Reviews Grid */}
          <div className="grid gap-8">
            {filteredReviews.map((review) => (
              <Link key={review.id} href={`/review/${review.slug}`}>
                <a className="group block">
                  <div className="bg-card hover:bg-accent/50 border border-border rounded-lg p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground group-hover:text-cyan-400 transition-colors">
                          {review.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">
                          {review.metaDescription}
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{review.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{review.wordCount.toLocaleString()} words</span>
                      </div>
                      <span>{new Date(review.lastUpdated).toLocaleDateString()}</span>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {review.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                      {review.keywords.length > 3 && (
                        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                          +{review.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No reviews found in this category.</p>
              <Button onClick={() => setSelectedCategory("all")} variant="outline">
                View All Reviews
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking for a Specific Product?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete product database or use the comparison tool to find the perfect wearable tech for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                  Browse Products
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline">Compare Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
