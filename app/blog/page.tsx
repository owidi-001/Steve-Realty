'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Clock, User, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'

const BLOG_POSTS = [
    {
        id: 1,
        slug: 'first-time-buyer-guide',
        title: 'Your Complete Guide to Buying Your First Property in Kenya',
        excerpt: 'Everything you need to know about navigating the property market as a first-time buyer. From budgeting to closing day.',
        content: 'Buying your first property is one of the biggest decisions you\'ll make. This comprehensive guide walks you through every step...',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
        author: 'Steve Kipchoge',
        date: '2024-01-15',
        readTime: 8,
        category: 'Buying',
        likes: 234,
        comments: 12,
        tags: ['First-Time Buyer', 'Guide', 'Nairobi'],
    },
    {
        id: 2,
        slug: 'investment-opportunities-2024',
        title: '5 Best Investment Properties to Watch in 2024',
        excerpt: 'Discover the top emerging neighborhoods and investment opportunities in Kenya\'s real estate market this year.',
        content: 'Investment real estate can be incredibly rewarding. Here are the top 5 properties we\'re watching...',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=500&fit=crop',
        author: 'Sarah Mwangi',
        date: '2024-01-10',
        readTime: 6,
        category: 'Investment',
        likes: 456,
        comments: 28,
        tags: ['Investment', 'Market Trends', 'Opportunities'],
    },
    {
        id: 3,
        slug: 'home-selling-tips',
        title: 'How to Sell Your Home Quickly and for Maximum Value',
        excerpt: 'Expert strategies to prepare your property for sale and attract serious buyers in today\'s market.',
        content: 'Selling a home doesn\'t have to be stressful. Follow these proven strategies...',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
        author: 'James Kariuki',
        date: '2024-01-05',
        readTime: 7,
        category: 'Selling',
        likes: 189,
        comments: 15,
        tags: ['Selling', 'Tips', 'Marketing'],
    },
]

const CATEGORIES = ['All', 'Buying', 'Selling', 'Investment', 'Market Trends', 'Tips']

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredPosts = BLOG_POSTS.filter((post) => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <main className="min-h-screen bg-background">
            {/* Menu Bar */}
            <MenuBar />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16 md:py-20">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            'url("/images/hero_agent.png")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E8D9C4] mb-4">
                            Insights
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            Expert advice, market trends, and tips to help you make informed real estate decisions.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-sm border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-background border-b border-border sticky top-16 sm:top-14 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
                    <div className="flex gap-2 min-w-min">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground hover:bg-muted/80'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`}>
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col group cursor-pointer rounded-sm p-0">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden bg-muted">
                                            <img
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 border-t border-border pt-4">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime} min read
                                                </div>
                                            </div>

                                            {/* Engagement */}
                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                                        <Heart className="w-4 h-4" />
                                                        {post.likes}
                                                    </div>
                                                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {post.comments}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground mb-4">No articles found matching your search.</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('All')
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
