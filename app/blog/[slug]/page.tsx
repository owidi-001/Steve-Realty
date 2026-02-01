'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Clock, User, ChevronLeft, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'

interface Comment {
    id: number
    author: string
    avatar: string
    date: string
    content: string
    likes: number
    replies: Comment[]
}

const BLOG_CONTENT = {
    'first-time-buyer-guide': {
        id: 1,
        title: 'Your Complete Guide to Buying Your First Property in Kenya',
        author: 'Steve Kipchoge',
        authorRole: 'Real Estate Expert',
        date: '2024-01-15',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
        content: `
Buying your first property is one of the biggest financial decisions you'll make. Whether you're looking for a cozy apartment in Westlands or a spacious house in Karen, this comprehensive guide will walk you through every step of the journey.

## Understanding Your Budget

Before you start browsing listings, it's crucial to understand your financial position. Calculate how much you can afford to spend based on:
- Your monthly income
- Existing debts and obligations
- Savings for down payment (typically 10-20%)
- Additional costs (stamp duty, legal fees, inspection)

## Getting Pre-Approved

Once you know your budget, get pre-approved for a mortgage. This shows sellers you're serious and gives you concrete numbers to work with. Shop around with multiple lenders to find the best rates.

## Finding the Right Property

Location is everything in real estate. Consider:
- Proximity to your workplace
- Access to amenities (schools, hospitals, shopping)
- Future development plans in the area
- Current and projected property values

## Making an Offer

When you find the right property, work with your agent to make a competitive offer. Don't lowball too much—you want to be taken seriously but negotiate within reason.

## The Inspection and Due Diligence

Never skip the property inspection. Hire a professional to check:
- Structural integrity
- Electrical and plumbing systems
- Roof condition
- Potential pest issues

## Closing the Deal

Once your offer is accepted and inspections pass, you'll move to closing. This involves:
- Final walkthrough
- Signing mortgage documents
- Paying closing costs
- Receiving the keys

Remember, buying a property is a marathon, not a sprint. Take your time, do your research, and don't hesitate to ask questions.
    `,
        category: 'Buying',
        tags: ['First-Time Buyer', 'Guide', 'Nairobi', 'Mortgages'],
        likes: 234,
        comments: [
            {
                id: 1,
                author: 'Jane Doe',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                date: '2024-01-16',
                content: 'This guide is incredibly helpful! I was overwhelmed at first, but now I feel confident moving forward.',
                likes: 24,
                replies: [
                    {
                        id: 2,
                        author: 'Steve Kipchoge',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                        date: '2024-01-16',
                        content: 'Happy to help! Feel free to reach out if you have any questions during your journey.',
                        likes: 8,
                        replies: [],
                    },
                ],
            },
            {
                id: 3,
                author: 'John Smith',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                date: '2024-01-17',
                content: 'Great breakdown of the process. The section on inspections was particularly valuable.',
                likes: 15,
                replies: [],
            },
        ],
    },
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    const post = BLOG_CONTENT[params.slug as keyof typeof BLOG_CONTENT]
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [comments, setComments] = useState<Comment[]>(post.comments)
    const [newComment, setNewComment] = useState('')
    const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())

    if (!post) {
        return (
            <main className="min-h-screen bg-background pt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Article not found</h1>
                    <Link href="/blog">
                        <Button>Back to Blog</Button>
                    </Link>
                </div>
            </main>
        )
    }

    const handleLike = () => {
        setLiked(!liked)
        setLikes(liked ? likes - 1 : likes + 1)
    }

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Math.max(...comments.map((c) => c.id), 0) + 1,
            author: 'You',
            avatar: 'https://images.unsplash.com/photo-1535713566343-cfc63b5d63a2?w=100&h=100&fit=crop',
            date: 'Now',
            content: newComment,
            likes: 0,
            replies: [],
        }

        setComments([comment, ...comments])
        setNewComment('')
    }

    const toggleReplies = (commentId: number) => {
        const newExpanded = new Set(expandedReplies)
        if (newExpanded.has(commentId)) {
            newExpanded.delete(commentId)
        } else {
            newExpanded.add(commentId)
        }
        setExpandedReplies(newExpanded)
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Menu Bar */}
            <MenuBar />
            {/* Back Button */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
                <Link href="/blog">
                    <Button variant="ghost" className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Blog
                    </Button>
                </Link>
            </div>

            {/* Article Container */}
            <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
                {/* Hero Image */}
                <div className="mb-8 rounded-2xl overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                                alt={post.author}
                                className="w-8 h-8 rounded-full"
                            />
                            <div>
                                <div className="font-semibold text-foreground">{post.author}</div>
                                <div>{post.authorRole}</div>
                            </div>
                        </div>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.readTime} min read</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Engagement Buttons */}
                    <div className="flex items-center gap-4 py-6 border-y border-border">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${liked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                            {likes}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all">
                            <MessageCircle className="w-5 h-5" />
                            {comments.length}
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                    </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-16 text-foreground">
                    {post.content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-foreground">
                                    {paragraph.replace('## ', '')}
                                </h2>
                            )
                        }
                        if (paragraph.trim()) {
                            return (
                                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            )
                        }
                        return null
                    })}
                </div>

                {/* Comments Section */}
                <section className="border-t border-border pt-12">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Comments ({comments.length})</h2>

                    {/* Comment Form */}
                    <Card className="p-6 mb-8 border border-border">
                        <div className="flex gap-4 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1535713566343-cfc63b5d63a2?w=40&h=40&fit=crop"
                                alt="Your avatar"
                                className="w-10 h-10 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Share your thoughts on this article..."
                                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    rows={4}
                                />
                                <div className="flex justify-end mt-3">
                                    <Button
                                        onClick={handleCommentSubmit}
                                        disabled={!newComment.trim()}
                                        className="gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Post Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <Card className="p-6 border border-border hover:border-primary/30 transition-colors">
                                    <div className="flex gap-4">
                                        <img
                                            src={comment.avatar || "/placeholder.svg"}
                                            alt={comment.author}
                                            className="w-10 h-10 rounded-full flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-foreground">{comment.author}</h4>
                                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                                            </div>
                                            <p className="text-muted-foreground mb-4">{comment.content}</p>
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                    {comment.likes}
                                                </button>
                                                {comment.replies.length > 0 && (
                                                    <button
                                                        onClick={() => toggleReplies(comment.id)}
                                                        className="text-sm text-primary hover:underline transition-colors"
                                                    >
                                                        {expandedReplies.has(comment.id) ? 'Hide' : 'Show'} {comment.replies.length} repl
                                                        {comment.replies.length === 1 ? 'y' : 'ies'}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Replies */}
                                            {expandedReplies.has(comment.id) && comment.replies.length > 0 && (
                                                <div className="mt-4 space-y-3 pt-4 border-t border-border/50">
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.id} className="flex gap-3 bg-muted/50 p-3 rounded-lg">
                                                            <img
                                                                src={reply.avatar || "/placeholder.svg"}
                                                                alt={reply.author}
                                                                className="w-8 h-8 rounded-full flex-shrink-0"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h5 className="font-semibold text-sm text-foreground">{reply.author}</h5>
                                                                    <span className="text-xs text-muted-foreground">{reply.date}</span>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground">{reply.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </main>
    )
}
