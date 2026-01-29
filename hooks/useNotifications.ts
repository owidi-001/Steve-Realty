import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export const useNotifications = (unreadOnly: boolean = false) => {
    return useQuery({
        queryKey: ['notifications', unreadOnly],
        queryFn: () => userService.getNotifications(unreadOnly),
    });
};

export const useMarkNotificationsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userService.markNotificationsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

