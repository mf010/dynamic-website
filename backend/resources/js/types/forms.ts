// Form types for admin pages

export interface NewsFormData {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    image?: File | null;
    is_published: boolean;
    published_at?: string;
    meta_title?: string;
    meta_description?: string;
}

export interface PageFormData {
    title: string;
    slug?: string;
    content: string;
    image?: File | null;
    is_published: boolean;
    order?: number;
    meta_title?: string;
    meta_description?: string;
}

export interface ServiceFormData {
    title: string;
    slug?: string;
    description?: string;
    content: string;
    image?: File | null;
    icon?: File | null;
    is_active: boolean;
    order?: number;
}

export interface SliderFormData {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: File | null;
    button_text?: string;
    button_link?: string;
    is_active: boolean;
    order?: number;
}

export interface UserFormData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    role: string;
    is_active: boolean;
    avatar?: File | null;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface SettingsFormData {
    [key: string]: string | boolean | number | File | null;
}

export interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
