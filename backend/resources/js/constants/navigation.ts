// Navigation constants

export const PUBLIC_NAV_ITEMS = [
    { label: 'الرئيسية', href: '/' },
    { label: 'من نحن', href: '/about' },
    { label: 'خدماتنا', href: '/services' },
    { label: 'الأخبار', href: '/news' },
    { label: 'تواصل معنا', href: '/contact' },
] as const;

export const ADMIN_NAV_ITEMS = [
    {
        label: 'لوحة التحكم',
        href: '/admin',
        icon: 'dashboard',
        permission: null,
    },
    {
        label: 'الأخبار',
        href: '/admin/news',
        icon: 'news',
        permission: 'manage news',
    },
    {
        label: 'الصفحات',
        href: '/admin/pages',
        icon: 'pages',
        permission: 'manage pages',
    },
    {
        label: 'الخدمات',
        href: '/admin/services',
        icon: 'services',
        permission: 'manage services',
    },
    {
        label: 'السلايدر',
        href: '/admin/sliders',
        icon: 'sliders',
        permission: 'manage sliders',
    },
    {
        label: 'الرسائل',
        href: '/admin/contacts',
        icon: 'contacts',
        permission: 'manage contacts',
    },
    {
        label: 'الإعدادات',
        href: '/admin/settings',
        icon: 'settings',
        permission: 'manage settings',
    },
    {
        label: 'المستخدمين',
        href: '/admin/users',
        icon: 'users',
        permission: 'manage users',
    },
] as const;

export const ADMIN_SIDEBAR_FOOTER_ITEMS = [
    {
        label: 'الملف الشخصي',
        href: '/profile',
        icon: 'user',
    },
    {
        label: 'زيارة الموقع',
        href: '/',
        icon: 'external',
        external: true,
    },
] as const;

export const SOCIAL_LINKS = [
    { name: 'facebook', label: 'فيسبوك', icon: 'facebook' },
    { name: 'twitter', label: 'تويتر', icon: 'twitter' },
    { name: 'instagram', label: 'انستغرام', icon: 'instagram' },
    { name: 'linkedin', label: 'لينكد إن', icon: 'linkedin' },
    { name: 'youtube', label: 'يوتيوب', icon: 'youtube' },
    { name: 'whatsapp', label: 'واتساب', icon: 'whatsapp' },
] as const;
