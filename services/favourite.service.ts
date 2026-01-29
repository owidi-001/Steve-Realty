import { FavoriteListing } from "@/types";
import { BaseService } from "./base.service";

class FavoriteService extends BaseService {
    constructor() {
        super('/favorites');
    }

    async check(listingId: number): Promise<{ is_favorited: boolean; favorite_id: number | null }> {
        return this.get('/check/', { listing_id: listingId });
    }

    async add(listingId: number, notes?: string): Promise<FavoriteListing> {
        return this.post('/', { listing: listingId, notes });
    }

    async remove(favoriteId: number): Promise<void> {
        return this.destroy(favoriteId);
    }
}

export const favoriteService = new FavoriteService();

