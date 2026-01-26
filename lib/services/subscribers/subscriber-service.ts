// 'use client';

// import { BaseService } from '../base-service';
// import { db } from '@/lib/firebase/firebase';
// import { Subscriber } from '@/types/subscriber';
// import {
//     addDoc,
//     collection,
//     updateDoc,
//     doc,
//     deleteDoc,
//     getDocs,
//     orderBy,
//     query,
//     where,
//     serverTimestamp,
//     getDoc,
//     setDoc,
//     writeBatch
// } from 'firebase/firestore';

// export class SubscriberService extends BaseService<Subscriber> {
//     private static instance: SubscriberService;

//     private constructor() {
//         super('subscribers', 'subscribedAt');
//     }

//     static getInstance(): SubscriberService {
//         if (!SubscriberService.instance) {
//             SubscriberService.instance = new SubscriberService();
//         }
//         return SubscriberService.instance;
//     }

//     protected transformData(docId: string, data: any): Subscriber {
//         return new Subscriber({
//             id: docId,
//             email: data.email || '',
//             firstName: data.firstName,
//             interests: Array.isArray(data.interests) ? data.interests : [],
//             status: data.status || 'active',
//             source: data.source || 'website',
//             consentVersion: data.consentVersion || 'v1.0',
//             subscribedAt: data.subscribedAt?.toDate?.() || new Date(),
//             lastInteractionAt: data.lastInteractionAt?.toDate?.() || new Date(),
//         });
//     }

//     async fetchAll(): Promise<void> {
//         if (this.loading) return;

//         this.loading = true;
//         try {
//             const q = query(
//                 collection(db, this.collectionName),
//                 orderBy(this.orderField, 'desc')
//             );

//             const snapshot = await getDocs(q);
//             this.data.clear();

//             snapshot.forEach((doc) => {
//                 const subscriber = this.transformData(doc.id, doc.data());
//                 this.data.set(doc.id, subscriber);
//             });

//             this.initialized = true;
//             this.notifyListeners();
//         } catch (error) {
//             console.error(`Failed to fetch ${this.collectionName}:`, error);
//             throw error;
//         } finally {
//             this.loading = false;
//         }
//     }

//     // --- NEW METHODS ---

//     // Check if email already exists
//     async emailExists(email: string): Promise<boolean> {
//         const normalizedEmail = email.toLowerCase().trim();
//         const q = query(
//             collection(db, this.collectionName),
//             where('email', '==', normalizedEmail)
//         );

//         const snapshot = await getDocs(q);
//         return !snapshot.empty;
//     }

//     // Get subscriber by email
//     getByEmail(email: string): Subscriber | undefined {
//         const normalizedEmail = email.toLowerCase().trim();
//         return this.getAll().find(sub => sub.email === normalizedEmail);
//     }

//     // Get subscribers by status (returns array, not single)
//     getByStatus(status: 'active' | 'unsubscribed' | 'bounced'): Subscriber[] {
//         return this.getAll().filter(subscriber => subscriber.status === status);
//     }

//     // Get active subscribers
//     getActiveSubscribers(): Subscriber[] {
//         return this.getByStatus('active');
//     }

//     // Get cold leads (inactive for 6+ months)
//     getColdLeads(): Subscriber[] {
//         const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;
//         const sixMonthsAgo = new Date(Date.now() - SIX_MONTHS_MS);

//         return this.getActiveSubscribers().filter(sub =>
//             sub.lastInteractionAt < sixMonthsAgo
//         );
//     }

//     // Get subscribers by interest
//     getByInterest(interest: string): Subscriber[] {
//         return this.getActiveSubscribers().filter(sub =>
//             sub.interests.includes(interest)
//         );
//     }

//     // Get subscribers by source
//     getBySource(source: string): Subscriber[] {
//         return this.getAll().filter(sub =>
//             sub.source === source
//         );
//     }

