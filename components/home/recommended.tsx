'use client'

import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ListingCardComponent, { ListingCard } from '../common/property_card'


// Data Constants
export const RECOMMENDED_LISTINGS = {
    apartments: [
        {
            id: 'apt-001',
            reference_number: 'REF-2026-001',
            title: 'Modern Apartment in Westlands',
            slug: 'modern-apartment-westlands',
            short_description: 'Contemporary 3-bedroom apartment with stunning city views and modern amenities',
            type: 'Apartment',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 28000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 28,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
                caption: 'Living room with city view'
            },
            location_summary: 'Westlands, Nairobi',
            bedrooms: 3,
            bathrooms: 2,
            interior_size: 297, // ~3200 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: true,
            is_exclusive: false,
            view_count: 145,
            favorite_count: 12,
            created_at: '2026-01-28T10:30:00Z'
        },
        {
            id: 'apt-002',
            reference_number: 'REF-2026-002',
            title: 'Executive Suite in Nairobi CBD',
            slug: 'executive-suite-nairobi-cbd',
            short_description: 'Prime location executive suite with premium finishes and excellent accessibility',
            type: 'Apartment',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 22000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 22,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
                caption: 'Modern executive suite interior'
            },
            location_summary: 'Nairobi CBD',
            bedrooms: 2,
            bathrooms: 2,
            interior_size: 223, // ~2400 sqft converted to m²
            is_featured: false,
            is_hot_deal: true,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 289,
            favorite_count: 24,
            created_at: '2026-01-15T14:20:00Z'
        },
        {
            id: 'apt-003',
            reference_number: 'REF-2026-003',
            title: 'Beachfront Luxury Apartment',
            slug: 'beachfront-luxury-apartment-malindi',
            short_description: 'Stunning beachfront property with panoramic ocean views and private beach access',
            type: 'Apartment',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 35000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 35,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1712026258065-fa5d5f58584e?q=80&w=2064&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1712026258065-fa5d5f58584e?q=80&w=400&auto=format&fit=crop',
                caption: 'Beachfront view'
            },
            location_summary: 'Malindi, Coast',
            bedrooms: 3,
            bathrooms: 2,
            interior_size: 288, // ~3100 sqft converted to m²
            is_featured: true,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 512,
            favorite_count: 45,
            created_at: '2026-01-10T09:15:00Z'
        },
        {
            id: 'apt-004',
            reference_number: 'REF-2026-004',
            title: 'Cozy Studio in Kilimani',
            slug: 'cozy-studio-kilimani',
            short_description: 'Perfect starter home or investment property in prime Kilimani location',
            type: 'Studio',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 12000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 12,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1717335291510-a0e3f306c08b?q=80&w=774&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1717335291510-a0e3f306c08b?q=80&w=400&auto=format&fit=crop',
                caption: 'Cozy studio interior'
            },
            location_summary: 'Kilimani, Nairobi',
            bedrooms: 1,
            bathrooms: 1,
            interior_size: 111, // ~1200 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 178,
            favorite_count: 9,
            created_at: '2026-01-20T11:45:00Z'
        },
        {
            id: 'apt-005',
            reference_number: 'REF-2026-005',
            title: 'Penthouse in Karen',
            slug: 'penthouse-karen',
            short_description: 'Exclusive penthouse with rooftop terrace, premium finishes, and breathtaking views',
            type: 'Penthouse',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 55000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 55,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
                caption: 'Luxury penthouse living'
            },
            location_summary: 'Karen, Nairobi',
            bedrooms: 4,
            bathrooms: 3,
            interior_size: 390, // ~4200 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: true,
            view_count: 423,
            favorite_count: 38,
            created_at: '2026-01-08T16:30:00Z'
        },
        {
            id: 'apt-006',
            reference_number: 'REF-2026-006',
            title: 'Garden Townhouse in Muthaiga',
            slug: 'garden-townhouse-muthaiga',
            short_description: 'Elegant townhouse with private garden in prestigious Muthaiga neighborhood',
            type: 'Townhouse',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 32000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 32,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
                caption: 'Townhouse exterior with garden'
            },
            location_summary: 'Muthaiga, Nairobi',
            bedrooms: 4,
            bathrooms: 3,
            interior_size: 362, // ~3900 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 201,
            favorite_count: 16,
            created_at: '2026-01-12T13:20:00Z'
        },
    ] as ListingCard[],
    houses: [
        {
            id: 'hse-001',
            reference_number: 'REF-2026-007',
            title: '4-Bedroom Villa in Karen',
            slug: '4-bedroom-villa-karen',
            short_description: 'Magnificent villa with expansive grounds, swimming pool, and luxury amenities',
            type: 'Villa',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 45000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 45,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
                caption: 'Luxury villa exterior'
            },
            location_summary: 'Karen, Nairobi',
            bedrooms: 4,
            bathrooms: 3,
            interior_size: 418, // ~4500 sqft converted to m²
            is_featured: true,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 634,
            favorite_count: 52,
            created_at: '2026-01-05T10:00:00Z'
        },
        {
            id: 'hse-002',
            reference_number: 'REF-2026-008',
            title: 'Family Home in Brookside',
            slug: 'family-home-brookside',
            short_description: 'Spacious family home with large compound, perfect for growing families',
            type: 'House',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 38000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 38,000,000',
            primary_image: {
                url: 'https://images.pexels.com/photos/7163610/pexels-photo-7163610.jpeg',
                thumbnail: 'https://images.pexels.com/photos/7163610/pexels-photo-7163610.jpeg?w=400&h=300',
                caption: 'Family home exterior'
            },
            location_summary: 'Brookside, Nairobi',
            bedrooms: 5,
            bathrooms: 4,
            interior_size: 483, // ~5200 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 345,
            favorite_count: 28,
            created_at: '2026-01-18T15:45:00Z'
        },
        {
            id: 'hse-003',
            reference_number: 'REF-2026-009',
            title: 'Elegant Bungalow in Upper Hill',
            slug: 'elegant-bungalow-upper-hill',
            short_description: 'Charming single-story bungalow with modern finishes in convenient location',
            type: 'Bungalow',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 42000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 42,000,000',
            primary_image: {
                url: 'https://images.pexels.com/photos/28127226/pexels-photo-28127226.jpeg',
                thumbnail: 'https://images.pexels.com/photos/28127226/pexels-photo-28127226.jpeg?w=400&h=300',
                caption: 'Elegant bungalow'
            },
            location_summary: 'Upper Hill, Nairobi',
            bedrooms: 4,
            bathrooms: 3,
            interior_size: 381, // ~4100 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: true,
            is_exclusive: false,
            view_count: 267,
            favorite_count: 19,
            created_at: '2026-01-25T09:30:00Z'
        },
        {
            id: 'hse-004',
            reference_number: 'REF-2026-010',
            title: 'Modern Townhouse in Kilimani',
            slug: 'modern-townhouse-kilimani',
            short_description: 'Contemporary townhouse with smart home features and modern design',
            type: 'Townhouse',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 18000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 18,000,000',
            primary_image: {
                url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
                caption: 'Modern townhouse'
            },
            location_summary: 'Kilimani, Nairobi',
            bedrooms: 3,
            bathrooms: 2,
            interior_size: 260, // ~2800 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 189,
            favorite_count: 14,
            created_at: '2026-01-22T12:15:00Z'
        },
        {
            id: 'hse-005',
            reference_number: 'REF-2026-011',
            title: 'Luxury Estate in Muthaiga',
            slug: 'luxury-estate-muthaiga',
            short_description: 'Prestigious estate home with premium finishes, staff quarters, and mature gardens',
            type: 'Estate',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 60000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 60,000,000',
            primary_image: {
                url: 'https://images.pexels.com/photos/33738275/pexels-photo-33738275.jpeg',
                thumbnail: 'https://images.pexels.com/photos/33738275/pexels-photo-33738275.jpeg?w=400&h=300',
                caption: 'Luxury estate'
            },
            location_summary: 'Muthaiga, Nairobi',
            bedrooms: 5,
            bathrooms: 4,
            interior_size: 539, // ~5800 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: true,
            view_count: 789,
            favorite_count: 67,
            created_at: '2026-01-03T14:00:00Z'
        },
        {
            id: 'hse-006',
            reference_number: 'REF-2026-012',
            title: 'Contemporary Home in Parklands',
            slug: 'contemporary-home-parklands',
            short_description: 'Stylish contemporary home with open-plan living and modern architecture',
            type: 'House',
            category: 'Residential',
            transaction_type: 'SALE' as const,
            price_amount: 28000000,
            price_currency: 'KES' as const,
            price_display: 'KSh 28,000,000',
            primary_image: {
                url: 'https://images.pexels.com/photos/14658637/pexels-photo-14658637.jpeg',
                thumbnail: 'https://images.pexels.com/photos/14658637/pexels-photo-14658637.jpeg?w=400&h=300',
                caption: 'Contemporary home'
            },
            location_summary: 'Parklands, Nairobi',
            bedrooms: 3,
            bathrooms: 2,
            interior_size: 316, // ~3400 sqft converted to m²
            is_featured: false,
            is_hot_deal: false,
            is_new_listing: false,
            is_exclusive: false,
            view_count: 234,
            favorite_count: 21,
            created_at: '2026-01-16T11:00:00Z'
        },
    ] as ListingCard[],
};




