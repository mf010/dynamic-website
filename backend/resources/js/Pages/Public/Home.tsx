import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface Slider {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    button_text: string;
    button_link: string;
}

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
}

interface News {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    author?: { name: string };
}

interface Props {
    sliders: Slider[];
    services: Service[];
    latestNews: News[];
    settings: Record<string, string>;
}

export default function Home({ sliders, services, latestNews, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={settings.seo_title || 'الصفحة الرئيسية'} />

            {/* Hero Section / Slider */}
            <section className="relative bg-gray-900">
                {sliders.length > 0 ? (
                    <div className="relative h-[600px]">
                        <img
                            src={`/storage/${sliders[0].image}`}
                            alt={sliders[0].title || ''}
                            className="h-full w-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h1 className="text-4xl font-bold md:text-6xl">
                                    {sliders[0].title || settings.company_name}
                                </h1>
                                {sliders[0].subtitle && (
                                    <p className="mt-4 text-xl md:text-2xl">{sliders[0].subtitle}</p>
                                )}
                                {sliders[0].button_text && (
                                    <Link
                                        href={sliders[0].button_link || route('contact')}
                                        className="mt-8 inline-block rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white transition hover:bg-blue-700"
                                    >
                                        {sliders[0].button_text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[600px] items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                        <div className="text-center text-white">
                            <h1 className="text-4xl font-bold md:text-6xl">
                                {settings.company_name || 'مرحباً بكم'}
                            </h1>
                            <p className="mt-4 text-xl md:text-2xl">
                                {settings.company_description || 'نقدم أفضل الخدمات لعملائنا'}
                            </p>
                            <Link
                                href={route('contact')}
                                className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-gray-100"
                            >
                                تواصل معنا
                            </Link>
                        </div>
                    </div>
                )}
            </section>

            {/* About Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                من نحن
                            </h2>
                            <p className="mt-6 text-lg text-gray-600">
                                {settings.company_description || 'نحن شركة رائدة في مجالنا، نقدم خدمات متميزة وحلول مبتكرة لعملائنا. نسعى دائماً للتميز والإبداع في كل ما نقدمه.'}
                            </p>
                            <Link
                                href={route('about')}
                                className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                اقرأ المزيد
                                <svg className="mr-2 h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-blue-50 p-6 text-center">
                                <div className="text-4xl font-bold text-blue-600">+10</div>
                                <div className="mt-2 text-gray-600">سنوات خبرة</div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-6 text-center">
                                <div className="text-4xl font-bold text-green-600">+500</div>
                                <div className="mt-2 text-gray-600">عميل سعيد</div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-6 text-center">
                                <div className="text-4xl font-bold text-purple-600">+100</div>
                                <div className="mt-2 text-gray-600">مشروع مكتمل</div>
                            </div>
                            <div className="rounded-lg bg-orange-50 p-6 text-center">
                                <div className="text-4xl font-bold text-orange-600">24/7</div>
                                <div className="mt-2 text-gray-600">دعم فني</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            {services.length > 0 && (
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">خدماتنا</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                نقدم مجموعة متنوعة من الخدمات لتلبية احتياجاتكم
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={route('services.show', service.slug)}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    {service.image ? (
                                        <img
                                            src={`/storage/${service.image}`}
                                            alt={service.title}
                                            className="h-48 w-full object-cover transition group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-blue-100 text-6xl">
                                            {service.icon || '💼'}
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                                            {service.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600">{service.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href={route('services')}
                                className="inline-block rounded-md border-2 border-blue-600 px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
                            >
                                عرض جميع الخدمات
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Latest News Section */}
            {latestNews.length > 0 && (
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">آخر الأخبار</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                تابع آخر أخبار ومستجدات شركتنا
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {latestNews.map((news) => (
                                <Link
                                    key={news.id}
                                    href={route('news.show', news.slug)}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    {news.featured_image ? (
                                        <img
                                            src={`/storage/${news.featured_image}`}
                                            alt={news.title}
                                            className="h-48 w-full object-cover transition group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-gray-100 text-6xl">
                                            📰
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="text-sm text-gray-500">
                                            {news.published_at && new Date(news.published_at).toLocaleDateString('ar-SA')}
                                        </div>
                                        <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                                            {news.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 line-clamp-2">{news.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href={route('news')}
                                className="inline-block rounded-md border-2 border-blue-600 px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
                            >
                                عرض جميع الأخبار
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="bg-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white">
                        هل أنت مستعد للبدء؟
                    </h2>
                    <p className="mt-4 text-xl text-blue-100">
                        تواصل معنا اليوم ودعنا نساعدك في تحقيق أهدافك
                    </p>
                    <Link
                        href={route('contact')}
                        className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-gray-100"
                    >
                        تواصل معنا الآن
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
