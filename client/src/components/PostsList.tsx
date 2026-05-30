
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash2, Send } from "lucide-react";
import { format } from "date-fns";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface PostsListProps {
  posts: any[];
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending_approval: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  posted: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

export default function PostsList({ posts }: PostsListProps) {
  const submitForApprovalMutation = trpc.posts.submitForApproval.useMutation();
  const utils = trpc.useUtils();

  const handleSubmitForApproval = async (postId: number) => {
    try {
      await submitForApprovalMutation.mutateAsync({ postId });
      toast.success("Post submitted for approval");
      utils.posts.list.invalidate();
      utils.posts.getPendingApproval.invalidate();
    } catch (error) {
      toast.error("Failed to submit post for approval");
    }
  };

  const getPlatformBadges = (platforms: any) => {
    const platformList = typeof platforms === "string" ? JSON.parse(platforms) : platforms;
    return platformList.map((platform: string) => (
      <Badge key={platform} variant="outline" className="mr-1">
        {platform}
      </Badge>
    ));
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Caption</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div className="max-w-xs truncate">
                  <p className="text-sm font-medium">{post.caption.substring(0, 50)}...</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {getPlatformBadges(post.platforms)}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={STATUS_COLORS[post.status] || "bg-gray-100"}>
                  {post.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {post.createdAt ? format(new Date(post.createdAt), "MMM dd, yyyy") : "-"}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {post.scheduledTime
                    ? format(new Date(post.scheduledTime), "MMM dd, HH:mm")
                    : "-"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    {post.status === "draft" && (
                      <DropdownMenuItem
                        onClick={() => handleSubmitForApproval(post.id)}
                        disabled={submitForApprovalMutation.isPending}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit for Approval
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts found</p>
        </div>
      )}
    </div>
  );
}
