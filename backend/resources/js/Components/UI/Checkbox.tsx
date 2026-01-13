import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
    hint?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, hint, className = '', id, ...props }, ref) => {
        const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                <label htmlFor={checkboxId} className="flex items-center gap-3 cursor-pointer">
                    <input
                        ref={ref}
                        type="checkbox"
                        id={checkboxId}
                        className={`
                            h-5 w-5 rounded border-gray-300
                            text-blue-600
                            transition-colors duration-200
                            focus:ring-2 focus:ring-blue-200 focus:ring-offset-0
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${error ? 'border-red-500' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                    {label && (
                        <span className="text-sm font-medium text-gray-700">
                            {label}
                            {props.required && <span className="text-red-500 mr-1">*</span>}
                        </span>
                    )}
                </label>
                
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
                
                {hint && !error && (
                    <p className="mt-1 text-sm text-gray-500">{hint}</p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
