'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Data Constants
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
            'https://www.investmentrise.com.au/wp-content/uploads/2020/09/ytthumb.jpg',
    },
    {
        id: 3,
        title: 'Home Selling Strategy',
        description: 'Maximize your property\'s value with our proven selling techniques.',
        image:
            'https://jenniferlebow.com/wp-content/uploads/2019/09/LinkedIn-template-1-1024x536.png',
    },
]

export default function HomeGuides() {


    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Helpful Guides
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Expert resources to help you make informed decisions
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {GUIDES.map((guide) => (
                        <Card
                            key={guide.id}
                            className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer p-0 rounded-sm"
                        >
                            <div className="relative h-48 overflow-hidden bg-muted">
                                <img
                                    src={guide.image || "/placeholder.svg"}
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {guide.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary/10 bg-transparent gap-2"
                                >
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
