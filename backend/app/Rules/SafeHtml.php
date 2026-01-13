<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SafeHtml implements ValidationRule
{
    /**
     * السماح فقط بوسوم HTML الآمنة
     */
    protected array $allowedTags = [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'a', 'img',
        'blockquote', 'code', 'pre',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span',
    ];

    /**
     * التحقق من سلامة محتوى HTML
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // إزالة JavaScript و event handlers
        if (preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $value)) {
            $fail('المحتوى يحتوي على كود JavaScript غير مسموح به.');
            return;
        }

        if (preg_match('/on\w+\s*=/i', $value)) {
            $fail('المحتوى يحتوي على أحداث JavaScript غير مسموحة.');
            return;
        }

        if (preg_match('/javascript\s*:/i', $value)) {
            $fail('المحتوى يحتوي على روابط JavaScript غير مسموحة.');
            return;
        }

        // التحقق من data URIs الخبيثة
        if (preg_match('/data\s*:[^,]*base64/i', $value)) {
            $fail('المحتوى يحتوي على بيانات base64 غير مسموحة.');
            return;
        }
    }
}
