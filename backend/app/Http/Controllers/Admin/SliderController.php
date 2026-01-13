<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SliderController extends Controller
{
    /**
     * Display a listing of the sliders.
     */
    public function index(): Response
    {
        $sliders = Slider::ordered()->paginate(10);

        return Inertia::render('Admin/Sliders/Index', [
            'sliders' => $sliders,
        ]);
    }

    /**
     * Show the form for creating a new slider.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Sliders/Create');
    }

    /**
     * Store a newly created slider in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'required|image|max:4096',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $validated['image'] = $request->file('image')
            ->store('sliders', 'public');

        Slider::create($validated);

        return redirect()
            ->route('admin.sliders.index')
            ->with('success', 'تم إنشاء السلايدر بنجاح');
    }

    /**
     * Show the form for editing the specified slider.
     */
    public function edit(Slider $slider): Response
    {
        return Inertia::render('Admin/Sliders/Edit', [
            'slider' => $slider,
        ]);
    }

    /**
     * Update the specified slider in storage.
     */
    public function update(Request $request, Slider $slider): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:4096',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($slider->image);
            $validated['image'] = $request->file('image')
                ->store('sliders', 'public');
        }

        $slider->update($validated);

        return redirect()
            ->route('admin.sliders.index')
            ->with('success', 'تم تحديث السلايدر بنجاح');
    }

    /**
     * Remove the specified slider from storage.
     */
    public function destroy(Slider $slider): RedirectResponse
    {
        Storage::disk('public')->delete($slider->image);
        $slider->delete();

        return redirect()
            ->route('admin.sliders.index')
            ->with('success', 'تم حذف السلايدر بنجاح');
    }

    /**
     * Toggle the active status of the slider.
     */
    public function toggle(Slider $slider): RedirectResponse
    {
        $slider->update(['is_active' => !$slider->is_active]);

        return redirect()
            ->back()
            ->with('success', 'تم تحديث حالة السلايدر');
    }
}
