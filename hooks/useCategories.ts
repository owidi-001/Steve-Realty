import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import { ListingCategory } from '@/types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.list<ListingCategory>(),
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.retrieve<ListingCategory>(slug),
    enabled: !!slug,
  });
};

export const useCategoryListings = (slug: string) => {
  return useQuery({
    queryKey: ['categoryListings', slug],
    queryFn: () => categoryService.getWithListings(slug),
    enabled: !!slug,
  });
};

