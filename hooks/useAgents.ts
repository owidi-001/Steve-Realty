
import { useQuery } from '@tanstack/react-query';
import { agentService } from '@/services/agent.service';
import { Agent } from '@/types';

export const useAgents = (filters?: any) => {
    return useQuery({
        queryKey: ['agents', filters],
        queryFn: () => agentService.filter(filters || {}),
    });
};

export const useAgent = (agentId: string) => {
    return useQuery({
        queryKey: ['agent', agentId],
        queryFn: () => agentService.retrieve<Agent>(agentId),
        enabled: !!agentId,
    });
};

export const useAgentReviews = (agentId: string) => {
    return useQuery({
        queryKey: ['agentReviews', agentId],
        queryFn: () => agentService.getReviews(agentId),
        enabled: !!agentId,
    });
};

export const useAgentStats = (agentId: string) => {
    return useQuery({
        queryKey: ['agentStats', agentId],
        queryFn: () => agentService.getStats(agentId),
        enabled: !!agentId,
    });
};

