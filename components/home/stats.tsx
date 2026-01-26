'use client'

import { useState, useRef, useEffect } from 'react'
import { Award, Users, TrendingUp } from 'lucide-react'

// Data Constants
const STATISTICS = [
    { label: 'Satisfied Clients', value: '2,850+', icon: Users },
    { label: 'Successful Transactions', value: '1,240+', icon: TrendingUp },
    { label: 'Awards Received', value: '12', icon: Award },
    { label: 'Monthly Visitors', value: '45K+', icon: Users },
]


export default function HomeStats() {
    return (
        <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATISTICS.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="text-center">
                                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                                    {stat.value}
                                </div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
