import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, XMarkIcon, CloudArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import { adminNewsApi, uploadApi, getImageUrl } from '@/lib/api'

interface NewsImage {
  id?: number
  image: string
  isNew?: boolean
}

interface NewsFormData {
  title: string
  title_ar: string
  slug: string
  excerpt: string
  excerpt_ar: string
  content: string
  content_ar: string
  featured_image: string
  gallery_images: NewsImage[]
  category: string
  tags: string
  is_published: boolean
  is_featured: boolean
  published_at: string
  seo_title: string
  seo_description: string
}

const initialFormData: NewsFormData = {
  title: '',
  title_ar: '',
  slug: '',
  excerpt: '',
  excerpt_ar: '',
  content: '',
  content_ar: '',
  featured_image: '',
  gallery_images: [],
  category: '',
  tags: '',
  is_published: false,
  is_featured: false,
  published_at: new Date().toISOString().split('T')[0],
  seo_title: '',
  seo_description: '',
}

const NewsForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState<NewsFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Image upload states
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await handleImageUpload(files[0])
    }
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleImageUpload(files[0])
    }
  }

  const handleImageUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, featured_image: 'Please select an image file' }))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, featured_image: 'Image must be less than 5MB' }))
      return
    }

    setUploading(true)
    setErrors(prev => ({ ...prev, featured_image: '' }))

    try {
      const response = await uploadApi.uploadImage(file, 'news')
      const imagePath = response.data?.data?.path || response.data?.path
      
      if (imagePath) {
        setFormData(prev => ({ ...prev, featured_image: imagePath }))
      } else {
        throw new Error('No image path returned from server')
      }
    } catch (error: any) {
      console.error('Image upload error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload image'
      setErrors(prev => ({ ...prev, featured_image: errorMessage }))
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, featured_image: '' }))
  }

  // Gallery images handlers
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [galleryDragging, setGalleryDragging] = useState(false)

  const handleGalleryDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setGalleryDragging(true)
  }, [])

  const handleGalleryDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setGalleryDragging(false)
  }, [])

  const handleGalleryDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setGalleryDragging(false)

    const files = Array.from(e.dataTransfer.files)
    await handleGalleryUpload(files)
  }, [])

  const handleGalleryFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleGalleryUpload(Array.from(files))
    }
    // Reset input
    e.target.value = ''
  }

  const handleGalleryUpload = async (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'))
    if (imageFiles.length === 0) {
      setErrors(prev => ({ ...prev, gallery: 'Please select image files' }))
      return
    }

    setGalleryUploading(true)
    setErrors(prev => ({ ...prev, gallery: '' }))

    try {
      const uploadedImages: NewsImage[] = []
      
      for (const file of imageFiles) {
        if (file.size > 5 * 1024 * 1024) {
          console.warn(`Skipping ${file.name} - too large`)
          continue
        }
        
        const response = await uploadApi.uploadImage(file, 'news')
        const imagePath = response.data?.data?.path || response.data?.path
        
        if (imagePath) {
          uploadedImages.push({ image: imagePath, isNew: true })
        }
      }
      
      setFormData(prev => ({
        ...prev,
        gallery_images: [...prev.gallery_images, ...uploadedImages]
      }))
    } catch (error: any) {
      console.error('Gallery upload error:', error)
      setErrors(prev => ({ ...prev, gallery: 'Failed to upload some images' }))
    } finally {
      setGalleryUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }))
  }

  useEffect(() => {
    if (isEditing) {
      fetchNews()
    }
  }, [id])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const response = await adminNewsApi.getOne(id!)
      // Handle nested data structure
      const news = response.data?.data || response.data
      
      // Map existing images from Laravel
      const galleryImages: NewsImage[] = (news.images || []).map((img: any) => ({
        id: img.id,
        image: img.image,
        isNew: false
      }))
      
      setFormData({
        title: news.title || '',
        title_ar: news.title_ar || '',
        slug: news.slug || '',
        excerpt: news.excerpt || '',
        excerpt_ar: news.excerpt_ar || '',
        content: news.content || '',
        content_ar: news.content_ar || '',
        featured_image: news.featured_image || '',
        gallery_images: galleryImages,
        category: news.category || '',
        tags: Array.isArray(news.tags) ? news.tags.join(', ') : (news.tags || ''),
        is_published: news.is_published || false,
        is_featured: news.is_featured || false,
        published_at: news.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        seo_title: news.seo_title || '',
        seo_description: news.seo_description || '',
      })
    } catch (error) {
      console.error('Error fetching news:', error)
      alert('Failed to load the news article')
      navigate('/admin/news')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))

    // Auto-generate slug from title
    if (name === 'title' && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setSaving(true)
    try {
      // Only send fields that Laravel's News model accepts (fillable fields)
      // Based on Laravel model: user_id, title, slug, content, excerpt, featured_image, is_published, published_at, views
      // Note: slug is auto-generated by Laravel if not provided
      const data: Record<string, unknown> = {
        title: formData.title,
        content: formData.content,
      }
      
      // Add optional fields only if they have values and are in Laravel's fillable
      // Don't send slug on create - let Laravel auto-generate it to avoid duplicates
      if (isEditing && formData.slug) data.slug = formData.slug
      if (formData.excerpt) data.excerpt = formData.excerpt
      if (formData.featured_image) data.featured_image = formData.featured_image
      if (formData.published_at) data.published_at = formData.published_at
      data.is_published = formData.is_published
      
      // Include gallery images
      data.images = formData.gallery_images.map(img => img.image)

      if (isEditing) {
        await adminNewsApi.update(id!, data)
      } else {
        await adminNewsApi.create(data)
      }

      navigate('/admin/news')
    } catch (error: any) {
      console.error('Error saving news:', error)
      console.error('Error response:', error.response?.data)
      
      if (error.response?.data?.errors) {
        // Handle Laravel validation errors
        const laravelErrors: Record<string, string> = {}
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          laravelErrors[key] = Array.isArray(value) ? value[0] : String(value)
        })
        setErrors(laravelErrors)
      } else {
        // Show detailed error message
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.error 
          || error.message 
          || 'Failed to save the article'
        alert(`Error: ${errorMessage}`)
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
          onClick={() => navigate('/admin/news')}
          className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {isEditing ? 'Edit News' : 'Add News'}
          </h1>
          <p className="text-neutral-500">
            {isEditing ? 'Update the news article' : 'Create a new news article'}
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
                    placeholder="Enter article title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="Brief summary of the article"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    className={`input resize-none font-mono text-sm ${errors.content ? 'border-red-500' : ''}`}
                    placeholder="Write the article content (HTML supported)"
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
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
                    placeholder="أدخل عنوان المقال"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    الملخص
                  </label>
                  <textarea
                    name="excerpt_ar"
                    value={formData.excerpt_ar}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                    placeholder="ملخص موجز عن المقال"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    المحتوى
                  </label>
                  <textarea
                    name="content_ar"
                    value={formData.content_ar}
                    onChange={handleChange}
                    rows={12}
                    className="input resize-none font-mono text-sm"
                    placeholder="اكتب محتوى المقال (يدعم HTML)"
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
            {/* Publish Settings */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Publish Settings
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
                    placeholder="article-slug"
                  />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="published_at"
                    value={formData.published_at}
                    onChange={handleChange}
                    className="input"
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

            {/* Category & Tags */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Organization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Company News"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input"
                    placeholder="Comma separated tags"
                  />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Featured Image
              </h2>
              <div className="space-y-4">
                {/* Image Preview */}
                {formData.featured_image ? (
                  <div className="relative">
                    <img
                      src={getImageUrl(formData.featured_image) || formData.featured_image}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        // If getImageUrl fails, try the raw path
                        const img = e.target as HTMLImageElement
                        if (!img.src.includes(formData.featured_image)) {
                          img.src = formData.featured_image
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Drag and Drop Zone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      isDragging 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500'
                    } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <>
                        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mb-2" />
                        <p className="text-sm text-neutral-500">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-12 h-12 text-neutral-400 mb-2" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                          {isDragging ? 'Drop image here' : 'Drag & drop an image'}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          or click to browse
                        </p>
                        <p className="text-xs text-neutral-400 mt-2">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                )}
                
                {/* Error Message */}
                {errors.featured_image && (
                  <p className="text-red-500 text-sm">{errors.featured_image}</p>
                )}
                
                {/* Or enter URL manually */}
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2">Or enter image URL:</p>
                  <input
                    type="text"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleChange}
                    className="input text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Gallery Images
              </h2>
              <div className="space-y-4">
                {/* Existing Gallery Images */}
                {formData.gallery_images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {formData.gallery_images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={getImageUrl(img.image) || img.image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                          onError={(e) => {
                            const imgEl = e.target as HTMLImageElement
                            if (!imgEl.src.includes(img.image)) {
                              imgEl.src = img.image
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                          title="Remove image"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add More Images - Drag and Drop Zone */}
                <div
                  onDragOver={handleGalleryDragOver}
                  onDragLeave={handleGalleryDragLeave}
                  onDrop={handleGalleryDrop}
                  className={`relative w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    galleryDragging 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500'
                  } ${galleryUploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={galleryUploading}
                  />
                  {galleryUploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="text-xs text-neutral-500">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-8 h-8 text-neutral-400 mb-1" />
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {galleryDragging ? 'Drop images here' : 'Add gallery images'}
                      </p>
                      <p className="text-xs text-neutral-400">
                        Drag & drop or click (multiple)
                      </p>
                    </>
                  )}
                </div>
                
                {/* Error Message */}
                {errors.gallery && (
                  <p className="text-red-500 text-sm">{errors.gallery}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/news')}
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

export default NewsForm
