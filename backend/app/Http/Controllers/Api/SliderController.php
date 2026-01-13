<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\JsonResponse;

class SliderController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $sliders = Slider::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->active())
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $sliders,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve sliders',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $query = Slider::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->active());

            $slider = $query->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $slider,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Slider not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve slider',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
