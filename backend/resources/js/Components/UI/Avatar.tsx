interface AvatarProps {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getColorFromName(name: string): string {
    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-amber-500',
        'bg-yellow-500',
        'bg-lime-500',
        'bg-green-500',
        'bg-emerald-500',
        'bg-teal-500',
        'bg-cyan-500',
        'bg-sky-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-violet-500',
        'bg-purple-500',
        'bg-fuchsia-500',
        'bg-pink-500',
        'bg-rose-500',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({
    src,
    alt = '',
    name = '',
    size = 'md',
    className = '',
}: AvatarProps) {
    if (src) {
        return (
            <img
                src={src}
                alt={alt || name}
                className={`
                    rounded-full object-cover
                    ${sizeClasses[size]}
                    ${className}
                `}
            />
        );
    }

    if (name) {
        return (
            <div
                className={`
                    rounded-full flex items-center justify-center
                    text-white font-medium
                    ${sizeClasses[size]}
                    ${getColorFromName(name)}
                    ${className}
                `}
            >
                {getInitials(name)}
            </div>
        );
    }

    // Default placeholder
    return (
        <div
            className={`
                rounded-full flex items-center justify-center
                bg-gray-200 text-gray-500
                ${sizeClasses[size]}
                ${className}
            `}
        >
            <svg
                className="w-1/2 h-1/2"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
