<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $serviceId = $this->route('service')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('services', 'slug')->ignore($serviceId),
            ],
            'description' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'image' => [
                $this->isMethod('POST') ? 'required' : 'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:2048',
            ],
            'icon' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:512'],
            'is_active' => ['boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'title' => 'العنوان',
            'slug' => 'الرابط',
            'description' => 'الوصف المختصر',
            'content' => 'المحتوى',
            'image' => 'الصورة',
            'icon' => 'الأيقونة',
            'is_active' => 'حالة التفعيل',
            'order' => 'الترتيب',
        ];
    }
}
