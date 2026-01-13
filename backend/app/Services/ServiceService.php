<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ServiceService
{
    /**
     * Get paginated services for admin.
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Service::query()
            ->ordered()
            ->paginate($perPage);
    }

    /**
     * Get all active services.
     */
    public function getActive(): Collection
    {
        return Service::active()->ordered()->get();
    }

    /**
     * Get service by slug.
     */
    public function getBySlug(string $slug): ?Service
    {
        return Service::where('slug', $slug)->active()->first();
    }

    /**
     * Create a new service.
     */
    public function create(array $data): Service
    {
        if (isset($data['image']) && $data['image']) {
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'services'
            );
        }

        if (isset($data['icon']) && $data['icon']) {
            $data['icon'] = app(FileUploadService::class)->upload(
                $data['icon'],
                'services/icons'
            );
        }

        // Set order if not provided
        if (!isset($data['order'])) {
            $data['order'] = Service::max('order') + 1;
        }

        return Service::create($data);
    }

    /**
     * Update an existing service.
     */
    public function update(Service $service, array $data): Service
    {
        if (isset($data['image']) && $data['image']) {
            if ($service->image) {
                app(FileUploadService::class)->delete($service->image);
            }
            
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'services'
            );
        }

        if (isset($data['icon']) && $data['icon']) {
            if ($service->icon) {
                app(FileUploadService::class)->delete($service->icon);
            }
            
            $data['icon'] = app(FileUploadService::class)->upload(
                $data['icon'],
                'services/icons'
            );
        }

        $service->update($data);

        return $service->fresh();
    }

    /**
     * Delete a service.
     */
    public function delete(Service $service): bool
    {
        if ($service->image) {
            app(FileUploadService::class)->delete($service->image);
        }

        if ($service->icon) {
            app(FileUploadService::class)->delete($service->icon);
        }

        return $service->delete();
    }

    /**
     * Reorder services.
     */
    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Service::where('id', $id)->update(['order' => $index + 1]);
        }
    }
}
