'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Data Constants
const LOCATIONS = [
    {
        name: 'Karen',
        properties: 324,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",

        image:
            'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop',
        coords: { lat: -1.315, lng: 36.6749 },
    },
    {
        name: 'Westlands',
        properties: 512,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",
        image:
            'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop',
        coords: { lat: -1.2758, lng: 36.8061 },
    },
    {
        name: 'Kilimani',
        properties: 289,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",
        image:
            'https://i.ytimg.com/vi/p_JI1ISvF9s/maxresdefault.jpg',
        coords: { lat: -1.302, lng: 36.8245 },
    },
    {
        name: 'Upper Hill',
        properties: 201,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",
        image:
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
        coords: { lat: -1.3081, lng: 36.8273 },
    },
    {
        name: 'Muthaiga',
        properties: 156,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",
        image:
            'https://ascottours.co.za/wp-content/uploads/2024/05/Muthaiga-Golf-Club-Kenya.jpg',
        coords: { lat: -1.2645, lng: 36.7949 },
    },
    {
        name: 'Parklands',
        properties: 287,
        description: "Officiis hic et debitis quis sit inventore non. Sunt ut dolore provident qui. Perspiciatis enim voluptatem accusamus.",
        image:
            'https://villacarekenya.com/wp-content/uploads/2023/01/IMG_20180529_112059-1024x768.jpg',
        coords: { lat: -1.2556, lng: 36.8235 },
    },
]


export default function PopularLocations() {
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


    return (
        <section className="py-8 sm:py-16 bg-muted">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Explore Popular Locations
                    </h2>
                    <p className="text-muted-foreground">
                        Discover properties in Kenya's most sought-after neighborhoods
                    </p>
                </div>

                <div className="relative">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {LOCATIONS.map((location) => (
                            <div
                                key={location.name}
                                className="bg-white rounded-sm overflow-hidden border-2  hover:border-[#3E160C]/20 shadow-sm hover:shadow-xl flex-shrink-0 w-96 group cursor-pointer"
                            >
                                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col rounded-sm p-0">
                                    <div className="relative h-48 overflow-hidden bg-muted">
                                        <img
                                            src={location.image || "/placeholder.svg"}
                                            alt={location.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-2xl font-bold mb-1">{location.name}</h3>
                                            <div className="flex items-center gap-1 text-sm opacity-90">
                                                <MapPin className="w-4 h-4" />
                                                {location.properties} properties
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            {/* <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                                                Coordinates
                                            </p>
                                            <p className="text-sm text-foreground font-mono">
                                                {location.coords.lat.toFixed(4)}°, {location.coords.lng.toFixed(4)}°
                                            </p> */}
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                                                Description
                                            </p>
                                            <p className="text-sm text-foreground font-mono clamp-2">
                                                {location.description.slice(0, 70)}
                                            </p>
                                        </div>
                                        <Button size={'lg'} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4 rounded-sm">
                                            Explore {location.name}
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}
