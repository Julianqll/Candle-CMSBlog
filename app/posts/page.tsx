import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { posts, users, categories, currentUser } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Eye, Clock, MoreVertical, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PostsPage() {
  const canCreatePost = ["admin", "writer", "psychologist"].includes(currentUser.role)
  const canEditAll = currentUser.role === "admin"

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Posts</h1>
              <p className="text-muted-foreground">Manage your blog content and articles</p>
            </div>
            {canCreatePost && (
              <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/posts/new">
                  <Plus className="h-4 w-4" />
                  New Post
                </Link>
              </Button>
            )}
          </div>

          {/* Filters */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search posts..." className="pl-9 bg-muted/50 border-0" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px] bg-muted/50 border-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px] bg-muted/50 border-0">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { label: "All Posts", count: posts.length, value: "all" },
              { label: "Published", count: posts.filter((p) => p.status === "published").length, value: "published" },
              { label: "In Review", count: posts.filter((p) => p.status === "review").length, value: "review" },
              { label: "Drafts", count: posts.filter((p) => p.status === "draft").length, value: "draft" },
              { label: "Scheduled", count: posts.filter((p) => p.status === "scheduled").length, value: "scheduled" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={tab.value === "all" ? "default" : "outline"}
                className={
                  tab.value === "all"
                    ? "gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    : "gap-2 bg-transparent"
                }
              >
                {tab.label}
                <Badge variant="secondary" className="ml-1 bg-muted text-foreground">
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-3">
            {posts.map((post) => {
              const author = users.find((u) => u.id === post.authorId)
              const category = categories.find((c) => c.id === post.categoryId)
              const canEdit = canEditAll || post.authorId === currentUser.id

              return (
                <Card key={post.id} className="border-border bg-card hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Featured Image */}
                      {post.featuredImage && (
                        <div className="hidden md:block w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={post.featuredImage || "/placeholder.svg?height=96&width=128"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <Link href={`/posts/${post.id}`} className="group">
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                                {post.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="flex-shrink-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/posts/${post.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              {canEdit && (
                                <>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/posts/${post.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            By <span className="text-foreground font-medium">{author?.name}</span>
                          </span>
                          <span>•</span>
                          <span>{post.createdAt.toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                          {post.status === "published" && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views.toLocaleString()} views
                              </span>
                            </>
                          )}
                        </div>

                        {/* Tags and Status */}
                        <div className="flex flex-wrap items-center gap-2">
                          {category && (
                            <Badge variant="outline" className="bg-muted/50">
                              {category.name}
                            </Badge>
                          )}
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-muted text-foreground">
                              {tag}
                            </Badge>
                          ))}
                          {post.clinicalTags && post.clinicalTags.length > 0 && (
                            <Badge className="bg-primary/10 text-primary border-primary/20">Clinical</Badge>
                          )}
                          <Badge
                            variant={
                              post.status === "published"
                                ? "default"
                                : post.status === "review"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              post.status === "published"
                                ? "bg-secondary text-secondary-foreground ml-auto"
                                : post.status === "review"
                                  ? "bg-primary text-primary-foreground ml-auto"
                                  : "ml-auto"
                            }
                          >
                            {post.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State (shown when no posts) */}
          {posts.length === 0 && (
            <Card className="border-border bg-card border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                  Start creating engaging content for your readers. Your first post is just a click away!
                </p>
                {canCreatePost && (
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/posts/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Post
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
