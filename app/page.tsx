'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, MapPin, Bed, Bath, Ruler as Ruler2, ChevronRight, Search, DollarSign, HomeIcon, Star, Award, Users, TrendingUp, ArrowRight, Shield, Zap, Handshake, MessageSquare, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import Loading from './loading'
import HomeHero from '@/components/home/hero'
import MenuBar from '@/components/common/navbar'
import HomeRecommended from '@/components/home/recommended'
import PopularLocations from '@/components/home/popular-locations'
import HomeStats from '@/components/home/stats'
import HomeCTA from '@/components/home/cta'
import Footer from '@/components/common/footer'
import Partners from '@/components/home/partners'
import HomeGuides from '@/components/home/guides'
import AgentsPreview from '@/components/home/agents'
import Testimonials from '@/components/home/testimonials'
import BestValue from '@/components/home/best-value'
import HomePropertyType from '@/components/home/property-type'
import ContactComponent from '@/components/home/contact'

// Data Constants
const PROPERTY_TYPES = [
  { id: 'residential', name: 'Residential', icon: '🏠' },
  { id: 'commercial', name: 'Commercial', icon: '🏢' },
  { id: 'land', name: 'Land', icon: '🌱' },
  { id: 'luxury', name: 'Luxury', icon: '✨' },
]

const LOCATIONS = [
  {
    name: 'Karen',
    properties: 324,
    image:
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop',
    coords: { lat: -1.315, lng: 36.6749 },
  },
  {
    name: 'Westlands',
    properties: 512,
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
    coords: { lat: -1.2758, lng: 36.8061 },
  },
  {
    name: 'Kilimani',
    properties: 289,
    image:
      'https://images.unsplash.com/photo-1552321554586-a01980e01a18?w=600&h=400&fit=crop',
    coords: { lat: -1.302, lng: 36.8245 },
  },
  {
    name: 'Upper Hill',
    properties: 201,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    coords: { lat: -1.3081, lng: 36.8273 },
  },
  {
    name: 'Muthaiga',
    properties: 156,
    image:
      'https://images.unsplash.com/photo-1570129477492-45ac003fe38b?w=600&h=400&fit=crop',
    coords: { lat: -1.2645, lng: 36.7949 },
  },
  {
    name: 'Parklands',
    properties: 287,
    image:
      'https://images.unsplash.com/photo-1511612765486-a01980e01a18?w=600&h=400&fit=crop',
    coords: { lat: -1.2556, lng: 36.8235 },
  },
]

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
      image:
        'https://images.unsplash.com/photo-1566643537521-14f3ee3d3474?w=800&h=600&fit=crop',
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
        'https://images.unsplash.com/photo-1497206365907-3ff1691d0f8e?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: 'Penthouse in Karen',
      price: 55000000,
      location: 'Karen, Nairobi',
      beds: 4,
      baths: 3,
      sqft: 4200,
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
        'https://images.unsplash.com/photo-1570129477492-45ac003fe38b?w=800&h=600&fit=crop',
    },
    {
      id: 9,
      title: 'Elegant Bungalow in Upper Hill',
      price: 42000000,
      location: 'Upper Hill, Nairobi',
      beds: 4,
      baths: 3,
      sqft: 4100,
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c37c7d0?w=800&h=600&fit=crop',
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
      image:
        'https://images.unsplash.com/photo-1600607687644-c173387b402b?w=800&h=600&fit=crop',
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
        'https://images.unsplash.com/photo-1512917774080-9b274b3f91fa?w=800&h=600&fit=crop',
    },
  ],
}

const SERVICES = [
  {
    icon: HomeIcon,
    title: 'Buy',
    description:
      'Find your perfect property from our extensive collection of verified listings across Kenya. Expert guidance at every step of your purchase journey.',
    link: '/search?type=buy',
  },
  {
    icon: DollarSign,
    title: 'Sell',
    description:
      'Sell your property quickly with our proven marketing strategies. Reach thousands of qualified buyers through our platform.',
    link: '/dashboard',
  },
  {
    icon: TrendingUp,
    title: 'Rent',
    description:
      'Discover rental properties that fit your lifestyle and budget. From apartments to luxury homes, find your ideal rental.',
    link: '/search?type=rent',
  },
]

