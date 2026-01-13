<?php

use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (Website)
|--------------------------------------------------------------------------
*/

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/services', [PublicController::class, 'services'])->name('services');
Route::get('/services/{slug}', [PublicController::class, 'service'])->name('service.detail');
Route::get('/news', [PublicController::class, 'news'])->name('news');
Route::get('/news/{slug}', [PublicController::class, 'newsDetail'])->name('news.detail');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'storeContact'])->name('contact.store');
Route::get('/page/{slug}', [PublicController::class, 'page'])->name('page');

/*
|--------------------------------------------------------------------------
| Admin Routes (Dashboard)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', \App\Http\Middleware\AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // News Management
        Route::resource('news', AdminNewsController::class);
        Route::post('news/{news}/toggle-publish', [AdminNewsController::class, 'togglePublish'])
            ->name('news.toggle-publish');

        // Pages Management
        Route::resource('pages', AdminPageController::class);
        Route::post('pages/{page}/toggle', [AdminPageController::class, 'toggle'])->name('pages.toggle');

        // Services Management
        Route::resource('services', AdminServiceController::class);
        Route::post('services/{service}/toggle', [AdminServiceController::class, 'toggle'])->name('services.toggle');

        // Sliders Management
        Route::resource('sliders', SliderController::class);
        Route::post('sliders/{slider}/toggle', [SliderController::class, 'toggle'])->name('sliders.toggle');

        // Contacts Management
        Route::get('contacts', [AdminContactController::class, 'index'])->name('contacts.index');
        Route::get('contacts/{contact}', [AdminContactController::class, 'show'])->name('contacts.show');
        Route::delete('contacts/{contact}', [AdminContactController::class, 'destroy'])->name('contacts.destroy');
        Route::post('contacts/{contact}/read', [AdminContactController::class, 'markAsRead'])->name('contacts.read');

        // Users Management (Admin only)
        Route::middleware('can:manage users')->group(function () {
            Route::resource('users', AdminUserController::class);
        });

        // Settings Management (Admin only)
        Route::middleware('can:manage settings')->group(function () {
            Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
            Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
            Route::get('settings/general', [SettingController::class, 'general'])->name('settings.general');
            Route::get('settings/company', [SettingController::class, 'company'])->name('settings.company');
            Route::get('settings/social', [SettingController::class, 'social'])->name('settings.social');
            Route::get('settings/seo', [SettingController::class, 'seo'])->name('settings.seo');
        });
    });

/*
|--------------------------------------------------------------------------
| Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
