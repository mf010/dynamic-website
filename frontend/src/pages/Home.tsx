import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useLanguageStore } from '@/store'

const Home = () => {
  const { language } = useLanguageStore()

  const ArrowIcon = language === 'ar' ? ArrowLeftIcon : ArrowRightIcon

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'النخبة المتحدة' : 'The United Elite'} - {language === 'ar' ? 'الرئيسية' : 'Home'}</title>
        <meta name="description" content={language === 'ar' ? 'خدمات التدقيق والمحاسبة والاستشارات المالية بأعلى معايير الاحترافية والنزاهة' : 'Exceptional Auditing, Accounting & Financial Consulting Services'} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8964C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 pt-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-secondary-500/20 backdrop-blur-sm text-secondary-400 text-sm font-medium rounded-full mb-8 border border-secondary-500/30">
                {language === 'ar' ? 'مرحباً بكم في' : 'Welcome to'}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {language === 'ar' ? 'النخبة المتحدة' : 'The United Elite'}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto"
            >
              {language === 'ar' 
                ? 'خدمات التدقيق والمحاسبة والاستشارات المالية'
                : 'Auditing, Accounting & Financial Consulting'}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-secondary-400 mb-10 max-w-2xl mx-auto"
            >
              {language === 'ar' 
                ? 'نقدم حلولاً مالية متميزة بأعلى معايير الاحترافية والنزاهة'
                : 'Delivering excellence with integrity, precision, and professionalism'}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/about" className="btn-secondary">
                {language === 'ar' ? 'من نحن' : 'About Us'}
                <ArrowIcon className="w-5 h-5 ms-2" />
              </Link>
              <Link to="/mission-vision" className="btn-white">
                {language === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Mission & Vision'}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-secondary-500/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-secondary-500/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* About Preview Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary-500 font-semibold mb-4 block">
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                {language === 'ar' 
                  ? 'ملتزمون بتقديم خدمات مالية استثنائية'
                  : 'Committed to Exceptional Financial Services'}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                {language === 'ar'
                  ? 'في النخبة المتحدة، نحن ملتزمون بتقديم خدمات التدقيق والمحاسبة والاستشارات المالية الاستثنائية بأعلى معايير الاحترافية والنزاهة. يجمع فريقنا من المهنيين ذوي الخبرة بين المعرفة العميقة بالصناعة والالتزام بالتميز.'
                  : 'At Elite United, we are dedicated to delivering exceptional auditing, accounting, and financial consulting services with the highest standards of professionalism and integrity. Our team of experienced professionals brings deep industry expertise and a commitment to excellence.'}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نحن متخصصون في التدقيق المالي، وإدارة المخاطر، والاستشارات الضريبية، والتخطيط المالي للشركات، لمساعدة الشركات على التنقل في المشهد المالي المعقد بثقة وامتثال.'
                  : 'We specialize in financial audits, risk management, tax advisory, and corporate financial planning, helping businesses navigate complex financial landscapes with confidence and compliance.'}
              </p>
              <Link to="/about" className="btn-primary">
                {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                <ArrowIcon className="w-5 h-5 ms-2" />
              </Link>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-hard">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt={language === 'ar' ? 'فريق العمل' : 'Our Team'}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">{language === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience'}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary-500 font-semibold mb-4 block">
              {language === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
            </span>
            <h2 className="section-title dark:text-white">
              {language === 'ar' ? 'شريكك الموثوق في النجاح المالي' : 'Your Trusted Partner in Financial Success'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: language === 'ar' ? 'الدقة' : 'Precision',
                description: language === 'ar' ? 'نضمن الدقة في كل تفصيل مالي' : 'We ensure accuracy in every financial detail'
              },
              {
                icon: '🛡️',
                title: language === 'ar' ? 'النزاهة' : 'Integrity',
                description: language === 'ar' ? 'نلتزم بأعلى المعايير الأخلاقية' : 'We uphold the highest ethical standards'
              },
              {
                icon: '💡',
                title: language === 'ar' ? 'الابتكار' : 'Innovation',
                description: language === 'ar' ? 'نتبنى أحدث التقنيات والمنهجيات' : 'We embrace cutting-edge technologies'
              },
              {
                icon: '🤝',
                title: language === 'ar' ? 'الشراكة' : 'Partnership',
                description: language === 'ar' ? 'نبني علاقات طويلة الأمد مع عملائنا' : 'We build long-term client relationships'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'ar' ? 'اكتشف المزيد عنا' : 'Discover More About Us'}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'تعرف على رؤيتنا ورسالتنا وكيف نساعد عملاءنا على النجاح'
                : 'Learn about our vision, mission, and how we help our clients succeed'}
            </p>
            <Link to="/mission-vision" className="btn-secondary">
              {language === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Mission & Vision'}
              <ArrowIcon className="w-5 h-5 ms-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
