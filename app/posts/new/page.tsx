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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Send, X, Plus, ImageIcon, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedClinicalTags, setSelectedClinicalTags] = useState<string[]>([])
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")

  const isPsychologist = currentUser.role === "psychologist"
  const clinicalTags = tags.filter((t) => t.isClinical)
  const regularTags = tags.filter((t) => !t.isClinical)

  const handleSaveDraft = () => {
    // Mock save
    console.log("Saving draft...")
    router.push("/posts")
  }

  const handleSubmitReview = () => {
    // Mock submit
    console.log("Submitting for review...")
    router.push("/posts")
  }

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]))
  }

  const toggleClinicalTag = (tagName: string) => {
    setSelectedClinicalTags((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]))
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Create New Post</h1>
              <p className="text-muted-foreground">Write and publish your content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/posts")} className="bg-transparent">
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="gap-2 bg-transparent">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={handleSubmitReview}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                Submit for Review
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Content</CardTitle>
                  <CardDescription>Write your post content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-lg font-semibold bg-muted/50 border-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-foreground">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary of your post..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={2}
                      className="bg-muted/50 border-0 resize-none"
                    />
                  </div>

                  <Tabs defaultValue="write" className="w-full">
                    <TabsList className="bg-muted">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write" className="mt-4">
                      <Textarea
                        placeholder="Write your content in Markdown..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={20}
                        className="font-mono text-sm bg-muted/50 border-0 resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Supports Markdown formatting. Use # for headings, ** for bold, * for italic.
                      </p>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="min-h-[400px] p-6 rounded-lg bg-muted/50 prose prose-invert max-w-none">
                        {content ? (
                          <div className="text-foreground">{content}</div>
                        ) : (
                          <p className="text-muted-foreground">Nothing to preview yet. Start writing!</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">SEO Settings</CardTitle>
                  <CardDescription>Optimize your post for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title" className="text-foreground">
                      SEO Title
                    </Label>
                    <Input
                      id="seo-title"
                      placeholder="SEO-optimized title..."
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="bg-muted/50 border-0"
                    />
                    <p className="text-xs text-muted-foreground">{seoTitle.length}/60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-description" className="text-foreground">
                      Meta Description
                    </Label>
                    <Textarea
                      id="seo-description"
                      placeholder="Brief description for search results..."
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      rows={3}
                      className="bg-muted/50 border-0 resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{seoDescription.length}/160 characters</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload</p>
                    <p className="text-xs text-muted-foreground">or drag and drop</p>
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-muted/50 border-0">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Tags</CardTitle>
                  <CardDescription>Add relevant tags to your post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 bg-muted text-foreground">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Suggested Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {regularTags.slice(0, 6).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => toggleTag(tag.name)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Tags (for Psychologists) */}
              {isPsychologist && (
                <Card className="border-border bg-card border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Clinical Tags
                    </CardTitle>
                    <CardDescription>Professional mental health topics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedClinicalTags.map((tag) => (
                        <Badge key={tag} className="gap-1 bg-primary text-primary-foreground">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleClinicalTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Available Clinical Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {clinicalTags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-primary/50"
                            onClick={() => toggleClinicalTag(tag.name)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Disclaimer (for Psychologists) */}
              {isPsychologist && (
                <Card className="border-border bg-card bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">Clinical Disclaimer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This content is for informational purposes only and does not constitute medical advice. Always
                      consult with a qualified healthcare professional.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
