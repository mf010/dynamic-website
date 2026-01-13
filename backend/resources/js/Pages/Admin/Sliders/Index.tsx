import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Slider {
    id: number;
    title: string;
    image: string;
    is_active: boolean;
    order: number;
}

interface Props {
    sliders: {
        data: Slider[];
        current_page: number;
        last_page: number;
    };
}

export default function SlidersIndex({ sliders }: Props) {
    const toggleActive = (id: number) => {
        router.post(route('admin.sliders.toggle', id));
    };

    const deleteSlider = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا السلايدر؟')) {
            router.delete(route('admin.sliders.destroy', id));
        }
    };

    return (
        <AdminLayout header="إدارة السلايدر">
            <Head title="إدارة السلايدر" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">السلايدر</h3>
                    <Link
                        href={route('admin.sliders.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
                    >
                        إضافة سلايدر
                    </Link>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                    {sliders.data.map((slider) => (
                        <div key={slider.id} className="relative overflow-hidden rounded-lg border">
                            {slider.image ? (
                                <img
                                    src={`/storage/${slider.image}`}
                                    alt={slider.title}
                                    className="h-40 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-40 items-center justify-center bg-gray-100">
                                    <span className="text-gray-400">لا توجد صورة</span>
                                </div>
                            )}
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-900">{slider.title || 'بدون عنوان'}</h4>
                                    <span className="text-sm text-gray-500">#{slider.order}</span>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <button
                                        onClick={() => toggleActive(slider.id)}
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                            slider.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {slider.is_active ? 'مفعل' : 'معطل'}
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('admin.sliders.edit', slider.id)}
                                            className="text-sm text-blue-600 hover:text-blue-900"
                                        >
                                            تعديل
                                        </Link>
                                        <button
                                            onClick={() => deleteSlider(slider.id)}
                                            className="text-sm text-red-600 hover:text-red-900"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {sliders.data.length === 0 && (
                        <div className="col-span-full py-8 text-center text-sm text-gray-500">
                            لا توجد سلايدرات
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
