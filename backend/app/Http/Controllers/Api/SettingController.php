<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    /**
     * Return all settings as key => value pairs for public frontend use.
     */
    public function index(): JsonResponse
    {
        try {
            $settings = Setting::getAllSettings();
            return response()->json([
                'success' => true,
                'data' => $settings,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve settings',
            ], 500);
        }
    }
}
