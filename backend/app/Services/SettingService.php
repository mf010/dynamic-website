<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class SettingService
{
    /**
     * Cache key prefix for settings.
     */
    protected const CACHE_PREFIX = 'settings_';
    protected const CACHE_TTL = 3600; // 1 hour

    /**
     * Get a setting value by key.
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return Cache::remember(
            self::CACHE_PREFIX . $key,
            self::CACHE_TTL,
            fn () => Setting::where('key', $key)->value('value') ?? $default
        );
    }

    /**
     * Set a setting value.
     */
    public function set(string $key, mixed $value, string $group = 'general'): Setting
    {
        $setting = Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group]
        );

        Cache::forget(self::CACHE_PREFIX . $key);
        Cache::forget(self::CACHE_PREFIX . 'all');
        Cache::forget(self::CACHE_PREFIX . 'group_' . $group);

        return $setting;
    }

    /**
     * Get all settings.
     */
    public function all(): array
    {
        return Cache::remember(
            self::CACHE_PREFIX . 'all',
            self::CACHE_TTL,
            fn () => Setting::pluck('value', 'key')->toArray()
        );
    }

    /**
     * Get settings by group.
     */
    public function getByGroup(string $group): array
    {
        return Cache::remember(
            self::CACHE_PREFIX . 'group_' . $group,
            self::CACHE_TTL,
            fn () => Setting::where('group', $group)->pluck('value', 'key')->toArray()
        );
    }

    /**
     * Get settings grouped by their group.
     */
    public function getAllGrouped(): array
    {
        return Setting::all()->groupBy('group')->toArray();
    }

    /**
     * Clear all settings cache.
     */
    public function clearCache(): void
    {
        $settings = Setting::all();
        
        foreach ($settings as $setting) {
            Cache::forget(self::CACHE_PREFIX . $setting->key);
            Cache::forget(self::CACHE_PREFIX . 'group_' . $setting->group);
        }
        
        Cache::forget(self::CACHE_PREFIX . 'all');
    }

    /**
     * Update multiple settings at once.
     */
    public function updateMany(array $settings): void
    {
        foreach ($settings as $key => $value) {
            $this->set($key, $value);
        }
    }
}
