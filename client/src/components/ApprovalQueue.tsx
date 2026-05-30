import { ApprovalQueue as ApprovalQueueType } from "@/../../drizzle/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

interface ApprovalQueueProps {
  queue: ApprovalQueueType[];
}

export default function ApprovalQueue({ queue }: ApprovalQueueProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const approveMutation = trpc.approvals.approve.useMutation();
  const rejectMutation = trpc.approvals.reject.useMutation();
  const utils = trpc.useUtils();

  // Get post details for the selected approval
  const { data: post } = trpc.posts.getById.useQuery(
    { id: selectedId || 0 },
    { enabled: selectedId !== null }
  );

  const handleApprove = async () => {
    if (!selectedId || !post || !scheduledTime) {
      toast.error("Please select a post and scheduled time");
      return;
    }

    try {
      await approveMutation.mutateAsync({
        approvalId: selectedId,
        postId: post.id,
        scheduledTime: new Date(scheduledTime),
        reviewerNotes,
      });

      toast.success("Post approved!");
      utils.approvals.getQueue.invalidate();
      utils.posts.list.invalidate();
      setSelectedId(null);
      setReviewerNotes("");
      setScheduledTime("");
    } catch (error) {
      toast.error("Failed to approve post");
    }
  };

  const handleReject = async () => {
    if (!selectedId || !post) {
      toast.error("Please select a post");
      return;
    }

    if (!reviewerNotes.trim()) {
      toast.error("Please provide rejection notes");
      return;
    }

    try {
      await rejectMutation.mutateAsync({
        approvalId: selectedId,
        postId: post.id,
        reviewerNotes,
      });

      toast.success("Post rejected");
      utils.approvals.getQueue.invalidate();
      utils.posts.list.invalidate();
      setSelectedId(null);
      setReviewerNotes("");
      setScheduledTime("");
    } catch (error) {
      toast.error("Failed to reject post");
    }
  };

  if (queue.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts pending approval</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Queue List */}
      <div className="lg:col-span-1 space-y-2">
        <h3 className="font-semibold mb-4">Pending Posts</h3>
        {queue.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-colors ${
              selectedId === item.id ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedId(item.postId)}
          >
            <CardContent className="pt-4">
              <p className="text-sm font-medium">Post #{item.postId}</p>
              <p className="text-xs text-muted-foreground">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details and Actions */}
      <div className="lg:col-span-2">
        {selectedId && post ? (
          <Card>
            <CardHeader>
              <CardTitle>Review Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Post Preview */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Post Content</Label>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{post.caption}</p>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="mt-4 max-h-48 rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Platforms */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Platforms</Label>
                <div className="flex flex-wrap gap-2">
                  {post.platforms && (
                    (typeof post.platforms === "string"
                      ? JSON.parse(post.platforms)
                      : post.platforms
                    ).map((platform: string) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              {/* Scheduled Time */}
              <div className="space-y-2">
                <Label htmlFor="scheduled-time">Schedule For</Label>
                <input
                  id="scheduled-time"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Reviewer Notes */}
              <div className="space-y-2">
                <Label htmlFor="reviewer-notes">Reviewer Notes</Label>
                <Textarea
                  id="reviewer-notes"
                  placeholder="Add your review notes here..."
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="min-h-24"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={rejectMutation.isPending}
                  className="gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={approveMutation.isPending || !scheduledTime}
                  className="gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {approveMutation.isPending ? "Approving..." : "Approve"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Select a post to review
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
