import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className = '' }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <nav className={`flex items-center justify-center gap-1 ${className}`}>
            {links.map((link, index) => {
                // Skip if no URL and not ellipsis
                if (!link.url && !link.label.includes('...')) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                // Ellipsis
                if (link.label.includes('...')) {
                    return (
                        <span key={index} className="px-3 py-2 text-sm text-gray-500">
                            ...
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`
                            px-3 py-2 text-sm font-medium rounded-lg
                            transition-colors duration-200
                            ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }
                        `}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </nav>
    );
}
