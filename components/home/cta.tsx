import { useState } from 'react'
import { ArrowRight, Check, Sparkles, Phone, MessageCircle, Calendar } from 'lucide-react'
import { Button } from '../ui/button'

export default function HomeCTA() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    const features = [
        {
            icon: <MessageCircle className="w-5 h-5" />,
            text: 'No pressure, just honest advice',
            detail: 'Real conversations, real solutions'
        },
        {
            icon: <Sparkles className="w-5 h-5" />,
            text: 'Fast-track property matching',
            detail: 'AI-powered recommendations'
        },
        {
            icon: <Phone className="w-5 h-5" />,
            text: 'Dedicated support from start to finish',
            detail: '24/7 availability'
        }
    ]

    return (
        <section className="relative  overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="">
                <div className="relative overflow-hidden border border-primary/50 shadow-2xl bg-white">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-orange-50/80"></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>

                    {/* Floating accent circles */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-tr from-purple-400/15 to-blue-400/15 rounded-full blur-2xl"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Content */}
                        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                            {/* Heading */}
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                                Your dream home is{' '}
                                <span className="text-primary">
                                    waiting
                                </span>
                            </h2>

                            <p className="text-muted-foreground mb-4">
                                Whether you're a first-time buyer, seasoned investor, or looking for the perfect rental, we bring decades of expertise and genuine care to every transaction.
                            </p>

                            {/* Interactive Features */}
                            <ul className="space-y-4 mb-4">
                                {features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="group cursor-pointer"
                                        onMouseEnter={() => setHoveredFeature(idx)}
                                        onMouseLeave={() => setHoveredFeature(null)}
                                    >
                                        <div className={`flex items-start gap-4 transition-all duration-300 bg-transparent'
                                            }`}>
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${hoveredFeature === idx
                                                ? 'bg-primary/100 text-white shadow-lg'
                                                : 'bg-primary/10 text-primary'
                                                }`}>
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-900 font-semibold">{feature.text}</span>
                                                    <Check className={`w-5 h-5 text-primary transition-all duration-300 ${hoveredFeature === idx ? 'opacity-100 scale-110' : 'opacity-0 scale-75'
                                                        }`} />
                                                </div>
                                                <p className={`text-sm text-gray-500 transition-all duration-300 '
                                                    }`}>
                                                    {feature.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size={'lg'} className="group relative bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Let's Talk
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>


                        </div>

                        {/* Right Visual */}
                        <div className="relative lg:min-h-[350px] order-first lg:order-last">
                            <div className="relative h-full min-h-[350px] lg:min-h-full overflow-hidden group">
                                {/* Main image */}
                                <img
                                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1740&auto=format&fit=crop"
                                    alt="Dream property"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                {/* Floating stats card */}
                                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform">
                                    <div className="text-3xl font-bold text-gray-900">98%</div>
                                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                                    <div className="mt-2 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span key={i} className="text-yellow-400 text-lg">★</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Property info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-3">
                                        Featured Match
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-bold mb-2">
                                        Premium Properties Await
                                    </div>
                                    <p className="text-white/90 text-sm sm:text-base">
                                        Exclusive access to 500+ verified listings
                                    </p>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-1/2 left-8 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}