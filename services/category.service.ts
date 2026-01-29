import { PaginatedResponse, ListingCard } from "@/types";
import { BaseService } from "./base.service";

class CategoryService extends BaseService {
    constructor() {
        super('/listings/categories');
    }

    async getWithListings(slug: string): Promise<PaginatedResponse<ListingCard>> {
        return this.get<PaginatedResponse<ListingCard>>(`/${slug}/listings/`);
    }

    async getStats(slug: string) {
        return this.get(`/${slug}/stats/`);
    }
}

export const categoryService = new CategoryService();