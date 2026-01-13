<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class NewsService
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    /**
     * Get paginated news with filters.
     */
    public function getPaginated(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = News::with('author');

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                  ->orWhere('content', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['is_published'])) {
            $query->where('is_published', $filters['is_published']);
        }

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    /**
     * Get published news for public view.
     */
    public function getPublished(int $perPage = 12): LengthAwarePaginator
    {
        return News::published()
            ->latest()
            ->with('author')
            ->paginate($perPage);
    }

    /**
     * Get latest published news.
     */
    public function getLatest(int $count = 6): Collection
    {
        return News::published()
            ->latest()
            ->with('author')
            ->take($count)
            ->get();
    }

    /**
     * Get news by slug.
     */
    public function getBySlug(string $slug): ?News
    {
        return News::where('slug', $slug)
            ->published()
            ->with('author')
            ->first();
    }

    /**
     * Create a new news article.
     */
    public function create(array $data, ?object $image = null): News
    {
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['user_id'] = $data['user_id'] ?? auth()->id();

        if ($image) {
            $data['featured_image'] = $this->fileUploadService->upload($image, 'news');
        }

        return News::create($data);
    }

    /**
     * Update a news article.
     */
    public function update(News $news, array $data, ?object $image = null): News
    {
        if ($image) {
            $data['featured_image'] = $this->fileUploadService->replace(
                $news->featured_image,
                $image,
                'news'
            );
        }

        $news->update($data);

        return $news->fresh();
    }

    /**
     * Delete a news article.
     */
    public function delete(News $news): bool
    {
        if ($news->featured_image) {
            $this->fileUploadService->delete($news->featured_image);
        }

        return $news->delete();
    }

    /**
     * Toggle publish status.
     */
    public function togglePublish(News $news): News
    {
        $news->update([
            'is_published' => !$news->is_published,
            'published_at' => !$news->is_published ? now() : null,
        ]);

        return $news->fresh();
    }

    /**
     * Increment views.
     */
    public function incrementViews(News $news): void
    {
        $news->incrementViews();
    }

    /**
     * Get related news.
     */
    public function getRelated(News $news, int $count = 4): Collection
    {
        return News::published()
            ->where('id', '!=', $news->id)
            ->latest()
            ->take($count)
            ->get();
    }
}
