import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    total_news: number;
    published_news: number;
    total_pages: number;
    total_services: number;
    total_users: number;
    unread_contacts: number;
}

interface News {
    id: number;
    title: string;
    is_published: boolean;
    created_at: string;
    author?: { name: string };
}

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    latestNews: News[];
    latestContacts: Contact[];
}

export default function Dashboard({ stats, latestNews, latestContacts }: Props) {
    const statCards = [
        { name: 'إجمالي الأخبار', value: stats.total_news, icon: '📰', color: 'bg-blue-500' },
        { name: 'أخبار منشورة', value: stats.published_news, icon: '✅', color: 'bg-green-500' },
        { name: 'الصفحات', value: stats.total_pages, icon: '📄', color: 'bg-purple-500' },
        { name: 'الخدمات', value: stats.total_services, icon: '💼', color: 'bg-yellow-500' },
        { name: 'المستخدمين', value: stats.total_users, icon: '👥', color: 'bg-indigo-500' },
        { name: 'رسائل غير مقروءة', value: stats.unread_contacts, icon: '✉️', color: 'bg-red-500' },
    ];

    return (
        <AdminLayout header="لوحة التحكم">
            <Head title="لوحة التحكم" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat) => (
                    <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-md ${stat.color} text-2xl text-white`}>
                                    {stat.icon}
                                </div>
                                <div className="mr-5">
                                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest News & Contacts */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Latest News */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">آخر الأخبار</h3>
                            <Link
                                href={route('admin.news.index')}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                عرض الكل
                            </Link>
                        </div>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {latestNews.length > 0 ? (
                            latestNews.map((news) => (
                                <li key={news.id} className="px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 truncate">
                                            <Link
                                                href={route('admin.news.edit', news.id)}
                                                className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                            >
                                                {news.title}
                                            </Link>
                                            <p className="text-xs text-gray-500">
                                                بواسطة {news.author?.name || 'غير معروف'}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                news.is_published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {news.is_published ? 'منشور' : 'مسودة'}
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-8 text-center text-gray-500">
                                لا توجد أخبار بعد
                            </li>
                        )}
                    </ul>
                </div>

                {/* Latest Contacts */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">رسائل جديدة</h3>
                            <Link
                                href={route('admin.contacts.index')}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                عرض الكل
                            </Link>
                        </div>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {latestContacts.length > 0 ? (
                            latestContacts.map((contact) => (
                                <li key={contact.id} className="px-4 py-4">
                                    <Link
                                        href={route('admin.contacts.show', contact.id)}
                                        className="block hover:bg-gray-50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 truncate">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {contact.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {contact.subject || 'بدون موضوع'}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(contact.created_at).toLocaleDateString('ar-SA')}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-8 text-center text-gray-500">
                                لا توجد رسائل جديدة
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">إجراءات سريعة</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Link
                        href={route('admin.news.create')}
                        className="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
                    >
                        <span className="text-3xl">📝</span>
                        <span className="mt-2 text-sm font-medium text-gray-900">إضافة خبر</span>
                    </Link>
                    <Link
                        href={route('admin.pages.create')}
                        className="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
                    >
                        <span className="text-3xl">📄</span>
                        <span className="mt-2 text-sm font-medium text-gray-900">إضافة صفحة</span>
                    </Link>
                    <Link
                        href={route('admin.services.create')}
                        className="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
                    >
                        <span className="text-3xl">💼</span>
                        <span className="mt-2 text-sm font-medium text-gray-900">إضافة خدمة</span>
                    </Link>
                    <Link
                        href={route('admin.sliders.create')}
                        className="flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
                    >
                        <span className="text-3xl">🖼️</span>
                        <span className="mt-2 text-sm font-medium text-gray-900">إضافة سلايدر</span>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
