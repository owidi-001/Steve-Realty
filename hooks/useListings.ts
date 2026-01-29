
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '@/services/listing.service';
import { SearchFilters, ListingCreate } from '@/types';

export const useListings = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => listingService.search(filters || {}),
  });
};

export const useListing = (slug: string) => {
  return useQuery({
    queryKey: ['listing', slug],
    queryFn: () => listingService.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useRecommendations = (limitPerType: number = 6) => {
  return useQuery({
    queryKey: ['recommendations', limitPerType],
    queryFn: () => listingService.getRecommendations(limitPerType),
  });
};

export const usePopularLocations = (limit: number = 10) => {
  return useQuery({
    queryKey: ['popularLocations', limit],
    queryFn: () => listingService.getPopularLocations(limit),
  });
};

export const useSimilarListings = (slug: string) => {
  return useQuery({
    queryKey: ['similarListings', slug],
    queryFn: () => listingService.getSimilar(slug),
    enabled: !!slug,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listingService.createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ListingCreate> }) =>
      listingService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['listing', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => listingService.destroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

