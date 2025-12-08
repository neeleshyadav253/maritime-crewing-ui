export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const daysBetween = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (expiryDate: string, daysThreshold: number = 30): boolean => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = daysBetween(today, expiry);
    return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
};

export const isExpired = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
};

export const getDaysRemaining = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return daysBetween(today, expiry);
};

export const calculateSeaTime = (services: Array<{ from: string; to: string }>): number => {
    return services.reduce((total, service) => {
        const from = new Date(service.from);
        const to = new Date(service.to);
        return total + daysBetween(from, to);
    }, 0);
};

export const formatDuration = (days: number): string => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);

    const parts = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (remainingDays % 30 > 0 && years === 0) {
        parts.push(`${remainingDays % 30} day${remainingDays % 30 !== 1 ? 's' : ''}`);
    }

    return parts.join(' ') || '0 days';
};