import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface News {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    views: number;
    author?: { name: string };
    images?: { id: number; image: string }[];
}

interface Props {
    news: News;
    relatedNews: News[];
    settings: Record<string, string>;
}

export default function NewsDetail({ news, relatedNews, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={news.title} />

            {/* Hero Image */}
            {news.featured_image && (
                <div className="relative h-[400px] bg-gray-900">
                    <img
                        src={`/storage/${news.featured_image}`}
                        alt={news.title}
                        className="h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
            )}

            {/* Content */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                            {news.published_at && new Date(news.published_at).toLocaleDateString('ar-SA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        {news.author && (
                            <>
                                <span>•</span>
                                <span>بواسطة: {news.author.name}</span>
                            </>
                        )}
                        <span>•</span>
                        <span>{news.views} مشاهدة</span>
                    </div>

                    {/* Title */}
                    <h1 className="mt-4 text-4xl font-bold text-gray-900">
                        {news.title}
                    </h1>

                    {/* Content */}
                    <div className="prose prose-lg mt-8 max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br>') }} />
                    </div>

                    {/* Gallery */}
                    {news.images && news.images.length > 0 && (
                        <div className="mt-12">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">صور الخبر</h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {news.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={`/storage/${image.image}`}
                                        alt=""
                                        className="h-40 w-full rounded-lg object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share */}
                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-semibold text-gray-900">شارك هذا الخبر</h3>
                        <div className="mt-4 flex gap-4">
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`}
                                target="_blank"
                                className="rounded-full bg-blue-400 p-3 text-white hover:bg-blue-500"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                className="rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`}
                                target="_blank"
                                className="rounded-full bg-green-500 p-3 text-white hover:bg-green-600"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related News */}
            {relatedNews.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900">أخبار ذات صلة</h2>
                        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedNews.map((item) => (
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
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                            {item.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
