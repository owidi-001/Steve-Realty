import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { useListings } from './useListings';
import { SearchFilters } from '@/types';

export const useSearch = () => {
    const [filters, setFilters] = useState<SearchFilters>({});
    const debouncedFilters = useDebounce(filters, 500);

    const { data, isLoading, error } = useListings(debouncedFilters);

    const updateFilter = (key: keyof SearchFilters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    return {
        filters,
        updateFilter,
        resetFilters,
        results: data,
        isLoading,
        error,
    };
};
