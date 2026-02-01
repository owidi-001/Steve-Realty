'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Heart, MapPin, Bed, Bath, Ruler as Ruler2, Grid3X3, List, Sliders, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'

interface Listing {
  id: number
  title: string
  price: number
  location: string
  beds: number
  baths: number
  sqft: number
  image: string
  type: 'villa' | 'apartment' | 'townhouse' | 'land'
  status: 'active' | 'sold' | 'coming-soon' | 'featured' | 'exclusive' | 'hot-deal'
  tag?: string
  featured?: boolean
  exclusive?: boolean
  createdAt: string
}

const ALL_LISTINGS: Listing[] = [
  {
    id: 1,
    title: '4-Bedroom Villa in Karen',
    price: 45000000,
    location: 'Karen, Nairobi',
    beds: 4,
    baths: 3,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    type: 'villa',
    status: 'active',
    featured: true,
    exclusive: false,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Luxury Apartment in Westlands',
    price: 28000000,
    location: 'Westlands, Nairobi',
    beds: 3,
    baths: 2,
    sqft: 3200,
    image: 'https://images.pexels.com/photos/35175236/pexels-photo-35175236.jpeg',
    type: 'apartment',
    status: 'active',
    featured: true,
    exclusive: true,
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    title: 'Modern Townhouse in Kilimani',
    price: 18000000,
    location: 'Kilimani, Nairobi',
    beds: 3,
    baths: 2,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    type: 'townhouse',
    status: 'active',
    featured: false,
    exclusive: true,
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    title: 'Executive Penthouse Upper Hill',
    price: 62000000,
    location: 'Upper Hill, Nairobi',
    beds: 4,
    baths: 4,
    sqft: 5200,
    image: 'https://images.pexels.com/photos/3663530/pexels-photo-3663530.jpeg',
    type: 'apartment',
    status: 'active',
    tag: 'New Listing',
    featured: true,
    exclusive: false,
    createdAt: '2024-01-25',
  },
  {
    id: 5,
    title: 'Spacious Townhouse in Runda',
    price: 35000000,
    location: 'Runda, Nairobi',
    beds: 4,
    baths: 3,
    sqft: 4000,
    image: 'https://images.pexels.com/photos/6032416/pexels-photo-6032416.jpeg',
    type: 'townhouse',
    status: 'active',
    featured: false,
    exclusive: false,
    createdAt: '2024-01-05',
  },
  {
    id: 6,
    title: 'Prime Land in Lavington',
    price: 15000000,
    location: 'Lavington, Nairobi',
    beds: 0,
    baths: 0,
    sqft: 2000,
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
    type: 'land',
    status: 'active',
    tag: 'Popular',
    featured: true,
    exclusive: false,
    createdAt: '2024-01-18',
  },
  {
    id: 7,
    title: 'Cozy 2-Bed Apartment in Riverside',
    price: 8000000,
    location: 'Riverside, Nairobi',
    beds: 2,
    baths: 1,
    sqft: 1500,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    type: 'apartment',
    status: 'active',
    featured: false,
    exclusive: false,
    createdAt: '2024-01-22',
  },
  {
    id: 8,
    title: 'Colonial Villa in Gigiri',
    price: 85000000,
    location: 'Gigiri, Nairobi',
    beds: 5,
    baths: 4,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
    type: 'villa',
    status: 'active',
    tag: 'Hot Pick',
    featured: true,
    exclusive: true,
    createdAt: '2024-01-12',
  },
  {
    id: 9,
    title: 'Sold Luxury Villa in Muthaiga',
    price: 75000000,
    location: 'Muthaiga, Nairobi',
    beds: 6,
    baths: 5,
    sqft: 7000,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
    type: 'villa',
    status: 'sold',
    featured: false,
    exclusive: false,
    createdAt: '2023-12-15',
  },
  {
    id: 10,
    title: 'Coming Soon: Waterfront Apartments',
    price: 95000000,
    location: 'Nyali, Mombasa',
    beds: 4,
    baths: 3,
    sqft: 3800,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
    type: 'apartment',
    status: 'coming-soon',
    featured: false,
    exclusive: true,
    createdAt: '2024-02-01',
  },
  {
    id: 11,
    title: 'Hot Deal: 3-Bed Bungalow',
    price: 12000000,
    location: 'Kiambu',
    beds: 3,
    baths: 2,
    sqft: 2500,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    type: 'villa',
    status: 'active',
    featured: false,
    exclusive: false,
    createdAt: '2024-01-28',
  },
  {
    id: 12,
    title: 'Exclusive Penthouse View',
    price: 120000000,
    location: 'Upper Hill, Nairobi',
    beds: 5,
    baths: 4,
    sqft: 5800,
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    type: 'apartment',
    status: 'active',
    exclusive: true,
    createdAt: '2024-01-30',
  },
]

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter') || 'all'

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [savedListings, setSavedListings] = useState<Set<number>>(new Set())
  const [sortBy, setSortBy] = useState('newest')

  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 100000000,
    beds: 0,
    baths: 0,
    type: '',
  })

  // Get filter label based on URL param
  const getFilterLabel = (filter: string) => {
    const filterLabels: Record<string, string> = {
      'featured': 'Featured Listings',
      'recent': 'Recent Listings',
      'exclusive': 'Exclusive Listings',
      'hot-deals': 'Hot Deals',
      'sold': 'Sold Properties',
      'coming-soon': 'Coming Soon',
      'all': 'All Listings'
    }
    return filterLabels[filter] || 'All Listings'
  }

  const getFilterDescription = (filter: string) => {
    const descriptions: Record<string, string> = {
      'featured': 'Our top picks and featured properties',
      'recent': 'New properties on the market',
      'exclusive': 'Limited access premium properties',
      'hot-deals': 'Best value offers and discounts',
      'sold': 'Recently sold properties for market insight',
      'coming-soon': 'Upcoming properties and developments',
      'all': 'Browse all available properties'
    }
    return descriptions[filter] || 'Browse all available properties'
  }

  const filteredListings = useMemo(() => {
    let result = ALL_LISTINGS.filter((listing) => {
      // Apply URL filter first
      let urlFilterMatch = true
      switch (filterParam) {
        case 'featured':
          urlFilterMatch = listing.featured === true
          break
        case 'recent':
          // Show listings from last 7 days
          const sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          urlFilterMatch = new Date(listing.createdAt) > sevenDaysAgo
          break
        case 'exclusive':
          urlFilterMatch = listing.exclusive === true
          break
        case 'hot-deals':
          // Assuming hot deals are properties under 20M KES
          urlFilterMatch = listing.price < 20000000
          break
        case 'sold':
          urlFilterMatch = listing.status === 'sold'
          break
        case 'coming-soon':
          urlFilterMatch = listing.status === 'coming-soon'
          break
        case 'all':
        default:
          urlFilterMatch = true
      }

      // Apply user filters
      const locationMatch = !filters.location ||
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      const priceMatch = listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      const bedsMatch = filters.beds === 0 || listing.beds >= filters.beds
      const bathsMatch = filters.baths === 0 || listing.baths >= filters.baths
      const typeMatch = !filters.type || listing.type === filters.type

      return urlFilterMatch && locationMatch && priceMatch && bedsMatch && bathsMatch && typeMatch
    })

    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [filters, sortBy, filterParam])

  const toggleSave = (id: number) => {
    const newSaved = new Set(savedListings)
    if (newSaved.has(id)) {
      newSaved.delete(id)
    } else {
      newSaved.add(id)
    }
    setSavedListings(newSaved)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 100000000,
      beds: 0,
      baths: 0,
      type: '',
    })
  }

  const activeFilterCount = [
    filters.location,
    filters.beds > 0,
    filters.baths > 0,
    filters.type,
    filters.minPrice > 0 || filters.maxPrice < 100000000
  ].filter(Boolean).length

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Bar */}
      <MenuBar />

      {/* Premium Header with Filter Info */}
      <div className="sticky top-0 z-30 bg-card border-b border-border/50 backdrop-blur-md">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {getFilterLabel(filterParam)}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {getFilterDescription(filterParam)} • Showing{' '}
                <span className="font-semibold text-foreground">{filteredListings.length}</span> properties
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

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto gap-1 mt-6 pb-2 -mb-6">
            <Link
              href="/listings"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${filterParam === 'all' || !filterParam
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
            >
              All Listings
            </Link>
            {['featured', 'recent', 'exclusive', 'hot-deals', 'sold', 'coming-soon'].map((filter) => (
              <Link
                key={filter}
                href={`/listings?filter=${filter}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${filterParam === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
              >
                {getFilterLabel(filter)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Premium Filter Sidebar */}
          {showFilters && (
            <div className="lg:w-72 flex-shrink-0">
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
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Location
                    </label>
                    <Input
                      placeholder="Search neighborhoods"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="bg-muted border-0 rounded-sm h-10 placeholder-muted-foreground"
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Property Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="w-full px-4 py-2.5 bg-muted border-0 rounded-sm text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">Bedrooms</label>
                      <span className="text-xs font-medium text-primary">
                        {filters.beds > 0 ? `${filters.beds}+` : 'Any'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((bed) => (
                        <button
                          key={bed}
                          onClick={() => setFilters({ ...filters, beds: bed })}
                          className={`flex-1 px-2 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${filters.beds === bed
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                        >
                          {bed === 0 ? 'Any' : bed}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">Bathrooms</label>
                      <span className="text-xs font-medium text-primary">
                        {filters.baths > 0 ? `${filters.baths}+` : 'Any'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((bath) => (
                        <button
                          key={bath}
                          onClick={() => setFilters({ ...filters, baths: bath })}
                          className={`flex-1 px-2 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${filters.baths === bath
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                        >
                          {bath === 0 ? 'Any' : bath}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
                          className="bg-muted border-0 rounded-sm h-10 text-sm placeholder-muted-foreground"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 100000000 })}
                          className="bg-muted border-0 rounded-sm h-10 text-sm placeholder-muted-foreground"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted/50 rounded-sm p-3 text-center font-medium">
                        {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                      </div>
                    </div>
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
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/30">
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-muted border-0 rounded-sm text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-muted p-1 rounded-lg">
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
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground mb-2">
                    No properties found for "{getFilterLabel(filterParam)}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or browse all listings
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/listings">View All Listings</Link>
                  </Button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`}>
                    <Card className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-border p-0 rounded-sm">
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                          src={listing.image || '/placeholder.svg'}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Status Badge */}
                        {listing.status === 'sold' && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            Sold
                          </div>
                        )}
                        {listing.status === 'coming-soon' && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                            Coming Soon
                          </div>
                        )}
                        {listing.tag && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            {listing.tag}
                          </div>
                        )}
                        {listing.exclusive && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                            Exclusive
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Save Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleSave(listing.id)
                          }}
                          className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 group-hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${savedListings.has(listing.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                              }`}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{listing.location}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border/30">
                          <div className="text-2xl font-bold text-primary mb-3">
                            {formatPrice(listing.price)}
                          </div>
                          <div className="flex gap-4 text-sm">
                            {listing.beds > 0 && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Bed className="w-4 h-4" />
                                <span className="font-medium">{listing.beds}</span>
                              </div>
                            )}
                            {listing.baths > 0 && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Bath className="w-4 h-4" />
                                <span className="font-medium">{listing.baths}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Ruler2 className="w-4 h-4" />
                              <span className="font-medium">{(listing.sqft / 1000).toFixed(1)}k sqft</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`}>
                    <Card className="overflow-hidden group cursor-pointer border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-border rounded-sm p-0 mb-2">
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="h-40 w-56 rounded-tl-sm rounded-bl-sm overflow-hidden flex-shrink-0 bg-muted relative">
                          <img
                            src={listing.image || '/placeholder.svg'}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Status Badge on Image */}
                          {listing.status === 'sold' && (
                            <div className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                              Sold
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between py-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {listing.title}
                            </h3>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                              <MapPin className="w-4 h-4" />
                              {listing.location}
                            </div>
                            <div className="flex gap-6 text-sm text-muted-foreground">
                              {listing.beds > 0 && (
                                <div className="flex items-center gap-2">
                                  <Bed className="w-4 h-4" />
                                  {listing.beds} Beds
                                </div>
                              )}
                              {listing.baths > 0 && (
                                <div className="flex items-center gap-2">
                                  <Bath className="w-4 h-4" />
                                  {listing.baths} Baths
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Ruler2 className="w-4 h-4" />
                                {listing.sqft.toLocaleString()} sqft
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between py-2 border-t border-border/30">
                            <div className="text-2xl font-bold text-primary">
                              {formatPrice(listing.price)}
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                toggleSave(listing.id)
                              }}
                              className="p-2.5 rounded-full hover:bg-muted transition-colors"
                            >
                              <Heart
                                className={`w-5 h-5 ${savedListings.has(listing.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                                  }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination would go here */}
            {filteredListings.length > 0 && (
              <div className="flex justify-center items-center mt-12 pt-8 border-t border-border/30">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="default" size="sm" className="w-10 h-10">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}