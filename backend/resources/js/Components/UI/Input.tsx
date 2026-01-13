import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftAddon?: string;
    rightAddon?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {label}
                        {props.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                )}
                
                <div className="relative flex">
                    {leftAddon && (
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {leftAddon}
                        </span>
                    )}
                    
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
                            block w-full rounded-lg border px-4 py-2.5
                            text-gray-900 placeholder-gray-400
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-0
                            disabled:bg-gray-100 disabled:cursor-not-allowed
                            ${error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                            }
                            ${leftAddon ? 'rounded-r-none' : ''}
                            ${rightAddon ? 'rounded-l-none' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                    
                    {rightAddon && (
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {rightAddon}
                        </span>
                    )}
                </div>
                
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

Input.displayName = 'Input';

export default Input;
