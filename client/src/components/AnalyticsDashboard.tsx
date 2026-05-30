import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

export default function AnalyticsDashboard() {
  const { data: summary } = trpc.analytics.getSummary.useQuery();
  const { data: allPosts } = trpc.posts.list.useQuery({});

  // Mock data for charts
  const platformData = [
    { platform: "Facebook", posts: 12, engagement: 450 },
    { platform: "Instagram", posts: 15, engagement: 680 },
    { platform: "TikTok", posts: 8, engagement: 920 },
    { platform: "X", posts: 20, engagement: 340 },
    { platform: "Pinterest", posts: 10, engagement: 520 },
  ];

  const engagementTrend = [
    { date: "Mon", engagement: 240 },
    { date: "Tue", engagement: 320 },
    { date: "Wed", engagement: 280 },
    { date: "Thu", engagement: 450 },
    { date: "Fri", engagement: 620 },
    { date: "Sat", engagement: 580 },
    { date: "Sun", engagement: 720 },
  ];

  const statusDistribution = [
    { name: "Draft", value: allPosts?.filter((p) => p.status === "draft").length || 0 },
    {
      name: "Pending",
      value: allPosts?.filter((p) => p.status === "pending_approval").length || 0,
    },
    {
      name: "Scheduled",
      value: allPosts?.filter((p) => p.status === "scheduled").length || 0,
    },
    { name: "Posted", value: allPosts?.filter((p) => p.status === "posted").length || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Posts</p>
              <p className="text-3xl font-bold">{allPosts?.length || 0}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Engagement</p>
              <p className="text-3xl font-bold">3,710</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Platform</p>
              <p className="text-3xl font-bold">TikTok</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#3b82f6" name="Posts" />
                <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Post Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Engagement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#3b82f6"
                  name="Engagement"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "New Smartwatch Review", engagement: 245, platform: "Instagram" },
              { title: "Fitness Tracker Comparison", engagement: 198, platform: "TikTok" },
              { title: "AR Glasses Guide", engagement: 156, platform: "Pinterest" },
            ].map((post, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">{post.platform}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{post.engagement}</p>
                  <p className="text-xs text-muted-foreground">engagements</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
