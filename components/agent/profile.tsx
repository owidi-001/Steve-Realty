'use client';

import { useAgent, useAgentReviews, useAgentStats } from '@/hooks/useAgents';

export default function AgentProfilePage({ agentId }: { agentId: string }) {
    const { data: agent } = useAgent(agentId);
    const { data: reviews } = useAgentReviews(agentId);
    const { data: stats } = useAgentStats(agentId);

    return (
        <div>
            <h1>{agent?.name}</h1>
            <p>Rating: {agent?.average_rating} / 5.0</p>
            <p>Active Listings: {stats?.active_listings}</p>

            <h2>Reviews</h2>
            {reviews?.map((review) => (
                <div key={review.id}>
                    <p>{review.rating} stars - {review.title}</p>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
    );
}