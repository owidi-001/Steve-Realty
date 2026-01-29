import { BaseService } from './base.service';
import {
    User,
    UserLogin,
    UserRegistration,
    AuthResponse,
    ChangePassword,
} from '@/types';

class AuthService extends BaseService {
    constructor() {
        super('/users');
    }

    async login(credentials: UserLogin): Promise<AuthResponse> {
        const response = await this.post<AuthResponse>('/login/', credentials);
        // Store token and user
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
    }

    async register(data: UserRegistration): Promise<AuthResponse> {
        const response = await this.post<AuthResponse>('/', data);
        // Store token and user
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
    }

    async logout(): Promise<void> {
        await this.post('/logout/');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    async getCurrentUser(): Promise<User> {
        return this.get<User>('/me/');
    }

    async updateProfile(data: Partial<User>): Promise<User> {
        const user = this.getLocalUser();
        return this.put<User>(`/${user?.id}/`, data);
    }

    async changePassword(data: ChangePassword): Promise<void> {
        return this.post('/change_password/', data);
    }

    getLocalUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}

export const authService = new AuthService();
