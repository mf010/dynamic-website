import { ReactNode, useState } from 'react';

interface TooltipProps {
    content: string | ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 ml-2',
    right: 'left-full top-1/2 -translate-y-1/2 mr-2',
};

const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-y-transparent border-l-transparent',
};

export default function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    className = '',
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => setIsVisible(true), delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setIsVisible(false);
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            
            {isVisible && (
                <div
                    className={`
                        absolute z-50 ${positionClasses[position]}
                        px-3 py-2 text-sm text-white bg-gray-800 rounded-lg
                        whitespace-nowrap
                        animate-fade-in
                    `}
                >
                    {content}
                    <span
                        className={`
                            absolute w-0 h-0
                            border-4 ${arrowClasses[position]}
                        `}
                    />
                </div>
            )}
        </div>
    );
}
