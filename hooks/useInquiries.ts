
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiryService } from '@/services/inquiry.service';

export const useSubmitInquiry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: inquiryService.submit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
};

