"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { categories, tags, currentUser } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, MoreVertical, FolderTree, Tag, AlertCircle, Merge, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CategoriesPage() {
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [showNewTag, setShowNewTag] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDesc, setNewCategoryDesc] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [newTagClinical, setNewTagClinical] = useState(false)

  const canManage = ["admin", "writer"].includes(currentUser.role)
  const canManageClinical = ["admin", "psychologist"].includes(currentUser.role)

  const handleCreateCategory = () => {
    console.log("Creating category:", newCategoryName)
    setShowNewCategory(false)
    setNewCategoryName("")
    setNewCategoryDesc("")
  }

  const handleCreateTag = () => {
    console.log("Creating tag:", newTagName)
    setShowNewTag(false)
    setNewTagName("")
    setNewTagClinical(false)
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Categories & Tags</h1>
              <p className="text-muted-foreground">Organize your content with categories and tags</p>
            </div>
          </div>

          <Tabs defaultValue="categories" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search categories..." className="pl-9 bg-muted/50 border-0" />
                </div>
                {canManage && (
                  <Dialog open={showNewCategory} onOpenChange={setShowNewCategory}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        New Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Create New Category</DialogTitle>
                        <DialogDescription>Add a new category to organize your posts</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-name" className="text-foreground">
                            Category Name
                          </Label>
                          <Input
                            id="category-name"
                            placeholder="e.g., Mental Health"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="bg-muted/50 border-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-desc" className="text-foreground">
                            Description
                          </Label>
                          <Textarea
                            id="category-desc"
                            placeholder="Brief description of this category..."
                            value={newCategoryDesc}
                            onChange={(e) => setNewCategoryDesc(e.target.value)}
                            rows={3}
                            className="bg-muted/50 border-0 resize-none"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewCategory(false)} className="bg-transparent">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateCategory}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Create Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Categories Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.id} className="border-border bg-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderTree className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-foreground text-base">{category.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 bg-muted text-foreground">
                              {category.postCount} posts
                            </Badge>
                          </div>
                        </div>
                        {canManage && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Posts
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Category Stats */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Category Overview</CardTitle>
                  <CardDescription>Distribution of posts across categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categories.map((category) => {
                    const totalPosts = categories.reduce((sum, c) => sum + c.postCount, 0)
                    const percentage = Math.round((category.postCount / totalPosts) * 100)
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">{category.name}</span>
                          <span className="text-muted-foreground">
                            {category.postCount} posts ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tags Tab */}
            <TabsContent value="tags" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search tags..." className="pl-9 bg-muted/50 border-0" />
                </div>
                {canManage && (
                  <Dialog open={showNewTag} onOpenChange={setShowNewTag}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        New Tag
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Create New Tag</DialogTitle>
                        <DialogDescription>Add a new tag to categorize your content</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="tag-name" className="text-foreground">
                            Tag Name
                          </Label>
                          <Input
                            id="tag-name"
                            placeholder="e.g., Meditation"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            className="bg-muted/50 border-0"
                          />
                        </div>
                        {canManageClinical && (
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <input
                              type="checkbox"
                              id="clinical-tag"
                              checked={newTagClinical}
                              onChange={(e) => setNewTagClinical(e.target.checked)}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="clinical-tag" className="text-sm text-foreground cursor-pointer">
                              Mark as Clinical Tag (for professional mental health topics)
                            </Label>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewTag(false)} className="bg-transparent">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateTag}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Create Tag
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Clinical Tags Section */}
              {canManageClinical && (
                <Card className="border-border bg-card border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Clinical Tags</CardTitle>
                    </div>
                    <CardDescription>Professional mental health and therapy-related tags</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags
                        .filter((t) => t.isClinical)
                        .map((tag) => (
                          <div
                            key={tag.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            <Tag className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">{tag.name}</span>
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {tag.postCount}
                            </Badge>
                            {canManage && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Merge className="mr-2 h-4 w-4" />
                                    Merge
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Regular Tags Section */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Content Tags</CardTitle>
                  <CardDescription>General tags for organizing your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags
                      .filter((t) => !t.isClinical)
                      .map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{tag.name}</span>
                          <Badge variant="secondary" className="bg-muted-foreground/20 text-foreground">
                            {tag.postCount}
                          </Badge>
                          {canManage && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Merge className="mr-2 h-4 w-4" />
                                  Merge
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tag Management Tools */}
              {canManage && (
                <Card className="border-border bg-card bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-foreground">Tag Management</CardTitle>
                    <CardDescription>Tools to keep your tags organized</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Merge className="h-4 w-4" />
                      Merge Duplicate Tags
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                      Remove Unused Tags
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
