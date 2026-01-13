<?php

use App\Http\Controllers\Api\ContactController as ApiContactController;
use App\Http\Controllers\Api\ImageController as ApiImageController;
use App\Http\Controllers\Api\PageController as ApiPageController;
use App\Http\Controllers\Api\ServiceController as ApiServiceController;
use App\Http\Controllers\Api\SliderController as ApiSliderController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// ============================================
// Public routes (NO authentication/authorization)
// ============================================

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// View endpoints (public)
Route::apiResource('news', NewsController::class)->only(['index', 'show']);
Route::apiResource('services', ApiServiceController::class)->only(['index', 'show']);
Route::apiResource('pages', ApiPageController::class)->only(['index', 'show']);
Route::apiResource('sliders', ApiSliderController::class)->only(['index', 'show']);
Route::apiResource('images', ApiImageController::class)->only(['index', 'show']);

// Contacts (public)
// POST /api/contact is used by the React frontend
Route::post('/contact', [ApiContactController::class, 'store']);
Route::apiResource('contacts', ApiContactController::class)->only(['index', 'show']);

// ============================================
// Protected routes (authentication required)
// ============================================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    // User routes
    Route::apiResource('users', UserController::class);

    // News write endpoints (protected)
    Route::apiResource('news', NewsController::class)->except(['index', 'show']);

    // Upload routes
    Route::post('/upload/image', [UploadController::class, 'uploadImage']);
    Route::post('/upload/images', [UploadController::class, 'uploadImages']);
    Route::delete('/upload/image', [UploadController::class, 'deleteImage']);
});
