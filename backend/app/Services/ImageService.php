<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class ImageService
{
    /**
     * رفع وتأمين الصورة
     */
    public function upload($file, string $folder = 'images'): ?string
    {
        if (!$file || !$file->isValid()) {
            return null;
        }

        // التحقق من نوع الملف
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            throw new \Exception('نوع الملف غير مسموح به. الأنواع المسموحة: JPG, PNG, GIF, WEBP');
        }

        // التحقق من الحجم (5MB max)
        if ($file->getSize() > 5 * 1024 * 1024) {
            throw new \Exception('حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
        }

        // التحقق من أن الملف صورة حقيقية
        $imageInfo = @getimagesize($file->getPathname());
        if ($imageInfo === false) {
            throw new \Exception('الملف ليس صورة صالحة');
        }

        // إنشاء اسم فريد للملف
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // حفظ الملف
        $path = $file->storeAs($folder, $filename, 'public');

        return $path;
    }

    /**
     * حذف صورة
     */
    public function delete(?string $path): bool
    {
        if (!$path) {
            return false;
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }

    /**
     * التحقق من وجود الصورة
     */
    public function exists(?string $path): bool
    {
        if (!$path) {
            return false;
        }

        return Storage::disk('public')->exists($path);
    }

    /**
     * الحصول على رابط الصورة
     */
    public function url(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }
}
