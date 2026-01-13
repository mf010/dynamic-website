import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Page {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    created_at: string;
}

interface Props {
    pages: {
        data: Page[];
        current_page: number;
        last_page: number;
    };
}

export default function PagesIndex({ pages }: Props) {
    const togglePublish = (id: number) => {
        router.post(route('admin.pages.toggle', id));
    };

    const deletePage = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
            router.delete(route('admin.pages.destroy', id));
        }
    };

    return (
        <AdminLayout header="إدارة الصفحات">
            <Head title="إدارة الصفحات" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">الصفحات</h3>
                    <Link
                        href={route('admin.pages.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
                    >
                        إضافة صفحة
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    العنوان
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الرابط
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الحالة
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
                            {pages.data.map((page) => (
                                <tr key={page.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {page.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        /page/{page.slug}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <button
                                            onClick={() => togglePublish(page.id)}
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                page.is_published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {page.is_published ? 'منشور' : 'مسودة'}
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(page.created_at).toLocaleDateString('ar')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={route('admin.pages.edit', page.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={() => deletePage(page.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pages.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        لا توجد صفحات
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
