import { useQuery } from '@tanstack/react-query';
import { partnerService } from '@/services/partners.service';
import { Partner } from '@/types';

export const usePartners = () => {
    return useQuery({
        queryKey: ['partners'],
        queryFn: () => partnerService.list<Partner>(),
    });
};
