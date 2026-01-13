// Common types

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface MenuItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    active?: boolean;
    children?: MenuItem[];
    permission?: string;
}

export interface TableColumn<T = any> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    className?: string;
}

export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}

export interface FilterConfig {
    key: string;
    value: string | number | boolean;
    operator?: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'like' | 'in';
}

export interface DashboardStats {
    totalNews: number;
    totalPages: number;
    totalServices: number;
    totalContacts: number;
    unreadContacts: number;
    totalUsers: number;
    recentNews?: import('./models').News[];
    recentContacts?: import('./models').Contact[];
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    duration?: number;
}
