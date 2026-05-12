// =============================================================
// BLOG POST PAGE — Dark Precision design
// Individual article view with full content
// =============================================================

import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { Streamdown } from "streamdown";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Article Not Found
          </h1>
          <p
            className="mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
          >
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Link href="/blog">
            <span
              className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                background: "oklch(0.85 0.18 195)",
                color: "oklch(0.09 0.008 265)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Back to Blog
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "oklch(0.85 0.18 195)";
      case "guide":
        return "oklch(0.75 0.18 145)";
      case "review":
        return "oklch(0.65 0.22 25)";
      case "tips":
        return "oklch(0.80 0.15 70)";
      default:
        return "oklch(0.65 0.01 285)";
    }
  };

  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="container py-4">
        <Link href="/blog">
          <span
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, oklch(0.09 0.008 265 / 0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Article Content */}
      <article className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div
                className="px-3 py-1 rounded text-sm font-semibold uppercase"
                style={{
                  background: getCategoryColor(post.category),
                  color: "oklch(0.09 0.008 265)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {post.category}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1" style={{ color: "oklch(0.65 0.01 285)" }}>
                  <Calendar size={14} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1" style={{ color: "oklch(0.65 0.01 285)" }}>
                  <Clock size={14} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
            >
              {post.title}
            </h1>

            {/* Author & Share */}
            <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: "oklch(0.18 0.008 265)" }}>
              <div>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
                >
                  By <span style={{ color: "oklch(0.85 0.18 195)" }}>{post.author}</span>
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  background: "oklch(0.13 0.008 265)",
                  border: "1px solid oklch(0.18 0.008 265)",
                  color: "oklch(0.85 0.18 195)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-invert max-w-none mt-8 mb-12"
          >
            <style>{`
              .prose {
                --tw-prose-body: oklch(0.70 0.01 285);
                --tw-prose-headings: oklch(0.94 0.005 65);
                --tw-prose-lead: oklch(0.65 0.01 285);
                --tw-prose-links: oklch(0.85 0.18 195);
                --tw-prose-bold: oklch(0.94 0.005 65);
                --tw-prose-counters: oklch(0.85 0.18 195);
                --tw-prose-bullets: oklch(0.85 0.18 195);
                --tw-prose-hr: oklch(0.18 0.008 265);
                --tw-prose-quotes: oklch(0.65 0.01 285);
                --tw-prose-quote-borders: oklch(0.85 0.18 195);
                --tw-prose-captions: oklch(0.65 0.01 285);
                --tw-prose-code: oklch(0.85 0.18 195);
                --tw-prose-pre-bg: oklch(0.13 0.008 265);
                --tw-prose-pre-code: oklch(0.85 0.18 195);
                --tw-prose-th-borders: oklch(0.18 0.008 265);
                --tw-prose-td-borders: oklch(0.18 0.008 265);
              }

              .prose h2 {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.875rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }

              .prose h3 {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.25rem;
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }

              .prose p {
                font-family: 'DM Sans', sans-serif;
                line-height: 1.75;
                margin-bottom: 1rem;
              }

              .prose ul, .prose ol {
                font-family: 'DM Sans', sans-serif;
                margin-bottom: 1rem;
              }

              .prose li {
                margin-bottom: 0.5rem;
              }

              .prose code {
                font-family: 'JetBrains Mono', monospace;
                background: oklch(0.13 0.008 265);
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
              }

              .prose pre {
                background: oklch(0.13 0.008 265);
                border: 1px solid oklch(0.18 0.008 265);
                border-radius: 0.5rem;
                padding: 1rem;
                overflow-x: auto;
              }

              .prose blockquote {
                border-left: 4px solid oklch(0.85 0.18 195);
                padding-left: 1rem;
                font-style: italic;
              }
            `}</style>
            <Streamdown>{post.content}</Streamdown>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 py-6 border-t border-b"
            style={{ borderColor: "oklch(0.18 0.008 265)" }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 rounded text-sm"
                style={{
                  background: "oklch(0.13 0.008 265)",
                  color: "oklch(0.65 0.01 285)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <Tag size={12} /> {tag}
              </span>
            ))}
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div
                      className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                      style={{
                        background: "oklch(0.13 0.008 265)",
                        border: "1px solid oklch(0.18 0.008 265)",
                      }}
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3
                          className="font-bold text-sm line-clamp-2 mb-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {relatedPost.title}
                        </h3>
                        <p
                          className="text-xs"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                        >
                          {formatDate(relatedPost.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
}
