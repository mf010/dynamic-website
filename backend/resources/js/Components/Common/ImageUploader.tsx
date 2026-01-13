import { ChangeEvent, useRef, useState } from 'react';
import Button from '../UI/Button';

interface ImageUploaderProps {
    value?: string | null;
    onChange: (file: File | null) => void;
    onRemove?: () => void;
    accept?: string;
    maxSize?: number; // in MB
    error?: string;
    label?: string;
    hint?: string;
    aspectRatio?: string;
    className?: string;
}

export default function ImageUploader({
    value,
    onChange,
    onRemove,
    accept = 'image/jpeg,image/png,image/jpg,image/gif,image/webp',
    maxSize = 2,
    error,
    label,
    hint,
    aspectRatio = 'aspect-video',
    className = '',
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (!file) {
            onChange(null);
            setPreview(null);
            return;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setLocalError(`حجم الملف يجب أن لا يتجاوز ${maxSize} ميجابايت`);
            return;
        }

        setLocalError(null);
        onChange(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        onChange(null);
        setPreview(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        onRemove?.();
    };

    const displayImage = preview || value;
    const displayError = error || localError;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div
                className={`
                    relative border-2 border-dashed rounded-lg
                    transition-colors duration-200
                    ${displayError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}
                    ${!displayImage ? 'hover:border-blue-400 hover:bg-blue-50' : ''}
                `}
            >
                {displayImage ? (
                    <div className={`relative ${aspectRatio} w-full`}>
                        <img
                            src={displayImage}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 left-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div
                        className={`flex flex-col items-center justify-center ${aspectRatio} cursor-pointer`}
                        onClick={() => inputRef.current?.click()}
                    >
                        <svg
                            className="w-12 h-12 text-gray-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-sm text-gray-500 mb-1">اضغط لرفع صورة</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF حتى {maxSize}MB</p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>

            {displayError && (
                <p className="mt-1 text-sm text-red-600">{displayError}</p>
            )}

            {hint && !displayError && (
                <p className="mt-1 text-sm text-gray-500">{hint}</p>
            )}
        </div>
    );
}
