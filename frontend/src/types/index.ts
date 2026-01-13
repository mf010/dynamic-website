// API Types

export interface NewsImage {
  id: number
  image: string
  news_id: number
}

export interface News {
  id: number
  title: string
  title_ar: string | null
  slug: string
  excerpt: string | null
  excerpt_ar: string | null
  content: string
  content_ar: string | null
  featured_image: string | null
  images?: NewsImage[]
  category: string | null
  tags: string[] | null
  is_featured: boolean
  is_published: boolean
  published_at: string | null
  published_at_formatted: string | null
  views: number
  author?: {
    id: number
    name: string
    avatar: string
  }
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  title_ar: string | null
  slug: string
  description: string | null
  description_ar: string | null
  content: string | null
  content_ar: string | null
  icon: string | null
  image: string | null
  price: number | null
  formatted_price: string | null
  currency: string
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Page {
  id: number
  title: string
  title_ar: string | null
  slug: string
  content: string | null
  content_ar: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  template: string
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Media {
  id: number
  title: string | null
  title_ar: string | null
  description: string | null
  description_ar: string | null
  filename: string
  url: string
  mime_type: string
  type: 'image' | 'video' | 'document'
  size: number
  formatted_size: string
  width: number | null
  height: number | null
  alt_text: string | null
  collection: string | null
  is_featured: boolean
  is_public: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // Additional properties used in Gallery
  thumbnail_url?: string
  file_url?: string
}

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export interface Settings {
  site_name?: string
  site_name_ar?: string
  site_tagline?: string
  site_tagline_ar?: string
  site_description?: string
  site_logo?: string
  site_logo_dark?: string
  site_favicon?: string
  contact_email?: string
  contact_phone?: string
  contact_address?: string
  contact_address_ar?: string
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_linkedin?: string
  social_youtube?: string
  primary_color?: string
  secondary_color?: string
  accent_color?: string
  currency?: string
  currency_symbol?: string
  // Additional settings used in Contact page
  address?: string
  address_ar?: string
  phone?: string
  email?: string
  working_hours?: string
  working_hours_ar?: string
  google_maps_url?: string
  google_maps_embed?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  message_ar?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
