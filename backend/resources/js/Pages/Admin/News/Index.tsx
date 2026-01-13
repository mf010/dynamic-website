import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface News {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    views: number;
    created_at: string;
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
    filters: {
        search?: string;
        status?: string;
    };
}

export default function NewsIndex({ news, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.news.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            router.delete(route('admin.news.destroy', id));
        }
    };

    const handleTogglePublish = (id: number) => {
        router.post(route('admin.news.toggle-publish', id));
    };

    return (
        <AdminLayout header="إدارة الأخبار">
            <Head title="إدارة الأخبار" />

            {/* Header */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">الأخبار</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        إدارة أخبار ومقالات الشركة
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link
                        href={route('admin.news.create')}
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                        + إضافة خبر جديد
                    </Link>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="بحث في الأخبار..."
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                        بحث
                    </button>
                </form>
                <div className="flex gap-2">
                    <Link
                        href={route('admin.news.index')}
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                            !filters.status ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        الكل
                    </Link>
                    <Link
                        href={route('admin.news.index', { status: 'published' })}
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                            filters.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        منشور
                    </Link>
                    <Link
                        href={route('admin.news.index', { status: 'draft' })}
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                            filters.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        مسودة
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                العنوان
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                الكاتب
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                الحالة
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                المشاهدات
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                التاريخ
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                الإجراءات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {news.data.length > 0 ? (
                            news.data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.title}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {item.author?.name || 'غير معروف'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <button
                                            onClick={() => handleTogglePublish(item.id)}
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                item.is_published
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                            }`}
                                        >
                                            {item.is_published ? 'منشور' : 'مسودة'}
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {item.views}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString('ar-SA')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.news.edit', item.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    لا توجد أخبار
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {news.last_page > 1 && (
                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                        <div className="flex justify-center gap-1">
                            {news.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded px-3 py-1 text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
