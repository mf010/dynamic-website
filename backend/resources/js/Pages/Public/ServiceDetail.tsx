import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    icon: string;
    image: string;
}

interface Props {
    service: Service;
    otherServices: Service[];
    settings: Record<string, string>;
}

export default function ServiceDetail({ service, otherServices, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={service.title} />

            {/* Hero */}
            {service.image ? (
                <section className="relative h-[300px] bg-gray-900">
                    <img
                        src={`/storage/${service.image}`}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">{service.title}</h1>
                    </div>
                </section>
            ) : (
                <section className="bg-gray-900 py-20">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="text-6xl">{service.icon || '💼'}</div>
                        <h1 className="mt-4 text-4xl font-bold text-white">{service.title}</h1>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {service.description && (
                        <p className="text-xl text-gray-600">{service.description}</p>
                    )}
                    {service.content && (
                        <div
                            className="prose prose-lg mt-8 max-w-none"
                            dangerouslySetInnerHTML={{ __html: service.content.replace(/\n/g, '<br>') }}
                        />
                    )}

                    {/* CTA */}
                    <div className="mt-12 rounded-lg bg-blue-50 p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-900">
                            هل تحتاج هذه الخدمة؟
                        </h3>
                        <p className="mt-2 text-gray-600">
                            تواصل معنا الآن للحصول على استشارة مجانية
                        </p>
                        <Link
                            href={route('contact')}
                            className="mt-4 inline-block rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white transition hover:bg-blue-700"
                        >
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </section>

            {/* Other Services */}
            {otherServices.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900">خدمات أخرى</h2>
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {otherServices.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('services.show', item.slug)}
                                    className="group rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                                >
                                    <div className="text-4xl">{item.icon || '💼'}</div>
                                    <h3 className="mt-4 font-semibold text-gray-900 group-hover:text-blue-600">
                                        {item.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
