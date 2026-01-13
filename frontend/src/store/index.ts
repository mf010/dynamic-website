import { create } from 'zustand'
import { Settings } from '@/types'
import { settingsApi } from '@/lib/api'
import { authService, User } from '@/lib/auth'

// ============================================
// AUTH STORE - Manages authentication state
// ============================================
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getUser(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login({ email, password })
      
      if (response.success) {
        set({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        return true
      } else {
        set({
          error: response.message || 'Login failed',
          isLoading: false,
        })
        return false
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials'
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      })
      return false
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    }
  },

  checkAuth: () => {
    const user = authService.getUser()
    const token = authService.getToken()
    set({
      user,
      token,
      isAuthenticated: !!token,
    })
  },

  clearError: () => set({ error: null }),
}))

// ============================================
// SETTINGS STORE - Manages site settings
// ============================================

// Default settings since Laravel API doesn't have a public settings endpoint
const defaultSettings: Settings = {
  site_name: 'Elite News',
  site_name_ar: 'إيليت نيوز',
  site_tagline: 'Your trusted news source',
  site_tagline_ar: 'مصدرك الموثوق للأخبار',
  site_description: 'Latest news and updates',
  contact_email: 'contact@example.com',
  contact_phone: '+1234567890',
}

interface SettingsState {
  settings: Settings
  isLoading: boolean
  error: string | null
  fetchSettings: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  isLoading: false,
  error: null,
  fetchSettings: async () => {
    // Settings API might not exist in Laravel, use defaults
    try {
      set({ isLoading: true, error: null })
      const response = await settingsApi.getAll()
      if (response.data?.data) {
        set({ settings: { ...defaultSettings, ...response.data.data }, isLoading: false })
      } else {
        set({ settings: defaultSettings, isLoading: false })
      }
    } catch (error) {
      // Use default settings if API fails
      console.log('Settings API not available, using defaults')
      set({ settings: defaultSettings, isLoading: false, error: null })
    }
  },
}))

// Language store
interface LanguageState {
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: (localStorage.getItem('language') as 'en' | 'ar') || 'en',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    set({ language: lang })
  },
  toggleLanguage: () => {
    set((state) => {
      const newLang = state.language === 'en' ? 'ar' : 'en'
      localStorage.setItem('language', newLang)
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = newLang
      return { language: newLang }
    })
  },
}))

// Theme store
interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme }
    })
  },
}))
