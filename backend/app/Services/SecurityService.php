<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SecurityService
{
    /**
     * التحقق من IP محظور
     */
    public static function isBlocked(string $ip): bool
    {
        return Cache::has("blocked_ip:{$ip}");
    }

    /**
     * حظر IP
     */
    public static function blockIP(string $ip, int $minutes = 60): void
    {
        Cache::put("blocked_ip:{$ip}", true, now()->addMinutes($minutes));
        
        Log::channel('security')->warning('IP blocked', [
            'ip' => $ip,
            'duration' => $minutes,
        ]);
    }

    /**
     * إلغاء حظر IP
     */
    public static function unblockIP(string $ip): void
    {
        Cache::forget("blocked_ip:{$ip}");
    }

    /**
     * تسجيل محاولة فاشلة
     */
    public static function recordFailedAttempt(string $ip, string $type = 'login'): int
    {
        $key = "failed_attempts:{$type}:{$ip}";
        $attempts = Cache::get($key, 0) + 1;
        
        Cache::put($key, $attempts, now()->addMinutes(30));

        // حظر بعد 5 محاولات فاشلة
        if ($attempts >= 5) {
            self::blockIP($ip, 30);
        }

        return $attempts;
    }

    /**
     * مسح المحاولات الفاشلة
     */
    public static function clearFailedAttempts(string $ip, string $type = 'login'): void
    {
        Cache::forget("failed_attempts:{$type}:{$ip}");
    }

    /**
     * تنظيف المدخلات
     */
    public static function sanitize(string $input): string
    {
        // إزالة المسافات الزائدة
        $input = trim($input);
        
        // تحويل الأحرف الخاصة
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        
        // إزالة null bytes
        $input = str_replace(chr(0), '', $input);
        
        return $input;
    }

    /**
     * التحقق من CSRF Token
     */
    public static function validateCSRF(): bool
    {
        return request()->hasValidSignature() || 
               request()->session()->token() === request()->input('_token');
    }

    /**
     * تشفير البيانات الحساسة
     */
    public static function encrypt(string $data): string
    {
        return encrypt($data);
    }

    /**
     * فك تشفير البيانات
     */
    public static function decrypt(string $data): string
    {
        return decrypt($data);
    }
}
