// Permissions constants - matching Spatie Laravel Permission

export const PERMISSIONS = {
    // News
    VIEW_NEWS: 'view news',
    CREATE_NEWS: 'create news',
    EDIT_NEWS: 'edit news',
    DELETE_NEWS: 'delete news',
    MANAGE_NEWS: 'manage news',

    // Pages
    VIEW_PAGES: 'view pages',
    CREATE_PAGES: 'create pages',
    EDIT_PAGES: 'edit pages',
    DELETE_PAGES: 'delete pages',
    MANAGE_PAGES: 'manage pages',

    // Services
    VIEW_SERVICES: 'view services',
    CREATE_SERVICES: 'create services',
    EDIT_SERVICES: 'edit services',
    DELETE_SERVICES: 'delete services',
    MANAGE_SERVICES: 'manage services',

    // Sliders
    VIEW_SLIDERS: 'view sliders',
    CREATE_SLIDERS: 'create sliders',
    EDIT_SLIDERS: 'edit sliders',
    DELETE_SLIDERS: 'delete sliders',
    MANAGE_SLIDERS: 'manage sliders',

    // Contacts
    VIEW_CONTACTS: 'view contacts',
    DELETE_CONTACTS: 'delete contacts',
    MANAGE_CONTACTS: 'manage contacts',

    // Settings
    VIEW_SETTINGS: 'view settings',
    EDIT_SETTINGS: 'edit settings',
    MANAGE_SETTINGS: 'manage settings',

    // Users
    VIEW_USERS: 'view users',
    CREATE_USERS: 'create users',
    EDIT_USERS: 'edit users',
    DELETE_USERS: 'delete users',
    MANAGE_USERS: 'manage users',
} as const;

export const ROLES = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user',
} as const;

export const ROLE_LABELS: Record<string, string> = {
    admin: 'مدير',
    editor: 'محرر',
    user: 'مستخدم',
};

// Default permissions for each role
export const ROLE_PERMISSIONS: Record<string, string[]> = {
    admin: Object.values(PERMISSIONS),
    editor: [
        PERMISSIONS.VIEW_NEWS,
        PERMISSIONS.CREATE_NEWS,
        PERMISSIONS.EDIT_NEWS,
        PERMISSIONS.VIEW_PAGES,
        PERMISSIONS.EDIT_PAGES,
        PERMISSIONS.VIEW_SERVICES,
        PERMISSIONS.EDIT_SERVICES,
        PERMISSIONS.VIEW_SLIDERS,
        PERMISSIONS.EDIT_SLIDERS,
        PERMISSIONS.VIEW_CONTACTS,
        PERMISSIONS.VIEW_SETTINGS,
    ],
    user: [],
};

/**
 * Check if user has permission
 */
export function hasPermission(
    userPermissions: string[] | undefined,
    permission: string
): boolean {
    if (!userPermissions) return false;
    return userPermissions.includes(permission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(
    userPermissions: string[] | undefined,
    permissions: string[]
): boolean {
    if (!userPermissions) return false;
    return permissions.some((p) => userPermissions.includes(p));
}

/**
 * Check if user has all of the permissions
 */
export function hasAllPermissions(
    userPermissions: string[] | undefined,
    permissions: string[]
): boolean {
    if (!userPermissions) return false;
    return permissions.every((p) => userPermissions.includes(p));
}

/**
 * Check if user has role
 */
export function hasRole(
    userRoles: string[] | undefined,
    role: string
): boolean {
    if (!userRoles) return false;
    return userRoles.includes(role);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRoles: string[] | undefined): boolean {
    return hasRole(userRoles, ROLES.ADMIN);
}
