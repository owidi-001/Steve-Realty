'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Data Constants
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


export default function BestValue() {

    return (
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Best Property Value
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Quality homes at competitive prices
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {BEST_VALUE.map((property, idx) => (
                        <Card key={idx} className="overflow-hidden group hover:shadow-lg transition-shadow p-0">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={property.image || "/placeholder.svg"}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                                    <p className="text-sm opacity-90">{property.location}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold text-primary">{property.price}</div>
                                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                                    View Properties
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
