import { useQuery } from '@tanstack/react-query';
import { officeService } from '@/services/office.service';
import { Office } from '@/types';

export const useOffices = () => {
  return useQuery({
    queryKey: ['offices'],
    queryFn: () => officeService.list<Office>(),
  });
};

export const useOffice = (slug: string) => {
  return useQuery({
    queryKey: ['office', slug],
    queryFn: () => officeService.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useOfficeAgents = (slug: string) => {
  return useQuery({
    queryKey: ['officeAgents', slug],
    queryFn: () => officeService.getAgents(slug),
    enabled: !!slug,
  });
};

export const useOfficeListings = (slug: string) => {
  return useQuery({
    queryKey: ['officeListings', slug],
    queryFn: () => officeService.getListings(slug),
    enabled: !!slug,
  });
};
