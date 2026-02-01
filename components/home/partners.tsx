'use client'

import { Card } from '@/components/ui/card'
import { usePartners } from '@/hooks/usePartners'
import { Partner } from '@/types/partners'
import { ChevronLeft, ChevronRight, Link, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'


export default function Partners() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { data: partnersData, isLoading, isError } = usePartners()

    if (isLoading) {
        return (
            <section className="py-8 sm:py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-start">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 text-balance">
                            Selected <span className="title text-primary">Partners</span>
                        </h2>

                        <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl">
                            Trusted institutions we collaborate with.
                        </p>
                    </div>
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !partnersData) {
        return (
            <section className="py-8 sm:py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="text-start">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 text-balance">
                            Selected <span className="title text-primary">Partners</span>
                        </h2>

                        <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl">
                            Trusted institutions we collaborate with.
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-destructive">Failed to load partners. Please try again later.</p>
                    </div>
                </div>
            </section>
        )
    }


    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const newScrollPosition = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount)

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            })
        }
    }

    const partners = partnersData.results || [];

    return (
        <section className="py-8 bg-white shadow">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-start">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 text-balance">
                        Selected <span className="title text-primary">Partners</span>
                    </h2>

                    <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl">
                        Trusted institutions we collaborate with.
                    </p>
                </div>

                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-700" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6 text-slate-700" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {partners.map((partner: Partner) => (
                            <a key={partner.id}
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg border border-slate-200 hover:border-primary hover:shadow-md transition-all duration-300 p-4 flex items-center justify-center"
                            >
                                <img
                                    src={partner.logo_url}
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}