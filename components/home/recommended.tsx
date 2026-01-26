'use client'

import { Heart, MapPin, Bed, Bath, Ruler as Ruler2, ChevronRight, DollarSign, HomeIcon, Award, Users, TrendingUp, Shield, Zap, Handshake, Eye, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'


// Data Constants
const RECOMMENDED_LISTINGS = {
    apartments: [
        {
            id: 1,
            title: 'Modern Apartment in Westlands',
            price: 28000000,
            location: 'Westlands, Nairobi',
            beds: 3,
            baths: 2,
            sqft: 3200,
            tag: 'New Listing',
            image:
                'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
        },
        {
            id: 2,
            title: 'Executive Suite in Nairobi CBD',
            price: 22000000,
            location: 'Nairobi CBD',
            beds: 2,
            baths: 2,
            sqft: 2400,
            tag: 'Hot Deal',
            image:
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        },
        {
            id: 3,
            title: 'Beachfront Luxury Apartment',
            price: 35000000,
            location: 'Malindi, Coast',
            beds: 3,
            baths: 2,
            sqft: 3100,
            tag: 'Featured',
            image:
                'https://images.unsplash.com/photo-1712026258065-fa5d5f58584e?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 4,
            title: 'Cozy Studio in Kilimani',
            price: 12000000,
            location: 'Kilimani, Nairobi',
            beds: 1,
            baths: 1,
            sqft: 1200,
            image:
                'https://images.unsplash.com/photo-1717335291510-a0e3f306c08b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 5,
            title: 'Penthouse in Karen',
            price: 55000000,
            location: 'Karen, Nairobi',
            beds: 4,
            baths: 3,
            sqft: 4200,
            tag: 'Luxury',
            image:
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        },
        {
            id: 6,
            title: 'Garden Townhouse in Muthaiga',
            price: 32000000,
            location: 'Muthaiga, Nairobi',
            beds: 4,
            baths: 3,
            sqft: 3900,
            image:
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
        },
    ],
    houses: [
        {
            id: 7,
            title: '4-Bedroom Villa in Karen',
            price: 45000000,
            location: 'Karen, Nairobi',
            beds: 4,
            baths: 3,
            sqft: 4500,
            tag: 'Featured',
            image:
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        },
        {
            id: 8,
            title: 'Family Home in Brookside',
            price: 38000000,
            location: 'Brookside, Nairobi',
            beds: 5,
            baths: 4,
            sqft: 5200,
            image:
                'https://images.pexels.com/photos/7163610/pexels-photo-7163610.jpeg?_gl=1*1wedhj2*_ga*MTg4NTAwMjcwMy4xNzY5NDU4NjQ3*_ga_8JE65Q40S6*czE3Njk0NTg2NDckbzEkZzEkdDE3Njk0NTg2OTYkajExJGwwJGgw',
        },
        {
            id: 9,
            title: 'Elegant Bungalow in Upper Hill',
            price: 42000000,
            location: 'Upper Hill, Nairobi',
            beds: 4,
            baths: 3,
            sqft: 4100,
            tag: 'New Listing',
            image:
                'https://images.pexels.com/photos/28127226/pexels-photo-28127226.jpeg?_gl=1*fmqb13*_ga*MTg4NTAwMjcwMy4xNzY5NDU4NjQ3*_ga_8JE65Q40S6*czE3Njk0NTg2NDckbzEkZzEkdDE3Njk0NTg2NTgkajQ5JGwwJGgw',
        },
        {
            id: 10,
            title: 'Modern Townhouse in Kilimani',
            price: 18000000,
            location: 'Kilimani, Nairobi',
            beds: 3,
            baths: 2,
            sqft: 2800,
            image:
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        },
        {
            id: 11,
            title: 'Luxury Estate in Muthaiga',
            price: 60000000,
            location: 'Muthaiga, Nairobi',
            beds: 5,
            baths: 4,
            sqft: 5800,
            tag: 'Luxury',
            image:
                'https://images.pexels.com/photos/33738275/pexels-photo-33738275.jpeg?_gl=1*acs2es*_ga*MTg4NTAwMjcwMy4xNzY5NDU4NjQ3*_ga_8JE65Q40S6*czE3Njk0NTg2NDckbzEkZzEkdDE3Njk0NTg3NTEkajQzJGwwJGgw',
        },
        {
            id: 12,
            title: 'Contemporary Home in Parklands',
            price: 28000000,
            location: 'Parklands, Nairobi',
            beds: 3,
            baths: 2,
            sqft: 3400,
            image:
                'https://images.pexels.com/photos/14658637/pexels-photo-14658637.jpeg?_gl=1*b2eyp3*_ga*MTg4NTAwMjcwMy4xNzY5NDU4NjQ3*_ga_8JE65Q40S6*czE3Njk0NTg2NDckbzEkZzEkdDE3Njk0NTg3NzgkajE2JGwwJGgw',
        },
    ],
}



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
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
                {RECOMMENDED_LISTINGS[activeTab]
                    .slice(0, 6)
                    .map((listing) => (
                        <div
                            key={listing.id}
                            className="group cursor-pointer"
                            // onMouseEnter={() => setHoveredCard(listing.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="bg-white rounded-sm overflow-hidden border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <img
                                        src={listing.image}
                                        alt={listing.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Tag Badge */}
                                    {listing.tag && (
                                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold ${getTagStyles(listing.tag)} shadow-md`}>
                                            {listing.tag}
                                        </div>
                                    )}

                                    {/* Heart Icon */}
                                    <button
                                        // onClick={(e) => toggleSaved(e, listing.id)}
                                        className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md hover:scale-110"
                                    >
                                        <Heart
                                            className={`w-5 h-5 transition-all ${savedListings.has(listing.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-gray-600'
                                                }`}
                                        />
                                    </button>

                                    {/* Quick View on Hover */}
                                    <div className={`absolute inset-x-0 bottom-0 p-4 transform transition-all duration-300 ${hoveredCard === listing.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                        }`}>
                                        <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                                            <Eye className="w-4 h-4" />
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5">
                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                                        <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                                        <span className="truncate font-medium">{listing.location}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 min-h-[3.5rem] group-hover:text-primary transition-colors">
                                        {listing.title}
                                    </h3>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                                <Bed className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{listing.beds}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                                <Bath className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{listing.baths}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                                <Maximize2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">
                                                {listing.sqft.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-gray-500 font-semibold mb-0.5">Starting from</div>
                                            <div className="text-2xl font-black text-primary">
                                                {formatPrice(listing.price)}
                                            </div>
                                        </div>
                                        <button className="p-3 bg-primary text-white rounded-xl hover:bg-orange-700 transition-all duration-200 hover:scale-110 shadow-md">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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