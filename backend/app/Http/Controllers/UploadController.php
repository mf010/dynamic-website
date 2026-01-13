<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Upload a single image.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
                'directory' => 'nullable|string|max:50',
            ]);

            $file = $request->file('image');
            $directory = $request->input('directory', 'uploads');
            
            // Sanitize directory name
            $directory = preg_replace('/[^a-zA-Z0-9_-]/', '', $directory);
            
            // Generate unique filename
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            
            // Store the file in the public disk
            $path = $file->storeAs($directory, $filename, 'public');

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => [
                    'path' => $path,
                    'url' => Storage::disk('public')->url($path),
                    'filename' => $filename,
                ],
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload multiple images.
     */
    public function uploadImages(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'images' => 'required|array|max:10',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'directory' => 'nullable|string|max:50',
            ]);

            $files = $request->file('images');
            $directory = $request->input('directory', 'uploads');
            
            // Sanitize directory name
            $directory = preg_replace('/[^a-zA-Z0-9_-]/', '', $directory);
            
            $uploaded = [];
            
            foreach ($files as $file) {
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs($directory, $filename, 'public');
                
                $uploaded[] = [
                    'path' => $path,
                    'url' => Storage::disk('public')->url($path),
                    'filename' => $filename,
                ];
            }

            return response()->json([
                'success' => true,
                'message' => 'Images uploaded successfully',
                'data' => $uploaded,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload images',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete an uploaded image.
     */
    public function deleteImage(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'path' => 'required|string',
            ]);

            $path = $request->input('path');
            
            // Security: Ensure path doesn't contain directory traversal
            if (str_contains($path, '..')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid path',
                ], 400);
            }

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Image not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
