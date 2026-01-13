import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
}

interface Props {
    services: Service[];
    settings: Record<string, string>;
}

export default function Services({ services, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title="خدماتنا" />

            {/* Header */}
            <section className="bg-gray-900 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">خدماتنا</h1>
                    <p className="mt-4 text-xl text-gray-300">
                        نقدم مجموعة متنوعة من الخدمات لتلبية احتياجاتكم
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={route('services.show', service.slug)}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    {service.image ? (
                                        <img
                                            src={`/storage/${service.image}`}
                                            alt={service.title}
                                            className="h-48 w-full object-cover transition group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-blue-100 text-6xl">
                                            {service.icon || '💼'}
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                                            {service.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600">{service.description}</p>
                                        <div className="mt-4 text-blue-600 group-hover:text-blue-700">
                                            اقرأ المزيد ←
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="text-6xl">💼</div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-900">لا توجد خدمات</h3>
                            <p className="mt-2 text-gray-600">سيتم إضافة الخدمات قريباً</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white">
                        هل تحتاج خدمة معينة؟
                    </h2>
                    <p className="mt-4 text-xl text-blue-100">
                        تواصل معنا وسنساعدك في إيجاد الحل المناسب
                    </p>
                    <Link
                        href={route('contact')}
                        className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-lg font-medium text-blue-600 transition hover:bg-gray-100"
                    >
                        تواصل معنا
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
