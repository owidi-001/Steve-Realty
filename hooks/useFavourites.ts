
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { favoriteService } from '@/services/favourite.service';

export const useFavorites = () => {
    return useQuery({
        queryKey: ['favorites'],
        queryFn: () => userService.getFavorites(),
    });
};

export const useCheckFavorite = (listingId: number) => {
    return useQuery({
        queryKey: ['favoriteCheck', listingId],
        queryFn: () => favoriteService.check(listingId),
        enabled: !!listingId,
    });
};

export const useToggleFavorite = () => {
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: favoriteService.add,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['favoriteCheck'] });
        },
    });

    const removeMutation = useMutation({
        mutationFn: favoriteService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['favoriteCheck'] });
        },
    });

    const toggleFavorite = async (listingId: number, favoriteId?: number | null) => {
        if (favoriteId) {
            await removeMutation.mutateAsync(favoriteId);
        } else {
            await addMutation.mutateAsync(listingId);
        }
    };

    return {
        toggleFavorite,
        isLoading: addMutation.isPending || removeMutation.isPending,
    };
};

