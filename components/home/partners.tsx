'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'

// Data Constants
const PARTNERS = [
    'KNBS',
    'Kenya Bankers Association',
    'Law Society of Kenya',
    'Real Estate Board of Kenya',
    'Housing Finance Bank',
    'Kenya Bureau of Standards',
    'Nairobi City County',
]

export default function Partners() {
    return (
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Selected Partners
                    </h2>
                    <p className="text-muted-foreground">
                        Trusted institutions we collaborate with
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
                    {PARTNERS.map((partner) => (
                        <Card
                            key={partner}
                            className="p-6 flex items-center justify-center hover:shadow-lg transition-shadow min-h-24"
                        >
                            <p className="text-center font-semibold text-foreground text-sm">
                                {partner}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