//     // Validate email format
//     private isValidEmail(email: string): boolean {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     // // Subscribe a new user (with validation)
//     async subscribeUser(data: {
//         email: string;
//         firstName?: string;
//         interests?: string[];
//         source?: string;
//         consentVersion?: string;
//     }): Promise<{ success: boolean; message: string; id?: string }> {
//         try {
//             // Validate email
//             const email = data.email.toLowerCase().trim();
//             if (!this.isValidEmail(email)) {
//                 return { success: false, message: 'Invalid email address' };
//             }

//             // Check if already subscribed
//             const exists = await this.emailExists(email);
//             if (exists) {
//                 return { success: false, message: 'Email already subscribed' };
//             }

//             // Create subscriber
//             const subscriberData = {
//                 email,
//                 firstName: data.firstName,
//                 interests: data.interests || [],
//                 status: 'active' as const,
//                 source: data.source || 'website',
//                 consentVersion: data.consentVersion || 'v1.0',
//                 subscribedAt: serverTimestamp(),
//                 lastInteractionAt: serverTimestamp(),
//             };

//             const docRef = await addDoc(collection(db, this.collectionName), subscriberData);

//             // Refresh data
//             await this.refresh();

//             return {
//                 success: true,
//                 message: 'Successfully subscribed!',
//                 id: docRef.id
//             };

//         } catch (error) {
//             console.error('Failed to subscribe:', error);
//             return { success: false, message: 'Subscription failed. Please try again.' };
//         }
//     }

//     // Unsubscribe user (soft delete)
//     async unsubscribe(email: string): Promise<boolean> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (!subscriber) {
//                 return false;
//             }

//             await this.update(subscriber.id, {
//                 status: 'unsubscribed',
//                 lastInteractionAt: new Date()
//             });

//             return true;
//         } catch (error) {
//             console.error('Failed to unsubscribe:', error);
//             return false;
//         }
//     }

//     // Resubscribe user
//     async resubscribe(email: string): Promise<boolean> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (!subscriber) {
//                 return false;
//             }

//             await this.update(subscriber.id, {
//                 status: 'active',
//                 lastInteractionAt: new Date()
//             });

//             return true;
//         } catch (error) {
//             console.error('Failed to resubscribe:', error);
//             return false;
//         }
//     }

//     // Mark email as bounced
//     async markAsBounced(email: string): Promise<void> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (subscriber) {
//                 await this.update(subscriber.id, {
//                     status: 'bounced',
//                     lastInteractionAt: new Date()
//                 });
//             }
//         } catch (error) {
//             console.error('Failed to mark as bounced:', error);
//         }
//     }

//     // Update last interaction time
//     async updateLastInteraction(email: string): Promise<void> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (subscriber) {
//                 await this.update(subscriber.id, {
//                     lastInteractionAt: new Date()
//                 });
//             }
//         } catch (error) {
//             console.error('Failed to update last interaction:', error);
//         }
//     }

//     // Add interest to subscriber
//     async addInterest(email: string, interest: string): Promise<boolean> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (!subscriber) {
//                 return false;
//             }

//             if (!subscriber.interests.includes(interest)) {
//                 const updatedInterests = [...subscriber.interests, interest];
//                 await this.update(subscriber.id, {
//                     interests: updatedInterests,
//                     lastInteractionAt: new Date()
//                 });
//             }

//             return true;
//         } catch (error) {
//             console.error('Failed to add interest:', error);
//             return false;
//         }
//     }

//     // Remove interest from subscriber
//     async removeInterest(email: string, interest: string): Promise<boolean> {
//         try {
//             const normalizedEmail = email.toLowerCase().trim();
//             const subscriber = this.getByEmail(normalizedEmail);

//             if (!subscriber) {
//                 return false;
//             }

//             const updatedInterests = subscriber.interests.filter(i => i !== interest);
//             await this.update(subscriber.id, {
//                 interests: updatedInterests,
//                 lastInteractionAt: new Date()
//             });

//             return true;
//         } catch (error) {
//             console.error('Failed to remove interest:', error);
//             return false;
//         }
//     }

