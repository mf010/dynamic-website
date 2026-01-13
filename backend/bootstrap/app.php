<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // إضافة رؤوس الأمان لجميع الطلبات
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
        
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(
            prepend: [
                \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            ],
            append: [
                \App\Http\Middleware\CorsMiddleware::class,
            ],
        );

        // تسجيل الأنشطة في صفحات الإدارة
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'log.activity' => \App\Http\Middleware\LogActivity::class,
            'rate.limit' => \App\Http\Middleware\RateLimitByIP::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
