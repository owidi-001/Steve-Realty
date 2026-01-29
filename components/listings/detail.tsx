'use client';

import { useCheckFavorite, useToggleFavorite } from '@/hooks/useFavourites';
import { useListing, useSimilarListings } from '@/hooks/useListings';


export default function ListingDetailPage({ slug }: { slug: string }) {
    const { data: listing, isLoading } = useListing(slug);
    const { data: similar } = useSimilarListings(slug);
    const { data: favoriteStatus } = useCheckFavorite(Number(listing?.id) || 0);
    const { toggleFavorite, isLoading: isTogglingFavorite } = useToggleFavorite();

    if (isLoading) return <div>Loading...</div>;
    if (!listing) return <div>Not found</div>;

    return (
        <div>
            <h1>{listing.title}</h1>
            <button
                onClick={() => toggleFavorite(Number(listing.id), favoriteStatus?.favorite_id)}
                disabled={isTogglingFavorite}
            >
                {favoriteStatus?.is_favorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <div>
                <h2>Similar Listings</h2>
                {similar?.map((item) => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>
        </div>
    );
}