function formatPrice(price: number) {
    return `KES ${(price / 1000000).toFixed(1)}M`
}
function getTagStyles(tag?: string) {
    const styles = {
        'Featured': 'bg-amber-500 text-white',
        'New Listing': 'bg-emerald-600 text-white',
        'Hot Deal': 'bg-red-500 text-white',
        'Luxury': 'bg-indigo-600 text-white'
    }
    return tag != null ? styles[tag] : 'bg-gray-800 text-white'
}


export default function HomeRecommended() {
    const [savedListings, setSavedListings] = useState<Set<number>>(new Set())
    const [activeTab, setActiveTab] = useState<'apartments' | 'houses'>('apartments')
    const [hoveredCard, setHoveredCard] = useState(null)

    const toggleSaved = (id: number) => {
        const newSaved = new Set(savedListings)
        if (newSaved.has(id)) {
            newSaved.delete(id)
        } else {
            newSaved.add(id)
        }
        setSavedListings(newSaved)
    }


    return (<section className="py-8 sm:py-16 bg-secondary/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    Recommended For You
                </h2>
                <p className="text-muted-foreground">
                    Curated selections based on market trends and your preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
                {(['apartments', 'houses'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-4 font-semibold text-sm capitalize border-b-2 transition-colors ${activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Listings Grid */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
                {RECOMMENDED_LISTINGS[activeTab]
                    .slice(0, 6)
                    .map((listing) => (
                        <ListingCardComponent
                            key={listing.id}
                            listing={listing}
                        // onCardClick={setHoveredCard}
                        // onQuickView={handleQuickView}
                        // onToggleFavorite={handleToggleFavorite}
                        // isFavorited={favoriteListings.has(listing.id)}
                        />
                    ))}
            </div>

            <div className="text-center">
                <Button size='lg' className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-sm">
                    View All {activeTab}
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    </section>)
}