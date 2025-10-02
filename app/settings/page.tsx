"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { users, currentUser } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Palette, Save, Plus, Edit, Trash2, MoreVertical, AlertCircle, Flame } from "lucide-react"
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

export default function SettingsPage() {
  const [showInviteUser, setShowInviteUser] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"admin" | "writer" | "psychologist">("writer")

  const isAdmin = currentUser.role === "admin"

  const handleInviteUser = () => {
    console.log("Inviting user:", inviteEmail, inviteRole)
    setShowInviteUser(false)
    setInviteEmail("")
    setInviteRole("writer")
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground"
      case "psychologist":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-foreground"
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your CMS configuration and team</p>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="team">Team & Roles</TabsTrigger>
              <TabsTrigger value="content">Content Policies</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Site Information</CardTitle>
                  <CardDescription>Basic information about your blog</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name" className="text-foreground">
                      Site Name
                    </Label>
                    <Input
                      id="site-name"
                      defaultValue="Candle Blog"
                      className="bg-muted/50 border-0"
                      disabled={!isAdmin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-tagline" className="text-foreground">
                      Tagline
                    </Label>
                    <Input
                      id="site-tagline"
                      defaultValue="Mental health insights and guidance"
                      className="bg-muted/50 border-0"
                      disabled={!isAdmin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description" className="text-foreground">
                      Description
                    </Label>
                    <Textarea
                      id="site-description"
                      defaultValue="A trusted resource for mental health information, mindfulness practices, and professional guidance."
                      rows={3}
                      className="bg-muted/50 border-0 resize-none"
                      disabled={!isAdmin}
                    />
                  </div>
                  {isAdmin && (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Comment Settings</CardTitle>
                  <CardDescription>Configure how comments work on your blog</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Require Moderation</p>
                      <p className="text-xs text-muted-foreground">All comments must be approved before publishing</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" disabled={!isAdmin} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Notify moderators of new comments</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" disabled={!isAdmin} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Spam Filter</p>
                      <p className="text-xs text-muted-foreground">Automatically detect and filter spam comments</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" disabled={!isAdmin} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team & Roles */}
            <TabsContent value="team" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Team Members</h3>
                  <p className="text-sm text-muted-foreground">Manage your content team and their permissions</p>
                </div>
                {isAdmin && (
                  <Dialog open={showInviteUser} onOpenChange={setShowInviteUser}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Invite User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Invite Team Member</DialogTitle>
                        <DialogDescription>Send an invitation to join your content team</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="invite-email" className="text-foreground">
                            Email Address
                          </Label>
                          <Input
                            id="invite-email"
                            type="email"
                            placeholder="colleague@example.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="bg-muted/50 border-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invite-role" className="text-foreground">
                            Role
                          </Label>
                          <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as any)}>
                            <SelectTrigger className="bg-muted/50 border-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin - Full access</SelectItem>
                              <SelectItem value="writer">Writer - Create and edit content</SelectItem>
                              <SelectItem value="psychologist">Psychologist - Clinical content</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowInviteUser(false)} className="bg-transparent">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInviteUser}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Send Invitation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Team Members List */}
              <div className="space-y-3">
                {users.map((user) => (
                  <Card key={user.id} className="border-border bg-card hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{user.name}</h3>
                            {user.id === currentUser.id && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>

                        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>

                        {isAdmin && user.id !== currentUser.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Role Permissions */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Role Permissions
                  </CardTitle>
                  <CardDescription>Overview of what each role can do</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary text-primary-foreground">Admin</Badge>
                        <span className="text-sm font-semibold text-foreground">Full Access</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>Manage all posts, categories, and tags</li>
                        <li>Approve and publish content</li>
                        <li>Moderate comments</li>
                        <li>Manage team members and roles</li>
                        <li>Configure site settings</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-secondary-foreground">Psychologist</Badge>
                        <span className="text-sm font-semibold text-foreground">Clinical Content</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>Create and edit own posts</li>
                        <li>Add clinical tags and disclaimers</li>
                        <li>Attach media to posts</li>
                        <li>View analytics for own posts</li>
                        <li>Cannot publish directly (requires review)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-muted text-foreground">Writer</Badge>
                        <span className="text-sm font-semibold text-foreground">Content Editor</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>Create and edit posts</li>
                        <li>Manage categories and tags (non-clinical)</li>
                        <li>Add SEO fields and media</li>
                        <li>Moderate comments</li>
                        <li>Request publication (requires admin approval)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Policies */}
            <TabsContent value="content" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Content Guidelines</CardTitle>
                  <CardDescription>Set standards for your content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="editorial-guidelines" className="text-foreground">
                      Editorial Guidelines
                    </Label>
                    <Textarea
                      id="editorial-guidelines"
                      defaultValue="All content must be evidence-based, compassionate, and accessible. Avoid medical jargon when possible. Always include disclaimers for clinical content."
                      rows={4}
                      className="bg-muted/50 border-0 resize-none"
                      disabled={!isAdmin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-policy" className="text-foreground">
                      Comment Policy
                    </Label>
                    <Textarea
                      id="comment-policy"
                      defaultValue="We welcome respectful discussion. Comments containing harassment, spam, or misinformation will be removed. This is a safe space for mental health conversations."
                      rows={4}
                      className="bg-muted/50 border-0 resize-none"
                      disabled={!isAdmin}
                    />
                  </div>
                  {isAdmin && (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Save className="mr-2 h-4 w-4" />
                      Save Policies
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border bg-card border-primary/50">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Clinical Disclaimers
                  </CardTitle>
                  <CardDescription>Required disclaimers for mental health content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinical-disclaimer" className="text-foreground">
                      Standard Disclaimer
                    </Label>
                    <Textarea
                      id="clinical-disclaimer"
                      defaultValue="This content is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for diagnosis and treatment."
                      rows={3}
                      className="bg-muted/50 border-0 resize-none"
                      disabled={!isAdmin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crisis-resources" className="text-foreground">
                      Crisis Resources
                    </Label>
                    <Textarea
                      id="crisis-resources"
                      defaultValue="If you're in crisis: National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741"
                      rows={2}
                      className="bg-muted/50 border-0 resize-none"
                      disabled={!isAdmin}
                    />
                  </div>
                  {isAdmin && (
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Save className="mr-2 h-4 w-4" />
                      Save Disclaimers
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding */}
            <TabsContent value="branding" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    Candle Brand Identity
                  </CardTitle>
                  <CardDescription>Your brand colors and visual identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div className="h-12 w-12 rounded-lg bg-primary border-2 border-border" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Candle Orange</p>
                          <p className="text-xs text-muted-foreground">#FF9F1C</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <div className="h-12 w-12 rounded-lg bg-secondary border-2 border-border" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Golden</p>
                          <p className="text-xs text-muted-foreground">#FCBF49</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Background</Label>
                      <div className="flex items-center gap-2">
                        <div className="h-12 w-12 rounded-lg bg-background border-2 border-border" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Dark Base</p>
                          <p className="text-xs text-muted-foreground">#1C1C1C</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The Candle brand uses warm, inviting colors that promote calm and trust. The orange flame
                      represents hope and guidance, while the dark background creates a comfortable, focused reading
                      experience.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Typography</CardTitle>
                  <CardDescription>Font families used across the CMS</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-foreground mb-1" style={{ fontFamily: "Nunito" }}>
                      Nunito - Primary Font
                    </p>
                    <p className="text-xs text-muted-foreground">Used for body text and general content</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-foreground mb-1" style={{ fontFamily: "Poppins" }}>
                      Poppins - Headings
                    </p>
                    <p className="text-xs text-muted-foreground">Used for titles and emphasis</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Palette className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Brand Consistency</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        These brand elements are fixed to maintain consistency across the Candle platform. Contact your
                        administrator if you need to make changes to the brand identity.
                      </p>
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
