import { ReactNode } from 'react';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    centered?: boolean;
    className?: string;
}

export default function SectionTitle({
    title,
    subtitle,
    action,
    centered = false,
    className = '',
}: SectionTitleProps) {
    return (
        <div
            className={`
                ${centered ? 'text-center' : 'flex items-center justify-between'}
                ${className}
            `}
        >
            <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {subtitle && (
                    <p className="mt-1 text-gray-500">{subtitle}</p>
                )}
            </div>
            {action && !centered && <div>{action}</div>}
        </div>
    );
}
