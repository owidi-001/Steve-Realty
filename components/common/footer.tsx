'use client'

import { Phone, Mail } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'


// Data Constants
export default function Footer() {

    return (
        <footer className="bg-[#050A30] text-background py-12">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4">Steve's Realty</h4>
                        <p className="text-background/80 text-sm mb-4">
                            Your trusted partner in finding the perfect property in Kenya.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-2 bg-background/10 hover:bg-primary rounded transition-colors"
                            >
                                <FaFacebook className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-background/10 hover:bg-primary rounded transition-colors"
                            >
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-background/10 hover:bg-primary rounded transition-colors"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-background/10 hover:bg-primary rounded transition-colors"
                            >
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">Company</h5>
                        <ul className="space-y-2 text-sm text-background/80">
                            <li>
                                <a href="/admin/dashboard" className="hover:text-background transition-colors">
                                    Staff Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Agent Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="hover:text-background transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">Services</h5>
                        <ul className="space-y-2 text-sm text-background/80">
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Buy Property
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Sell Property
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Rent Property
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-background transition-colors">
                                    Property Valuation
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">Contact Us</h5>
                        <ul className="space-y-3 text-sm text-background/80">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+254700000000">+254 700 000 000</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:info@stevesrealty.com">info@stevesrealty.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
                    <p>
                        &copy; 2026 Steve's Realty. All rights reserved. | Privacy Policy | Terms of
                        Service
                    </p>
                </div>
            </div>
        </footer>
    )
}
