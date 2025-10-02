"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { comments, posts, currentUser } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Ban,
  Eye,
  MessageSquare,
  Clock,
  MoreVertical,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function CommentsPage() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "spam" | "hidden">("all")

  const canModerate = ["admin", "writer"].includes(currentUser.role)

  const filteredComments =
    selectedStatus === "all" ? comments : comments.filter((comment) => comment.status === selectedStatus)

  const pendingCount = comments.filter((c) => c.status === "pending").length
  const approvedCount = comments.filter((c) => c.status === "approved").length
  const spamCount = comments.filter((c) => c.status === "spam").length
  const hiddenCount = comments.filter((c) => c.status === "hidden").length

  const handleApprove = (commentId: string) => {
    console.log("Approving comment:", commentId)
  }

  const handleReject = (commentId: string) => {
    console.log("Rejecting comment:", commentId)
  }

  const handleMarkSpam = (commentId: string) => {
    console.log("Marking as spam:", commentId)
  }

  const handleBanUser = (email: string) => {
    console.log("Banning user:", email)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Comment Moderation</h1>
              <p className="text-muted-foreground">Review and manage comments from your readers</p>
            </div>
            {pendingCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                {pendingCount} pending review
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Comments</p>
                    <p className="text-2xl font-bold text-foreground">{comments.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Approved</p>
                    <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Spam</p>
                    <p className="text-2xl font-bold text-foreground">{spamCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-9 bg-muted/50 border-0" />
            </div>

            <Tabs value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as any)} className="w-auto">
              <TabsList className="bg-muted">
                <TabsTrigger value="all">
                  All
                  <Badge variant="secondary" className="ml-2 bg-muted-foreground/20 text-foreground">
                    {comments.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                    {pendingCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved
                  <Badge variant="secondary" className="ml-2 bg-muted-foreground/20 text-foreground">
                    {approvedCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="spam">
                  Spam
                  <Badge variant="secondary" className="ml-2 bg-muted-foreground/20 text-foreground">
                    {spamCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {filteredComments.map((comment) => {
              const post = posts.find((p) => p.id === comment.postId)
              return (
                <Card
                  key={comment.id}
                  className={`border-border bg-card hover:shadow-lg transition-all ${
                    comment.status === "pending" ? "border-primary/50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{comment.author}</span>
                              <Badge
                                variant={
                                  comment.status === "approved"
                                    ? "default"
                                    : comment.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  comment.status === "approved"
                                    ? "bg-secondary text-secondary-foreground"
                                    : comment.status === "pending"
                                      ? "bg-primary text-primary-foreground"
                                      : comment.status === "spam"
                                        ? "bg-destructive/10 text-destructive border-destructive/20"
                                        : ""
                                }
                              >
                                {comment.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {comment.email} • {comment.createdAt.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-foreground mb-3 leading-relaxed">{comment.content}</p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <span>On post:</span>
                          <Link href={`/posts/${post?.id}`} className="text-primary hover:underline">
                            {post?.title}
                          </Link>
                        </div>

                        {/* Actions */}
                        {canModerate && (
                          <div className="flex items-center gap-2">
                            {comment.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(comment.id)}
                                  className="gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(comment.id)}
                                  className="gap-1 bg-transparent"
                                >
                                  <XCircle className="h-3 w-3" />
                                  Hide
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkSpam(comment.id)}
                                  className="gap-1 bg-transparent text-destructive hover:text-destructive"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  Spam
                                </Button>
                              </>
                            )}
                            {comment.status === "approved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(comment.id)}
                                className="gap-1 bg-transparent"
                              >
                                <XCircle className="h-3 w-3" />
                                Hide
                              </Button>
                            )}
                            {comment.status === "spam" && (
                              <Button
                                size="sm"
                                onClick={() => handleApprove(comment.id)}
                                className="gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Not Spam
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/posts/${post?.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Post
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleBanUser(comment.email)}
                                  className="text-destructive"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Ban User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredComments.length === 0 && (
            <Card className="border-border bg-card border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No comments to moderate</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  {selectedStatus === "pending"
                    ? "All caught up! No pending comments at the moment."
                    : "No comments found with this status."}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Moderation Guidelines */}
          <Card className="border-border bg-card bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Moderation Guidelines</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Approve comments that are respectful and add value. Hide or mark as spam any comments containing
                    harassment, promotional content, or misinformation. When in doubt, err on the side of caution for
                    mental health content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
