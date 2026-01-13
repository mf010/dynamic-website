import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HomeIcon } from '@heroicons/react/24/outline'
import { useSettingsStore, useLanguageStore } from '@/store'

const NotFound = () => {
  const { settings } = useSettingsStore()
  const { language } = useLanguageStore()

  return (
    <>
      <Helmet>
        <title>404 - {language === 'ar' ? settings.site_name_ar : settings.site_name}</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            >
              <span className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-accent-500 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold text-primary-600/10 leading-none select-none blur-2xl">
                404
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </motion.h1>

            <motion.p
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {language === 'ar' 
                ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
                : 'Sorry, the page you are looking for does not exist or has been moved.'}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
                <HomeIcon className="w-5 h-5" />
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline"
              >
                {language === 'ar' ? 'الصفحة السابقة' : 'Go Back'}
              </button>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default NotFound
