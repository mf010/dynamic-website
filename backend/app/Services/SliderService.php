<?php

namespace App\Services;

use App\Models\Slider;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class SliderService
{
    /**
     * Get paginated sliders for admin.
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Slider::query()
            ->ordered()
            ->paginate($perPage);
    }

    /**
     * Get all active sliders.
     */
    public function getActive(): Collection
    {
        return Slider::active()->ordered()->get();
    }

    /**
     * Create a new slider.
     */
    public function create(array $data): Slider
    {
        if (isset($data['image']) && $data['image']) {
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'sliders'
            );
        }

        // Set order if not provided
        if (!isset($data['order'])) {
            $data['order'] = Slider::max('order') + 1;
        }

        return Slider::create($data);
    }

    /**
     * Update an existing slider.
     */
    public function update(Slider $slider, array $data): Slider
    {
        if (isset($data['image']) && $data['image']) {
            if ($slider->image) {
                app(FileUploadService::class)->delete($slider->image);
            }
            
            $data['image'] = app(FileUploadService::class)->upload(
                $data['image'],
                'sliders'
            );
        }

        $slider->update($data);

        return $slider->fresh();
    }

    /**
     * Delete a slider.
     */
    public function delete(Slider $slider): bool
    {
        if ($slider->image) {
            app(FileUploadService::class)->delete($slider->image);
        }

        return $slider->delete();
    }

    /**
     * Reorder sliders.
     */
    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            Slider::where('id', $id)->update(['order' => $index + 1]);
        }
    }
}
