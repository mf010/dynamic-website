/**
 * Authentication Service
 * Handles all authentication-related operations for the admin panel
 * Works with Laravel Sanctum token-based authentication
 */

import api, { authApi } from './api'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  role?: string
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
  }
}

// Storage keys
const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'

/**
 * Authentication service with methods for login, logout, and session management
 */
export const authService = {
  /**
   * Login user with email and password
   * Stores the token and user data in localStorage
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.login(credentials)
    const data = response.data as AuthResponse

    if (data.success && data.data.token) {
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, data.data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.data.user))
    }

    return data
  },

  /**
   * Logout the current user
   * Clears local storage and calls the logout endpoint
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate the token on the server
      await authApi.logout()
    } catch (error) {
      // Even if the API call fails, we still want to clear local storage
      console.error('Logout API error:', error)
    } finally {
      // Always clear local storage
      this.clearAuth()
    }
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.register(data)
    const responseData = response.data as AuthResponse

    if (responseData.success && responseData.data.token) {
      // Store token and user data
      localStorage.setItem(TOKEN_KEY, responseData.data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(responseData.data.user))
    }

    return responseData
  },

  /**
   * Clear authentication data from storage
   */
  clearAuth(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  /**
   * Get stored user data
   */
  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
      try {
        return JSON.parse(userStr) as User
      } catch {
        return null
      }
    }
    return null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  /**
   * Verify if the current token is still valid
   * Call this on app init or when needed
   */
  async verifyToken(): Promise<boolean> {
    const token = this.getToken()
    if (!token) {
      return false
    }

    try {
      // Try to fetch user data to verify token
      const response = await api.get('/user')
      
      if (response.data) {
        // Update stored user data
        localStorage.setItem(USER_KEY, JSON.stringify(response.data))
        return true
      }
      return false
    } catch (error) {
      // Token is invalid, clear auth data
      this.clearAuth()
      return false
    }
  },

  /**
   * Update stored user data
   */
  updateUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
}

export default authService
