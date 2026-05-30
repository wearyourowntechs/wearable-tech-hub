import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import CreatePostDialog from "@/components/CreatePostDialog";
import GeneratePostDialog from "@/components/GeneratePostDialog";
import PostsList from "@/components/PostsList";
import ApprovalQueue from "@/components/ApprovalQueue";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function SocialMediaManager() {
  const { user, isAuthenticated } = useAuth();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const { data: allPosts, isLoading: postsLoading } = trpc.posts.list.useQuery({});
  const { data: pendingPosts } = trpc.posts.getPendingApproval.useQuery({});
  const { data: approvalQueue } = trpc.approvals.getQueue.useQuery({ status: "pending" });

  // Note: Auth check removed for demo purposes - in production, you would want this
  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Card className="w-full max-w-md">
  //         <CardHeader>
  //           <CardTitle>Access Denied</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="text-sm text-muted-foreground">
  //             You must be logged in to access the Social Media Manager.
  //           </p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  const draftCount = allPosts?.filter((p: any) => p.status === "draft").length || 0;
  const scheduledCount = allPosts?.filter((p: any) => p.status === "scheduled").length || 0;
  const postedCount = allPosts?.filter((p: any) => p.status === "posted").length || 0;
  const pendingCount = pendingPosts?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Social Media Manager</h1>
              <p className="text-muted-foreground">
                Manage, schedule, and approve posts across all platforms
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setOpenGenerateDialog(true)}
                className="gap-2"
                size="lg"
                variant="outline"
              >
                <Sparkles className="w-4 h-4" />
                Generate from URL
              </Button>
              <Button
                onClick={() => setOpenCreateDialog(true)}
                className="gap-2"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Drafts</p>
                    <p className="text-2xl font-bold">{draftCount}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Approval</p>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="text-2xl font-bold">{scheduledCount}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Posted</p>
                    <p className="text-2xl font-bold">{postedCount}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">All Posts</TabsTrigger>
            <TabsTrigger value="approval">
              Approval Queue
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading posts...</p>
                  </div>
                ) : allPosts && allPosts.length > 0 ? (
                  <PostsList posts={allPosts} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No posts yet</p>
                    <Button onClick={() => setOpenCreateDialog(true)}>
                      Create your first post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approval Queue</CardTitle>
              </CardHeader>
              <CardContent>
                {approvalQueue && approvalQueue.length > 0 ? (
                  <ApprovalQueue queue={approvalQueue} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No posts pending approval</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {allPosts && allPosts.filter((p: any) => p.status === "scheduled").length > 0 ? (
                  <PostsList posts={allPosts.filter((p: any) => p.status === "scheduled")} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No scheduled posts</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
      
      {/* Generate Post Dialog */}
      <GeneratePostDialog 
        open={openGenerateDialog} 
        onOpenChange={setOpenGenerateDialog}
        onSuccess={() => setActiveTab("posts")}
      />
    </div>
  );
}
