import { BaseService } from './base.service';
import {
    ListingCard,
    ListingList,
    ListingDetail,
    ListingCreate,
    SearchFilters,
    PopularLocation,
    Recommendation,
    ListingStats,
    PaginatedResponse,
} from '@/types';

class ListingService extends BaseService {
    constructor() {
        super('/listings');
    }

    async search(filters: SearchFilters): Promise<PaginatedResponse<ListingList>> {
        return this.get<PaginatedResponse<ListingList>>('/search/', filters);
    }

    async getRecommendations(limitPerType: number = 6): Promise<Recommendation[]> {
        return this.get<Recommendation[]>('/recommendations/', { limit_per_type: limitPerType });
    }

    async getPopularLocations(limit: number = 10): Promise<PopularLocation[]> {
        return this.get<PopularLocation[]>('/popular_locations/', { limit });
    }

    async getStats(): Promise<ListingStats> {
        return this.get<ListingStats>('/stats/');
    }

    async getSimilar(slug: string): Promise<ListingCard[]> {
        return this.get<ListingCard[]>(`/${slug}/similar/`);
    }

    async revealPhone(slug: string): Promise<void> {
        return this.post(`/${slug}/reveal_phone/`);
    }

    async submitInquiry(slug: string): Promise<void> {
        return this.post(`/${slug}/inquire/`);
    }

    async getBySlug(slug: string): Promise<ListingDetail> {
        return this.get<ListingDetail>(`/${slug}/`);
    }

    async createListing(data: ListingCreate): Promise<ListingDetail> {
        const formData = new FormData();

        // Append basic fields
        Object.keys(data).forEach((key) => {
            if (key === 'images' || key === 'image_data') return;

            const value = data[key as keyof ListingCreate];
            if (value !== undefined && value !== null) {
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        // Append images
        if (data.images) {
            data.images.forEach((image) => {
                formData.append('images', image);
            });
        }

        // Append image metadata
        if (data.image_data) {
            formData.append('image_data', JSON.stringify(data.image_data));
        }

        return this.upload<ListingDetail>('/', formData);
    }
}

export const listingService = new ListingService();