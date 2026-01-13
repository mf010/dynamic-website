/**
 * Library exports
 * Central export point for all library modules
 */

// API Configuration and Services
export { default as api } from './api'
export {
  authApi,
  newsApi,
  adminNewsApi,
  usersApi,
  servicesApi,
  pagesApi,
  mediaApi,
  contactApi,
  settingsApi,
} from './api'

// Authentication Service
export { authService } from './auth'
export type { User, LoginCredentials, RegisterData, AuthResponse } from './auth'
