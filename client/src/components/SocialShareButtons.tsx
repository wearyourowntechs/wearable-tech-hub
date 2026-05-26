import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export default function SocialShareButtons({
  title,
  url,
  description = "",
  image = "",
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=WearYourOwnTechs`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const openShareWindow = (link: string) => {
    window.open(link, "share", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span
        className="text-sm font-semibold"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.65 0.01 285)" }}
      >
        Share:
      </span>

      {/* Facebook */}
      <button
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.15 0.008 265)",
          border: "1px solid oklch(0.22 0.008 265)",
          color: "#1877F2",
        }}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
        <span className="text-xs font-medium hidden sm:inline">Facebook</span>
      </button>

      {/* Twitter/X */}
      <button
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.15 0.008 265)",
          border: "1px solid oklch(0.22 0.008 265)",
          color: "#000000",
        }}
        title="Share on Twitter/X"
        aria-label="Share on Twitter/X"
      >
        <Twitter size={16} />
        <span className="text-xs font-medium hidden sm:inline">X</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.15 0.008 265)",
          border: "1px solid oklch(0.22 0.008 265)",
          color: "#0A66C2",
        }}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
        <span className="text-xs font-medium hidden sm:inline">LinkedIn</span>
      </button>

      {/* Pinterest */}
      <button
        onClick={() => openShareWindow(shareLinks.pinterest)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.15 0.008 265)",
          border: "1px solid oklch(0.22 0.008 265)",
          color: "#E60023",
        }}
        title="Share on Pinterest"
        aria-label="Share on Pinterest"
      >
        <Share2 size={16} />
        <span className="text-xs font-medium hidden sm:inline">Pinterest</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "oklch(0.15 0.008 265)",
          border: "1px solid oklch(0.22 0.008 265)",
          color: copied ? "oklch(0.85 0.18 195)" : "oklch(0.65 0.01 285)",
        }}
        title="Copy link to clipboard"
        aria-label="Copy link to clipboard"
      >
        <Share2 size={16} />
        <span className="text-xs font-medium hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
