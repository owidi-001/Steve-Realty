'use client'

import { useState, useRef, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

// Data Constants
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

export default function Testimonials() {
    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        What People Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Real experiences from our satisfied clients
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <Card key={testimonial.name} className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={testimonial.image || "/placeholder.svg"}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(testimonial.rating)
                                            ? 'fill-primary text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-muted-foreground text-sm">{testimonial.text}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

    )
}
