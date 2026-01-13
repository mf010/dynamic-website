/**
 * Format date to Arabic locale string
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    };
    
    return new Date(date).toLocaleDateString('ar-SA', defaultOptions);
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format relative time (e.g., "منذ 5 دقائق")
 */
export function formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'الآن';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `منذ ${diffInDays} يوم`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `منذ ${diffInMonths} شهر`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `منذ ${diffInYears} سنة`;
}

/**
 * Format number with Arabic locale
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('ar-SA').format(num);
}

/**
 * Format currency (SAR by default)
 */
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 بايت';

    const units = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

/**
 * Slugify Arabic text
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s\u0600-\u06FF]+/g, '-') // Replace Arabic chars and spaces with dash
        .replace(/[^\w\-]+/g, '') // Remove non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple dashes with single
        .replace(/^-+/, '') // Trim dash from start
        .replace(/-+$/, ''); // Trim dash from end
}
