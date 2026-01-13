<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogActivity
{
    /**
     * تسجيل النشاطات المهمة
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // تسجيل محاولات تسجيل الدخول
        if ($request->is('login') && $request->isMethod('post')) {
            $status = $response->getStatusCode() === 302 ? 'success' : 'failed';
            Log::channel('security')->info('Login attempt', [
                'email' => $request->input('email'),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'status' => $status,
            ]);
        }

        // تسجيل الوصول لصفحات الإدارة
        if ($request->is('admin/*') && auth()->check()) {
            Log::channel('security')->info('Admin access', [
                'user_id' => auth()->id(),
                'user_email' => auth()->user()->email,
                'path' => $request->path(),
                'method' => $request->method(),
                'ip' => $request->ip(),
            ]);
        }

        return $response;
    }
}
