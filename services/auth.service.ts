import { BaseService } from './base.service';
import {
    User,
    UserLogin,
    UserRegistration,
    AuthResponse,
    ChangePassword,
} from '@/types';

// Helper to check if we're in the browser
const isBrowser = typeof window !== 'undefined';

class AuthService extends BaseService {
    constructor() {
        super('/users');
    }

    async login(credentials: UserLogin): Promise<AuthResponse> {
        try {
            const response = await this.post<AuthResponse>('/login/', credentials);

            // Store token and user
            if (response.token && response.user && isBrowser) {
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }

            return response;
        } catch (error: any) {
            // Re-throw with better error message
            if (error.response?.status === 401) {
                throw new Error('Invalid email or password');
            } else if (error.response?.status === 400) {
                const errorMsg = error.response.data?.detail ||
                    error.response.data?.non_field_errors?.[0] ||
                    'Invalid credentials';
                throw new Error(errorMsg);
            }
            throw error;
        }
    }

    async register(data: UserRegistration): Promise<AuthResponse> {
        try {
            const response = await this.post<AuthResponse>('/', data);

            // Store token and user
            if (response.token && response.user && isBrowser) {
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }

            return response;
        } catch (error: any) {
            if (error.response?.status === 400) {
                const errorData = error.response.data;

                // Handle field-specific errors
                if (errorData.email) {
                    throw new Error(`Email: ${errorData.email[0]}`);
                }
                if (errorData.password) {
                    throw new Error(`Password: ${errorData.password[0]}`);
                }
                if (errorData.non_field_errors) {
                    throw new Error(errorData.non_field_errors[0]);
                }
            }
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.post('/logout/');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local storage
            this.clearAuthData();
        }
    }

    async getCurrentUser(): Promise<User> {
        try {
            return await this.get<User>('/me/');
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.clearAuthData();
            }
            throw error;
        }
    }

    async updateProfile(data: Partial<User>): Promise<User> {
        const user = this.getLocalUser();
        if (!user) {
            throw new Error('No user logged in');
        }

        const updatedUser = await this.put<User>(`/${user.id}/`, data);

        // Update local storage
        if (isBrowser) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        return updatedUser;
    }

    async changePassword(data: ChangePassword): Promise<void> {
        try {
            return await this.post('/change_password/', data);
        } catch (error: any) {
            if (error.response?.status === 400) {
                const errorData = error.response.data;

                if (errorData.old_password) {
                    throw new Error('Current password is incorrect');
                }
                if (errorData.new_password) {
                    throw new Error(`New password: ${errorData.new_password[0]}`);
                }
                if (errorData.non_field_errors) {
                    throw new Error(errorData.non_field_errors[0]);
                }
            }
            throw error;
        }
    }

    getLocalUser(): User | null {
        if (!isBrowser) return null;

        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    }

    getToken(): string | null {
        if (!isBrowser) return null;
        return localStorage.getItem('auth_token');
    }

    isAuthenticated(): boolean {
        if (!isBrowser) return false;
        return !!this.getToken();
    }

    clearAuthData(): void {
        if (!isBrowser) return;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }
}

export const authService = new AuthService();