'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Data Constants
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


export default function AgentsPreview() {
    return (
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Meet Our Agents
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Expert professionals dedicated to your success
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AGENTS.map((agent) => (
                        <Card
                            key={agent.id}
                            className="overflow-hidden group hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="relative h-48 overflow-hidden bg-muted">
                                <img
                                    src={agent.image || "/placeholder.svg"}
                                    alt={agent.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-foreground">{agent.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{agent.title}</p>
                                <p className="text-xs text-primary font-semibold mb-3">
                                    {agent.specialization}
                                </p>
                                <p className="text-xs text-muted-foreground mb-3">
                                    {agent.listings} active listings
                                </p>
                                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Contact Agent
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
