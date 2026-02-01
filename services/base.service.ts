import { AxiosResponse } from 'axios';
import api from './api';
import { PaginatedResponse } from '@/types';

export class BaseService {
    protected baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string = '', params?: any): Promise<T> {
        const response: AxiosResponse<T> = await api.get(
            `${this.baseURL}${endpoint}`,
            { params }
        );
        console.log("API RESPONSE: ")
        console.log(response);
        console.log("END API RESPOSE")
        return response.data;
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string = '', data?: any): Promise<T> {
        const response: AxiosResponse<T> = await api.post(
            `${this.baseURL}${endpoint}`,
            data
        );
        return response.data;
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string = '', data?: any): Promise<T> {
        const response: AxiosResponse<T> = await api.put(
            `${this.baseURL}${endpoint}`,
            data
        );
        return response.data;
    }

    /**
     * PATCH request
     */
    async patch<T>(endpoint: string = '', data?: any): Promise<T> {
        const response: AxiosResponse<T> = await api.patch(
            `${this.baseURL}${endpoint}`,
            data
        );
        return response.data;
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string = ''): Promise<T> {
        const response: AxiosResponse<T> = await api.delete(
            `${this.baseURL}${endpoint}`
        );
        return response.data;
    }

    /**
     * Upload file with FormData
     */
    async upload<T>(endpoint: string = '', formData: FormData): Promise<T> {
        const response: AxiosResponse<T> = await api.post(
            `${this.baseURL}${endpoint}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }

    /**
     * Generic list with pagination
     */
    async list<T>(params?: any): Promise<PaginatedResponse<T>> {
        return this.get<PaginatedResponse<T>>('/', params);
    }

    /**
     * Generic retrieve by ID
     */
    async retrieve<T>(id: string | number): Promise<T> {
        return this.get<T>(`/${id}/`);
    }

    /**
     * Generic create
     */
    async create<T>(data: any): Promise<T> {
        return this.post<T>('/', data);
    }

    /**
     * Generic update
     */
    async update<T>(id: string | number, data: any): Promise<T> {
        return this.put<T>(`/${id}/`, data);
    }

    /**
     * Generic partial update
     */
    async partialUpdate<T>(id: string | number, data: any): Promise<T> {
        return this.patch<T>(`/${id}/`, data);
    }

    /**
     * Generic delete
     */
    async destroy(id: string | number): Promise<void> {
        return this.delete(`/${id}/`);
    }
}