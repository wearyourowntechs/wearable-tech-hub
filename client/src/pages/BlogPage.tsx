// =============================================================
// BLOG PAGE — Dark Precision design
// Featured articles, guides, and news
// =============================================================

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function BlogPage() {
  const featured = getFeaturedBlogPosts(3);
  const allPosts = getAllBlogPosts();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "oklch(0.85 0.18 195)"; // Cyan
      case "guide":
        return "oklch(0.75 0.18 145)"; // Green
      case "review":
        return "oklch(0.65 0.22 25)"; // Red
      case "tips":
        return "oklch(0.80 0.15 70)"; // Yellow
      default:
        return "oklch(0.65 0.01 285)"; // Gray
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
            >
              Expert Content
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Wearable Tech Blog
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
          >
            Expert guides, product reviews, and wearable tech news to help you make informed decisions.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                Featured Articles
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((post, i) => (
                <motion.div key={post.id} variants={fadeUp} custom={i + 1}>
                  <Link href={`/blog/${post.slug}`}>
                    <div
                      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg h-full flex flex-col"
                      style={{
                        background: "oklch(0.13 0.008 265)",
                        border: "1px solid oklch(0.18 0.008 265)",
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(to top, oklch(0.09 0.008 265 / 0.8) 0%, transparent 100%)",
                          }}
                        />

                        {/* Category Badge */}
                        <div
                          className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold uppercase"
                          style={{
                            background: getCategoryColor(post.category),
                            color: "oklch(0.09 0.008 265)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3
                          className="text-lg font-bold mb-2 line-clamp-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {post.title}
                        </h3>

                        <p
                          className="text-sm mb-4 line-clamp-2 flex-grow"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.01 285)" }}>
                              <Calendar size={12} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.01 285)" }}>
                              <Clock size={12} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.readTime} min</span>
                            </div>
                          </div>
                          <ArrowRight
                            size={14}
                            style={{ color: "oklch(0.85 0.18 195)" }}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
            >
              All Articles
            </h2>
          </motion.div>

          <div className="space-y-4">
            {allPosts.map((post, i) => (
              <motion.div key={post.id} variants={fadeUp} custom={i + 1}>
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="group p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer"
                    style={{
                      background: "oklch(0.13 0.008 265)",
                      border: "1px solid oklch(0.18 0.008 265)",
                    }}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="hidden sm:block w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3
                              className="text-lg font-bold line-clamp-1"
                              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                            >
                              {post.title}
                            </h3>
                            <p
                              className="text-sm line-clamp-1"
                              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                            >
                              {post.excerpt}
                            </p>
                          </div>
                          <ArrowRight
                            size={18}
                            style={{ color: "oklch(0.85 0.18 195)" }}
                            className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
                          />
                        </div>

                        {/* Meta & Tags */}
                        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                          <div className="flex items-center gap-3">
                            <div
                              className="px-2 py-1 rounded font-semibold uppercase"
                              style={{
                                background: getCategoryColor(post.category),
                                color: "oklch(0.09 0.008 265)",
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              {post.category}
                            </div>
                            <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.01 285)" }}>
                              <Calendar size={12} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.01 285)" }}>
                              <Clock size={12} />
                              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.readTime} min read</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex items-center gap-1 flex-wrap">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded text-xs"
                                style={{
                                  background: "oklch(0.18 0.008 265)",
                                  color: "oklch(0.65 0.01 285)",
                                  fontFamily: "'DM Sans', sans-serif",
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Posts Message */}
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
            >
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
