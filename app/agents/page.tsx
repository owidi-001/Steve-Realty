'use client'

import { useState, useMemo } from 'react'
import {
    User, Phone, MapPin, Star, Award,
    Briefcase, Languages, Check,
    Filter, Grid3X3, List, ChevronRight,

    Heart, MessageCircle, TrendingUp,
    Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface Agent {
    id: number
    name: string
    title: string
    specialty: string[]
    location: string
    email: string
    phone: string
    avatar: string
    coverImage?: string
    rating: number
    reviews: number
    experience: number
    listings: number
    salesVolume: number
    languages: string[]
    certifications: string[]
    bio: string
    office: string
    socialMedia: {
        facebook?: string
        twitter?: string
        linkedin?: string
        instagram?: string
    }
    availability: 'available' | 'busy' | 'vacation'
    featured: boolean
    awards: string[]
    properties: {
        id: number
        title: string
        price: number
        image: string
        location: string
        type: string
    }[]
    performance: {
        responseRate: number
        responseTime: string
        dealClosure: number
        clientSatisfaction: number
    }
}

const ALL_AGENTS: Agent[] = [
    {
        id: 1,
        name: 'John Kamau',
        title: 'Senior Property Consultant',
        specialty: ['Luxury Properties', 'Commercial Real Estate', 'Property Management'],
        location: 'Nairobi, Westlands',
        email: 'john.kamau@realestate.co.ke',
        phone: '+254 700 123 456',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&h=400&fit=crop',
        rating: 4.9,
        reviews: 156,
        experience: 12,
        listings: 45,
        salesVolume: 850000000,
        languages: ['English', 'Swahili', 'Kikuyu'],
        certifications: ['CRB Certified', 'Nairobi Realtors Board', 'International Property Specialist'],
        bio: 'With over 12 years of experience in the Kenyan real estate market, John specializes in luxury properties and commercial real estate. He has successfully closed deals worth over KES 850M and is known for his exceptional negotiation skills.',
        office: 'Nairobi Headquarters',
        socialMedia: {
            facebook: 'john.kamau.re',
            twitter: 'john_kamau_re',
            linkedin: 'johnkamau-re',
            instagram: 'john.kamau.properties'
        },
        availability: 'available',
        featured: true,
        awards: ['Top Seller 2023', 'Best Luxury Agent 2022', 'Client Choice Award 2023'],
        properties: [
            { id: 1, title: 'Luxury Villa Karen', price: 120000000, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop', location: 'Karen', type: 'Villa' },
            { id: 2, title: 'Westlands Penthouse', price: 85000000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop', location: 'Westlands', type: 'Penthouse' },
            { id: 3, title: 'Commercial Office Space', price: 250000000, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop', location: 'CBD', type: 'Commercial' }
        ],
        performance: {
            responseRate: 98,
            responseTime: '< 2 hours',
            dealClosure: 92,
            clientSatisfaction: 96
        }
    },
    {
        id: 2,
        name: 'Sarah Mwangi',
        title: 'Residential Property Specialist',
        specialty: ['Family Homes', 'Gated Communities', 'First-time Buyers'],
        location: 'Nairobi, Kilimani',
        email: 'sarah.mwangi@realestate.co.ke',
        phone: '+254 711 234 567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=400&fit=crop',
        rating: 4.8,
        reviews: 124,
        experience: 8,
        listings: 32,
        salesVolume: 450000000,
        languages: ['English', 'Swahili'],
        certifications: ['Residential Specialist', 'Home Staging Expert'],
        bio: 'Sarah specializes in helping families find their dream homes in Nairobi\'s best neighborhoods. With 8 years of experience, she has a keen eye for properties with great potential and value.',
        office: 'Nairobi Karen Office',
        socialMedia: {
            facebook: 'sarah.mwangi.re',
            instagram: 'sarah.properties'
        },
        availability: 'available',
        featured: true,
        awards: ['Rising Star 2023', 'Family Specialist 2022'],
        properties: [
            { id: 4, title: '4-Bed Family Home', price: 45000000, image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop', location: 'Runda', type: 'House' },
            { id: 5, title: 'Kilimani Apartment', price: 28000000, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', location: 'Kilimani', type: 'Apartment' }
        ],
        performance: {
            responseRate: 95,
            responseTime: '< 4 hours',
            dealClosure: 88,
            clientSatisfaction: 94
        }
    },
    {
        id: 3,
        name: 'Michael Ochieng',
        title: 'Commercial Real Estate Expert',
        specialty: ['Office Spaces', 'Retail Properties', 'Industrial Real Estate'],
        location: 'Mombasa, Nyali',
        email: 'michael.ochieng@realestate.co.ke',
        phone: '+254 722 345 678',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 89,
        experience: 15,
        listings: 28,
        salesVolume: 680000000,
        languages: ['English', 'Swahili', 'Luo'],
        certifications: ['Commercial Property Expert', 'Investment Advisor'],
        bio: 'Michael has 15 years of experience in commercial real estate along the Kenyan coast. He specializes in helping investors find profitable commercial properties in Mombasa and surrounding areas.',
        office: 'Mombasa Coastal Office',
        socialMedia: {
            linkedin: 'michaelochieng-re',
            twitter: 'mochieng_re'
        },
        availability: 'busy',
        featured: false,
        awards: ['Commercial Dealer of the Year 2023'],
        properties: [
            { id: 6, title: 'Nyali Mall Space', price: 180000000, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop', location: 'Nyali', type: 'Retail' },
            { id: 7, title: 'Industrial Warehouse', price: 320000000, image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&h=300&fit=crop', location: 'Miritini', type: 'Industrial' }
        ],
        performance: {
            responseRate: 90,
            responseTime: '< 6 hours',
            dealClosure: 85,
            clientSatisfaction: 92
        }
    },
    {
        id: 4,
        name: 'Fatima Ali',
        title: 'Luxury & Beachfront Specialist',
        specialty: ['Beachfront Villas', 'Luxury Vacation Homes', 'Coastal Properties'],
        location: 'Mombasa, Diani',
        email: 'fatima.ali@realestate.co.ke',
        phone: '+254 733 456 789',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=400&fit=crop',
        rating: 4.9,
        reviews: 112,
        experience: 10,
        listings: 36,
        salesVolume: 520000000,
        languages: ['English', 'Swahili', 'Arabic'],
        certifications: ['Luxury Property Specialist', 'International Property Advisor'],
        bio: 'Fatima specializes in luxury beachfront properties along the Kenyan coast. With extensive knowledge of the coastal real estate market, she helps clients find their perfect vacation home or investment property.',
        office: 'Diani Coast Office',
        socialMedia: {
            instagram: 'fatima.ali.luxury',
            facebook: 'fatima.ali.properties'
        },
        availability: 'available',
        featured: true,
        awards: ['Luxury Specialist 2023', 'Coastal Expert 2022'],
        properties: [
            { id: 8, title: 'Diani Beach Villa', price: 95000000, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', location: 'Diani', type: 'Villa' },
            { id: 9, title: 'Nyali Waterfront', price: 125000000, image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop', location: 'Nyali', type: 'Penthouse' }
        ],
        performance: {
            responseRate: 97,
            responseTime: '< 3 hours',
            dealClosure: 90,
            clientSatisfaction: 95
        }
    },
    {
        id: 5,
        name: 'Peter Kiprop',
        title: 'Agricultural Land Specialist',
        specialty: ['Farmland', 'Agricultural Investments', 'Rural Properties'],
        location: 'Nakuru',
        email: 'peter.kiprop@realestate.co.ke',
        phone: '+254 744 567 890',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 67,
        experience: 9,
        listings: 24,
        salesVolume: 280000000,
        languages: ['English', 'Swahili', 'Kalenjin'],
        certifications: ['Agricultural Property Expert', 'Land Valuation Specialist'],
        bio: 'Peter specializes in agricultural properties in the Rift Valley region. He helps farmers and investors find productive farmland and agricultural investments.',
        office: 'Nakuru Rift Valley Office',
        socialMedia: {
            facebook: 'peter.kiprop.farms'
        },
        availability: 'available',
        featured: false,
        awards: ['Agricultural Specialist 2023'],
        properties: [
            { id: 10, title: '500-acre Farm', price: 85000000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop', location: 'Naivasha', type: 'Farm' },
            { id: 11, title: 'Tea Plantation', price: 120000000, image: 'https://images.unsplash.com/photo-1592928291113-e6d10e5c6f2e?w=400&h=300&fit=crop', location: 'Kericho', type: 'Plantation' }
        ],
        performance: {
            responseRate: 92,
            responseTime: '< 5 hours',
            dealClosure: 86,
            clientSatisfaction: 91
        }
    },
    {
        id: 6,
        name: 'Grace Wanjiru',
        title: 'First-time Buyer Consultant',
        specialty: ['Affordable Housing', 'Mortgage Assistance', 'Property Investment'],
        location: 'Nyeri',
        email: 'grace.wanjiru@realestate.co.ke',
        phone: '+254 755 678 901',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 78,
        experience: 6,
        listings: 18,
        salesVolume: 150000000,
        languages: ['English', 'Swahili', 'Kikuyu'],
        certifications: ['First-time Buyer Specialist', 'Mortgage Advisory'],
        bio: 'Grace specializes in helping first-time buyers navigate the property market. She provides comprehensive guidance from property search to mortgage approval.',
        office: 'Nyeri Central Office',
        socialMedia: {
            twitter: 'grace_firsthomes',
            facebook: 'grace.wanjiru.homes'
        },
        availability: 'available',
        featured: false,
        awards: ['First-time Buyer Guide 2023'],
        properties: [
            { id: 12, title: 'Starter Home', price: 12000000, image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop', location: 'Thika', type: 'House' },
            { id: 13, title: 'Investment Apartment', price: 8500000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop', location: 'Nyeri', type: 'Apartment' }
        ],
        performance: {
            responseRate: 96,
            responseTime: '< 3 hours',
            dealClosure: 89,
            clientSatisfaction: 93
        }
    },
    {
        id: 7,
        name: 'David Kosgei',
        title: 'Student Housing Expert',
        specialty: ['Student Accommodation', 'Multi-family Units', 'Rental Properties'],
        location: 'Eldoret',
        email: 'david.kosgei@realestate.co.ke',
        phone: '+254 766 789 012',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        rating: 4.5,
        reviews: 54,
        experience: 7,
        listings: 22,
        salesVolume: 180000000,
        languages: ['English', 'Swahili', 'Kalenjin'],
        certifications: ['Student Housing Specialist', 'Rental Property Manager'],
        bio: 'David specializes in student housing and rental properties around university towns in the Rift Valley region. He helps investors find profitable rental properties.',
        office: 'Eldoret Rift Office',
        socialMedia: {
            facebook: 'david.kosgei.rentals'
        },
        availability: 'vacation',
        featured: false,
        awards: ['Student Housing Expert 2023'],
        properties: [
            { id: 14, title: 'Student Hostel', price: 65000000, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', location: 'Eldoret', type: 'Commercial' },
            { id: 15, title: 'Multi-family Unit', price: 45000000, image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop', location: 'Kisumu', type: 'Apartment' }
        ],
        performance: {
            responseRate: 88,
            responseTime: '< 8 hours',
            dealClosure: 82,
            clientSatisfaction: 89
        }
    },
    {
        id: 8,
        name: 'Beatrice Atieno',
        title: 'Property Management Specialist',
        specialty: ['Property Management', 'Rental Services', 'Maintenance Coordination'],
        location: 'Kisumu',
        email: 'beatrice.atieno@realestate.co.ke',
        phone: '+254 777 890 123',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&h=400&fit=crop',
        rating: 4.8,
        reviews: 92,
        experience: 11,
        listings: 15,
        salesVolume: 320000000,
        languages: ['English', 'Swahili', 'Luo'],
        certifications: ['Property Management Certified', 'Facility Management'],
        bio: 'Beatrice specializes in property management services for residential and commercial properties in Western Kenya. She ensures properties are well-maintained and profitable for owners.',
        office: 'Kisumu Western Office',
        socialMedia: {
            linkedin: 'beatrice-atieno-pm',
            facebook: 'beatrice.propertymanagement'
        },
        availability: 'available',
        featured: true,
        awards: ['Property Manager of the Year 2023', 'Service Excellence 2022'],
        properties: [
            { id: 16, title: 'Managed Apartment Complex', price: 180000000, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop', location: 'Kisumu', type: 'Apartment' },
            { id: 17, title: 'Commercial Building', price: 280000000, image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&h=300&fit=crop', location: 'Kakamega', type: 'Commercial' }
        ],
        performance: {
            responseRate: 99,
            responseTime: '< 1 hour',
            dealClosure: 94,
            clientSatisfaction: 97
        }
    }
]

const SPECIALTIES = [
    'Luxury',
    'Commercial',
    'Residential',
    'Beachfront',
    'Land',
    'Hostels',
    'Property Management',
    'First-time Buyers',
    'Investment',
    'Rental'
]

const LOCATIONS = [
    'Nairobi',
    'Mombasa',
    'Nakuru',
    'Kisumu',
    'Eldoret',
    'Nyeri',
    'Thika',
    'Kitale',
    'Malindi',
    'All Locations'
]

const EXPERIENCE_LEVELS = [
    { label: 'All Experience', value: 0 },
    { label: '1-3 years', value: 3 },
    { label: '4-7 years', value: 7 },
    { label: '8+ years', value: 8 }
]

export default function AgentsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid')
    const [showFilters, setShowFilters] = useState(true)
    const [savedAgents, setSavedAgents] = useState<Set<number>>(new Set())
    const [sortBy, setSortBy] = useState('rating')

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        specialty: [] as string[],
        minExperience: 0,
        minRating: 0,
        availability: [] as string[],
        featuredOnly: false,
        minSales: 0,
        languages: [] as string[],
    })

    const allLanguages = Array.from(new Set(ALL_AGENTS.flatMap(agent => agent.languages)))

    const filteredAgents = useMemo(() => {
        let result = ALL_AGENTS.filter((agent) => {
            // Search filter
            const searchMatch = !filters.search ||
                agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                agent.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                agent.specialty.some(s => s.toLowerCase().includes(filters.search.toLowerCase()))

            // Location filter
            const locationMatch = !filters.location ||
                agent.location.toLowerCase().includes(filters.location.toLowerCase())

            // Specialty filter
            const specialtyMatch = filters.specialty.length === 0 ||
                filters.specialty.some(specialty => agent.specialty.includes(specialty))

            // Experience filter
            const experienceMatch = agent.experience >= filters.minExperience

            // Rating filter
            const ratingMatch = agent.rating >= filters.minRating

            // Availability filter
            const availabilityMatch = filters.availability.length === 0 ||
                filters.availability.includes(agent.availability)

            // Featured filter
            const featuredMatch = !filters.featuredOnly || agent.featured

            // Sales volume filter
            const salesMatch = agent.salesVolume >= filters.minSales

            // Languages filter
            const languagesMatch = filters.languages.length === 0 ||
                filters.languages.some(lang => agent.languages.includes(lang))

            return searchMatch && locationMatch && specialtyMatch && experienceMatch &&
                ratingMatch && availabilityMatch && featuredMatch && salesMatch && languagesMatch
        })

        // Apply sorting
        if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating)
        } else if (sortBy === 'experience') {
            result.sort((a, b) => b.experience - a.experience)
        } else if (sortBy === 'listings') {
            result.sort((a, b) => b.listings - a.listings)
        } else if (sortBy === 'sales') {
            result.sort((a, b) => b.salesVolume - a.salesVolume)
        } else if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name))
        }

        return result
    }, [filters, sortBy])

    const toggleSave = (id: number) => {
        const newSaved = new Set(savedAgents)
        if (newSaved.has(id)) {
            newSaved.delete(id)
        } else {
            newSaved.add(id)
        }
        setSavedAgents(newSaved)
    }

    const toggleSpecialty = (specialty: string) => {
        setFilters(prev => ({
            ...prev,
            specialty: prev.specialty.includes(specialty)
                ? prev.specialty.filter(s => s !== specialty)
                : [...prev.specialty, specialty]
        }))
    }

    const toggleLanguage = (language: string) => {
        setFilters(prev => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter(l => l !== language)
                : [...prev.languages, language]
        }))
    }

    const toggleAvailability = (availability: string) => {
        setFilters(prev => ({
            ...prev,
            availability: prev.availability.includes(availability)
                ? prev.availability.filter(a => a !== availability)
                : [...prev.availability, availability]
        }))
    }

    const resetFilters = () => {
        setFilters({
            search: '',
            location: '',
            specialty: [],
            minExperience: 0,
            minRating: 0,
            availability: [],
            featuredOnly: false,
            minSales: 0,
            languages: [],
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(amount)
    }

    const getAvailabilityColor = (status: Agent['availability']) => {
        switch (status) {
            case 'available': return 'bg-green-500'
            case 'busy': return 'bg-yellow-500'
            case 'vacation': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    const getAvailabilityText = (status: Agent['availability']) => {
        switch (status) {
            case 'available': return 'Available'
            case 'busy': return 'Busy'
            case 'vacation': return 'On Vacation'
            default: return 'Unavailable'
        }
    }

    const activeFilterCount = [
        filters.search,
        filters.location,
        filters.specialty.length > 0,
        filters.minExperience > 0,
        filters.minRating > 0,
        filters.availability.length > 0,
        filters.featuredOnly,
        filters.minSales > 0,
        filters.languages.length > 0,
    ].filter(Boolean).length

    return (
        <main className="min-h-screen bg-background">
            {/* Menu Bar */}
            <MenuBar />

            {/* Premium Header */}
            <div className="sticky top-0 z-30 bg-gradient-to-br from-card to-card/80 border-b border-border/50 backdrop-blur-md">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                                Meet Our Agents
                            </h1>
                            <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                                Connect with certified real estate professionals who will guide you through every step of your property journey
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            className="lg:hidden gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            {activeFilterCount > 0 && (
                                <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>
                    </div>


                </div>
            </div>

            <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Premium Filter Sidebar */}
                    {showFilters && (
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="sticky top-24 space-y-6">
                                {/* Mobile Close Button */}
                                <div className="flex items-center justify-between lg:hidden">
                                    <h3 className="font-semibold text-foreground text-lg">Filters</h3>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="p-1 hover:bg-muted rounded-sm transition-colors"
                                    >
                                        <Filter className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Filter Sections */}
                                <div className="bg-card border border-border/50 rounded-sm p-6 space-y-8">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Search Agents
                                        </label>
                                        <Input
                                            placeholder="Search by name, title, or specialty"
                                            value={filters.search}
                                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                            className="bg-muted border-0 rounded-sm h-11 placeholder-muted-foreground"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Location
                                        </label>
                                        <select
                                            value={filters.location}
                                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-muted border-0 rounded-sm text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
                                        >
                                            <option value="">All Locations</option>
                                            {LOCATIONS.map(location => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Specialties */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Specialties
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {SPECIALTIES.slice(0, 8).map((specialty) => (
                                                <button
                                                    key={specialty}
                                                    onClick={() => toggleSpecialty(specialty)}
                                                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm text-sm transition-all duration-200 ${filters.specialty.includes(specialty)
                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-4 h-4 flex items-center justify-center rounded-sm ${filters.specialty.includes(specialty)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted border border-border'
                                                            }`}
                                                    >
                                                        {filters.specialty.includes(specialty) && (
                                                            <Check className="w-3 h-3" />
                                                        )}
                                                    </div>
                                                    <span>{specialty}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Minimum Experience
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            {EXPERIENCE_LEVELS.map(({ label, value }) => (
                                                <button
                                                    key={value}
                                                    onClick={() => setFilters({ ...filters, minExperience: value })}
                                                    className={`px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 text-left ${filters.minExperience === value
                                                        ? 'bg-primary text-primary-foreground shadow-md'
                                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Minimum Rating
                                        </label>
                                        <div className="flex gap-2">
                                            {[0, 4.0, 4.5, 4.8].map((rating) => (
                                                <button
                                                    key={rating}
                                                    onClick={() => setFilters({ ...filters, minRating: rating })}
                                                    className={`flex-1 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 ${filters.minRating === rating
                                                        ? 'bg-primary text-primary-foreground shadow-md'
                                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                                        }`}
                                                >
                                                    {rating === 0 ? 'Any' : `${rating}+`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Languages
                                        </label>
                                        <div className="space-y-2">
                                            {allLanguages.slice(0, 4).map((language) => (
                                                <button
                                                    key={language}
                                                    onClick={() => toggleLanguage(language)}
                                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-sm text-sm transition-all duration-200 ${filters.languages.includes(language)
                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 flex items-center justify-center rounded-sm ${filters.languages.includes(language)
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted border border-border'
                                                        }`}>
                                                        {filters.languages.includes(language) && (
                                                            <Check className="w-3.5 h-3.5" />
                                                        )}
                                                    </div>
                                                    <span>{language}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {activeFilterCount > 0 && (
                                        <Button
                                            onClick={resetFilters}
                                            variant="outline"
                                            className="w-full border-primary/50 text-primary hover:bg-primary/5 transition-colors bg-transparent py-3 rounded-sm"
                                        >
                                            Clear All Filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Controls Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-muted-foreground">
                                    Showing <span className="font-semibold text-foreground">{filteredAgents.length}</span> agents
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-muted border-0 rounded-sm text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
                                >
                                    <option value="rating">Highest Rated</option>
                                    <option value="experience">Most Experienced</option>
                                    <option value="listings">Most Listings</option>
                                    <option value="sales">Highest Sales</option>
                                    <option value="name">A to Z</option>
                                </select>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-muted-foreground mr-3 hidden sm:block">View:</div>
                                <div className="flex gap-2 bg-muted p-1 rounded-sm">
                                    {[
                                        { mode: 'grid' as const, icon: Grid3X3, label: 'Grid' },
                                        { mode: 'list' as const, icon: List, label: 'List' },
                                        { mode: 'compact' as const, icon: User, label: 'Compact' },
                                    ].map(({ mode, icon: Icon }) => (
                                        <button
                                            key={mode}
                                            onClick={() => setViewMode(mode)}
                                            className={`px-3 py-2 rounded-sm transition-all duration-200 ${viewMode === mode
                                                ? 'bg-primary text-primary-foreground shadow-md'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        {filteredAgents.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="text-center max-w-md">
                                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">No Agents Found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        We couldn't find any agents matching your criteria. Try adjusting your filters or search terms.
                                    </p>
                                    <Button onClick={resetFilters} className="gap-2">
                                        <Filter className="w-4 h-4" />
                                        Reset Filters
                                    </Button>
                                </div>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {filteredAgents.map((agent) => (
                                    <Link key={agent.id} href={`/agents/${agent.id}`}>
                                        <Card className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-border/80 p-0 rounded-sm">
                                            {/* Cover Image */}
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                                                {agent.coverImage ? (
                                                    <img
                                                        src={agent.coverImage}
                                                        alt={agent.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                                                )}

                                                {/* Featured Badge */}
                                                {agent.featured && (
                                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                        <Sparkles className="w-3 h-3 inline mr-1" />
                                                        Featured
                                                    </div>
                                                )}

                                                {/* Availability Badge */}
                                                <div className={`absolute top-4 right-4 px-3 py-1 backdrop-blur-sm text-white text-xs font-semibold rounded-full ${getAvailabilityColor(agent.availability)}`}>
                                                    {getAvailabilityText(agent.availability)}
                                                </div>

                                                {/* Agent Avatar */}
                                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                                    <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                                                        <AvatarImage src={agent.avatar} alt={agent.name} />
                                                        <AvatarFallback className="text-2xl">
                                                            {agent.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="px-6 pb-2 text-center">
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {agent.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">{agent.title}</p>

                                                {/* Rating */}
                                                <div className="flex items-center justify-center gap-1 mt-3">
                                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                                    <span className="font-bold text-foreground">{agent.rating}</span>
                                                    <span className="text-sm text-muted-foreground">({agent.reviews} reviews)</span>
                                                </div>

                                                {/* Location */}
                                                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-3">
                                                    <MapPin className="w-4 h-4" />
                                                    {agent.location}
                                                </div>

                                                {/* Specialties */}
                                                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                                                    {agent.specialty.slice(0, 2).map((spec, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs px-2.5 py-1">
                                                            {spec}
                                                        </Badge>
                                                    ))}
                                                    {agent.specialty.length > 2 && (
                                                        <Badge variant="outline" className="text-xs px-2.5 py-1">
                                                            +{agent.specialty.length - 2} more
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Quick Stats */}
                                                <div className="grid grid-cols-3 gap-2 mt-6 pt-2 border-t border-border/30">
                                                    <div>
                                                        <div className="text-lg font-bold text-foreground">{agent.experience}</div>
                                                        <div className="text-xs text-muted-foreground">Years</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-foreground">{agent.listings}</div>
                                                        <div className="text-xs text-muted-foreground">Listings</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-primary">{formatCurrency(agent.salesVolume)}</div>
                                                        <div className="text-xs text-muted-foreground">Sales</div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-3 mt-4">
                                                    <Button className="flex-1 gap-2 rounded-sm" size="sm">
                                                        <MessageCircle className="w-4 h-4" />
                                                        Contact
                                                    </Button>
                                                    <Button variant="outline" size="icon-sm" className="flex-shrink-0 rounded-sm">
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : viewMode === 'list' ? (
                            <div className="space-y-4">
                                {filteredAgents.map((agent) => (
                                    <Link key={agent.id} href={`/agents/${agent.id}`}>
                                        <Card className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-border p-0 rounded-sm mb-2">
                                            <div className="p-4">
                                                <div className="flex gap-6">
                                                    {/* Avatar */}
                                                    <div className="relative">
                                                        <Avatar className="w-20 h-20 border-2 border-border">
                                                            <AvatarImage src={agent.avatar} alt={agent.name} />
                                                            <AvatarFallback>
                                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getAvailabilityColor(agent.availability)}`} />
                                                    </div>

                                                    {/* Agent Info */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                                    {agent.name}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground mt-1">{agent.title}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {agent.featured && (
                                                                    <Badge className="bg-primary/10 text-primary border-primary/20">
                                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                                        Featured
                                                                    </Badge>
                                                                )}
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                                                    <span className="font-bold">{agent.rating}</span>
                                                                    <span className="text-sm text-muted-foreground">({agent.reviews})</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Details */}
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>{agent.experience}</strong> years</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Award className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>{agent.listings}</strong> listings</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>{formatCurrency(agent.salesVolume)}</strong> sales</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Languages className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>{agent.languages.length}</strong> languages</span>
                                                            </div>
                                                        </div>

                                                        {/* Specialties */}
                                                        <div className="mb-4">
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {agent.specialty.map((spec, idx) => (
                                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                                        {spec}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex gap-3 pt-4 border-t border-border/30">
                                                            <Button asChild size="sm" className="gap-2">
                                                                <div>
                                                                    <MessageCircle className="w-4 h-4" />
                                                                    Send Message
                                                                </div>
                                                            </Button>
                                                            <Button asChild variant="outline" size="sm" className="gap-2">
                                                                <a href={`tel:${agent.phone}`}>
                                                                    <Phone className="w-4 h-4" />
                                                                    Call
                                                                </a>
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="ml-auto">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            // Compact View
                            <div className="space-y-3">
                                {filteredAgents.map((agent) => (
                                    <Link key={agent.id} href={`/agents/${agent.id}`}>
                                        <Card className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-200 hover:bg-muted/50 p-4  rounded-sm mb-2">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="w-12 h-12 border border-border">
                                                    <AvatarImage src={agent.avatar} alt={agent.name} />
                                                    <AvatarFallback>
                                                        {agent.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                                            {agent.name}
                                                        </h4>
                                                        {agent.featured && (
                                                            <Sparkles className="w-3 h-3 text-primary" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">{agent.title}</p>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="text-right hidden sm:block">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3 h-3 fill-primary text-primary" />
                                                            <span className="font-bold">{agent.rating}</span>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">{agent.experience} years</div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}