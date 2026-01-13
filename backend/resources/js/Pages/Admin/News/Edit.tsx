import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface News {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    featured_image: string | null;
    is_published: boolean;
}

interface Props {
    news: News;
}

export default function NewsEdit({ news }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: news.title,
        content: news.content,
        excerpt: news.excerpt || '',
        featured_image: null as File | null,
        is_published: news.is_published,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        news.featured_image ? `/storage/${news.featured_image}` : null
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.news.update', news.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout header="تعديل الخبر">
            <Head title="تعديل الخبر" />

            <div className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    عنوان الخبر <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div className="mb-6">
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                    ملخص الخبر
                                </label>
                                <textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={2}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                                )}
                            </div>

                            {/* Content */}
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                    محتوى الخبر <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={10}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                )}
                            </div>

                            {/* Featured Image */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    صورة الخبر الرئيسية
                                </label>
                                <div className="mt-2">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-48 w-full rounded-lg object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData('featured_image', null);
                                                    setImagePreview(null);
                                                }}
                                                className="absolute left-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400">
                                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="mt-2 text-sm text-gray-500">اضغط لاختيار صورة</span>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                {errors.featured_image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                                )}
                            </div>

                            {/* Publish Toggle */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="is_published" className="mr-2 text-sm text-gray-700">
                                    نشر الخبر
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-gray-50 px-6 py-3">
                            <div className="flex justify-end gap-3">
                                <a
                                    href={route('admin.news.index')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    إلغاء
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {processing ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
