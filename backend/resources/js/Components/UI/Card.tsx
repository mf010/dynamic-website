import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
};

const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
};

function Card({
    children,
    className = '',
    padding = 'none',
    shadow = 'sm',
    hover = false,
}: CardProps) {
    return (
        <div
            className={`
                bg-white rounded-xl border border-gray-200
                ${paddingClasses[padding]}
                ${shadowClasses[shadow]}
                ${hover ? 'transition-shadow hover:shadow-md' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

function CardBody({ children, className = '' }: CardBodyProps) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl ${className}`}>
            {children}
        </div>
    );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
