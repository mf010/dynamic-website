<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a file to storage.
     */
    public function upload(UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): string
    {
        $filename = $this->generateFilename($file);
        
        return $file->storeAs($directory, $filename, $disk);
    }

    /**
     * Upload multiple files.
     */
    public function uploadMany(array $files, string $directory = 'uploads', string $disk = 'public'): array
    {
        $paths = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = $this->upload($file, $directory, $disk);
            }
        }
        
        return $paths;
    }

    /**
     * Delete a file from storage.
     */
    public function delete(?string $path, string $disk = 'public'): bool
    {
        if (empty($path)) {
            return false;
        }
        
        return Storage::disk($disk)->delete($path);
    }

    /**
     * Delete multiple files.
     */
    public function deleteMany(array $paths, string $disk = 'public'): void
    {
        foreach ($paths as $path) {
            $this->delete($path, $disk);
        }
    }

    /**
     * Replace a file (delete old, upload new).
     */
    public function replace(?string $oldPath, UploadedFile $newFile, string $directory = 'uploads', string $disk = 'public'): string
    {
        $this->delete($oldPath, $disk);
        
        return $this->upload($newFile, $directory, $disk);
    }

    /**
     * Generate a unique filename.
     */
    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $timestamp = now()->format('Y-m-d_His');
        $random = Str::random(8);
        
        return "{$name}_{$timestamp}_{$random}.{$extension}";
    }

    /**
     * Get the full URL for a stored file.
     */
    public function getUrl(?string $path, string $disk = 'public'): ?string
    {
        if (empty($path)) {
            return null;
        }
        
        return Storage::disk($disk)->url($path);
    }

    /**
     * Check if a file exists.
     */
    public function exists(?string $path, string $disk = 'public'): bool
    {
        if (empty($path)) {
            return false;
        }
        
        return Storage::disk($disk)->exists($path);
    }
}
