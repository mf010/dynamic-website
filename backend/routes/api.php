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

    // Public routes (no authentication required)
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    
    // Public news routes - READ ONLY
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{id}', [NewsController::class, 'show']);

    // Protected routes (authentication required)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [UserController::class, 'logout']);
        
        // Get current user
        Route::get('/user', function (\Illuminate\Http\Request $request) {
            return response()->json($request->user());
        });
        
        // User management routes
        Route::apiResource('users', UserController::class);
        
        // News management routes (create, update, delete)
        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::patch('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);
        
        // Upload routes
        Route::post('/upload/image', [UploadController::class, 'uploadImage']);
        Route::post('/upload/images', [UploadController::class, 'uploadImages']);
        Route::delete('/upload/image', [UploadController::class, 'deleteImage']);
    });
