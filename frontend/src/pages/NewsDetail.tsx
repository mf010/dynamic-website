import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, CalendarIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline'
import { useSettingsStore, useLanguageStore } from '@/store'
import { newsApi, getImageUrl } from '@/lib/api'
import { News } from '@/types'

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const { settings } = useSettingsStore()
  const { language } = useLanguageStore()
  const [article, setArticle] = useState<News | null>(null)
  const [relatedNews, setRelatedNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const BackArrowIcon = language === 'ar' ? ArrowRightIcon : ArrowLeftIcon

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return
      setLoading(true)
      setError(null)
      try {
        const response = await newsApi.getBySlug(slug)
        // Handle nested data structure
        const articleData = response.data?.data || response.data
        setArticle(articleData)

        // Fetch related news
        try {
          const relatedResponse = await newsApi.getAll({
            per_page: 3,
            category: articleData?.category || undefined,
          })
          const relatedData = relatedResponse.data?.data || relatedResponse.data || []
          if (Array.isArray(relatedData)) {
            setRelatedNews(relatedData.filter((n: News) => n.slug !== slug).slice(0, 3))
          }
        } catch {
          // Related news is optional, don't fail if it doesn't work
          setRelatedNews([])
        }
      } catch (error: any) {
        console.error('Error fetching article:', error)
        if (error.response?.status === 401) {
          setError(language === 'ar' 
            ? 'يرجى تسجيل الدخول لعرض هذا المقال' 
            : 'Please login to view this article')
        } else if (error.response?.status === 404) {
          setError(language === 'ar' 
            ? 'المقال غير موجود' 
            : 'Article not found')
        } else {
          setError(language === 'ar' 
            ? 'حدث خطأ أثناء تحميل المقال' 
            : 'Error loading article')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug, language])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article ? (language === 'ar' ? article.title_ar || article.title : article.title) : '',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard')
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          {error || (language === 'ar' ? 'المقال غير موجود' : 'Article Not Found')}
        </h1>
        <Link to="/news" className="btn-primary">
          {language === 'ar' ? 'العودة للأخبار' : 'Back to News'}
        </Link>
      </div>
    )
  }

  const title = language === 'ar' ? article.title_ar || article.title : article.title
  const content = language === 'ar' ? article.content_ar || article.content : article.content

  return (
    <>
      <Helmet>
        <title>{title} - {language === 'ar' ? settings.site_name_ar : settings.site_name}</title>
        <meta name="description" content={(language === 'ar' ? article.excerpt_ar || article.excerpt : article.excerpt) || undefined} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-primary overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-white/70">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    {language === 'ar' ? 'الرئيسية' : 'Home'}
                  </Link>
                </li>
                <li><BackArrowIcon className="w-4 h-4 rotate-180" /></li>
                <li>
                  <Link to="/news" className="hover:text-white transition-colors">
                    {language === 'ar' ? 'الأخبار' : 'News'}
                  </Link>
                </li>
                <li><BackArrowIcon className="w-4 h-4 rotate-180" /></li>
                <li className="text-white truncate max-w-xs">{title}</li>
              </ol>
            </nav>

            {article.category && (
              <span className="badge-accent mb-4">
                {article.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {article.published_at_formatted}
              </span>
              {article.category && (
                <span className="flex items-center gap-2">
                  <TagIcon className="w-5 h-5" />
                  {article.category}
                </span>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <ShareIcon className="w-5 h-5" />
                {language === 'ar' ? 'مشاركة' : 'Share'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {article.featured_image && (
                <img
                  src={getImageUrl(article.featured_image) || article.featured_image}
                  alt={title}
                  className="w-full h-auto rounded-xl shadow-lg mb-8"
                />
              )}

              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">
                    {language === 'ar' ? 'الوسوم' : 'Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <aside>
              {/* Related News */}
              {relatedNews.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                    {language === 'ar' ? 'أخبار ذات صلة' : 'Related News'}
                  </h3>
                  <div className="space-y-6">
                    {relatedNews.map((item) => (
                      <Link
                        key={item.id}
                        to={`/news/${item.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          {item.featured_image && (
                            <img
                              src={getImageUrl(item.featured_image) || item.featured_image}
                              alt={language === 'ar' ? item.title_ar || item.title : item.title}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                              {language === 'ar' ? item.title_ar || item.title : item.title}
                            </h4>
                            <p className="text-sm text-neutral-500 mt-1">
                              {item.published_at_formatted}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Back to News */}
              <div className="mt-8">
                <Link
                  to="/news"
                  className="btn-outline w-full justify-center"
                >
                  <BackArrowIcon className="w-5 h-5 me-2" />
                  {language === 'ar' ? 'العودة للأخبار' : 'Back to News'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsDetail
