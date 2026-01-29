import { AgentList, ListingCard, Office } from "@/types";
import { BaseService } from "./base.service";

class OfficeService extends BaseService {
  constructor() {
    super('/agents/offices');
  }

  async getAgents(slug: string): Promise<AgentList[]> {
    return this.get<AgentList[]>(`/${slug}/agents/`);
  }

  async getListings(slug: string): Promise<ListingCard[]> {
    return this.get<ListingCard[]>(`/${slug}/listings/`);
  }

  async getBySlug(slug: string): Promise<Office> {
    return this.get<Office>(`/${slug}/`);
  }
}

export const officeService = new OfficeService();

