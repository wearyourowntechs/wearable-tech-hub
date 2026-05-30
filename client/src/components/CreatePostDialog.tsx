import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Music, PinIcon } from "lucide-react";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: Music },
  { id: "x", name: "X (Twitter)", icon: Twitter },
  { id: "pinterest", name: "Pinterest", icon: PinIcon },
];

export default function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [amazonLink, setAmazonLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Platform-specific captions
  const [facebookCaption, setFacebookCaption] = useState("");
  const [instagramCaption, setInstagramCaption] = useState("");
  const [tiktokCaption, setTiktokCaption] = useState("");
  const [xCaption, setXCaption] = useState("");
  const [pinterestCaption, setPinterestCaption] = useState("");

  const createPostMutation = trpc.posts.create.useMutation();
  const utils = trpc.useUtils();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Please enter a caption");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        caption,
        facebookCaption: facebookCaption || caption,
        instagramCaption: instagramCaption || caption,
        tiktokCaption: tiktokCaption || caption,
        xCaption: xCaption || caption,
        pinterestCaption: pinterestCaption || caption,
        hashtags: hashtags || undefined,
        imageUrl: imageUrl || undefined,
        amazonLink: amazonLink || undefined,
        platforms: selectedPlatforms as any,
        scheduledTime: scheduledTime ? new Date(scheduledTime) : undefined,
      });

      toast.success("Post created successfully!");
      utils.posts.list.invalidate();

      // Reset form
      setCaption("");
      setSelectedPlatforms([]);
      setAmazonLink("");
      setImageUrl("");
      setHashtags("");
      setScheduledTime("");
      setFacebookCaption("");
      setInstagramCaption("");
      setTiktokCaption("");
      setXCaption("");
      setPinterestCaption("");

      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create post");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Social Media Post</DialogTitle>
          <DialogDescription>
            Create and schedule a post across multiple platforms
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">General Caption</Label>
            <Textarea
              id="caption"
              placeholder="Enter your post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-24"
            />
            <p className="text-xs text-muted-foreground">
              {caption.length} characters
            </p>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <Label
                      htmlFor={platform.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      {platform.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform-Specific Captions */}
          {selectedPlatforms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Platform-Specific Captions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlatforms.includes("facebook") && (
                  <div className="space-y-2">
                    <Label htmlFor="facebook-caption">Facebook Caption</Label>
                    <Textarea
                      id="facebook-caption"
                      placeholder="Leave empty to use general caption"
                      value={facebookCaption}
                      onChange={(e) => setFacebookCaption(e.target.value)}
                      className="min-h-16"
                    />
                  </div>
                )}

                {selectedPlatforms.includes("instagram") && (
                  <div className="space-y-2">
                    <Label htmlFor="instagram-caption">Instagram Caption</Label>
                    <Textarea
                      id="instagram-caption"
                      placeholder="Leave empty to use general caption"
                      value={instagramCaption}
                      onChange={(e) => setInstagramCaption(e.target.value)}
                      className="min-h-16"
                    />
                  </div>
                )}

                {selectedPlatforms.includes("tiktok") && (
                  <div className="space-y-2">
                    <Label htmlFor="tiktok-caption">TikTok Caption</Label>
                    <Textarea
                      id="tiktok-caption"
                      placeholder="Leave empty to use general caption"
                      value={tiktokCaption}
                      onChange={(e) => setTiktokCaption(e.target.value)}
                      className="min-h-16"
                    />
                  </div>
                )}

                {selectedPlatforms.includes("x") && (
                  <div className="space-y-2">
                    <Label htmlFor="x-caption">X (Twitter) Caption</Label>
                    <Textarea
                      id="x-caption"
                      placeholder="Leave empty to use general caption (max 280 chars)"
                      value={xCaption}
                      onChange={(e) => setXCaption(e.target.value.slice(0, 280))}
                      className="min-h-16"
                      maxLength={280}
                    />
                    <p className="text-xs text-muted-foreground">
                      {xCaption.length}/280 characters
                    </p>
                  </div>
                )}

                {selectedPlatforms.includes("pinterest") && (
                  <div className="space-y-2">
                    <Label htmlFor="pinterest-caption">Pinterest Caption</Label>
                    <Textarea
                      id="pinterest-caption"
                      placeholder="Leave empty to use general caption"
                      value={pinterestCaption}
                      onChange={(e) => setPinterestCaption(e.target.value)}
                      className="min-h-16"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Image and Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amazon-link">Amazon Link</Label>
              <Input
                id="amazon-link"
                placeholder="https://amazon.com/dp/..."
                value={amazonLink}
                onChange={(e) => setAmazonLink(e.target.value)}
              />
            </div>
          </div>

          {/* Hashtags and Scheduling */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input
                id="hashtags"
                placeholder="#tech #wearable #review"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled-time">Schedule For (Optional)</Label>
              <Input
                id="scheduled-time"
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
