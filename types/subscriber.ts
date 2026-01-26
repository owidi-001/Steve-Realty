export interface ISubscriber {
    id: string;
    email: string;
    firstName?: string;       // For personalized "Hi [Name]" emails
    interests: string[];      // e.g., ['electronics', 'shoes']
    subscribedAt: Date;
    status: 'active' | 'unsubscribed' | 'bounced';
    source: string;           // e.g., 'footer-popup', 'checkout-page'
    consentVersion: string;   // For legal/GDPR compliance
    lastInteractionAt: Date;  // To identify "cold" leads
}

export class Subscriber implements ISubscriber {
    id: string;
    email: string;
    firstName?: string;
    interests: string[];
    subscribedAt: Date;
    status: 'active' | 'unsubscribed' | 'bounced';
    source: string;
    consentVersion: string;
    lastInteractionAt: Date;

    constructor(data: Partial<ISubscriber> & { id: string; email: string }) {
        this.id = data.id;
        // Standardize email to lowercase for uniqueness
        this.email = data.email.toLowerCase().trim();
        this.firstName = data.firstName;
        this.interests = data.interests || [];
        this.subscribedAt = data.subscribedAt || new Date();
        this.status = data.status || 'active';
        this.source = data.source || 'website';
        this.consentVersion = data.consentVersion || 'v1.0';
        this.lastInteractionAt = data.lastInteractionAt || new Date();
    }

}

// --- Logic Helpers ---

/** * Useful for the marketing team to prune lists
 * Returns true if user hasn't opened an email in 6 months
 */
export function isColdLead(subscriber: Subscriber): boolean {
    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;
    return (new Date().getTime() - subscriber.lastInteractionAt.getTime()) > SIX_MONTHS_MS;
}

export function displayName(subscriber: Subscriber): string {
    return subscriber.firstName || subscriber.email.split('@')[0];
}
