'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import {
    MapPin, Phone, Mail, Globe, Clock, Users, Car, Wifi,
    Coffee, Shield, Building2, Grid3X3, List, Sliders, X,
    Star, Check, ChevronRight, Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'

interface Office {
    id: number
    name: string
    region: 'nairobi' | 'coast' | 'rift' | 'central' | 'western'
    location: string
    address: string
    phone: string
    email: string
    website?: string
    manager: string
    teamSize: number
    openingHours: string
    services: string[]
    amenities: string[]
    image: string
    rating: number
    reviews: number
    featured: boolean
    parking: boolean
    description: string
    coordinates: {
        lat: number
        lng: number
    }
}

const ALL_OFFICES: Office[] = [
    {
        id: 1,
        name: 'Nairobi Headquarters',
        region: 'nairobi',
        location: 'Westlands',
        address: 'ABC Place, Waiyaki Way, Westlands, Nairobi',
        phone: '+254 700 123 456',
        email: 'nairobi@realestate.co.ke',
        website: 'www.realestate.co.ke',
        manager: 'John Kamau',
        teamSize: 24,
        openingHours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
        services: ['Sales', 'Property Management', 'Valuations', 'Legal Services', 'Mortgage Advisory'],
        amenities: ['Parking', 'Conference Room', 'Client Lounge', 'Free WiFi', 'Coffee Bar'],
        image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&h=600&fit=crop',
        rating: 4.8,
        reviews: 124,
        featured: true,
        parking: true,
        description: 'Our flagship office located in the heart of Nairobi\'s business district. State-of-the-art facilities with a dedicated team of property experts.',
        coordinates: { lat: -1.2659, lng: 36.8076 }
    },
    {
        id: 2,
        name: 'Mombasa Coastal Office',
        region: 'coast',
        location: 'Nyali',
        address: 'Nyali City Mall, Mombasa-Malindi Road, Nyali',
        phone: '+254 720 234 567',
        email: 'mombasa@realestate.co.ke',
        manager: 'Fatima Ali',
        teamSize: 12,
        openingHours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 3:00 PM',
        services: ['Sales', 'Property Management', 'Beachfront Properties', 'Rental Services'],
        amenities: ['Parking', 'Client Lounge', 'Free WiFi', 'Ocean View'],
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
        rating: 4.6,
        reviews: 89,
        featured: true,
        parking: true,
        description: 'Specializing in coastal properties, beachfront villas, and vacation homes along the beautiful Kenyan coast.',
        coordinates: { lat: -4.0435, lng: 39.6682 }
    },
    {
        id: 3,
        name: 'Nakuru Rift Valley Office',
        region: 'rift',
        location: 'Milimani',
        address: 'Mega Plaza, Kenyatta Avenue, Nakuru',
        phone: '+254 730 345 678',
        email: 'nakuru@realestate.co.ke',
        manager: 'Peter Kiprop',
        teamSize: 8,
        openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM',
        services: ['Sales', 'Farm & Land Sales', 'Property Management', 'Agricultural Properties'],
        amenities: ['Parking', 'Meeting Room', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
        rating: 4.4,
        reviews: 56,
        featured: false,
        parking: true,
        description: 'Experts in Rift Valley properties including farms, agricultural land, and residential properties around Nakuru and beyond.',
        coordinates: { lat: -0.3031, lng: 36.0800 }
    },
    {
        id: 4,
        name: 'Nyeri Central Office',
        region: 'central',
        location: 'Town Centre',
        address: 'Aberdare Towers, Kimathi Way, Nyeri',
        phone: '+254 740 456 789',
        email: 'nyeri@realestate.co.ke',
        manager: 'Grace Wanjiru',
        teamSize: 6,
        openingHours: 'Mon-Fri: 8:30 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
        services: ['Sales', 'Tea Farm Sales', 'Residential Properties', 'Commercial Properties'],
        amenities: ['Parking', 'Client Area', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        rating: 4.5,
        reviews: 42,
        featured: false,
        parking: true,
        description: 'Serving Central Kenya with expertise in tea farms, agricultural properties, and residential developments.',
        coordinates: { lat: -0.4201, lng: 36.9476 }
    },
    {
        id: 5,
        name: 'Kisumu Western Office',
        region: 'western',
        location: 'Milimani',
        address: 'Westend Mall, Oginga Odinga Road, Kisumu',
        phone: '+254 750 567 890',
        email: 'kisumu@realestate.co.ke',
        manager: 'Michael Otieno',
        teamSize: 10,
        openingHours: 'Mon-Fri: 8:00 AM - 5:30 PM, Sat: 9:00 AM - 3:00 PM',
        services: ['Sales', 'Lakefront Properties', 'Commercial Spaces', 'Property Management'],
        amenities: ['Parking', 'Conference Facilities', 'Lake View', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 67,
        featured: true,
        parking: true,
        description: 'Specialists in Lake Victoria properties, commercial investments, and residential developments in Western Kenya.',
        coordinates: { lat: -0.0917, lng: 34.7680 }
    },
    {
        id: 6,
        name: 'Karen Nairobi Office',
        region: 'nairobi',
        location: 'Karen',
        address: 'Karen Hub, Karen Road, Nairobi',
        phone: '+254 711 111 222',
        email: 'karen@realestate.co.ke',
        manager: 'Sarah Johnson',
        teamSize: 15,
        openingHours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
        services: ['Luxury Sales', 'Property Management', 'Valuations', 'Interior Design'],
        amenities: ['Valet Parking', 'Luxury Lounge', 'Café', 'Free WiFi', 'Kids Area'],
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        rating: 4.9,
        reviews: 156,
        featured: true,
        parking: true,
        description: 'Our premium office serving the Karen and Langata areas, specializing in luxury properties and high-end real estate.',
        coordinates: { lat: -1.3192, lng: 36.7089 }
    },
    {
        id: 7,
        name: 'Diani Coast Office',
        region: 'coast',
        location: 'Diani Beach',
        address: 'Diani Beach Road, Ukunda',
        phone: '+254 722 222 333',
        email: 'diani@realestate.co.ke',
        manager: 'Ahmed Hassan',
        teamSize: 8,
        openingHours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 3:00 PM',
        services: ['Beachfront Sales', 'Vacation Rentals', 'Property Management', 'Investment Properties'],
        amenities: ['Beach Access', 'Parking', 'Terrace', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        rating: 4.7,
        reviews: 93,
        featured: false,
        parking: true,
        description: 'Located right on Diani Beach, specializing in beachfront properties and vacation homes.',
        coordinates: { lat: -4.2833, lng: 39.5833 }
    },
    {
        id: 8,
        name: 'Eldoret Rift Office',
        region: 'rift',
        location: 'Elgon View',
        address: "Rupa's Mall, Uganda Road, Eldoret",
        phone: '+254 733 333 444',
        email: 'eldoret@realestate.co.ke',
        manager: 'David Kosgei',
        teamSize: 7,
        openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM',
        services: ['Sales', 'Commercial Properties', 'Agricultural Land', 'Student Housing'],
        amenities: ['Parking', 'Meeting Room', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        rating: 4.3,
        reviews: 38,
        featured: false,
        parking: true,
        description: 'Serving Eldoret and surrounding areas with focus on commercial properties and agricultural investments.',
        coordinates: { lat: 0.5143, lng: 35.2698 }
    },
    {
        id: 9,
        name: 'Thika Central Office',
        region: 'central',
        location: 'Thika Town',
        address: 'Thika Road Mall, Garissa Road, Thika',
        phone: '+254 744 444 555',
        email: 'thika@realestate.co.ke',
        manager: 'James Maina',
        teamSize: 5,
        openingHours: 'Mon-Fri: 8:30 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
        services: ['Sales', 'Industrial Properties', 'Residential Sales', 'Property Management'],
        amenities: ['Parking', 'Client Area', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop',
        rating: 4.4,
        reviews: 31,
        featured: false,
        parking: true,
        description: 'Specializing in industrial and residential properties in Thika and the surrounding Central region.',
        coordinates: { lat: -1.0398, lng: 37.0894 }
    },
    {
        id: 10,
        name: 'Kakamega Western Office',
        region: 'western',
        location: 'Town Centre',
        address: 'Mumias Complex, Mumias Road, Kakamega',
        phone: '+254 755 555 666',
        email: 'kakamega@realestate.co.ke',
        manager: 'Beatrice Atieno',
        teamSize: 4,
        openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
        services: ['Sales', 'Agricultural Properties', 'Residential Properties'],
        amenities: ['Parking', 'Free WiFi'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        rating: 4.2,
        reviews: 27,
        featured: false,
        parking: true,
        description: 'Serving Kakamega County with focus on agricultural and residential properties.',
        coordinates: { lat: 0.2827, lng: 34.7519 }
    },
]

const REGION_INFO = {
    all: {
        name: 'All Locations',
        description: 'Complete directory of all offices',
        offices: ALL_OFFICES.length,
        icon: '🗺️'
    },
    nairobi: {
        name: 'Nairobi',
        description: 'Capital city branches and headquarters',
        offices: 2,
        icon: '🏙️'
    },
    coast: {
        name: 'Coast Region',
        description: 'Mombasa & surrounding coastal offices',
        offices: 2,
        icon: '🏖️'
    },
    rift: {
        name: 'Rift Valley',
        description: 'Nakuru & beyond offices',
        offices: 2,
        icon: '⛰️'
    },
    central: {
        name: 'Central Kenya',
        description: 'Nyeri & surrounding offices',
        offices: 2,
        icon: '🏔️'
    },
    western: {
        name: 'Western Kenya',
        description: 'Kisumu region offices',
        offices: 2,
        icon: '🌊'
    }

}

export default function OfficesPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const locationParam = params?.location || searchParams.get('location') || 'all'

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(true)
    const [activeTab, setActiveTab] = useState(locationParam as string)
    const [expandedOffice, setExpandedOffice] = useState<number | null>(null)

    const [filters, setFilters] = useState({
        search: '',
        services: [] as string[],
        amenities: [] as string[],
        minTeamSize: 0,
        hasParking: false,
        featuredOnly: false,
    })

    // Get region info based on URL param
    const regionInfo = REGION_INFO[locationParam as keyof typeof REGION_INFO] || REGION_INFO.all

    const filteredOffices = useMemo(() => {
        let result = ALL_OFFICES.filter((office) => {
            // Apply location filter
            const locationMatch = locationParam === 'all' || office.region === locationParam

            // Apply search filter
            const searchMatch = !filters.search ||
                office.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                office.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                office.address.toLowerCase().includes(filters.search.toLowerCase())

            // Apply services filter
            const servicesMatch = filters.services.length === 0 ||
                filters.services.every(service => office.services.includes(service))

            // Apply amenities filter
            const amenitiesMatch = filters.amenities.length === 0 ||
                filters.amenities.every(amenity => office.amenities.includes(amenity))

            // Apply team size filter
            const teamSizeMatch = office.teamSize >= filters.minTeamSize

            // Apply parking filter
            const parkingMatch = !filters.hasParking || office.parking

            // Apply featured filter
            const featuredMatch = !filters.featuredOnly || office.featured

            return locationMatch && searchMatch && servicesMatch && amenitiesMatch &&
                teamSizeMatch && parkingMatch && featuredMatch
        })

        // Sort by featured first, then rating
        result.sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return b.rating - a.rating
        })

        return result
    }, [filters, locationParam])

    const resetFilters = () => {
        setFilters({
            search: '',
            services: [],
            amenities: [],
            minTeamSize: 0,
            hasParking: false,
            featuredOnly: false,
        })
    }

    const toggleService = (service: string) => {
        setFilters(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }))
    }

    const toggleAmenity = (amenity: string) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }))
    }

    const activeFilterCount = [
        filters.search,
        filters.services.length > 0,
        filters.amenities.length > 0,
        filters.minTeamSize > 0,
        filters.hasParking,
        filters.featuredOnly,
    ].filter(Boolean).length

    const toggleOfficeExpansion = (id: number) => {
        setExpandedOffice(expandedOffice === id ? null : id)
    }

    const getDirectionsUrl = (office: Office) => {
        return `https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Menu Bar */}
            <MenuBar />

            {/* Premium Header */}
            <div className="sticky top-0 z-30 bg-card border-b border-border/50 backdrop-blur-md">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                                {regionInfo.name} Offices
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground mt-1">
                                {regionInfo.description} •{' '}
                                <span className="font-semibold text-foreground">{filteredOffices.length}</span> offices
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            className="lg:hidden gap-2"
                        >
                            <Sliders className="w-4 h-4" />
                            {activeFilterCount > 0 && (
                                <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Region Tabs */}
                    <div className="flex overflow-x-auto gap-1 mt-6 pb-2 -mb-6 scrollbar-hide">
                        {Object.entries(REGION_INFO).map(([key, region]) => (
                            <Link
                                key={key}
                                href={`/offices/${key === 'all' ? '' : `?location=${key}`}`}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${locationParam === key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                                    }`}
                            >
                                <span className="text-lg">{region.icon}</span>
                                <span>{region.name}</span>
                                {locationParam === key && (
                                    <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                                        {region.offices}
                                    </span>
                                )}
                            </Link>
                        ))}
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
                                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Filter Sections */}
                                <div className="bg-card border border-border/50 rounded-sm p-6 space-y-6">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Search Offices
                                        </label>
                                        <Input
                                            placeholder="Search by name, location, or address"
                                            value={filters.search}
                                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                            className="bg-muted border-0 rounded-sm h-10 placeholder-muted-foreground"
                                        />
                                    </div>

                                    {/* Team Size */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Minimum Team Size
                                        </label>
                                        <div className="flex gap-2">
                                            {[0, 5, 10, 15].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setFilters({ ...filters, minTeamSize: size })}
                                                    className={`flex-1 px-3 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${filters.minTeamSize === size
                                                        ? 'bg-primary text-primary-foreground shadow-md'
                                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                                        }`}
                                                >
                                                    {size === 0 ? 'Any' : `${size}+`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.hasParking}
                                                onChange={(e) => setFilters({ ...filters, hasParking: e.target.checked })}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-foreground">Parking Available</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.featuredOnly}
                                                onChange={(e) => setFilters({ ...filters, featuredOnly: e.target.checked })}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-foreground">Featured Offices Only</span>
                                        </label>
                                    </div>

                                    {/* Clear Filters */}
                                    {activeFilterCount > 0 && (
                                        <Button
                                            onClick={resetFilters}
                                            variant="outline"
                                            className="w-full border-primary/50 text-primary hover:bg-primary/5 transition-colors bg-transparent"
                                        >
                                            Clear All Filters
                                        </Button>
                                    )}
                                </div>

                                {/* Region Stats */}
                                <div className="bg-card border border-border/50 rounded-sm p-6">
                                    <label className="block text-sm font-semibold text-foreground mb-3">Region Statistics</label>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Total Offices</span>
                                            <span className="font-semibold text-foreground">{filteredOffices.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Featured</span>
                                            <span className="font-semibold text-foreground">
                                                {filteredOffices.filter(o => o.featured).length}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Average Rating</span>
                                            <span className="font-semibold text-foreground">
                                                {filteredOffices.length > 0
                                                    ? (filteredOffices.reduce((acc, o) => acc + o.rating, 0) / filteredOffices.length).toFixed(1)
                                                    : '0.0'
                                                }
                                            </span>
                                        </div>
                                    </div>
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
                                    Showing <span className="font-semibold text-foreground">{filteredOffices.length}</span> offices in{' '}
                                    <span className="font-semibold text-primary">{regionInfo.name}</span>
                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex gap-2 bg-muted p-1 rounded-sm">
                                {[
                                    { mode: 'grid' as const, icon: Grid3X3, label: 'Grid' },
                                    { mode: 'list' as const, icon: List, label: 'List' },
                                ].map(({ mode, icon: Icon }) => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-3 py-2 rounded-md transition-all duration-200 ${viewMode === mode
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results */}
                        {filteredOffices.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="text-center">
                                    <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-lg text-muted-foreground mb-2">
                                        No offices found in {regionInfo.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Try adjusting your filters or select a different region
                                    </p>
                                    <Button asChild variant="outline">
                                        <Link href="/offices/all">View All Offices</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                                {filteredOffices.map((office) => (
                                    <Card
                                        key={office.id}
                                        className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-border/80 p-0 rounded-sm"
                                    >
                                        {/* Image & Header */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                                            <img
                                                src={office.image || '/placeholder.svg'}
                                                alt={office.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                                            {/* Featured Badge */}
                                            {office.featured && (
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                    Featured
                                                </div>
                                            )}

                                            {/* Region Badge */}
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full">
                                                {REGION_INFO[office.region]?.icon} {office.location}
                                            </div>

                                            {/* Rating */}
                                            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <Star className="w-3 h-3 fill-primary text-primary" />
                                                <span className="text-sm font-bold text-foreground">{office.rating}</span>
                                                <span className="text-xs text-muted-foreground">({office.reviews})</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {office.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="line-clamp-1">{office.address}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Info */}
                                            <div className="grid grid-cols-2 gap-3 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">{office.teamSize} team members</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Open now</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">{office.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">{office.email}</span>
                                                </div>
                                            </div>

                                            {/* Services & Amenities */}
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Services</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {office.services.slice(0, 3).map((service, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                                            >
                                                                {service}
                                                            </span>
                                                        ))}
                                                        {office.services.length > 3 && (
                                                            <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                                                                +{office.services.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3 mt-6 pt-6 border-t border-border/30">
                                                <Button asChild className="flex-1" size={'lg'}>
                                                    <Link href={`/offices/${office.region}/${office.id}`}>
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 ml-2" />
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="icon-lg">
                                                    <a
                                                        href={getDirectionsUrl(office)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="Get Directions"
                                                    >
                                                        <Navigation className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredOffices.map((office) => (
                                    <Card
                                        key={office.id}
                                        className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-border"
                                    >
                                        <div className="p-6">
                                            <div className="flex gap-6">
                                                {/* Image */}
                                                <div className="h-48 w-64 rounded-sm overflow-hidden flex-shrink-0 bg-gradient-to-br from-muted/50 to-muted">
                                                    <img
                                                        src={office.image || '/placeholder.svg'}
                                                        alt={office.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {office.featured && (
                                                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
                                                            Featured
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                                {office.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {office.address}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 fill-primary text-primary" />
                                                            <span className="font-bold text-foreground">{office.rating}</span>
                                                            <span className="text-sm text-muted-foreground">({office.reviews})</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>Team:</strong> {office.teamSize} members</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>Phone:</strong> {office.phone}</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>Email:</strong> {office.email}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm"><strong>Manager:</strong> {office.manager}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <h4 className="text-sm font-semibold text-foreground mb-2">Services</h4>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {office.services.slice(0, 4).map((service, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                                                >
                                                                    {service}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 pt-4 border-t border-border/30">
                                                        <Button asChild size="sm">
                                                            <Link href={`/offices/${office.region}/${office.id}`}>
                                                                View Details
                                                            </Link>
                                                        </Button>
                                                        <Button asChild variant="outline" size="sm">
                                                            <a
                                                                href={`tel:${office.phone}`}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Phone className="w-3 h-3" />
                                                                Call
                                                            </a>
                                                        </Button>
                                                        <Button asChild variant="outline" size="sm">
                                                            <a
                                                                href={getDirectionsUrl(office)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Navigation className="w-3 h-3" />
                                                                Directions
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}