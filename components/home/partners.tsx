'use client'

import { Card } from '@/components/ui/card'
import { Partner } from '@/types/partners'
import { Link } from 'lucide-react';
import Image from 'next/image';

// Data Constants
const PARTNERS = [
    {
        id: "1",
        name: "KNBS",
        logoUrl: 'https://www.knbs.or.ke/wp-content/uploads/2023/04/logo-KNBS.png'
        , website: 'https://www.knbs.or.ke'
    },
    {
        id: "2",
        name: "Kenya Bankers Association",
        logoUrl: 'https://www.kba.co.ke/wp-content/uploads/2021/04/kbalogo.png'
        , website: 'https://www.kba.co.ke'
    },
    {
        id: "3",
        name: "Law Society of Kenya",
        logoUrl: 'https://lsk.or.ke/wp-content/uploads/2023/03/logo-white.png',
        website: 'https://lsk.or.ke'
    },
    {
        id: "4",
        name: "Real Estate Board of Kenya",
        logoUrl: 'https://estateagentsboard.or.ke/wp-content/uploads/2020/11/WEB-LOGO-LARGE.png',
        website: 'https://estateagentsboard.or.ke'
    },
    {
        id: "5",
        name: "Housing Finance Bank",
        logoUrl: 'https://www.housingfinance.co.ug/wp-content/uploads/2022/04/hfb-logo-b-start@2x.png',
        website: 'https://www.housingfinance.co.ug'
    },
    {
        id: "6",
        name: "Kenya Bureau of Standards",
        logoUrl: 'https://www.kebs.org/wp-content/uploads/2023/05/kebs_logo.png',
        website: 'https://www.kebs.org'
    },
    {
        id: "6",
        name: "Kenya Bureau of Standards",
        logoUrl: 'https://nairobi.go.ke/wp-content/uploads/logog-1.png',
        website: 'https://nairobi.go.ke'
    }
] as Partner[]

export default function Partners() {
    return (
        <section className="py-16 bg-[#3E160C]">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">

                <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-background mb-2">
                            Selected Partners
                        </h2>
                        <p className="text-[#E8D9C4]">
                            Trusted institutions we collaborate with
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
                    {PARTNERS.map((partner) => (
                        <Link href={partner.website}
                            key={partner.id}
                            className="p-6 flex items-center justify-center hover:shadow-lg transition-shadow min-h-24 rounded-sm"
                        >
                            <img src={partner.logoUrl} alt={partner.name} className='object-contain' />
                            {/* <p className="text-center font-semibold text-foreground text-sm">
                                {partner.name}
                            </p> */}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
