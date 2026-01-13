<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $pages = Page::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->published())
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $pages,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve pages',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $idOrSlug): JsonResponse
    {
        try {
            $page = Page::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->published())
                ->where(function ($q) use ($idOrSlug) {
                    if (ctype_digit($idOrSlug)) {
                        $q->where('id', (int) $idOrSlug);
                    } else {
                        $q->where('slug', $idOrSlug);
                    }
                })
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $page,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve page',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
