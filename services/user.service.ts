import {
    FavoriteListing,
    SavedSearch,
    Inquiry,
    Notification,
    UserStats,
    UserActivity,
} from '@/types';
import { BaseService } from './base.service';

class UserService extends BaseService {
    constructor() {
        super('/users');
    }

    async getFavorites(): Promise<FavoriteListing[]> {
        return this.get<FavoriteListing[]>('/favorites/');
    }

    async getSavedSearches(): Promise<SavedSearch[]> {
        return this.get<SavedSearch[]>('/saved_searches/');
    }

    async getInquiries(): Promise<Inquiry[]> {
        return this.get<Inquiry[]>('/inquiries/');
    }

    async getNotifications(unreadOnly: boolean = false): Promise<Notification[]> {
        return this.get<Notification[]>('/notifications/', { unread_only: unreadOnly });
    }

    async markNotificationsRead(notificationIds: number[]): Promise<void> {
        return this.post('/mark_notifications_read/', { notification_ids: notificationIds });
    }

    async getActivities(activityType?: string): Promise<UserActivity[]> {
        return this.get<UserActivity[]>('/activities/', { activity_type: activityType });
    }

    async getStats(): Promise<UserStats> {
        return this.get<UserStats>('/stats/');
    }
}

export const userService = new UserService();

