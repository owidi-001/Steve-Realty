import { useQuery } from '@tanstack/react-query';
import { commissionService } from '@/services/commission.service';

export const useMyCommissions = () => {
  return useQuery({
    queryKey: ['myCommissions'],
    queryFn: () => commissionService.getMyCommissions(),
  });
};
