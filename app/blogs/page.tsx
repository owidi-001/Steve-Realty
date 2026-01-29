'use client'

import { useState, useMemo } from 'react'
import {
    Search, Calendar, Clock,
    Heart, MessageCircle, Eye, TrendingUp,
    X, BookOpen, Newspaper, Home, Building2,
    TrendingUp as TrendingUpIcon, DollarSign,
    ArrowRight, Mail, Rss, Sparkles, Award
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaWhatsapp, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface BlogPost {
    id: number
    title: string
    excerpt: string
    content: string
    author: string
    authorAvatar: string
    authorRole: string
    publishDate: string
    readTime: string
    category: string
    tags: string[]
    image: string
    views: number
    likes: number
    comments: number
    featured: boolean
    popular: boolean
    trending: boolean
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: 'The Future of Real Estate in Nairobi: 2024 Market Trends',
        excerpt: 'Discover the latest trends shaping Nairobi\'s real estate market and what to expect in 2024.',
        content: 'Nairobi\'s real estate market is undergoing significant transformation...',
        author: 'John Kamau',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Market Analyst',
        publishDate: '2024-01-15',
        readTime: '8 min read',
        category: 'Market Trends',
        tags: ['Nairobi', 'Trends', 'Investment', 'Market'],
        image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=500&fit=crop',
        views: 12450,
        likes: 845,
        comments: 92,
        featured: true,
        popular: true,
        trending: true
    },
    {
        id: 2,
        title: 'How to Secure Your Dream Home in a Competitive Market',
        excerpt: 'Expert tips for navigating competitive real estate markets and securing your perfect home.',
        content: 'In today\'s competitive market, securing your dream home requires strategy...',
        author: 'Sarah Mwangi',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Buyer Specialist',
        publishDate: '2024-01-10',
        readTime: '6 min read',
        category: 'Home Buying',
        tags: ['Buying', 'Tips', 'First-time', 'Guide'],
        image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=500&fit=crop',
        views: 8920,
        likes: 623,
        comments: 78,
        featured: true,
        popular: true,
        trending: false
    },
    {
        id: 3,
        title: 'Investment Opportunities in Coastal Properties',
        excerpt: 'Explore the growing investment potential in Mombasa and coastal real estate.',
        content: 'Coastal properties in Kenya are experiencing unprecedented growth...',
        author: 'Michael Ochieng',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Coastal Expert',
        publishDate: '2024-01-05',
        readTime: '10 min read',
        category: 'Investment',
        tags: ['Coast', 'Investment', 'Beach', 'Mombasa'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
        views: 7560,
        likes: 512,
        comments: 64,
        featured: false,
        popular: true,
        trending: true
    },
    {
        id: 4,
        title: 'Understanding Property Valuation in Kenya',
        excerpt: 'A comprehensive guide to how properties are valued in the Kenyan market.',
        content: 'Property valuation is both an art and a science...',
        author: 'Grace Wanjiru',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Valuation Expert',
        publishDate: '2024-01-02',
        readTime: '12 min read',
        category: 'Property Guide',
        tags: ['Valuation', 'Guide', 'Kenya', 'Market'],
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop',
        views: 6830,
        likes: 456,
        comments: 58,
        featured: false,
        popular: false,
        trending: false
    },
    {
        id: 5,
        title: 'Smart Home Technology for Modern Kenyan Homes',
        excerpt: 'Integrating smart technology to enhance your home\'s value and convenience.',
        content: 'Smart home technology is revolutionizing how we live...',
        author: 'David Kosgei',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Tech Expert',
        publishDate: '2023-12-28',
        readTime: '7 min read',
        category: 'Technology',
        tags: ['Smart Home', 'Technology', 'Modern', 'Innovation'],
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop',
        views: 5420,
        likes: 389,
        comments: 42,
        featured: true,
        popular: false,
        trending: false
    },
    {
        id: 6,
        title: 'The Rise of Sustainable Building in East Africa',
        excerpt: 'How green buildings are changing the real estate landscape in East Africa.',
        content: 'Sustainability is no longer just a trend but a necessity...',
        author: 'Fatima Ali',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Sustainability Expert',
        publishDate: '2023-12-20',
        readTime: '9 min read',
        category: 'Sustainability',
        tags: ['Green', 'Sustainable', 'Eco-friendly', 'Building'],
        image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&h=500&fit=crop',
        views: 4980,
        likes: 367,
        comments: 51,
        featured: false,
        popular: true,
        trending: false
    },
    {
        id: 7,
        title: 'Mortgage Rates and Financing Options in 2024',
        excerpt: 'Navigating the changing landscape of mortgage rates and financing.',
        content: 'Understanding mortgage options is crucial for any home buyer...',
        author: 'Peter Kiprop',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Finance Expert',
        publishDate: '2023-12-15',
        readTime: '11 min read',
        category: 'Finance',
        tags: ['Mortgage', 'Finance', 'Loans', 'Banking'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
        views: 6120,
        likes: 423,
        comments: 67,
        featured: false,
        popular: false,
        trending: true
    },
    {
        id: 8,
        title: 'Interior Design Trends for Modern Kenyan Homes',
        excerpt: 'Latest interior design trends transforming homes across Kenya.',
        content: 'Interior design in Kenya is embracing both local and global influences...',
        author: 'Beatrice Atieno',
        authorAvatar: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png',
        authorRole: 'Interior Designer',
        publishDate: '2023-12-10',
        readTime: '6 min read',
        category: 'Design',
        tags: ['Interior', 'Design', 'Home', 'Decoration'],
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=500&fit=crop',
        views: 4780,
        likes: 345,
        comments: 49,
        featured: false,
        popular: false,
        trending: false
    }
]

const CATEGORIES = [
    { name: 'All Articles', count: BLOG_POSTS.length, icon: <Newspaper className="w-4 h-4" /> },
    { name: 'Market Trends', count: 3, icon: <TrendingUpIcon className="w-4 h-4" /> },
    { name: 'Home Buying', count: 2, icon: <Home className="w-4 h-4" /> },
    { name: 'Investment', count: 4, icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Property Guide', count: 3, icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Technology', count: 2, icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Sustainability', count: 2, icon: <Award className="w-4 h-4" /> },
    { name: 'Finance', count: 3, icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Design', count: 2, icon: <Building2 className="w-4 h-4" /> }
]

const TAGS = [
    'Nairobi', 'Trends', 'Investment', 'Buying', 'Tips', 'First-time',
    'Guide', 'Coast', 'Beach', 'Mombasa', 'Valuation', 'Market',
    'Smart Home', 'Technology', 'Green', 'Sustainable', 'Mortgage',
    'Finance', 'Interior', 'Design', 'Kenya', 'Real Estate', 'Properties'
]

const AUTHORS = [
    { name: 'John Kamau', role: 'Market Analyst', posts: 24, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Sarah Mwangi', role: 'Buyer Specialist', posts: 18, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop' },
    { name: 'Michael Ochieng', role: 'Coastal Expert', posts: 15, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Grace Wanjiru', role: 'Valuation Expert', posts: 12, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }
]

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All Articles')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [sortBy, setSortBy] = useState('newest')
    const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())

    const filteredPosts = useMemo(() => {
        let result = BLOG_POSTS.filter(post => {
            // Category filter
            const categoryMatch = selectedCategory === 'All Articles' || post.category === selectedCategory

            // Search filter
            const searchMatch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.author.toLowerCase().includes(searchQuery.toLowerCase())

            // Tags filter
            const tagsMatch = selectedTags.length === 0 ||
                selectedTags.every(tag => post.tags.includes(tag))

            return categoryMatch && searchMatch && tagsMatch
        })

        // Sorting
        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        } else if (sortBy === 'popular') {
            result.sort((a, b) => b.views - a.views)
        } else if (sortBy === 'trending') {
            result.sort((a, b) => {
                const aScore = (b.trending ? 100 : 0) + b.likes + b.comments
                const bScore = (a.trending ? 100 : 0) + a.likes + a.comments
                return bScore - aScore
            })
        }

        return result
    }, [searchQuery, selectedCategory, selectedTags, sortBy])

    const toggleSavePost = (id: number) => {
        const newSaved = new Set(savedPosts)
        if (newSaved.has(id)) {
            newSaved.delete(id)
        } else {
            newSaved.add(id)
        }
        setSavedPosts(newSaved)
    }

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('All Articles')
        setSelectedTags([])
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const featuredPosts = BLOG_POSTS.filter(post => post.featured)
    const popularPosts = BLOG_POSTS.filter(post => post.popular).slice(0, 3)
    const trendingPosts = BLOG_POSTS.filter(post => post.trending)

    return (
        <main className="min-h-screen bg-background">
            {/* Menu Bar */}
            <MenuBar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            Real Estate Insights
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Real Estate <span className="text-primary">Blog</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Expert insights, market trends, and valuable tips for buyers, sellers, and investors in Kenya's property market.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search articles, topics, or authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-3 text-base bg-background border-2 border-border/50 rounded-xl hover:border-primary/50 focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            {/* Categories */}
                            <Card className="p-6 border-border/50 rounded-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {CATEGORIES.map((category) => (
                                        <button
                                            key={category.name}
                                            onClick={() => setSelectedCategory(category.name)}
                                            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {category.icon}
                                                <span>{category.name}</span>
                                            </div>
                                            <Badge variant={selectedCategory === category.name ? "secondary" : "outline"}>
                                                {category.count}
                                            </Badge>
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            {/* Popular Tags */}
                            <Card className="p-6 border-border/50 rounded-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-foreground">Popular Tags</h3>
                                    {selectedTags.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedTags([])}
                                            className="text-xs h-7"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {TAGS.slice(0, 15).map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 text-sm rounded-full transition-all ${selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            {/* Popular Authors */}
                            <Card className="p-6 border-border/50 rounded-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Top Authors</h3>
                                <div className="space-y-4">
                                    {AUTHORS.map((author) => (
                                        <div key={author.name} className="flex items-center gap-3">
                                            {/* <Image
                                                src={author.avatar}
                                                alt={author.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            /> */}
                                            <div className="flex-1">
                                                <div className="font-medium text-foreground">{author.name}</div>
                                                <div className="text-sm text-muted-foreground">{author.role}</div>
                                            </div>
                                            <Badge variant="outline">{author.posts}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Newsletter */}
                            <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 rounded-sm">
                                <div className="text-center">
                                    <Mail className="w-10 h-10 text-primary mx-auto mb-3" />
                                    <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Get the latest real estate insights delivered to your inbox
                                    </p>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Your email"
                                            className="bg-background"
                                        />
                                        <Button className="w-full gap-2">
                                            Subscribe
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Featured Posts */}
                        {featuredPosts.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
                                    <Badge variant="outline" className="gap-1">

                                        Editor's Pick
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredPosts.map((post) => (
                                        <Card key={post.id} className="overflow-hidden border-border/50 group rounded-sm p-0">
                                            <Link href={`/blog/${post.id}`}>
                                                <div className="relative aspect-video overflow-hidden bg-muted">
                                                    {/* <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        width={100}
                                                        height={100}
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    /> */}
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-primary text-primary-foreground">
                                                            {post.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            {/* <Image
                                                                src={post.authorAvatar}
                                                                alt={post.author}
                                                                width={32}
                                                                height={32}
                                                                className="rounded-full"
                                                            /> */}
                                                            <div>
                                                                <div className="text-sm font-medium text-foreground">{post.author}</div>
                                                                <div className="text-xs text-muted-foreground">{formatDate(post.publishDate)}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                {post.readTime}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Now */}
                        {trendingPosts.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-6">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {trendingPosts.map((post) => (
                                        <Card key={post.id} className="border-border/50 group">
                                            <Link href={`/blog/${post.id}`}>
                                                <div className="p-4">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <TrendingUp className="w-4 h-4 text-orange-500" />
                                                        <Badge variant="outline" className="text-xs">
                                                            Trending
                                                        </Badge>
                                                    </div>
                                                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                        <span>{formatDate(post.publishDate)}</span>
                                                        <div className="flex items-center gap-2">
                                                            <Eye className="w-4 h-4" />
                                                            {post.views.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-muted-foreground">
                                    Showing <span className="font-semibold text-foreground">{filteredPosts.length}</span> articles
                                </div>
                                {(searchQuery || selectedTags.length > 0 || selectedCategory !== 'All Articles') && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Filters
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-sm text-muted-foreground hidden sm:block">Sort by:</div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-muted border-0 rounded-lg text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="trending">Trending</option>
                                </select>
                            </div>
                        </div>

                        {/* Blog Posts Grid */}
                        {filteredPosts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="text-center">
                                    <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Try adjusting your filters or search terms
                                    </p>
                                    <Button onClick={clearFilters}>
                                        Clear All Filters
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {filteredPosts.map((post) => (
                                    <Card key={post.id} className="overflow-hidden border-border/50 group hover:shadow-lg transition-shadow rounded-sm p-0">
                                        <Link href={`/blog/${post.id}`}>
                                            <div className="relative aspect-video overflow-hidden bg-muted">
                                                {/* <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    width={100}
                                                    height={100}
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                /> */}
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-primary text-primary-foreground">
                                                        {post.category}
                                                    </Badge>
                                                </div>
                                                {post.featured && (
                                                    <div className="absolute top-4 right-4">
                                                        <Badge className="bg-orange-500 text-white">
                                                            Featured
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {post.tags.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{post.tags.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        {/* <Image
                                                            src={post.authorAvatar}
                                                            alt={post.author}
                                                            width={32}
                                                            height={32}
                                                            className="rounded-full"
                                                        /> */}
                                                        <div>
                                                            <div className="text-sm font-medium text-foreground">{post.author}</div>
                                                            <div className="text-xs text-muted-foreground">{post.authorRole}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                toggleSavePost(post.id)
                                                            }}
                                                            className={`p-2 rounded-full transition-colors ${savedPosts.has(post.id) ? 'bg-red-50 text-red-600' : 'hover:bg-muted'}`}
                                                        >
                                                            <Heart className={`w-4 h-4 ${savedPosts.has(post.id) ? 'fill-red-600' : ''}`} />
                                                        </button>
                                                        <Link href={`/blog/${post.id}#comments`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                                            <MessageCircle className="w-4 h-4" />
                                                            {post.comments}
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(post.publishDate)}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {post.readTime}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {post.views.toLocaleString()} views
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Popular Posts Sidebar for large screens */}
                        <div className="hidden xl:block mt-12 pt-12 border-t border-border/30">
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <h2 className="text-2xl font-bold text-foreground">Most Popular</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {popularPosts.map((post, index) => (
                                    <Link key={post.id} href={`/blog/${post.id}`}>
                                        <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                                            <div className="text-3xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {post.views.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(post.publishDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border/50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Become a Contributor
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Share your real estate insights and reach thousands of readers. Join our community of expert contributors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-2">
                                Write for Us
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2">
                                <Mail className="w-4 h-4" />
                                Contact Editors
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-card border-t border-border/50">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Real Estate Blog</h3>
                            <p className="text-sm text-muted-foreground">
                                Expert insights for Kenya's property market
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Facebook">
                                    <FaFacebook className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Twitter">
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="LinkedIn">
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Instagram">
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="YouTube">
                                    <FaYoutube className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="RSS">
                                    <Rss className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>

                        <div>
                            <Button variant="outline" className="gap-2">
                                <Mail className="w-4 h-4" />
                                Subscribe to Newsletter
                            </Button>
                        </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border/30">
                        <p>© 2024 Real Estate Blog. All rights reserved.</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <Link href="/blog/privacy" className="hover:text-foreground transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/blog/terms" className="hover:text-foreground transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/blog/contact" className="hover:text-foreground transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}