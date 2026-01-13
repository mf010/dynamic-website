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
    page: Page;
    settings: Record<string, string>;
}

export default function Page({ page, settings }: Props) {
    return (
        <PublicLayout settings={settings}>
            <Head title={page.meta_title || page.title} />

            {/* Header */}
            <section className="bg-gray-900 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white">{page.title}</h1>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
                </div>
            </section>
        </PublicLayout>
    );
}
