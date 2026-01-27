"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Send, Check, Loader2, Phone } from "lucide-react";
// import { PHONE, EMAIL, INSTAGRAM, FACEBOOK, MESSAGE } from "@/types/constants";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { PHONE, MESSAGE, EMAIL, FACEBOOK, INSTAGRAM } from "@/types/constants";
// import { subscriberService } from "@/lib/services/subscribers/subscriber-service";

export default function ContactComponent() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"social" | "newsletter">("social");

    const handleSubscribe = async () => {
        // e.preventDefault();
        // setError(null);
        // setSuccess(null);

        // if (!email || !email.includes("@")) {
        //     setError("Please enter a valid email address");
        //     return;
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     setError("Please enter a valid email address");
        //     return;
        // }

        // setIsLoading(true);

        // try {
        //     const result = await subscriberService.subscribeUser({
        //         email,
        //         firstName: firstName.trim() || undefined,
        //         source: "website_newsletter",
        //         consentVersion: "v2.0"
        //     });

        //     if (result.success) {
        //         setSuccess("Thanks for subscribing!");
        //         setEmail("");
        //         setFirstName("");
        //         setTimeout(() => setSuccess(null), 5000);
        //     } else {
        //         switch (result.message) {
        //             case 'Invalid email address':
        //                 setError("Please enter a valid email address");
        //                 break;
        //             case 'Email already subscribed':
        //                 setError("This email is already subscribed");
        //                 break;
        //             default:
        //                 setError("Failed to subscribe. Please try again.");
        //         }
        //     }
        // } catch (error) {
        //     console.error("Failed to subscribe:", error);
        //     setError("An unexpected error occurred");
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = PHONE || "";
        const message = MESSAGE || "Hello, I'd like to inquire about motorcycle gear";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleEmailClick = () => {
        const emailAddress = EMAIL || "contact@bikersboutique.com";
        const subject = "Inquiry about Motorcycle Products";
        const body = "Hello,\n\nI would like to inquire about the following:\n\n";
        window.open(`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    };

    const handleCallClick = () => {
        const phoneNumber = PHONE || "";
        window.open(`tel:${phoneNumber}`, '_blank');
    };

    const socialLinks = [
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            color: "bg-green-500 hover:bg-green-600",
            onClick: handleWhatsAppClick,
            description: "Quick chat"
        },
        {
            name: "Email",
            icon: Mail,
            color: "bg-blue-500 hover:bg-blue-600",
            onClick: handleEmailClick,
            description: "Send message"
        },
        {
            name: "Call",
            icon: FaPhoneAlt,
            color: "bg-gray-800 hover:bg-gray-900",
            onClick: handleCallClick,
            description: "Direct call"
        },
        {
            name: "Facebook",
            icon: FaFacebook,
            color: "bg-blue-600 hover:bg-blue-700",
            href: FACEBOOK || "https://facebook.com",
            description: "Community"
        },
        {
            name: "Instagram",
            icon: FaInstagram,
            color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
            href: INSTAGRAM || "https://instagram.com",
            description: "Latest gear"
        },
    ];

    return (
        <section className="py-12 px-4 bg-primary/10" id="contact">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 text-balance mb-6">
                        Stay <span className="title text-primary">Connected</span> With Us
                    </h2>

                    <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto">
                        Reach out through your preferred platform. We're here to help with any questions about your dream property.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Social Links */}
                    <div className={`bg-card border rounded-md p-6 transition-all ${activeTab === "social" ? "opacity-100" : "md:opacity-100 opacity-50"}`}>
                        <h4 className="font-medium text-foreground mb-4">Quick Contact</h4>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                const content = (
                                    <div className="flex flex-col items-center justify-center p-3 rounded-md transition-colors bg-muted hover:bg-muted/80">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${social.color}`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xs font-medium text-foreground">{social.name}</div>
                                        <div className="text-[10px] text-muted-foreground mt-1">{social.description}</div>
                                    </div>
                                );

                                return social.href ? (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={social.onClick}
                                        className="block w-full"
                                    >
                                        {content}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="border-t border-border pt-4">
                            <p className="text-sm text-muted-foreground mb-3">Need immediate help?</p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleWhatsAppClick}
                                    size="lg"
                                    className="flex-1 bg-green-500 hover:bg-green-600"
                                >
                                    <FaWhatsapp className="w-4 h-4 mr-2" />
                                    WhatsApp
                                </Button>
                                <Button
                                    onClick={handleCallClick}
                                    size="lg"
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Us
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={`bg-card border rounded-md p-6 transition-all ${activeTab === "newsletter" ? "opacity-100" : "md:opacity-100 opacity-50"}`}>
                        <h4 className="font-medium text-foreground mb-4">Get Updates</h4>

                        <p className="text-sm text-muted-foreground mb-4">
                            Be the first to know about new listings, exclusive deals, and top realty tips.
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    <p className="text-green-700 text-sm">{success}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            setError(null);
                                        }}
                                        placeholder="First name (optional)"
                                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError(null);
                                        }}
                                        placeholder="Email address"
                                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    className="w-4 h-4 rounded border-border focus:ring-primary"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="privacy" className="text-xs text-muted-foreground">
                                    I agree to the{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                                size="lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Subscribing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" />
                                        Subscribe
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-xs text-muted-foreground text-center">
                                No spam. Unsubscribe anytime. Typically respond within 2 hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note - Minimal */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        • Secure Communication • 100% Privacy • No Spam •
                    </p>
                </div>
            </div>
        </section>
    );
}