import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Get the API base URL from environment variables
// In development: http://localhost:8000/api
// In production: your production API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Note: withCredentials is not needed for Bearer token auth
  // Only needed for cookie-based auth (Laravel Sanctum SPA mode)
})

// Request interceptor - adds auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handles auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

// ============================================
// AUTH API - For admin login/logout
// ============================================
export const authApi = {
  // Login - POST /api/login
  login: (credentials: { email: string; password: string }) => 
    api.post('/login', credentials),
  
  // Logout - POST /api/logout (requires authentication)
  logout: () => 
    api.post('/logout'),
  
  // Register - POST /api/register (if you allow registration)
  register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post('/register', data),
  
  // Get current user (you may need to add this endpoint to Laravel)
  getUser: () => 
    api.get('/user'),
}

// ============================================
// NEWS API - Public endpoints
// ============================================
export const newsApi = {
  // Get all news - GET /api/news (public, but requires auth per your Laravel routes)
  getAll: (params?: Record<string, unknown>) => 
    api.get('/news', { params }),
  
  // Get single news by ID or slug
  getOne: (idOrSlug: string) => 
    api.get(`/news/${idOrSlug}`),
  
  // Alias for getOne
  getBySlug: (slug: string) => 
    api.get(`/news/${slug}`),
  
  // These endpoints may need to be added to Laravel if needed
  getFeatured: () => 
    api.get('/news', { params: { featured: true } }),
  
  getCategories: () => 
    api.get('/news/categories'),
  
  getRelated: (slug: string) => 
    api.get(`/news/${slug}/related`),
}

// ============================================
// ADMIN NEWS API - Protected endpoints
// ============================================
export const adminNewsApi = {
  // Get all news for admin
  getAll: (params?: Record<string, unknown>) => 
    api.get('/news', { params }),
  
  // Get single news
  getOne: (id: number | string) => 
    api.get(`/news/${id}`),
  
  // Create news - POST /api/news
  create: (data: Record<string, unknown>) => 
    api.post('/news', data),
  
  // Update news - PUT /api/news/{id}
  update: (id: number | string, data: Record<string, unknown>) => 
    api.put(`/news/${id}`, data),
  
  // Delete news - DELETE /api/news/{id}
  delete: (id: number | string) => 
    api.delete(`/news/${id}`),
}

// ============================================
// USERS API - Protected endpoints
// ============================================
export const usersApi = {
  // Get all users
  getAll: (params?: Record<string, unknown>) => 
    api.get('/users', { params }),
  
  // Get single user
  getOne: (id: number | string) => 
    api.get(`/users/${id}`),
  
  // Create user
  create: (data: Record<string, unknown>) => 
    api.post('/users', data),
  
  // Update user
  update: (id: number | string, data: Record<string, unknown>) => 
    api.put(`/users/${id}`, data),
  
  // Delete user
  delete: (id: number | string) => 
    api.delete(`/users/${id}`),
}

// ============================================
// SERVICES API - For future use
// ============================================
export const servicesApi = {
  getAll: (params?: Record<string, unknown>) => 
    api.get('/services', { params }),
  getOne: (slug: string) => 
    api.get(`/services/${slug}`),
  getFeatured: () => 
    api.get('/services/featured'),
}

// ============================================
// PAGES API - For future use
// ============================================
export const pagesApi = {
  getAll: () => 
    api.get('/pages'),
  getOne: (slug: string) => 
    api.get(`/pages/${slug}`),
}

// ============================================
// MEDIA API - For future use
// ============================================
export const mediaApi = {
  getAll: (params?: Record<string, unknown>) => 
    api.get('/media', { params }),
  getGallery: (params?: Record<string, unknown>) => 
    api.get('/media/gallery', { params }),
  getVideos: (params?: Record<string, unknown>) => 
    api.get('/media/videos', { params }),
  getCollections: () => 
    api.get('/media/collections'),
}

// ============================================
// CONTACT API - Public endpoint
// ============================================
export const contactApi = {
  send: (data: Record<string, unknown>) => 
    api.post('/contact', data),
}

// ============================================
// SETTINGS API - For future use
// ============================================
export const settingsApi = {
  getAll: () => 
    api.get('/settings'),
}

// ============================================
// UPLOAD API - For file uploads
// ============================================
export const uploadApi = {
  // Upload a single image
  uploadImage: (file: File, directory: string = 'news') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('directory', directory)
    
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  // Upload multiple images
  uploadImages: (files: File[], directory: string = 'news') => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
    })
    formData.append('directory', directory)
    
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  // Delete an uploaded file
  deleteImage: (path: string) => 
    api.delete('/upload/image', { data: { path } }),
}

// Helper to get full image URL from storage path
export const getImageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null
  if (path.startsWith('http')) return path
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'
  return `${baseUrl}/storage/${path}`
}
