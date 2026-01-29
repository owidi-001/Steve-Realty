
import { useState, useMemo } from 'react';
import { PaginatedResponse } from '@/types';

export const usePagination = <T,>(data?: PaginatedResponse<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginationInfo = useMemo(() => {
        if (!data) return null;

        return {
            currentPage: data.page,
            totalPages: data.total_pages,
            pageSize: data.page_size,
            totalCount: data.count,
            hasNext: !!data.next,
            hasPrevious: !!data.previous,
        };
    }, [data]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (paginationInfo?.hasNext) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const previousPage = () => {
        if (paginationInfo?.hasPrevious) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return {
        currentPage,
        paginationInfo,
        goToPage,
        nextPage,
        previousPage,
    };
};