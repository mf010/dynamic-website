<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class PageService
{
    /**
     * Get paginated pages for admin.
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Page::query()
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get all published pages.
     */
    public function getPublished(): Collection
    {
        return Page::published()->ordered()->get();
    }

    /**
     * Get page by slug.
     */
    public function getBySlug(string $slug): ?Page
    {
        return Page::where('slug', $slug)->published()->first();
    }

    /**
     * Create a new page.
     */
    public function create(array $data): Page
    {
        if (isset($data['image']) && $data['image']) {
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'pages'
            );
        }

        return Page::create($data);
    }

    /**
     * Update an existing page.
     */
    public function update(Page $page, array $data): Page
    {
        if (isset($data['image']) && $data['image']) {
            // Delete old image
            if ($page->image) {
                app(FileUploadService::class)->delete($page->image);
            }
            
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'pages'
            );
        }

        $page->update($data);

        return $page->fresh();
    }

    /**
     * Delete a page.
     */
    public function delete(Page $page): bool
    {
        if ($page->image) {
            app(FileUploadService::class)->delete($page->image);
        }

        return $page->delete();
    }
}
