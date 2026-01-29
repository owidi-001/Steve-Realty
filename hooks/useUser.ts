import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export const useUserFavorites = () => {
  return useQuery({
    queryKey: ['userFavorites'],
    queryFn: () => userService.getFavorites(),
  });
};

export const useUserSavedSearches = () => {
  return useQuery({
    queryKey: ['savedSearches'],
    queryFn: () => userService.getSavedSearches(),
  });
};

export const useUserInquiries = () => {
  return useQuery({
    queryKey: ['userInquiries'],
    queryFn: () => userService.getInquiries(),
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: () => userService.getStats(),
  });
};

export const useUserActivities = (activityType?: string) => {
  return useQuery({
    queryKey: ['userActivities', activityType],
    queryFn: () => userService.getActivities(activityType),
  });
};
