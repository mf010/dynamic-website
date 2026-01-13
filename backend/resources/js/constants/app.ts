// Application constants

export const APP_NAME = 'إيليت للمقاولات';
export const APP_DESCRIPTION = 'شركة إيليت للمقاولات - خدمات البناء والتشييد';

export const PAGINATION = {
    DEFAULT_PER_PAGE: 15,
    OPTIONS: [10, 15, 25, 50, 100],
} as const;

export const FILE_UPLOAD = {
    MAX_IMAGE_SIZE_MB: 2,
    MAX_SLIDER_IMAGE_SIZE_MB: 4,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'],
    ALLOWED_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

export const DATE_FORMATS = {
    SHORT: 'YYYY-MM-DD',
    LONG: 'DD MMMM YYYY',
    WITH_TIME: 'DD MMMM YYYY HH:mm',
    TIME_ONLY: 'HH:mm',
} as const;

export const STATUS_OPTIONS = [
    { value: 'all', label: 'الكل' },
    { value: 'active', label: 'نشط' },
    { value: 'inactive', label: 'غير نشط' },
] as const;

export const PUBLISH_STATUS_OPTIONS = [
    { value: 'all', label: 'الكل' },
    { value: 'published', label: 'منشور' },
    { value: 'draft', label: 'مسودة' },
] as const;

export const ROLE_OPTIONS = [
    { value: 'admin', label: 'مدير' },
    { value: 'editor', label: 'محرر' },
    { value: 'user', label: 'مستخدم' },
] as const;

export const CONTACT_STATUS_OPTIONS = [
    { value: 'all', label: 'الكل' },
    { value: 'read', label: 'مقروء' },
    { value: 'unread', label: 'غير مقروء' },
] as const;

export const SETTING_TYPES = {
    TEXT: 'text',
    TEXTAREA: 'textarea',
    IMAGE: 'image',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    EMAIL: 'email',
    URL: 'url',
    JSON: 'json',
} as const;

export const SETTING_GROUPS = {
    GENERAL: 'general',
    COMPANY: 'company',
    SOCIAL: 'social',
    SEO: 'seo',
    CONTACT: 'contact',
} as const;

export const SETTING_GROUP_LABELS: Record<string, string> = {
    general: 'عام',
    company: 'معلومات الشركة',
    social: 'وسائل التواصل',
    seo: 'تحسين محركات البحث',
    contact: 'معلومات التواصل',
};
