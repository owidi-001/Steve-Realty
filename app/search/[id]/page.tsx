'use client'

import React, { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Ruler as Ruler2, Phone, Mail, Star, Share2, Calendar, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const PROPERTY_DATA = {
  id: 1,
  title: '4-Bedroom Villa in Karen',
  price: 45000000,
  location: 'Karen, Nairobi',
  address: 'Miotoni Road, Karen',
  coordinates: { lat: -1.3195, lng: 36.7110 },
  beds: 4,
  baths: 3,
  sqft: 4500,
  landArea: 10000,
  yearBuilt: 2015,
  parking: 2,
  description: `Stunning luxury villa with modern amenities in one of Nairobi's most prestigious neighborhoods. This beautiful 4-bedroom villa features a spacious living area, state-of-the-art kitchen, and a stunning swimming pool overlooking manicured gardens. Perfect for families seeking comfort and elegance.`,
  amenities: [
    { name: 'Swimming Pool', included: true },
    { name: 'Security System', included: true },
    { name: 'Garden', included: true },
    { name: 'Parking', included: true },
    { name: 'Gym', included: true },
    { name: 'Air Conditioning', included: true },
    { name: 'Modern Kitchen', included: true },
    { name: 'Guest House', included: true },
    { name: 'Water Tank', included: true },
    { name: 'Generator', included: true },
    { name: 'Balcony', included: true },
    { name: 'Study Room', included: true },
  ],
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9b21ab6a4799?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=1400&h=900&fit=crop',
  ],
  agent: {
    id: 'agent_001',
    name: 'Sarah Mwangi',
    title: 'Senior Real Estate Agent',
    phone: '+254712345678',
    email: 'sarah@stevesrealty.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 52,
    sold: 46,
  },
  similarProperties: [
    {
      id: 2,
      title: 'Luxury Apartment in Westlands',
      price: 28000000,
      location: 'Westlands',
      image: 'https://images.unsplash.com/photo-1512917774080-9b21ab6a4799?w=600&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'Executive Penthouse Upper Hill',
      price: 62000000,
      location: 'Upper Hill',
      image: 'https://images.unsplash.com/photo-1559592413-cd4628902df4?w=600&h=500&fit=crop',
    },
    {
      id: 5,
      title: 'Spacious Townhouse in Runda',
      price: 35000000,
      location: 'Runda',
      image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=500&fit=crop',
    },
  ],
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const property = PROPERTY_DATA

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Contact form submitted:', contactForm)
    setShowContactForm(false)
    setContactForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/search" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Search</span>
            </Link>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-all ${isSaved ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Premium Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden group">
                <img
                  src={property.images[currentImageIndex] || '/placeholder.svg'}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Navigation Buttons */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/40 text-white text-sm font-medium backdrop-blur-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden transition-all border-2 ${
                        idx === currentImageIndex ? 'border-primary shadow-lg scale-105' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img src={img || '/placeholder.svg'} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Header */}
            <div className="space-y-6 border-b border-border pb-8">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{property.address}</span>
                    </div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-primary">{formatPrice(property.price)}</div>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.beds },
                  { icon: Bath, label: 'Bathrooms', value: property.baths },
                  { icon: Ruler2, label: 'Sqft', value: property.sqft.toLocaleString() },
                  { icon: null, label: 'Year Built', value: property.yearBuilt },
                ].map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                      {Icon && <Icon className="w-6 h-6 text-primary mb-2" />}
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* About Property */}
            <div className="space-y-4 border-b border-border pb-8">
              <h2 className="text-3xl font-bold text-foreground">About This Property</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 border-b border-border pb-8">
              <h2 className="text-3xl font-bold text-foreground">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/50 transition-colors">
                    {amenity.included ? (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className="font-medium text-foreground">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Properties */}
            {property.similarProperties.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {property.similarProperties.map((similar) => (
                    <Link key={similar.id} href={`/search/${similar.id}`} className="group">
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <img
                            src={similar.image || '/placeholder.svg'}
                            alt={similar.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors text-lg">
                            {similar.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">{similar.location}</p>
                          <div className="mt-auto">
                            <p className="text-2xl font-bold text-primary">{formatPrice(similar.price)}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Agent & CTA */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* Agent Card */}
            <Card className="p-6 sm:p-8 space-y-6 border-2 border-border hover:border-primary transition-colors">
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Listing Agent</h3>
                <div className="flex gap-4">
                  <img
                    src={property.agent.image || '/placeholder.svg'}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground">{property.agent.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{property.agent.title}</p>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        {property.agent.rating} ({property.agent.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Track Record</p>
                  <p className="text-2xl font-bold text-foreground">{property.agent.sold}</p>
                  <p className="text-sm text-muted-foreground">Properties Sold</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Agent
                </a>
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 font-semibold transition-colors"
                >
                  <Mail className="w-5 h-5 inline mr-2" />
                  Send Message
                </button>
              </div>

              {showContactForm && (
                <form onSubmit={handleContactSubmit} className="pt-4 border-t border-border space-y-3">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="bg-secondary/40"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="bg-secondary/40"
                  />
                  <Input
                    placeholder="Your Phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                    className="bg-secondary/40"
                  />
                  <textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-foreground bg-secondary/40 outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                    rows={3}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Inquiry
                  </Button>
                </form>
              )}
            </Card>

            {/* Schedule Tour CTA */}
            <Card className="p-6 sm:p-8 space-y-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <h3 className="text-xl font-bold text-foreground">Schedule a Tour</h3>
              <p className="text-sm text-muted-foreground">
                Ready to see this property in person? Book a viewing with our agent today.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base py-3">
                <Calendar className="w-5 h-5" />
                Book Viewing
              </Button>
            </Card>

            {/* Property Info Box */}
            <Card className="p-6 sm:p-8 space-y-4 bg-secondary/30 border-border">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Property Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Land Area</span>
                  <span className="font-semibold text-foreground">{property.landArea.toLocaleString()} sqft</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Parking Spaces</span>
                  <span className="font-semibold text-foreground">{property.parking}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Built Year</span>
                  <span className="font-semibold text-foreground">{property.yearBuilt}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
