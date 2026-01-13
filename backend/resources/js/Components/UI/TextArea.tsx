import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, hint, className = '', id, ...props }, ref) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {label}
                        {props.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                )}
                
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={`
                        block w-full rounded-lg border px-4 py-2.5
                        text-gray-900 placeholder-gray-400
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        resize-y min-h-[100px]
                        ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }
                        ${className}
                    `}
                    {...props}
                />
                
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

TextArea.displayName = 'TextArea';

export default TextArea;
