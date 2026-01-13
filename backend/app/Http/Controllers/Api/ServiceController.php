<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $services = Service::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->active())
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $services,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve services',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $idOrSlug): JsonResponse
    {
        try {
            $service = Service::query()
                ->when(!auth('sanctum')->check(), fn ($q) => $q->active())
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
                'data' => $service,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
