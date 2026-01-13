interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
    },
    md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
    },
    lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
    },
};

export default function Toggle({
    checked,
    onChange,
    label,
    disabled = false,
    size = 'md',
    className = '',
}: ToggleProps) {
    const sizes = sizeClasses[size];

    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex flex-shrink-0
                    ${sizes.track}
                    rounded-full
                    transition-colors duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${checked ? 'bg-blue-600' : 'bg-gray-200'}
                `}
            >
                <span
                    className={`
                        inline-block ${sizes.thumb}
                        rounded-full bg-white shadow
                        transform transition-transform duration-200 ease-in-out
                        ${checked ? sizes.translate : 'translate-x-0'}
                        pointer-events-none
                        mt-0.5 mr-0.5
                    `}
                />
            </button>
            {label && (
                <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                    {label}
                </span>
            )}
        </label>
    );
}