const TESTIMONIALS = [
  {
    name: 'James Mwangi',
    role: 'Home Buyer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'Steve\'s Realty made my home buying experience seamless. Professional, transparent, and truly customer-centric. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sarah Kipchoge',
    role: 'Property Seller',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Sold my property in just 3 weeks! The marketing was exceptional and the price was better than expected.',
    rating: 5,
  },
  {
    name: 'Peter Okonkwo',
    role: 'Investor',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    text: 'Investment properties made simple. Great market insights and professional property management support.',
    rating: 4.8,
  },
]

const AGENTS = [
  {
    id: 1,
    name: 'Kamau Steve',
    title: 'Founder & Lead Agent',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    listings: 45,
    specialization: 'Luxury Properties',
  },
  {
    id: 2,
    name: 'Jane Mwangi',
    title: 'Senior Agent',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    listings: 38,
    specialization: 'Residential',
  },
  {
    id: 3,
    name: 'David Kipchoge',
    title: 'Commercial Specialist',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    listings: 27,
    specialization: 'Commercial',
  },
  {
    id: 4,
    name: 'Grace Ndungu',
    title: 'Rental Specialist',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    listings: 52,
    specialization: 'Rental Properties',
  },
]

const GUIDES = [
  {
    id: 1,
    title: 'First-Time Buyer\'s Guide',
    description: 'Everything you need to know before purchasing your first property.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Investment Property Tips',
    description: 'Strategic insights for building your real estate investment portfolio.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Home Selling Strategy',
    description: 'Maximize your property\'s value with our proven selling techniques.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
]

const PARTNERS = [
  'KNBS',
  'Kenya Bankers Association',
  'Law Society of Kenya',
  'Real Estate Board of Kenya',
  'Housing Finance Bank',
  'Kenya Bureau of Standards',
  'Nairobi City County',
]

const STATISTICS = [
  { label: 'Satisfied Clients', value: '2,850+', icon: Users },
  { label: 'Successful Transactions', value: '1,240+', icon: TrendingUp },
  { label: 'Awards Received', value: '12', icon: Award },
  { label: 'Monthly Visitors', value: '45K+', icon: Users },
]

const WHY_CHOOSE = [
  {
    icon: Shield,
    title: 'Proven Expertise',
    description:
      'Over 15 years of industry experience with a proven track record of successful transactions and satisfied clients.',
  },
  {
    icon: Zap,
    title: 'Customized Solutions',
    description:
      'Tailored strategies for each client, whether you\'re buying, selling, or investing in property.',
  },
  {
    icon: Handshake,
    title: 'Transparent Partnerships',
    description:
      'Complete transparency in all dealings with clear communication and fair terms throughout the process.',
  },
]

const BEST_VALUE = [
  {
    title: 'Budget-Friendly Apartments',
    price: 'From 10M KES',
    location: 'Kilimani, Nairobi',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
  },
  {
    title: 'Mid-Range Townhouses',
    price: 'From 18M KES',
    location: 'Westlands, Nairobi',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop',
  },
  {
    title: 'Premium Villas',
    price: 'From 45M KES',
    location: 'Karen, Nairobi',
    image:
      'https://images.unsplash.com/photo-1600597042925-a85adfeb58d2?w=500&h=400&fit=crop',
  },
]

function formatPrice(price: number) {
  return `KES ${(price / 1000000).toFixed(1)}M`
}

export default function Home() {
  const [savedListings, setSavedListings] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState<'apartments' | 'houses'>('apartments')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkScroll()
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll)
      return () => carousel.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const toggleSaved = (id: number) => {
    const newSaved = new Set(savedListings)
    if (newSaved.has(id)) {
      newSaved.delete(id)
    } else {
      newSaved.add(id)
    }
    setSavedListings(newSaved)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Bar */}
      <MenuBar />
      {/* Hero Section */}
      <HomeHero />

      {/* Property Types */}
      <HomePropertyType />

      {/* Recommended Listings with Tabs */}
      <HomeRecommended />

      {/* Popular Locations - Horizontal Carousel */}
      <PopularLocations />

      {/* Statistics Section */}
      {/* <HomeStats /> */}

      {/* Why Choose Steve Realty */}
      <HomeCTA />
      {/* Contact */}
      <ContactComponent />
      {/* Best Property Value */}
      {/* <BestValue /> */}

      {/* Testimonials Section */}
      {/* <Testimonials /> */}
      {/* Meet Our Agents */}
      {/* <AgentsPreview /> */}

      {/* Helpful Guides */}
      <HomeGuides />

      {/* Selected Partners */}
      {/* <Partners /> */}

      {/* Footer */}
      <Footer />
    </main>
  )
}
