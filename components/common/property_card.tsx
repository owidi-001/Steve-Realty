import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize2, Eye, ChevronRight } from 'lucide-react';
import { TransactionType, Currency } from '@/types';

// Types
type UUID = string;
type ISODateString = string;



interface ListingCard {
    id: UUID;
    reference_number: string;
    title: string;
    slug: string;
    short_description?: string;
    type: string;
    category: string;
    transaction_type: TransactionType;
    price_amount: number;
    price_currency: Currency;
    price_display: string;
    primary_image?: {
        url: string;
        thumbnail: string;
        caption?: string;
    };
    location_summary: string;
    bedrooms?: number;
    bathrooms?: number;
    interior_size?: number;
    is_featured: boolean;
    is_hot_deal: boolean;
    is_new_listing: boolean;
    is_exclusive: boolean;
    view_count: number;
    favorite_count: number;
    created_at: ISODateString;
}

interface ListingCardComponentProps {
    listing: ListingCard;
    onCardClick?: (listing: ListingCard) => void;
    onQuickView?: (listing: ListingCard) => void;
    onToggleFavorite?: (listingId: UUID) => void;
    isFavorited?: boolean;
    className?: string;
}

const ListingCardComponent: React.FC<ListingCardComponentProps> = ({
    listing,
    onCardClick,
    onQuickView,
    onToggleFavorite,
    isFavorited = false,
    className = ''
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const getTagInfo = () => {
        if (listing.is_featured) {
            return { text: 'FEATURED', styles: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' };
        }
        if (listing.is_hot_deal) {
            return { text: 'HOT DEAL', styles: 'bg-gradient-to-r from-red-500 to-pink-500 text-white' };
        }
        if (listing.is_new_listing) {
            return { text: 'NEW', styles: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' };
        }
        if (listing.is_exclusive) {
            return { text: 'EXCLUSIVE', styles: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' };
        }
        return null;
    };

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(listing);
        }
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onQuickView) {
            onQuickView(listing);
        }
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite) {
            onToggleFavorite(listing.id);
        }
    };

    const formatPrice = (amount: number, currency: Currency): string => {
        const currencySymbols: Record<Currency, string> = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            KES: 'KSh'
        };

        const symbol = currencySymbols[currency] || currency;
        return `${symbol}${amount.toLocaleString()}`;
    };

    const formatArea = (area?: number): string => {
        if (!area) return 'N/A';
        return `${area.toLocaleString()} m²`;
    };

    const tagInfo = getTagInfo();
    const imageUrl = listing.primary_image?.url || listing.primary_image?.thumbnail || '/placeholder-property.jpg';

    return (
        <div
            className={`group cursor-pointer ${className}`}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-white rounded-sm overflow-hidden border-2 border-gray-100 hover:border-[#3E160C]/10 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                        src={imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tag Badge */}
                    {tagInfo && (
                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold ${tagInfo.styles} shadow-md`}>
                            {tagInfo.text}
                        </div>
                    )}

                    {/* Heart Icon */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md hover:scale-110"
                        aria-label="Toggle favorite"
                    >
                        <Heart
                            className={`w-5 h-5 transition-all ${isFavorited
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-600'
                                }`}
                        />
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-5">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span className="truncate font-medium">{listing.location_summary}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 min-h-[3.5rem] group-hover:text-primary transition-colors">
                        {listing.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-100">
                        {listing.bedrooms !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                    <Bed className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">{listing.bedrooms}</span>
                            </div>
                        )}

                        {listing.bathrooms !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                    <Bath className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">{listing.bathrooms}</span>
                            </div>
                        )}

                        {listing.interior_size !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                                    <Maximize2 className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">
                                    {formatArea(listing.interior_size)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-gray-500 font-semibold mb-0.5">
                                {listing.transaction_type === TransactionType.RENT ? 'Monthly' : 'Starting from'}
                            </div>
                            <div className="text-2xl font-black text-primary">
                                {listing.price_display || formatPrice(listing.price_amount, listing.price_currency)}
                            </div>
                        </div>
                        <button
                            className="p-3 bg-primary text-white rounded-xl hover:bg-orange-700 transition-all duration-200 hover:scale-110 shadow-md"
                            aria-label="View details"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingCardComponent;
export type { ListingCard, ListingCardComponentProps };