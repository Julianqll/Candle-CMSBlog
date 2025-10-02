import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { CandleMascot, CandleMascotWithText } from "@/components/candle-mascot"
import { posts, notifications, comments, currentUser } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, Eye, TrendingUp, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const draftPosts = posts.filter((p) => p.status === "draft")
  const reviewPosts = posts.filter((p) => p.status === "review")
  const publishedPosts = posts.filter((p) => p.status === "published")
  const pendingComments = comments.filter((c) => c.status === "pending")
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const unreadNotifications = notifications.filter((n) => !n.read)

  const recentPosts = posts.slice(0, 5)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <TopBar />
        <main className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <CandleMascot size="lg" variant="flame" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 font-nunito">
                Welcome back, {currentUser.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground text-base md:text-lg font-poppins">
                Here's what's happening with your content today.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CandleMascotWithText size="sm" className="text-sm font-medium text-muted-foreground">
                  Total Posts
                </CandleMascotWithText>
                <FileText className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{posts.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">{publishedPosts.length}</span> published
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CandleMascotWithText size="sm" className="text-sm font-medium text-muted-foreground">
                  Total Views
                </CandleMascotWithText>
                <Eye className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CandleMascotWithText size="sm" className="text-sm font-medium text-muted-foreground">
                  Pending Comments
                </CandleMascotWithText>
                <MessageSquare className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{pendingComments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting moderation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CandleMascotWithText size="sm" className="text-sm font-medium text-muted-foreground">
                  Avg. Read Time
                </CandleMascotWithText>
                <TrendingUp className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(posts.reduce((sum, p) => sum + p.readTime, 0) / posts.length)} min
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across all posts</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CandleMascotWithText size="md" className="text-foreground font-nunito font-semibold">
                  Quick Actions
                </CandleMascotWithText>
                <CardDescription className="font-poppins">Common tasks to get you started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/posts/new">
                    <FileText className="mr-2 h-4 w-4" />
                    Create New Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/media">
                    <Eye className="mr-2 h-4 w-4" />
                    Upload Media
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/comments">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Moderate Comments
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Content Status */}
            <Card>
              <CardHeader>
                <CandleMascotWithText size="md" className="text-foreground font-nunito font-semibold">
                  Content Status
                </CandleMascotWithText>
                <CardDescription className="font-poppins">Overview of your content workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Drafts</span>
                  </div>
                  <Badge variant="secondary">{draftPosts.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">In Review</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">{reviewPosts.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-foreground">Published</span>
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground">{publishedPosts.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Scheduled</span>
                  </div>
                  <Badge variant="outline">0</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CandleMascotWithText size="md" className="text-foreground font-nunito font-semibold">
                    Recent Posts
                  </CandleMascotWithText>
                  <CardDescription className="font-poppins">Your latest content activity</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/posts">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.createdAt.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                        {post.status === "published" && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : post.status === "review" ? "secondary" : "outline"
                      }
                      className={
                        post.status === "published"
                          ? "bg-secondary text-secondary-foreground"
                          : post.status === "review"
                            ? "bg-primary text-primary-foreground"
                            : ""
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          {unreadNotifications.length > 0 && (
            <Card className="border-primary/50 candle-glow-secondary">
              <CardHeader>
                <CandleMascotWithText size="md" className="text-foreground font-nunito font-semibold">
                  Action Required
                </CandleMascotWithText>
                <CardDescription className="font-poppins">Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start justify-between p-3 rounded-lg bg-primary/10">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground mb-1">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                    </div>
                    {notification.link && (
                      <Button asChild size="sm" variant="ghost" className="text-primary">
                        <Link href={notification.link}>View</Link>
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