//     // Get statistics
//     getStats() {
//         const all = this.getAll();
//         const active = this.getActiveSubscribers();
//         const coldLeads = this.getColdLeads();

//         // Interest statistics
//         const interestStats: Record<string, number> = {};
//         active.forEach(sub => {
//             sub.interests.forEach(interest => {
//                 interestStats[interest] = (interestStats[interest] || 0) + 1;
//             });
//         });

//         // Source statistics
//         const sourceStats: Record<string, number> = {};
//         all.forEach(sub => {
//             sourceStats[sub.source] = (sourceStats[sub.source] || 0) + 1;
//         });

//         return {
//             total: all.length,
//             active: active.length,
//             unsubscribed: all.filter(s => s.status === 'unsubscribed').length,
//             bounced: all.filter(s => s.status === 'bounced').length,
//             coldLeads: coldLeads.length,
//             engagementRate: active.length > 0 ?
//                 ((active.length - coldLeads.length) / active.length * 100).toFixed(1) + '%' : '0%',
//             interests: interestStats,
//             sources: sourceStats,
//         };
//     }

//     // Export subscribers (for CSV download)
//     async exportSubscribers(format: 'csv' | 'json' = 'csv'): Promise<string> {
//         const subscribers = this.getActiveSubscribers();

//         if (format === 'json') {
//             return JSON.stringify(subscribers, null, 2);
//         }

//         // CSV format
//         const headers = ['Email', 'First Name', 'Interests', 'Status', 'Source', 'Subscribed At', 'Last Interaction'];
//         const rows = subscribers.map(sub => [
//             sub.email,
//             sub.firstName || '',
//             sub.interests.join('; '),
//             sub.status,
//             sub.source,
//             sub.subscribedAt.toISOString(),
//             sub.lastInteractionAt.toISOString()
//         ]);

//         const csvContent = [
//             headers.join(','),
//             ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
//         ].join('\n');

//         return csvContent;
//     }

//     // Batch unsubscribe (for admin use)
//     async batchUnsubscribe(emails: string[]): Promise<{ success: number; failed: number }> {
//         let success = 0;
//         let failed = 0;

//         for (const email of emails) {
//             try {
//                 const result = await this.unsubscribe(email);
//                 if (result) {
//                     success++;
//                 } else {
//                     failed++;
//                 }
//             } catch {
//                 failed++;
//             }
//         }

//         return { success, failed };
//     }

//     // Batch delete (for admin use)
//     async batchDelete(ids: string[]): Promise<{ success: number; failed: number }> {
//         let success = 0;
//         let failed = 0;

//         for (const id of ids) {
//             try {
//                 await this.delete(id);
//                 success++;
//             } catch {
//                 failed++;
//             }
//         }

//         return { success, failed };
//     }

//     // Import subscribers from CSV/JSON
//     async importSubscribers(
//         data: Array<{
//             email: string;
//             firstName?: string;
//             interests?: string[];
//             source?: string;
//         }>
//     ): Promise<{ success: number; failed: number; errors: string[] }> {
//         let success = 0;
//         let failed = 0;
//         const errors: string[] = [];

//         for (const item of data) {
//             try {
//                 const email = item.email.toLowerCase().trim();

//                 // Validate email
//                 if (!this.isValidEmail(email)) {
//                     failed++;
//                     errors.push(`${item.email}: Invalid email address`);
//                     continue;
//                 }

//                 // Check if already subscribed
//                 const exists = await this.emailExists(email);
//                 if (exists) {
//                     failed++;
//                     errors.push(`${item.email}: Email already subscribed`);
//                     continue;
//                 }

//                 // Create subscriber
//                 const subscriberData = new Subscriber({
//                     id: '',
//                     email,
//                     firstName: item.firstName,
//                     interests: item.interests || [],
//                     status: 'active',
//                     source: item.source || 'import',
//                     consentVersion: 'v1.0',
//                     subscribedAt: new Date(),
//                     lastInteractionAt: new Date()
//                 });

