<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

    // Public routes
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [UserController::class, 'logout']);
        
        // User routes
        Route::apiResource('users', UserController::class);
        
        // News routes
        Route::apiResource('news', NewsController::class);
        
        // Upload routes
        Route::post('/upload/image', [UploadController::class, 'uploadImage']);
        Route::post('/upload/images', [UploadController::class, 'uploadImages']);
        Route::delete('/upload/image', [UploadController::class, 'deleteImage']);
    });
