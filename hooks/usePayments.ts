import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '@/services/payment.service';

export const useMyPayments = () => {
  return useQuery({
    queryKey: ['myPayments'],
    queryFn: () => paymentService.getMyPayments(),
  });
};

export const useMakePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      paymentMethod,
      paymentReference,
    }: {
      paymentId: string;
      paymentMethod: string;
      paymentReference: string;
    }) => paymentService.makePayment(paymentId, paymentMethod, paymentReference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPayments'] });
    },
  });
};
