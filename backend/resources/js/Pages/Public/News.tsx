import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface News {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    views: number;
    author?: { name: string };
}

interface PaginatedNews {
    data: News[];
    links: any[];
    current_page: number;
    last_page: number;
}

interface Props {
    news: PaginatedNews;
    settings: Record<string, string>;
}

export default function News({ news, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title="الأخبار" />

            {/* Header */}
            <section className="bg-gray-900 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">الأخبار</h1>
                    <p className="mt-4 text-xl text-gray-300">
                        تابع آخر أخبار ومستجدات شركتنا
                    </p>
                </div>
            </section>

            {/* News Grid */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {news.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {news.data.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('news.show', item.slug)}
                                        className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                    >
                                        {item.featured_image ? (
                                            <img
                                                src={`/storage/${item.featured_image}`}
                                                alt={item.title}
                                                className="h-48 w-full object-cover transition group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-48 items-center justify-center bg-gray-100 text-6xl">
                                                📰
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>
                                                    {item.published_at && new Date(item.published_at).toLocaleDateString('ar-SA')}
                                                </span>
                                                <span>{item.views} مشاهدة</span>
                                            </div>
                                            <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-gray-600 line-clamp-2">{item.excerpt}</p>
                                            {item.author && (
                                                <div className="mt-4 text-sm text-gray-500">
                                                    بواسطة: {item.author.name}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {news.last_page > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {news.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded px-4 py-2 ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="text-6xl">📭</div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-900">لا توجد أخبار</h3>
                            <p className="mt-2 text-gray-600">لم يتم نشر أي أخبار بعد</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
