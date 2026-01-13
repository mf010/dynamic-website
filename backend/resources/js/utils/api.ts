import { router } from '@inertiajs/react';

/**
 * Reload current page data
 */
export function reloadPage(): void {
    router.reload();
}

/**
 * Navigate to URL
 */
export function navigateTo(url: string): void {
    router.visit(url);
}

/**
 * Navigate back
 */
export function goBack(): void {
    window.history.back();
}

/**
 * Post data using Inertia
 */
export function postData(
    url: string,
    data: Record<string, any>,
    options?: {
        onSuccess?: () => void;
        onError?: (errors: Record<string, string>) => void;
        preserveScroll?: boolean;
    }
): void {
    router.post(url, data, {
        preserveScroll: options?.preserveScroll ?? true,
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}

/**
 * Delete data using Inertia
 */
export function deleteData(
    url: string,
    options?: {
        onSuccess?: () => void;
        onError?: (errors: Record<string, string>) => void;
        preserveScroll?: boolean;
    }
): void {
    router.delete(url, {
        preserveScroll: options?.preserveScroll ?? true,
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}

/**
 * Update query parameters
 */
export function updateQueryParams(params: Record<string, any>): void {
    const url = new URL(window.location.href);
    
    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, String(value));
        }
    });

    router.visit(url.toString(), {
        preserveState: true,
        preserveScroll: true,
    });
}

/**
 * Get query parameter value
 */
export function getQueryParam(key: string): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
}
