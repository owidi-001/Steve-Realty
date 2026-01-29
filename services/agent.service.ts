import {
    AgentList,
    AgentReview,
    AgentStats,
    ListingCard,
    PaginatedResponse,
} from '@/types';
import { BaseService } from './base.service';

class AgentService extends BaseService {
    constructor() {
        super('/agents/agents');
    }

    async filter(params: {
        agent_type?: string;
        office?: string;
        specialization?: string;
        verified_only?: boolean;
        featured_only?: boolean;
    }): Promise<PaginatedResponse<AgentList>> {
        return this.list<AgentList>(params);
    }

    async getReviews(agentId: string, approvedOnly: boolean = true): Promise<AgentReview[]> {
        return this.get<AgentReview[]>(`/${agentId}/reviews/`, { approved_only: approvedOnly });
    }

    async submitReview(agentId: string, review: Partial<AgentReview>): Promise<AgentReview> {
        return this.post<AgentReview>(`/${agentId}/submit_review/`, review);
    }

    async getListings(agentId: string): Promise<ListingCard[]> {
        return this.get<ListingCard[]>(`/${agentId}/listings/`);
    }

    async getStats(agentId: string): Promise<AgentStats> {
        return this.get<AgentStats>(`/${agentId}/stats/`);
    }
}

export const agentService = new AgentService();