//                 await this.create(subscriberData);
//                 success++;
//             } catch (error: any) {
//                 failed++;
//                 errors.push(`${item.email}: ${error.message}`);
//             }
//         }

//         return { success, failed, errors };
//     }

//     // Fetch subscribers with pagination
//     async fetchWithPagination(
//         limit: number,
//         lastDoc?: any
//     ): Promise<{ subscribers: Subscriber[]; lastDoc: any }> {
//         let q = query(
//             collection(db, this.collectionName),
//             orderBy('subscribedAt', 'desc'),
//             ...(lastDoc ? [] : [])
//         );

//         const snapshot = await getDocs(q);
//         const subscribers: Subscriber[] = [];

//         snapshot.forEach((doc) => {
//             const subscriber = this.transformData(doc.id, doc.data());
//             subscribers.push(subscriber);
//         });

//         return {
//             subscribers: subscribers.slice(0, limit),
//             lastDoc: snapshot.docs[snapshot.docs.length - 1]
//         };
//     }

//     // Search subscribers
//     searchSubscribers(query: string): Subscriber[] {
//         const searchTerm = query.toLowerCase();
//         return this.getAll().filter(sub =>
//             sub.email.toLowerCase().includes(searchTerm) ||
//             (sub.firstName && sub.firstName.toLowerCase().includes(searchTerm)) ||
//             sub.interests.some(interest => interest.toLowerCase().includes(searchTerm))
//         );
//     }

//     // Get subscriber count by date range
//     async getCountByDateRange(startDate: Date, endDate: Date): Promise<number> {
//         const q = query(
//             collection(db, this.collectionName),
//             where('subscribedAt', '>=', startDate),
//             where('subscribedAt', '<=', endDate)
//         );

//         const snapshot = await getDocs(q);
//         return snapshot.size;
//     }

//     // Get growth statistics (daily/weekly/monthly)
//     async getGrowthStats(): Promise<{
//         daily: number;
//         weekly: number;
//         monthly: number;
//     }> {
//         const now = new Date();
//         const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
//         const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//         const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//         const [daily, weekly, monthly] = await Promise.all([
//             this.getCountByDateRange(oneDayAgo, now),
//             this.getCountByDateRange(oneWeekAgo, now),
//             this.getCountByDateRange(oneMonthAgo, now)
//         ]);

//         return { daily, weekly, monthly };
//     }

//     // Keep existing methods with improved implementation
//     async create(data: Omit<Subscriber, 'id'>): Promise<string> {
//         try {
//             const docRef = await addDoc(collection(db, this.collectionName), {
//                 ...data,
//                 subscribedAt: serverTimestamp(),
//                 lastInteractionAt: serverTimestamp()
//             });

//             await this.refresh();
//             return docRef.id;
//         } catch (error) {
//             console.error('Failed to create subscriber:', error);
//             throw error;
//         }
//     }

//     async update(id: string, data: Partial<Subscriber>): Promise<void> {
//         try {
//             await updateDoc(doc(db, this.collectionName, id), {
//                 ...data,
//                 lastInteractionAt: serverTimestamp()
//             });

//             // Update local cache
//             if (this.data.has(id)) {
//                 const existing = this.data.get(id)!;
//                 const updated = new Subscriber({
//                     ...existing,
//                     ...data,
//                     id
//                 });
//                 this.data.set(id, updated);
//                 this.notifyListeners();
//             }
//         } catch (error) {
//             console.error('Failed to update subscriber:', error);
//             throw error;
//         }
//     }

//     async delete(id: string): Promise<void> {
//         try {
//             await deleteDoc(doc(db, this.collectionName, id));
//             this.data.delete(id);
//             this.notifyListeners();
//         } catch (error) {
//             console.error('Failed to delete subscriber:', error);
//             throw error;
//         }
//     }
// }

// export const subscriberService = SubscriberService.getInstance();
