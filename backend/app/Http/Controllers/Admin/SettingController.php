<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index(): Response
    {
        $settings = Setting::all()->groupBy('group');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            
            if ($setting) {
                // Handle file uploads
                if ($setting->type === 'image' && $request->hasFile("files.{$key}")) {
                    // Delete old file
                    if ($setting->value) {
                        Storage::disk('public')->delete($setting->value);
                    }
                    $value = $request->file("files.{$key}")->store('settings', 'public');
                }
                
                Setting::set($key, $value);
            }
        }

        Setting::clearCache();

        return back()->with('success', 'تم حفظ الإعدادات بنجاح');
    }

    /**
     * Display general settings.
     */
    public function general(): Response
    {
        $settings = Setting::where('group', 'general')->get();

        return Inertia::render('Admin/Settings/General', [
            'settings' => $settings,
        ]);
    }

    /**
     * Display company settings.
     */
    public function company(): Response
    {
        $settings = Setting::where('group', 'company')->get();

        return Inertia::render('Admin/Settings/Company', [
            'settings' => $settings,
        ]);
    }

    /**
     * Display social media settings.
     */
    public function social(): Response
    {
        $settings = Setting::where('group', 'social')->get();

        return Inertia::render('Admin/Settings/Social', [
            'settings' => $settings,
        ]);
    }

    /**
     * Display SEO settings.
     */
    public function seo(): Response
    {
        $settings = Setting::where('group', 'seo')->get();

        return Inertia::render('Admin/Settings/Seo', [
            'settings' => $settings,
        ]);
    }
}
