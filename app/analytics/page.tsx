import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { posts, users } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Clock,
  TrendingUp,
  Users,
  BookmarkIcon,
  Share2,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AnalyticsPage() {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const avgReadTime = Math.round(posts.reduce((sum, p) => sum + p.readTime, 0) / posts.length)
  const publishedPosts = posts.filter((p) => p.status === "published")

  // Mock analytics data
  const topPosts = [...posts]
    .filter((p) => p.status === "published")
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  const mockEngagementData = {
    saves: 342,
    shares: 189,
    avgScrollDepth: 78,
    bounceRate: 32,
  }

  const mockTrafficSources = [
    { source: "Organic Search", visits: 4521, percentage: 45 },
    { source: "Direct", visits: 2834, percentage: 28 },
    { source: "Social Media", visits: 1789, percentage: 18 },
    { source: "Referral", visits: 901, percentage: 9 },
  ]

  const mockMonthlyData = [
    { month: "Jan", views: 8234, engagement: 65 },
    { month: "Feb", views: 9123, engagement: 68 },
    { month: "Mar", views: 10456, engagement: 72 },
    { month: "Apr", views: 11234, engagement: 75 },
    { month: "May", views: 12890, engagement: 78 },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">Track your content performance and audience engagement</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Post Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+12.5% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Read Time</CardTitle>
                    <Clock className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{avgReadTime} min</div>
                    <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+8.2% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{mockEngagementData.avgScrollDepth}%</div>
                    <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+5.1% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{mockEngagementData.bounceRate}%</div>
                    <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                      <ArrowDownRight className="h-3 w-3" />
                      <span>-3.2% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trend */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Monthly Performance</CardTitle>
                  <CardDescription>Views and engagement over the last 5 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMonthlyData.map((data) => (
                      <div key={data.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">{data.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">{data.views.toLocaleString()} views</span>
                            <span className="text-muted-foreground">{data.engagement}% engagement</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(data.views / 15000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Traffic Sources */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Traffic Sources</CardTitle>
                    <CardDescription>Where your readers are coming from</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockTrafficSources.map((source) => (
                      <div key={source.source} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{source.source}</span>
                          <span className="text-muted-foreground">
                            {source.visits.toLocaleString()} ({source.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Engagement Metrics */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Engagement Metrics</CardTitle>
                    <CardDescription>How readers interact with your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookmarkIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Saves</p>
                          <p className="text-xs text-muted-foreground">Bookmarked articles</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{mockEngagementData.saves}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Share2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Shares</p>
                          <p className="text-xs text-muted-foreground">Social shares</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{mockEngagementData.shares}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Scroll Depth</p>
                          <p className="text-xs text-muted-foreground">Avg. page scroll</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-foreground">{mockEngagementData.avgScrollDepth}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              {/* Top Performing Posts */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Top Performing Posts</CardTitle>
                  <CardDescription>Your most viewed content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPosts.map((post, index) => {
                      const author = users.find((u) => u.id === post.authorId)
                      return (
                        <div
                          key={post.id}
                          className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>By {author?.name}</span>
                              <span>•</span>
                              <span>{post.readTime} min read</span>
                              <span>•</span>
                              <span>{post.publishedAt?.toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-foreground">{post.views.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">views</div>
                          </div>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/posts/${post.id}`}>View</Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* All Posts Performance */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">All Published Posts</CardTitle>
                  <CardDescription>Complete performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {publishedPosts.map((post) => {
                      const author = users.find((u) => u.id === post.authorId)
                      return (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground mb-1">{post.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{author?.name}</span>
                              <span>•</span>
                              <span>{post.publishedAt?.toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-sm font-semibold text-foreground">{post.views}</div>
                              <div className="text-xs text-muted-foreground">views</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold text-foreground">{post.readTime}m</div>
                              <div className="text-xs text-muted-foreground">read</div>
                            </div>
                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                              {post.status}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              {/* Audience Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Readers</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">8,234</div>
                    <p className="text-xs text-muted-foreground mt-1">Unique visitors this month</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Returning Readers</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">42%</div>
                    <p className="text-xs text-muted-foreground mt-1">Come back for more content</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session</CardTitle>
                    <Clock className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">4:32</div>
                    <p className="text-xs text-muted-foreground mt-1">Minutes per visit</p>
                  </CardContent>
                </Card>
              </div>

              {/* Reader Demographics */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Reader Demographics</CardTitle>
                  <CardDescription>Understanding your audience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Top Locations</h4>
                    <div className="space-y-3">
                      {[
                        { country: "United States", percentage: 45 },
                        { country: "United Kingdom", percentage: 18 },
                        { country: "Canada", percentage: 12 },
                        { country: "Australia", percentage: 10 },
                        { country: "Germany", percentage: 8 },
                      ].map((location) => (
                        <div key={location.country} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{location.country}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${location.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {location.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Device Types</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground">58%</div>
                        <div className="text-xs text-muted-foreground mt-1">Mobile</div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground">32%</div>
                        <div className="text-xs text-muted-foreground mt-1">Desktop</div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <div className="text-2xl font-bold text-foreground">10%</div>
                        <div className="text-xs text-muted-foreground mt-1">Tablet</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
