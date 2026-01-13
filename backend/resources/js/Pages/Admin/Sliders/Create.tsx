import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function SlidersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        button_text: '',
        button_link: '',
        image: null as File | null,
        order: 0,
        is_active: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.sliders.store'));
    };

    return (
        <AdminLayout header="إضافة سلايدر جديد">
            <Head title="إضافة سلايدر" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="p-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    العنوان
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    العنوان الفرعي
                                </label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    نص الزر
                                </label>
                                <input
                                    type="text"
                                    value={data.button_text}
                                    onChange={(e) => setData('button_text', e.target.value)}
                                    placeholder="اعرف المزيد"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    رابط الزر
                                </label>
                                <input
                                    type="text"
                                    value={data.button_link}
                                    onChange={(e) => setData('button_link', e.target.value)}
                                    placeholder="/about"
                                    dir="ltr"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                صورة السلايدر *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">يفضل استخدام صورة بحجم 1920x600 بكسل</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                الترتيب
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                <span className="text-sm font-medium text-gray-700">تفعيل السلايدر</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 px-6 py-3">
                        <Link
                            href={route('admin.sliders.index')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            رجوع
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
                        >
                            {processing ? 'جاري الحفظ...' : 'حفظ السلايدر'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
