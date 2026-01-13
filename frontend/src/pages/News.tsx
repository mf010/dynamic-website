import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useSettingsStore, useLanguageStore } from '@/store'
import { newsApi } from '@/lib/api'
import { News as NewsType } from '@/types'

// Helper to get full image URL
const getImageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('data:')) return path
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'
  return `${baseUrl}/storage/${path}`
}

// Image Gallery Lightbox Component
interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        
        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeftIcon className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRightIcon className="w-10 h-10" />
            </button>
          </>
        )}
        
        {/* Image */}
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          src={images[currentIndex]}
          alt=""
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

const News = () => {
  const { settings } = useSettingsStore()
  const { language } = useLanguageStore()
  const [news, setNews] = useState<NewsType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => setLightboxOpen(false)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await newsApi.getCategories()
        if (response.data?.data) {
          setCategories(response.data.data)
        }
      } catch (error) {
        // Categories endpoint might not exist, silently fail
        console.log('Categories not available')
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      
      // Debug: Check if token exists
      const token = localStorage.getItem('admin_token')
      console.log('Fetching news, token exists:', !!token)
      
      try {
        const response = await newsApi.getAll({
          page,
          per_page: 9,
          search: search || undefined,
          category: category || undefined,
        })
        
        console.log('News API response:', response.data)
        
        // Handle different response structures from Laravel
        if (response.data?.data) {
          // If response has nested data (standard Laravel resource)
          setNews(Array.isArray(response.data.data) ? response.data.data : [response.data.data])
          // Handle pagination meta if available
          if (response.data?.meta) {
            setTotalPages(response.data.meta.last_page || 1)
          } else {
            setTotalPages(1)
          }
        } else if (Array.isArray(response.data)) {
          // Direct array response
          setNews(response.data)
          setTotalPages(1)
        } else {
          setNews([])
          setTotalPages(1)
        }
      } catch (error: any) {
        console.error('Error fetching news:', error)
        // Handle different error types gracefully for public page
        if (error.response?.status === 401) {
          setError(language === 'ar' 
            ? 'يرجى تسجيل الدخول لعرض الأخبار' 
            : 'Please login to view news')
        } else if (error.response?.status === 500) {
          setError(language === 'ar' 
            ? 'الأخبار غير متاحة حالياً' 
            : 'News is currently unavailable')
        } else {
          setError(language === 'ar' 
            ? 'حدث خطأ أثناء تحميل الأخبار' 
            : 'Error loading news')
        }
        setNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [page, search, category, language])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  // Ensure title is always a valid string
  const siteName = language === 'ar' ? (settings.site_name_ar || 'الموقع') : (settings.site_name || 'Site')
  const pageTitle = `${language === 'ar' ? 'الأخبار' : 'News'} - ${siteName}`

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-primary overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'ar' ? 'الأخبار' : 'News'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'ar' 
                ? 'تابع آخر أخبارنا وتحديثاتنا'
                : 'Stay updated with our latest news and updates'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="input ps-12"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setPage(1)
                }}
                className="input max-w-xs"
              >
                <option value="">{language === 'ar' ? 'جميع التصنيفات' : 'All Categories'}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section">
        <div className="container-custom">
          {/* Error Message */}
          {error && !loading && (
            <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-center">
              <p className="text-amber-700 dark:text-amber-400 text-lg mb-4">{error}</p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {language === 'ar' 
                  ? 'يمكنك تسجيل الدخول كمسؤول لإدارة الأخبار'
                  : 'You can login as admin to manage news'}
              </p>
              <Link 
                to="/admin/login" 
                className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Admin Login'}
              </Link>
            </div>
          )}
          {loading ? (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-64 bg-neutral-200 dark:bg-neutral-700" />
                  <div className="p-6">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-3" />
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-3" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <>
              {/* Lightbox */}
              {lightboxOpen && (
                <Lightbox
                  images={lightboxImages}
                  currentIndex={lightboxIndex}
                  onClose={closeLightbox}
                  onNext={nextImage}
                  onPrev={prevImage}
                />
              )}
              
              <motion.div
                className="flex flex-col gap-12 max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {news.map((item) => {
                  // Collect all images (featured + gallery)
                  const allImages: string[] = []
                  
                  // Add featured image
                  if (item.featured_image) {
                    const featuredUrl = getImageUrl(item.featured_image)
                    if (featuredUrl) allImages.push(featuredUrl)
                  }
                  
                  // Add gallery images from the images relationship
                  if (item.images && Array.isArray(item.images)) {
                    item.images.forEach((img: any) => {
                      const imgUrl = getImageUrl(img.image || img)
                      if (imgUrl) allImages.push(imgUrl)
                    })
                  }
                  
                  const hasImages = allImages.length > 0
                  const mainImage = allImages[0]
                  const galleryImages = allImages.slice(1)
                  
                  return (
                    <motion.div key={item.id} variants={fadeInUp}>
                      <article className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                        {/* Main Featured Image */}
                        {mainImage && (
                          <div 
                            className="relative h-80 md:h-[28rem] overflow-hidden cursor-pointer group"
                            onClick={() => openLightbox(allImages, 0)}
                          >
                            <img
                              src={mainImage}
                              alt={(language === 'ar' ? item.title_ar : item.title) || ''}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                const parent = (e.target as HTMLImageElement).parentElement
                                if (parent) parent.style.display = 'none'
                              }}
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Category badge */}
                            {item.category && (
                              <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-full">
                                {item.category}
                              </span>
                            )}
                            
                            {/* View indicator */}
                            {allImages.length > 1 && (
                              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 text-white text-sm rounded-full flex items-center gap-1.5">
                                <EyeIcon className="w-4 h-4" />
                                <span>{allImages.length} {language === 'ar' ? 'صور' : 'photos'}</span>
                              </div>
                            )}
                            
                            {/* Title overlay on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                              <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                  {item.published_at_formatted || (item.published_at ? new Date(item.published_at).toLocaleDateString() : '')}
                                </span>
                                {item.views !== undefined && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <EyeIcon className="w-4 h-4" />
                                    <span>{item.views} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                                  </>
                                )}
                              </div>
                              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                {language === 'ar' ? item.title_ar || item.title : item.title}
                              </h2>
                            </div>
                          </div>
                        )}
                        
                        {/* Gallery thumbnails */}
                        {galleryImages.length > 0 && (
                          <div className="px-6 md:px-8 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700">
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                              {galleryImages.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => openLightbox(allImages, idx + 1)}
                                  className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity ring-2 ring-transparent hover:ring-primary-500"
                                >
                                  <img
                                    src={img}
                                    alt={`Gallery ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="p-6 md:p-8">
                          {/* Title for articles without images */}
                          {!hasImages && (
                            <>
                              <div className="flex items-center gap-3 text-neutral-500 text-sm mb-3">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                  {item.published_at_formatted || (item.published_at ? new Date(item.published_at).toLocaleDateString() : '')}
                                </span>
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                                {language === 'ar' ? item.title_ar || item.title : item.title}
                              </h2>
                            </>
                          )}
                          
                          {/* Article content */}
                          <div 
                            className="text-neutral-700 dark:text-neutral-300 prose prose-lg prose-neutral dark:prose-invert max-w-none
                              prose-headings:text-neutral-900 dark:prose-headings:text-white
                              prose-p:leading-relaxed
                              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                              prose-img:rounded-xl prose-img:shadow-lg"
                            dangerouslySetInnerHTML={{ 
                              __html: language === 'ar' 
                                ? (item.content_ar || item.content || '') 
                                : (item.content || '')
                            }}
                          />
                        </div>
                      </article>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'ar' ? 'السابق' : 'Previous'}
                  </button>
                  <span className="flex items-center px-4 text-neutral-600 dark:text-neutral-400">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="btn-outline px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">
                {language === 'ar' ? 'لا توجد أخبار متاحة حالياً' : 'No news available at the moment'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default News
