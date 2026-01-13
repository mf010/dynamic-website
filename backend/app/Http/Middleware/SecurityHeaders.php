<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * إضافة رؤوس الأمان لجميع الاستجابات
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // منع تضمين الموقع في iframe من مواقع أخرى
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        
        // منع المتصفح من تخمين نوع المحتوى
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        
        // تفعيل حماية XSS في المتصفحات القديمة
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        
        // التحكم في معلومات الإحالة
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // منع تحميل الموارد من مصادر غير موثوقة
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        // إزالة معلومات الخادم
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        return $response;
    }
}
