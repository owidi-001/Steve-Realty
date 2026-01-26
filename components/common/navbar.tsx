'use client'

import { useState } from 'react'
import {
    Home,
    Search,
    Users,
    Building2,
    Phone,
    UserPlus,
    BookOpen,
    Info,
    Menu,
    X,
    ChevronDown,
    Briefcase,
    Shield,
    Calculator,
    BarChart3,
    FileText,
    MapPin,
    Heart,
    Bell,
    PhoneCall,
    TrophyIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface NavItem {
    label: string
    href: string
    icon?: React.ReactNode
    children?: SubNavItem[]
}

interface SubNavItem {
    label: string
    href: string
    description?: string
}

export default function MenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    // Main Navigation Items
    const navItems: NavItem[] = [
        {
            label: 'Home',
            href: '/',
            icon: <Home className="w-4 h-4" />
        },
        {
            label: 'Search',
            href: '/search',
            icon: <Search className="w-4 h-4" />
        },

        // {
        //     label: 'Search',
        //     href: '/search',
        //     icon: <Search className="w-4 h-4" />,
        //     children: [
        //         { label: 'Buy Properties', href: '/search?type=buy', description: 'Find your dream home' },
        //         { label: 'Rent Properties', href: '/search?type=rent', description: 'Find rental properties' },
        //         { label: 'Commercial Properties', href: '/search?type=commercial', description: 'Business spaces' },
        //         { label: 'Land & Plots', href: '/search?type=land', description: 'Investment land' },
        //         { label: 'New Developments', href: '/search?type=new', description: 'Off-plan properties' },
        //         { label: 'Luxury Properties', href: '/search?type=luxury', description: 'Premium listings' },
        //     ]
        // },
        {
            label: 'Listings',
            href: '/listings',
            icon: <MapPin className="w-4 h-4" />,
            children: [
                { label: 'Featured Listings', href: '/listings?filter=featured', description: 'Our top picks' },
                { label: 'Recent Listings', href: '/listings?filter=recent', description: 'New on market' },
                { label: 'Exclusive Listings', href: '/listings?filter=exclusive', description: 'Limited access' },
                { label: 'Hot Deals', href: '/listings?filter=hot-deals', description: 'Best value offers' },
                { label: 'Sold Properties', href: '/listings?filter=sold', description: 'Recent transactions' },
                { label: 'Coming Soon', href: '/listings?filter=coming-soon', description: 'Upcoming properties' },
            ]
        },
        {
            label: 'Agents',
            href: '/agents',
            icon: <Users className="w-4 h-4" />,
        },
        {
            label: 'Offices',
            href: '/offices',
            icon: <Building2 className="w-4 h-4" />,
            children: [
                { label: 'Nairobi Offices', href: '/offices?location=nairobi', description: 'Capital city branches' },
                { label: 'Coast Region', href: '/offices?location=coast', description: 'Mombasa & surrounding' },
                { label: 'Rift Valley', href: '/offices?location=rift', description: 'Nakuru & beyond' },
                { label: 'Central Kenya', href: '/offices?location=central', description: 'Nyeri & surrounding' },
                { label: 'Western Kenya', href: '/offices?location=western', description: 'Kisumu region' },
                { label: 'All Locations', href: '/offices?location=all', description: 'Complete directory' },
            ]
        },
        // {
        //     label: 'Services',
        //     href: '/services',
        //     icon: <Briefcase className="w-4 h-4" />,
        //     children: [
        //         { label: 'Property Valuation', href: '/services/valuation', description: 'Professional appraisal' },
        //         { label: 'Property Management', href: '/services/management', description: 'Rental management' },
        //         { label: 'Real Estate Advisory', href: '/services/advisory', description: 'Investment advice' },
        //         { label: 'Legal Services', href: '/services/legal', description: 'Legal support' },
        //         { label: 'Mortgage Assistance', href: '/services/mortgage', description: 'Financing help' },
        //         { label: 'Home Staging', href: '/services/staging', description: 'Presentation services' },
        //     ]
        // },
        // {
        //     label: 'Resources',
        //     href: '/resources',
        //     icon: <BookOpen className="w-4 h-4" />,
        //     children: [
        //         { label: 'Buyer\'s Guide', href: '/resources/buyers-guide', description: 'First-time buyer tips' },
        //         { label: 'Seller\'s Guide', href: '/resources/sellers-guide', description: 'Maximize your sale' },
        //         { label: 'Market Reports', href: '/resources/market-reports', description: 'Latest data & trends' },
        //         { label: 'Mortgage Calculator', href: '/resources/calculator', description: 'Affordability tool' },
        //         { label: 'Area Guides', href: '/resources/area-guides', description: 'Neighborhood info' },
        //         { label: 'Blog & Articles', href: '/blog', description: 'Latest insights' },
        //     ]
        // },
        // {
        //     label: 'About',
        //     href: '/about',
        //     icon: <Info className="w-4 h-4" />,
        //     children: [
        //         { label: 'Our Story', href: '/about/story', description: 'Company history' },
        //         { label: 'Mission & Values', href: '/about/mission', description: 'Our principles' },
        //         { label: 'Careers', href: '/about/careers', description: 'Join our team' },
        //         { label: 'Press & Media', href: '/about/press', description: 'News coverage' },
        //         { label: 'Awards & Recognition', href: '/about/awards', description: 'Our achievements' },
        //         { label: 'Community Impact', href: '/about/community', description: 'Social responsibility' },
        //     ]
        // },
        {
            label: 'Contact',
            href: '/contact',
            icon: <Phone className="w-4 h-4" />
        }
    ]

    // User action items
    // const userActions = [
    // { label: 'Favorites', href: '/favorites', icon: <Heart className="w-4 h-4" /> },
    // { label: 'Alerts', href: '/alerts', icon: <Bell className="w-4 h-4" /> },
    // { label: 'List Property', href: '/dashboard/listings/new', icon: <UserPlus className="w-4 h-4" /> },
    // ]

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-2">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <div className="text-xl font-bold tracking-tight">Steve's</div>
                                <div className="text-sm font-semibold text-primary">Realty</div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.children ? (
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:bg-secondary rounded-lg"
                                    >
                                        {item.icon}
                                        {item.label}
                                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:bg-secondary rounded-lg"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.children && (
                                    <div
                                        className={`absolute left-0 top-full mt-1 w-64 bg-popover border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${activeDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                                            }`}
                                    >
                                        <div className="p-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="flex flex-col px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors group/item"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <span className="font-medium text-foreground">{child.label}</span>
                                                    {child.description && (
                                                        <span className="text-xs text-muted-foreground mt-0.5">
                                                            {child.description}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* User Actions */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className='rounded-sm hover:text-white'
                            asChild

                        >
                            <Link href="/tools/calculator" className="flex items-center gap-2">
                                <Calculator className="w-6 h-6" />
                                Mortgage Calculator
                            </Link>
                        </Button>
                        <Link href={'become-agent'} className="flex items-center px-2 py-1 gap-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                            <UserPlus className="w-4 h-4" />
                            <span>Become an Agent</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-border">
                    <div className="container mx-auto px-4 py-4">
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <div key={item.label} className="border-b border-border/40 last:border-0">
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.label)}
                                                className="flex items-center justify-between w-full py-3 text-left"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {item.icon}
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                            </button>
                                            {activeDropdown === item.label && (
                                                <div className="pl-6 pb-3 space-y-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                            onClick={() => {
                                                                setIsMenuOpen(false)
                                                                setActiveDropdown(null)
                                                            }}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-2 py-3 text-foreground hover:text-primary transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.icon}
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Mobile User Actions */}
                            <div className="pt-4 border-t border-border">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className='w-full mt-3 gap-2 rounded-sm hover:text-white'
                                    asChild

                                >
                                    <Link href="/tools/calculator" className="flex items-center gap-2">
                                        <Calculator className="w-6 h-6" />
                                        Mortgage Calculator
                                    </Link>
                                </Button>
                                <Link href={'/become-agent'} className="w-full mt-3 gap-2 rounded-sm">
                                    <UserPlus className="w-4 h-4" />
                                    Become an Agent
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}