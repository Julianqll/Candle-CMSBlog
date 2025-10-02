"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  FolderTree,
  MessageSquare,
  BarChart3,
  Settings,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CandleMascot } from "./candle-mascot"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Posts", href: "/posts", icon: FileText },
  { name: "Media", href: "/media", icon: ImageIcon },
  { name: "Categories", href: "/categories", icon: FolderTree },
  { name: "Comments", href: "/comments", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card hidden md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary candle-glow">
            <CandleMascot size="sm" variant="flame" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-nunito">Candle CMS</h1>
            <p className="text-xs text-muted-foreground font-poppins">Content Studio</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 candle-interactive",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 candle-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Candle Mascot Helper */}
        <div className="border-t border-border p-4">
          <div className="rounded-xl bg-muted/50 p-4 candle-card-shadow">
            <div className="mb-2 flex items-center gap-2">
              <CandleMascot size="sm" variant="gentle" />
              <span className="text-sm font-semibold text-foreground font-nunito">Candle Tips</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-poppins">
              Need help? The Candle mascot is here to guide you with best practices and insights.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
