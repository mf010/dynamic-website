import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Service {
    id: number;
    title: string;
    icon: string;
    is_active: boolean;
    order: number;
    created_at: string;
}

interface Props {
    services: {
        data: Service[];
        current_page: number;
        last_page: number;
    };
}

export default function ServicesIndex({ services }: Props) {
    const toggleActive = (id: number) => {
        router.post(route('admin.services.toggle', id));
    };

    const deleteService = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout header="إدارة الخدمات">
            <Head title="إدارة الخدمات" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">الخدمات</h3>
                    <Link
                        href={route('admin.services.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
                    >
                        إضافة خدمة
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الترتيب
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الأيقونة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    العنوان
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الحالة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {services.data.map((service) => (
                                <tr key={service.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {service.order}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-2xl">
                                        {service.icon || '📦'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {service.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <button
                                            onClick={() => toggleActive(service.id)}
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                service.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {service.is_active ? 'مفعل' : 'معطل'}
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={route('admin.services.edit', service.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={() => deleteService(service.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {services.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        لا توجد خدمات
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
