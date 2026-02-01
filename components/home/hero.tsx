'use client'

import { MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface FilterState {
    location: string
    transactionType: 'buy' | 'rent'
    propertyType: string
    bedrooms: string
    priceRange: string
}

const BUY_PRICE_RANGES = [
    { label: 'Under 5M' },
    { label: '5M - 15M' },
    { label: '15M - 30M' },
    { label: '30M - 50M' },
    { label: '50M - 100M' },
    { label: '100M+' },
]

const RENT_PRICE_RANGES = [
    { label: 'Under 30K' },
    { label: '30K - 80K' },
    { label: '80K - 150K' },
    { label: '150K - 300K' },
    { label: '300K - 500K' },
    { label: '500K+' },
]

const PROPERTY_TYPES = {
    'Condo/Apartment': ['Condo/Apartment'],
    'Cottage/Bungalow': ['Cottage/Bungalow'],
    House: ['House'],
    'Duplex/Maisonette': ['Duplex/Maisonette'],
    Penthouse: ['Penthouse'],
    'Plot/Land': ['Plot/Land'],
    Villa: ['Villa'],
    'Full Building': ['Full Building'],
    'Office Space': ['Office Space'],
    'Retail/Shop': ['Retail/Shop'],
    Industrial: ['Industrial'],
    'Hotel/Hospitality': ['Hotel/Hospitality'],
    Warehouse: ['Warehouse'],
    'Farm/Land': ['Farm/Land'],
}

const BEDROOM_OPTIONS = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
]

export default function HomeHero() {
    const [filters, setFilters] = useState<FilterState>({
        location: '',
        transactionType: 'buy',
        propertyType: 'Condo/Apartment',
        bedrooms: 'any',
        priceRange: 'Under 5M',
    })

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev, [key]: value }

            // Reset dependent fields when transaction type changes
            if (key === 'transactionType') {
                newFilters.priceRange = value === 'buy' ? 'Under 5M' : 'Under 30K'
            }

            return newFilters
        })
    }

    const handleSearch = () => {
        console.log('[v0] Searching with filters:', filters)
        // Add your search logic here
    }

    const priceRanges = filters.transactionType === 'buy' ? BUY_PRICE_RANGES : RENT_PRICE_RANGES

    return (
        <section className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] md:min-h-[680px] flex items-center pt-20 sm:pt-24 md:pt-0">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("/images/hero_home.png")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16">
                <div className="text-center mb-8 sm:mb-10 md:mb-12 md:text-left md:max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-3 sm:mb-4 text-[#E8D9C4]">
                        Find Your Dream <span className="text-[#785D32]">Property</span> in Kenya
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
                        Discover verified listings from trusted agents. Browse luxury homes, apartments, and
                        investment opportunities across Nairobi and beyond.
                    </p>
                </div>

                {/* Main Search Container */}
                <div className="max-w-4xl">
                    {/* Transaction Type Toggle */}
                    <div className="inline-flex bg-white/20 border border-white/40 rounded-full p-1 mb-3 sm:mb-4 backdrop-blur-sm">
                        <button
                            onClick={() => handleFilterChange('transactionType', 'buy')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${filters.transactionType === 'buy'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'text-white hover:text-white/80'
                                }`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => handleFilterChange('transactionType', 'rent')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${filters.transactionType === 'rent'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'text-white hover:text-white/80'
                                }`}
                        >
                            Rent
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-sm sm:rounded-sm shadow-2xl p-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            {/* Location Input */}
                            <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-4 bg-slate-100 rounded-sm md:rounded-none md:bg-white/70 border md:border-0 md:border-r border-border">
                                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Location or neighborhood"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    className="w-full outline-none bg-transparent text-foreground placeholder-muted-foreground text-xs sm:text-sm md:text-base"
                                />
                            </div>

                            {/* Property Type */}
                            <div className="flex items-center px-2 sm:px-3 border-b md:border-b-0 md:border-r border-border">
                                <select
                                    value={filters.propertyType}
                                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                                    className="outline-none bg-transparent text-foreground text-xs sm:text-sm md:text-base py-2 sm:py-3 pr-6 w-full md:min-w-[130px] sm:min-w-[150px]"
                                >
                                    <option value="">Property Type</option>
                                    <optgroup label="Residential">
                                        <option value="Condo/Apartment">Condo/Apartment</option>
                                        <option value="Cottage/Bungalow">Cottage/Bungalow</option>
                                        <option value="House">House</option>
                                        <option value="Duplex/Maisonette">Duplex/Maisonette</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Plot/Land">Plot/Land</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Full Building">Full Building</option>
                                    </optgroup>
                                    <optgroup label="Commercial">
                                        <option value="Office Space">Office Space</option>
                                        <option value="Retail/Shop">Retail/Shop</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Hotel/Hospitality">Hotel/Hospitality</option>
                                        <option value="Warehouse">Warehouse</option>
                                        <option value="Farm/Land">Farm/Land</option>
                                    </optgroup>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="flex items-center px-2 sm:px-3 border-b md:border-b-0 md:border-r border-border">
                                <select
                                    value={filters.priceRange}
                                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                    className="outline-none bg-transparent text-foreground text-xs sm:text-sm md:text-base py-2 sm:py-3 pr-6 w-full md:min-w-[110px] sm:min-w-[140px]"
                                >
                                    {priceRanges.map((range) => (
                                        <option key={range.label} value={range.label}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Search Button */}
                            <Button
                                onClick={handleSearch}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-6 text-xs sm:text-sm md:text-base rounded-sm"
                            >
                                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                                <span className="inline font-bold">Search</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-8 mt-12 text-white">
                    <div>
                        <div className="text-xl sm:text-2xl font-bold">2,500+</div>
                        <div className="text-xs sm:text-sm opacity-90">Properties</div>
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold">15+</div>
                        <div className="text-xs sm:text-sm opacity-90">Years Experience</div>
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold">98%</div>
                        <div className="text-xs sm:text-sm opacity-90">Client Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
