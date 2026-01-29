import { ListingType, ListingCard } from "@/types";
import { BaseService } from "./base.service";

  class TypeService extends BaseService {
    constructor() {
      super('/listings/types');
    }
  
    async getByCategory(categorySlug: string): Promise<ListingType[]> {
      return this.get<ListingType[]>('/', { category: categorySlug });
    }
  
    async getListings(slug: string, limit: number = 20): Promise<ListingCard[]> {
      return this.get<ListingCard[]>(`/${slug}/listings/`, { limit });
    }
  }
  
  export const typeService = new TypeService();
  
  