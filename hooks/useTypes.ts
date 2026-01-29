import { typeService } from "@/services/type.service";
import { ListingType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTypes = (categorySlug?: string) => {
    return useQuery<ListingType[]>({
        queryKey: ['types', categorySlug],
    });
}


export const useType = (slug: string) => {
    return useQuery({
        queryKey: ['type', slug],
        queryFn: () => typeService.retrieve<ListingType>(slug),
        enabled: !!slug,
    });
};

export const useTypeListings = (slug: string, limit: number = 20) => {
    return useQuery({
        queryKey: ['typeListings', slug, limit],
        queryFn: () => typeService.getListings(slug, limit),
        enabled: !!slug,
    });
};
