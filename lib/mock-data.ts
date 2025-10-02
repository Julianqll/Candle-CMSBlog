export type UserRole = "admin" | "writer" | "psychologist"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: "draft" | "review" | "published" | "scheduled"
  authorId: string
  categoryId: string
  tags: string[]
  clinicalTags?: string[]
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  views: number
  readTime: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  scheduledFor?: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount: number
  isClinical?: boolean
}

export interface MediaItem {
  id: string
  name: string
  url: string
  type: "image" | "video" | "audio" | "document"
  size: number
  uploadedBy: string
  uploadedAt: Date
  altText?: string
}

export interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  status: "pending" | "approved" | "spam" | "hidden"
  createdAt: Date
}

export interface Notification {
  id: string
  type: "draft" | "comment" | "engagement" | "system"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}

// Mock current user
export const currentUser: User = {
  id: "1",
  name: "Dr. Sarah Chen",
  email: "sarah@candle.com",
  role: "admin",
  avatar: "/professional-woman-psychologist.png",
}

// Mock users
export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "Dr. Michael Torres",
    email: "michael@candle.com",
    role: "psychologist",
    avatar: "/professional-psychologist.png",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@candle.com",
    role: "writer",
    avatar: "/professional-woman-writer.png",
  },
]

// Mock categories
export const categories: Category[] = [
  { id: "1", name: "Mental Health", slug: "mental-health", description: "General mental health topics", postCount: 24 },
  { id: "2", name: "Mindfulness", slug: "mindfulness", description: "Mindfulness and meditation", postCount: 18 },
  { id: "3", name: "Sleep", slug: "sleep", description: "Sleep health and hygiene", postCount: 12 },
  {
    id: "4",
    name: "Stress Management",
    slug: "stress-management",
    description: "Managing stress and anxiety",
    postCount: 20,
  },
  { id: "5", name: "Relationships", slug: "relationships", description: "Healthy relationships", postCount: 15 },
]

// Mock tags
export const tags: Tag[] = [
  { id: "1", name: "Anxiety", slug: "anxiety", postCount: 32, isClinical: true },
  { id: "2", name: "Depression", slug: "depression", postCount: 28, isClinical: true },
  { id: "3", name: "Meditation", slug: "meditation", postCount: 22 },
  { id: "4", name: "Self-Care", slug: "self-care", postCount: 45 },
  { id: "5", name: "Therapy", slug: "therapy", postCount: 18, isClinical: true },
  { id: "6", name: "Wellness", slug: "wellness", postCount: 38 },
  { id: "7", name: "CBT", slug: "cbt", postCount: 12, isClinical: true },
  { id: "8", name: "Breathing", slug: "breathing", postCount: 15 },
]

// Mock posts
export const posts: Post[] = [
  {
    id: "1",
    title: "5 Mindfulness Techniques for Daily Stress",
    slug: "5-mindfulness-techniques-daily-stress",
    content: "# 5 Mindfulness Techniques\n\nLearn practical mindfulness techniques...",
    excerpt: "Discover simple yet effective mindfulness practices you can incorporate into your daily routine.",
    status: "published",
    authorId: "2",
    categoryId: "2",
    tags: ["meditation", "self-care"],
    clinicalTags: ["anxiety"],
    featuredImage: "/peaceful-meditation.png",
    seoTitle: "5 Mindfulness Techniques for Managing Daily Stress",
    seoDescription: "Learn evidence-based mindfulness techniques to reduce stress and improve mental wellbeing.",
    views: 1247,
    readTime: 6,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    publishedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Understanding Sleep Hygiene: A Complete Guide",
    slug: "understanding-sleep-hygiene-complete-guide",
    content: "# Sleep Hygiene Guide\n\nSleep hygiene refers to...",
    excerpt: "A comprehensive guide to improving your sleep quality through better habits.",
    status: "review",
    authorId: "3",
    categoryId: "3",
    tags: ["wellness", "self-care"],
    featuredImage: "/peaceful-bedroom-sleep.png",
    views: 0,
    readTime: 8,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "Cognitive Behavioral Therapy: What to Expect",
    slug: "cbt-what-to-expect",
    content: "# CBT Overview\n\nCognitive Behavioral Therapy...",
    excerpt: "Learn what happens in CBT sessions and how this evidence-based therapy can help.",
    status: "draft",
    authorId: "2",
    categoryId: "1",
    tags: ["therapy"],
    clinicalTags: ["cbt", "anxiety", "depression"],
    views: 0,
    readTime: 10,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22"),
  },
]

// Mock notifications
export const notifications: Notification[] = [
  {
    id: "1",
    type: "draft",
    title: "Draft Awaiting Review",
    message: 'Emma Wilson submitted "Understanding Sleep Hygiene" for review',
    read: false,
    createdAt: new Date("2024-01-20T14:30:00"),
    link: "/posts/2",
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "3 new comments pending moderation",
    read: false,
    createdAt: new Date("2024-01-21T09:15:00"),
    link: "/comments",
  },
  {
    id: "3",
    type: "engagement",
    title: "High Engagement",
    message: '"5 Mindfulness Techniques" reached 1,000 views',
    read: true,
    createdAt: new Date("2024-01-19T16:45:00"),
  },
]

// Mock comments
export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "John Doe",
    email: "john@example.com",
    content: "This article really helped me understand mindfulness better. Thank you!",
    status: "approved",
    createdAt: new Date("2024-01-16T10:30:00"),
  },
  {
    id: "2",
    postId: "1",
    author: "Jane Smith",
    email: "jane@example.com",
    content: "Could you provide more resources on breathing techniques?",
    status: "pending",
    createdAt: new Date("2024-01-21T14:20:00"),
  },
  {
    id: "3",
    postId: "1",
    author: "Spam Bot",
    email: "spam@spam.com",
    content: "Buy cheap products now!!!",
    status: "spam",
    createdAt: new Date("2024-01-21T15:00:00"),
  },
]

// Mock media
export const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "meditation-hero.jpg",
    url: "/meditation-peaceful.jpg",
    type: "image",
    size: 245000,
    uploadedBy: "2",
    uploadedAt: new Date("2024-01-10"),
    altText: "Person meditating in peaceful setting",
  },
  {
    id: "2",
    name: "breathing-exercise.mp3",
    url: "/placeholder.mp3",
    type: "audio",
    size: 1200000,
    uploadedBy: "2",
    uploadedAt: new Date("2024-01-12"),
  },
]
