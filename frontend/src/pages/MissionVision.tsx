import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/store'

const MissionVision = () => {
  const { language } = useLanguageStore()

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'الرؤية والرسالة - النخبة المتحدة' : 'Mission & Vision - The United Elite'}</title>
        <meta name="description" content={language === 'ar' ? 'رؤية ورسالة النخبة المتحدة - نسعى لأن نكون رائدين موثوقين في صناعة التدقيق والاستشارات المالية' : 'Mission & Vision of The United Elite - We strive to be trusted leaders in the auditing and financial consulting industry'} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8964C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="inline-block px-4 py-2 bg-secondary-500/20 backdrop-blur-sm text-secondary-400 text-sm font-medium rounded-full mb-6 border border-secondary-500/30">
              {language === 'ar' ? 'النخبة المتحدة' : 'The United Elite'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'ar' ? 'الرؤية والرسالة' : 'Mission & Vision'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'ar' 
                ? 'التزامنا بالتميز والنزاهة والابتكار في كل ما نقوم به'
                : 'Our commitment to excellence, integrity, and innovation in everything we do'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative">
        <div className="h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt={language === 'ar' ? 'فريق العمل' : 'Team Meeting'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 to-primary-900/60" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-1 bg-secondary-500"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                {language === 'ar' ? 'رسالتنا' : 'MISSION'}
              </h2>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 md:p-12 border-l-4 border-secondary-500">
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'في النخبة المتحدة، رسالتنا هي تقديم خدمات تدقيق ومحاسبة واستشارات مالية عالمية المستوى تلتزم بأعلى معايير الدقة والشفافية والامتثال. نحن ملتزمون بتمكين الشركات برؤى مالية استراتيجية، وضمان استقرارها وكفاءتها ونجاحها طويل الأمد. من خلال خبرتنا وتفانينا، نساعد عملاءنا على التنقل في التعقيدات المالية بثقة، مما يمكنهم من تحقيق النمو المستدام والتميز التشغيلي.'
                  : 'At Elite United, our mission is to provide world-class auditing, accounting, and financial consulting services that uphold the highest standards of accuracy, transparency, and compliance. We are committed to empowering businesses with strategic financial insights, ensuring their stability, efficiency, and long-term success. Through our expertise and dedication, we help our clients navigate financial complexities with confidence, enabling them to achieve sustainable growth and operational excellence.'}
              </p>
            </div>

            {/* Mission Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: '🎯',
                  title: language === 'ar' ? 'الدقة' : 'Accuracy',
                  description: language === 'ar' ? 'أعلى معايير الدقة في كل تفصيل' : 'Highest standards of accuracy in every detail'
                },
                {
                  icon: '🔍',
                  title: language === 'ar' ? 'الشفافية' : 'Transparency',
                  description: language === 'ar' ? 'شفافية كاملة في جميع تعاملاتنا' : 'Complete transparency in all our dealings'
                },
                {
                  icon: '✅',
                  title: language === 'ar' ? 'الامتثال' : 'Compliance',
                  description: language === 'ar' ? 'التزام تام بالمعايير واللوائح' : 'Full compliance with standards and regulations'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-custom">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent"></div>
      </div>

      {/* Vision Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-1 bg-primary-500"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                {language === 'ar' ? 'رؤيتنا' : 'VISION'}
              </h2>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 md:p-12 border-l-4 border-primary-500">
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'رؤيتنا هي أن نكون رائدين موثوقين في صناعة التدقيق والاستشارات المالية، معروفين بالتزامنا الراسخ بالنزاهة والاحترافية والابتكار. نهدف إلى وضع معايير جديدة في التميز المالي من خلال التطور المستمر مع ديناميكيات السوق، وتبني التقنيات المتطورة، وتعزيز ثقافة التميز. في النخبة المتحدة، نطمح أن نكون الشريك المفضل للشركات التي تسعى للوضوح المالي والمرونة والنجاح طويل الأمد في اقتصاد عالمي متغير باستمرار.'
                  : 'Our vision is to be a trusted leader in the auditing and financial consulting industry, recognized for our unwavering commitment to integrity, professionalism, and innovation. We aim to set new benchmarks in financial excellence by continuously evolving with market dynamics, embracing cutting-edge technologies, and fostering a culture of excellence. At Elite United, we aspire to be the preferred partner for businesses seeking financial clarity, resilience, and long-term success in an ever-changing global economy.'}
              </p>
            </div>

            {/* Vision Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: '🏆',
                  title: language === 'ar' ? 'الريادة' : 'Leadership',
                  description: language === 'ar' ? 'أن نكون رائدين موثوقين في مجالنا' : 'To be trusted leaders in our field'
                },
                {
                  icon: '💡',
                  title: language === 'ar' ? 'الابتكار' : 'Innovation',
                  description: language === 'ar' ? 'تبني أحدث التقنيات والمنهجيات' : 'Embracing cutting-edge technologies'
                },
                {
                  icon: '⭐',
                  title: language === 'ar' ? 'التميز' : 'Excellence',
                  description: language === 'ar' ? 'تعزيز ثقافة التميز في كل شيء' : 'Fostering a culture of excellence'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary-500 font-semibold mb-4 block">
              {language === 'ar' ? 'ما يميزنا' : 'What Sets Us Apart'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              {language === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🛡️',
                title: language === 'ar' ? 'النزاهة' : 'Integrity',
                description: language === 'ar' 
                  ? 'نلتزم بأعلى المعايير الأخلاقية في جميع تعاملاتنا'
                  : 'We uphold the highest ethical standards in all our dealings',
                color: 'border-secondary-500'
              },
              {
                icon: '📊',
                title: language === 'ar' ? 'الاحترافية' : 'Professionalism',
                description: language === 'ar'
                  ? 'نقدم خدمات متميزة بمستوى عالٍ من الاحترافية'
                  : 'We deliver exceptional services with a high level of professionalism',
                color: 'border-primary-500'
              },
              {
                icon: '🚀',
                title: language === 'ar' ? 'الابتكار' : 'Innovation',
                description: language === 'ar'
                  ? 'نتبنى أحدث التقنيات لتقديم حلول مبتكرة'
                  : 'We embrace the latest technologies to deliver innovative solutions',
                color: 'border-secondary-500'
              },
              {
                icon: '🤝',
                title: language === 'ar' ? 'الشراكة' : 'Partnership',
                description: language === 'ar'
                  ? 'نبني علاقات طويلة الأمد مبنية على الثقة'
                  : 'We build long-term relationships based on trust',
                color: 'border-primary-500'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-soft border-t-4 ${value.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{value.description}</p>
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
              {language === 'ar' ? 'هل أنت مستعد للشراكة معنا؟' : 'Ready to Partner With Us?'}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'دعنا نساعدك في تحقيق أهدافك المالية بثقة ونزاهة'
                : 'Let us help you achieve your financial goals with confidence and integrity'}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default MissionVision
