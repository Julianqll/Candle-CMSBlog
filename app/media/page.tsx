"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { mediaItems, users } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Search,
  Grid3x3,
  List,
  ImageIcon,
  Video,
  Music,
  FileText,
  Copy,
  Trash2,
  MoreVertical,
  Download,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video" | "audio" | "document">("all")

  const filteredMedia = selectedType === "all" ? mediaItems : mediaItems.filter((item) => item.type === selectedType)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Media Library</h1>
              <p className="text-muted-foreground">Manage your images, videos, and files</p>
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              Upload Media
            </Button>
          </div>

          {/* Upload Area */}
          <Card className="border-border bg-card border-dashed border-2 hover:border-primary transition-colors">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Drop files to upload</h3>
                <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                <Button variant="outline" className="bg-transparent">
                  Select Files
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Supports: JPG, PNG, GIF, MP4, MP3, PDF (Max 10MB)</p>
              </div>
            </CardContent>
          </Card>

          {/* Filters and View Toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search media..." className="pl-9 bg-muted/50 border-0" />
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-auto">
                <TabsList className="bg-muted">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="image">Images</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="document">Docs</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex gap-1 border border-border rounded-lg p-1 bg-muted/50">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Media Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => {
                const uploader = users.find((u) => u.id === item.uploadedBy)
                return (
                  <Card key={item.id} className="border-border bg-card hover:shadow-lg transition-all group">
                    <CardContent className="p-0">
                      {/* Preview */}
                      <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
                        {item.type === "image" ? (
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                              {getTypeIcon(item.type)}
                            </div>
                          </div>
                        )}
                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="secondary" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Alt Text</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground truncate mb-1">{item.name}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatFileSize(item.size)}</span>
                          <Badge variant="secondary" className="text-xs bg-muted">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredMedia.map((item) => {
                    const uploader = users.find((u) => u.id === item.uploadedBy)
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                        {/* Thumbnail */}
                        <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          {item.type === "image" ? (
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {getTypeIcon(item.type)}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground truncate mb-1">{item.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>Uploaded by {uploader?.name}</span>
                            <span>•</span>
                            <span>{item.uploadedAt.toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{formatFileSize(item.size)}</span>
                          </div>
                        </div>

                        {/* Type Badge */}
                        <Badge variant="secondary" className="bg-muted text-foreground">
                          {item.type}
                        </Badge>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Alt Text</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <Card className="border-border bg-card border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No media files</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                  Upload your first media file to get started. Images, videos, and audio files are supported.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Accessibility Reminder */}
          <Card className="border-border bg-card bg-primary/5 border-primary/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Accessibility Reminder</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Don't forget to add alt text to your images! It helps screen readers describe images to visually
                    impaired users and improves SEO.
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
