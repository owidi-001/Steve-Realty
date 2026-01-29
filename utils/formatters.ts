
export const formatPrice = (amount: number, currency: string = 'KES'): string => {
    return `${currency} ${amount.toLocaleString('en-KE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;
};

export const formatPriceShort = (amount: number, currency: string = 'KES'): string => {
    if (amount >= 1_000_000) {
        return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (amount >= 1_000) {
        return `${currency} ${(amount / 1_000).toFixed(0)}K`;
    }
    return `${currency} ${amount}`;
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatRelativeTime = (date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
};

export const formatPhoneNumber = (phone: string): string => {
    // Format +254712345678 to +254 712 345 678
    if (phone.startsWith('+254')) {
        return phone.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    }
    return phone;
};
