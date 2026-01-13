import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline'
import api from '@/lib/api'

interface ServiceFormData {
  title: string
  title_ar: string
  slug: string
  description: string
  description_ar: string
  content: string
  content_ar: string
  icon: string
  featured_image: string
  is_published: boolean
  is_featured: boolean
  order: number
  seo_title: string
  seo_description: string
}

const initialFormData: ServiceFormData = {
  title: '',
  title_ar: '',
  slug: '',
  description: '',
  description_ar: '',
  content: '',
  content_ar: '',
  icon: '',
  featured_image: '',
  is_published: false,
  is_featured: false,
  order: 0,
  seo_title: '',
  seo_description: '',
}

const ServicesForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState<ServiceFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEditing) {
      fetchService()
    }
  }, [id])

  const fetchService = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/admin/services/${id}`)
      const service = response.data.data
      setFormData({
        title: service.title || '',
        title_ar: service.title_ar || '',
        slug: service.slug || '',
        description: service.description || '',
        description_ar: service.description_ar || '',
        content: service.content || '',
        content_ar: service.content_ar || '',
        icon: service.icon || '',
        featured_image: service.featured_image || '',
        is_published: service.is_published || false,
        is_featured: service.is_featured || false,
        order: service.order || 0,
        seo_title: service.seo_title || '',
        seo_description: service.seo_description || '',
      })
    } catch (error) {
      console.error('Error fetching service:', error)
      alert('Failed to load the service')
      navigate('/admin/services')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))

    if (name === 'title' && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      if (isEditing) {
        await api.put(`/admin/services/${id}`, formData)
      } else {
        await api.post('/admin/services', formData)
      }
      navigate('/admin/services')
    } catch (error: any) {
      console.error('Error saving service:', error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        alert('Failed to save the service')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/services')}
          className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {isEditing ? 'Edit Service' : 'Add Service'}
          </h1>
          <p className="text-neutral-500">
            {isEditing ? 'Update the service' : 'Create a new service'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* English Content */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                English Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`input ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="Enter service title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="Brief description of the service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={10}
                    className="input resize-none font-mono text-sm"
                    placeholder="Detailed service content (HTML supported)"
                  />
                </div>
              </div>
            </div>

            {/* Arabic Content */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Arabic Content (العربية)
              </h2>
              <div className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleChange}
                    className="input"
                    placeholder="أدخل عنوان الخدمة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    الوصف المختصر
                  </label>
                  <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="وصف موجز للخدمة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    المحتوى الكامل
                  </label>
                  <textarea
                    name="content_ar"
                    value={formData.content_ar}
                    onChange={handleChange}
                    rows={10}
                    className="input resize-none font-mono text-sm"
                    placeholder="محتوى تفصيلي للخدمة (يدعم HTML)"
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                SEO Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleChange}
                    className="input"
                    placeholder="Custom title for search engines"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    SEO Description
                  </label>
                  <textarea
                    name="seo_description"
                    value={formData.seo_description}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="Meta description for search engines"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className={`input ${errors.slug ? 'border-red-500' : ''}`}
                    placeholder="service-slug"
                  />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="input"
                    placeholder="🔧"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="is_published" className="text-sm text-neutral-700 dark:text-neutral-300">
                    Published
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="is_featured" className="text-sm text-neutral-700 dark:text-neutral-300">
                    Featured
                  </label>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Featured Image
              </h2>
              {formData.featured_image ? (
                <img
                  src={formData.featured_image}
                  alt="Featured"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-4">
                  <PhotoIcon className="w-12 h-12 text-neutral-400" />
                </div>
              )}
              <input
                type="text"
                name="featured_image"
                value={formData.featured_image}
                onChange={handleChange}
                className="input"
                placeholder="Image URL"
              />
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Service' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/services')}
                  className="btn-outline w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ServicesForm
