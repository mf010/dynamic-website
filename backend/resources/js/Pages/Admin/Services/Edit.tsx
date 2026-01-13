import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    icon: string;
    image: string;
    order: number;
    is_active: boolean;
}

interface Props {
    service: Service;
}

export default function ServicesEdit({ service }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: service.title,
        slug: service.slug,
        description: service.description || '',
        content: service.content || '',
        icon: service.icon || '',
        image: null as File | null,
        order: service.order,
        is_active: service.is_active,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.services.update', service.id));
    };

    return (
        <AdminLayout header="تعديل الخدمة">
            <Head title="تعديل الخدمة" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="p-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    عنوان الخدمة *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    الرابط (Slug) *
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    dir="ltr"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    الأيقونة (Emoji أو رمز)
                                </label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="📦 أو fa-box"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    الترتيب
                                </label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                الوصف المختصر *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                المحتوى التفصيلي
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                صورة الخدمة
                            </label>
                            {service.image && (
                                <img
                                    src={`/storage/${service.image}`}
                                    alt=""
                                    className="mb-2 h-32 w-auto rounded"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">تفعيل الخدمة</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 px-6 py-3">
                        <Link
                            href={route('admin.services.index')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            رجوع
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
                        >
                            {processing ? 'جاري الحفظ...' : 'تحديث الخدمة'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
