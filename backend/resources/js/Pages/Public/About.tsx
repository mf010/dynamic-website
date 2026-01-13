import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    featured_image: string;
    meta_title: string;
    meta_description: string;
}

interface Props {
    page: Page | null;
    settings: Record<string, string>;
}

export default function About({ page, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={page?.meta_title || 'من نحن'} />

            {/* Header */}
            <section className="bg-gray-900 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">من نحن</h1>
                    <p className="mt-4 text-xl text-gray-300">
                        تعرف على شركتنا وقيمنا
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {page ? (
                        <>
                            {page.featured_image && (
                                <img
                                    src={`/storage/${page.featured_image}`}
                                    alt={page.title}
                                    className="mb-8 h-64 w-full rounded-lg object-cover"
                                />
                            )}
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br>') }}
                            />
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {settings.company_name || 'اسم الشركة'}
                            </h2>
                            <p className="mt-6 text-lg text-gray-600">
                                {settings.company_description || 'نحن شركة رائدة في مجالنا، نقدم خدمات متميزة وحلول مبتكرة لعملائنا. نسعى دائماً للتميز والإبداع في كل ما نقدمه.'}
                            </p>
                            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                                <div className="rounded-lg bg-blue-50 p-8 text-center">
                                    <div className="text-4xl">🎯</div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">رؤيتنا</h3>
                                    <p className="mt-2 text-gray-600">
                                        أن نكون الخيار الأول لعملائنا في مجالنا
                                    </p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-8 text-center">
                                    <div className="text-4xl">💡</div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">رسالتنا</h3>
                                    <p className="mt-2 text-gray-600">
                                        تقديم خدمات عالية الجودة تفوق توقعات العملاء
                                    </p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-8 text-center">
                                    <div className="text-4xl">⭐</div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">قيمنا</h3>
                                    <p className="mt-2 text-gray-600">
                                        الجودة، الأمانة، الابتكار، خدمة العملاء
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
