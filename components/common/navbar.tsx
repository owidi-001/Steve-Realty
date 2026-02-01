'use client'

import { useState } from 'react'
import {
    Home,
    Search,
    Users,
    Building2,
    Phone,
    UserPlus,
    Menu,
    X,
    ChevronDown,
    Calculator,
    MapPin,
    Newspaper,
    LogIn
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, ArrowRight } from 'lucide-react'
import ContactComponent from '../home/contact'

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
    const pathname = usePathname()
    const [contactDialog, setContactDialog] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    // Helper function to check if a route is active
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    // Helper function to check if any child route is active
    const hasActiveChild = (children?: SubNavItem[]) => {
        if (!children) return false
        return children.some(child => pathname.startsWith(child.href))
    }

    // Main Navigation Items
    const navItems: NavItem[] = [
        {
            label: 'Search',
            href: '/listings',
            icon: <Search className="w-4 h-4" />
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
        {
            label: 'Blogs',
            href: '/blogs',
            icon: <Newspaper className='w-4 h-4' />
        },
        {
            label: 'Contact',
            href: '#contact',
            icon: <Phone className="w-4 h-4" />
        },
        {
            label: 'Mortgage calculator',
            href: '/calculator',
            icon: <Calculator className="w-4 h-4" />
        },

    ]


    // Main Admin Navigation Items
    const adminNavItems: NavItem[] = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <Search className="w-4 h-4" />
        }
    ]

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    const handleContactClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            // On home page, scroll to contact section
            e.preventDefault()
            const contactSection = document.getElementById('contact')
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            // On other pages, show contact dialog
            e.preventDefault()
            setContactDialog(true)
        }
    }

    return (
        <>
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
                            {navItems.map((item) => {
                                const itemIsActive = isActive(item.href) || hasActiveChild(item.children)

                                return (
                                    <div key={item.label} className="relative group">
                                        {item.children ? (
                                            <button
                                                onClick={() => toggleDropdown(item.label)}
                                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 rounded-lg ${itemIsActive
                                                    ? 'text-primary bg-primary/10'
                                                    : 'text-foreground/80 hover:text-foreground'
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.label}
                                                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                            </button>
                                        ) : item.label === 'Contact' ? (
                                            <button
                                                onClick={handleContactClick}
                                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:bg-primary/10 rounded-lg"
                                            >
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 rounded-lg ${itemIsActive
                                                    ? 'text-primary bg-primary/10'
                                                    : 'text-foreground/80 hover:text-foreground'
                                                    }`}
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
                                                            className="flex flex-col px-3 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors group/item"
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
                                )
                            })}
                        </nav>

                        {/* User Actions */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Link href={'/become-agent'} className="flex items-center gap-2 border border-secondary/50 rounded-xl px-3 py-1.5 hover:bg-secondary/10 hover:text-secondary">
                                <UserPlus className="w-4 h-4" />
                                <span>Become an Agent</span>
                            </Link>
                            {/* <Button
                                variant="outline"
                                // size="lg"
                                className='rounded-xl hover:text-white py-1.5 px-3 border border-primary'
                                asChild
                            >
                                <Link href="/calculator" className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                                    <LogIn className="w-6 h-6" />
                                    Login
                                </Link>
                            </Button> */}
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
                                {navItems.map((item) => {
                                    const itemIsActive = isActive(item.href) || hasActiveChild(item.children)

                                    return (
                                        <div key={item.label} className="border-b border-border/40 last:border-0">
                                            {item.children ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleDropdown(item.label)}
                                                        className={`flex items-center justify-between w-full py-3 text-left ${itemIsActive ? 'text-primary' : 'text-foreground'
                                                            }`}
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
                                            ) : item.label === 'Contact' ? (
                                                <button
                                                    onClick={(e) => {
                                                        handleContactClick(e)
                                                        setIsMenuOpen(false)
                                                    }}
                                                    className="flex items-center gap-2 py-3 text-foreground hover:text-primary transition-colors w-full text-left"
                                                >
                                                    {item.icon}
                                                    <span className="font-medium">{item.label}</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center gap-2 py-3 transition-colors ${itemIsActive
                                                        ? 'text-primary font-semibold'
                                                        : 'text-foreground hover:text-primary'
                                                        }`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {item.icon}
                                                    <span className="font-medium">{item.label}</span>
                                                </Link>
                                            )}
                                        </div>
                                    )
                                })}

                                {/* Mobile User Actions */}
                                <div className="pt-4 border-t border-border">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className='w-full mt-3 gap-2 rounded-sm hover:text-white'
                                        asChild
                                    >
                                        <Link href="/tools/calculator" className="flex items-center gap-2">
                                            <LogIn className="w-6 h-6" />
                                            Login
                                        </Link>
                                    </Button>
                                    <Link
                                        href={'/become-agent'}
                                        className="w-full mt-3 gap-2 rounded-sm flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Become an Agent
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Contact Dialog */}
            {contactDialog && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-7xl mx-4">
                        <div className="bg-background rounded-lg shadow-xl border border-border">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
                                        <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setContactDialog(false)}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Contact Info */}
                            <div className="p-6 space-y-4">
                                <ContactComponent />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}