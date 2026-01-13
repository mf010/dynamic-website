<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $news = News::with('images')->get();
            return response()->json([
                'success' => true,
                'data' => $news,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve news',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'slug' => 'nullable|string|max:255',
                'excerpt' => 'nullable|string',
                'featured_image' => 'nullable|string',
                'is_published' => 'nullable|boolean',
                'published_at' => 'nullable|date',
                'images' => 'nullable|array',
                'images.*' => 'string',
            ]);

            // Extract images from validated data
            $images = $validated['images'] ?? [];
            unset($validated['images']);

            $news = News::create($validated);
            
            // Save gallery images
            if (!empty($images)) {
                foreach ($images as $imagePath) {
                    $news->images()->create(['image' => $imagePath]);
                }
            }
            
            // Load images relationship for response
            $news->load('images');

            return response()->json([
                'success' => true,
                'message' => 'News created successfully',
                'data' => $news,
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
                'message' => 'Failed to create news',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $news = News::with('images')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $news,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'News not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve news',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $news = News::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'slug' => 'nullable|string|max:255',
                'excerpt' => 'nullable|string',
                'featured_image' => 'nullable|string',
                'is_published' => 'nullable|boolean',
                'published_at' => 'nullable|date',
                'images' => 'nullable|array',
                'images.*' => 'string',
            ]);

            // Extract images from validated data
            $images = $validated['images'] ?? null;
            unset($validated['images']);

            $news->update($validated);
            
            // Update gallery images if provided
            if ($images !== null) {
                // Delete existing images
                $news->images()->delete();
                
                // Add new images
                foreach ($images as $imagePath) {
                    $news->images()->create(['image' => $imagePath]);
                }
            }
            
            // Load images relationship for response
            $news->load('images');

            return response()->json([
                'success' => true,
                'message' => 'News updated successfully',
                'data' => $news,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'News not found',
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update news',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $news = News::findOrFail($id);
            $news->delete();

            return response()->json([
                'success' => true,
                'message' => 'News deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'News not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete news',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
