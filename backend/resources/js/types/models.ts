// Model types matching Laravel models

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    email_verified_at?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    permissions?: Permission[];
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface News {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    image: string;
    is_published: boolean;
    published_at?: string | null;
    views: number;
    meta_title?: string | null;
    meta_description?: string | null;
    created_at: string;
    updated_at: string;
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    image?: string | null;
    is_published: boolean;
    order: number;
    meta_title?: string | null;
    meta_description?: string | null;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    description?: string | null;
    content: string;
    image: string;
    icon?: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Slider {
    id: number;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    image: string;
    button_text?: string | null;
    button_link?: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject: string;
    message: string;
    read_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface Setting {
    id: number;
    key: string;
    value?: string | null;
    type: SettingType;
    group: SettingGroup;
    label?: string | null;
    description?: string | null;
    created_at: string;
    updated_at: string;
}

export type SettingType = 'text' | 'textarea' | 'image' | 'boolean' | 'number' | 'email' | 'url' | 'json';
export type SettingGroup = 'general' | 'company' | 'social' | 'seo' | 'contact';
