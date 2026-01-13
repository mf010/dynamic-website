/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Saudi phone number
 */
export function isValidSaudiPhone(phone: string): boolean {
    // Saudi phone: starts with 05 or +9665 or 009665
    const phoneRegex = /^(05|(\+?966|00966)5)\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate that string is not empty
 */
export function isNotEmpty(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && value.trim().length > 0;
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
    return value.length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
    return value.length <= maxLength;
}

/**
 * Validate file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
}

/**
 * Validate file size (in MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number): boolean {
    return file.size <= maxSizeMB * 1024 * 1024;
}

/**
 * Validate image file
 */
export function isValidImage(file: File, maxSizeMB: number = 2): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!isValidFileType(file, allowedTypes)) {
        return { valid: false, error: 'نوع الملف غير مدعوم' };
    }
    
    if (!isValidFileSize(file, maxSizeMB)) {
        return { valid: false, error: `حجم الملف يجب أن لا يتجاوز ${maxSizeMB} ميجابايت` };
    }
    
    return { valid: true };
}
