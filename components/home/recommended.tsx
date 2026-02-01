'use client'

import { ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ListingCardComponent from '../common/property_card'
import { useRecommendations } from '@/hooks/useListings'
import Link from 'next/link'

export default function HomeRecommended() {
  const [activeTab, setActiveTab] = useState<number>(0)
  
  // Fetch recommendations from API
  const { data: recommendations, isLoading, isError } = useRecommendations(6)

  if (isLoading) {
    return (
      <section className="py-8 sm:py-16 bg-secondary/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (isError || !recommendations || recommendations.length === 0) {
    return (
      <section className="py-8 sm:py-16 bg-secondary/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-muted-foreground">No recommendations available at the moment</p>
          </div>
        </div>
      </section>
    )
  }

  const activeRecommendation = recommendations[activeTab]

  return (
    <section className="py-8 sm:py-16 bg-secondary/30">
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
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {recommendations.map((rec, index) => (
            <button
              key={rec.property_type.id}
              onClick={() => setActiveTab(index)}
              className={`pb-3 px-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {rec.property_type.title}
              <span className="ml-2 text-xs">({rec.total_count})</span>
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {activeRecommendation && activeRecommendation.listings.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {activeRecommendation.listings.map((listing) => (
                <ListingCardComponent
                  key={listing.id}
                  listing={listing}
                />
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-sm"
                asChild
              >
                <Link href={`/properties?type=${activeRecommendation.property_type.slug}`}>
                  View All {activeRecommendation.property_type.title}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties available in this category</p>
          </div>
        )}
      </div>
    </section>
  )
}