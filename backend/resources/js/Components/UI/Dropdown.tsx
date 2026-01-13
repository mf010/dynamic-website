import { ReactNode, useState, useRef, useEffect } from 'react';

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: 'right' | 'left';
    width?: 'auto' | 'sm' | 'md' | 'lg';
    className?: string;
}

interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    danger?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
}

const widthClasses = {
    auto: 'w-auto',
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
};

function Dropdown({
    trigger,
    children,
    align = 'left',
    width = 'md',
    className = '',
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div
                    className={`
                        absolute z-50 mt-2
                        ${align === 'right' ? 'left-0' : 'right-0'}
                        ${widthClasses[width]}
                        bg-white rounded-lg shadow-lg border border-gray-200
                        py-1
                    `}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

function DropdownItem({
    children,
    onClick,
    danger = false,
    disabled = false,
    icon,
}: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full flex items-center gap-2 px-4 py-2 text-sm text-right
                transition-colors duration-150
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }
            `}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}

function DropdownDivider() {
    return <hr className="my-1 border-gray-200" />;
}

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
