'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// Data Constants
const PROPERTY_TYPES = [
  { id: 'residential', name: 'Residential', icon: '/icons/resident.png' },
  { id: 'commercial', name: 'Commercial', icon: '/icons/commercial.png' },
  { id: 'land', name: 'Land', icon: '/icons/land.png' },
  { id: 'luxury', name: 'Luxury', icon: '/icons/luxury.png' },
  { id: 'office', name: 'Office', icon: '/icons/office.png' },
  { id: 'industrial', name: 'Industrial', icon: '/icons/industrial.png' },
]

export default function HomePropertyType() {
  const [hoveredType, setHoveredType] = useState(null)
  return (

    <section className="py-8 sm:py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Browse by Property Type
          </h2>
          <p className="text-muted-foreground">
            Look less, find more. Discover your perfect property from our curated categories.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
          {
            PROPERTY_TYPES.map((type) => (
              <a
                key={type.id}
                href={`/properties/${type.id}`}
                className="group relative"
                onMouseEnter={() => setHoveredType(type.id)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <div className={`relative bg-white rounded-sm border-2 p-6 transition-all duration-300 ${hoveredType === type.id
                  ? 'border-primary shadow-xl -translate-y-2 bg-[#3E160C]/50'
                  : 'border-gray-200 shadow-sm hover:border-[#3E160C]'
                  }`}>
                  {/* Icon Container */}
                  <div className="relative mb-4 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-orange-100 rounded-full blur-xl transition-opacity duration-300 ${hoveredType === type.id ? 'opacity-60' : 'opacity-0'
                      }`}></div>

                    <div className={`relative w-24 h-24 flex items-center justify-center transition-transform duration-300 ${hoveredType === type.id ? 'scale-110' : 'scale-100'
                      }`}>
                      {/* Placeholder for icon - replace with actual Image component */}
                      {/* <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs border-2 border-gray-200">
                        {type.name.slice(0, 2).toUpperCase()}
                      </div> */}

                      <img
                        src={type.icon}
                        alt={type.name}
                        className="w-full h-full object-contain"
                      />

                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-lg font-bold mb-1 transition-colors ${hoveredType === type.id ? 'text-accent' : 'text-gray-900'
                      }`}>
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-semibold mb-3">
                      {type.count} listings
                    </p>

                    {/* Arrow indicator on hover */}
                    <div className={`flex items-center justify-center gap-1 text-sm font-bold text-accent transition-all duration-300 ${hoveredType === type.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}>
                      <span>Browse</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${hoveredType === type.id ? 'bg-primary scale-125' : 'bg-gray-300 scale-100'
                    }`}></div>
                </div>
              </a>
            ))

          }
        </div>
      </div>
    </section>
  )
}
