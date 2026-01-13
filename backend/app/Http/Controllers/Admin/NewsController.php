<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the news.
     */
    public function index(Request $request): Response
    {
        $query = News::with('author')
            ->when($request->search, function ($q, $search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            })
            ->when($request->status, function ($q, $status) {
                if ($status === 'published') {
                    $q->where('is_published', true);
                } elseif ($status === 'draft') {
                    $q->where('is_published', false);
                }
            })
            ->latest('created_at');

        $news = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new news.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/News/Create');
    }

    /**
     * Store a newly created news in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')
                ->store('news', 'public');
        }

        // Set published_at if publishing
        if ($request->boolean('is_published')) {
            $validated['published_at'] = now();
        }

        News::create($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'تم إنشاء الخبر بنجاح');
    }

    /**
     * Show the form for editing the specified news.
     */
    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news->load('images'),
        ]);
    }

    /**
     * Update the specified news in storage.
     */
    public function update(Request $request, News $news): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($news->featured_image) {
                Storage::disk('public')->delete($news->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')
                ->store('news', 'public');
        }

        // Set published_at if publishing for the first time
        if ($request->boolean('is_published') && !$news->is_published) {
            $validated['published_at'] = now();
        }

        $news->update($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'تم تحديث الخبر بنجاح');
    }

    /**
     * Remove the specified news from storage.
     */
    public function destroy(News $news): RedirectResponse
    {
        // Delete featured image
        if ($news->featured_image) {
            Storage::disk('public')->delete($news->featured_image);
        }

        // Delete related images
        foreach ($news->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        $news->delete();

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'تم حذف الخبر بنجاح');
    }

    /**
     * Toggle publish status.
     */
    public function togglePublish(News $news): RedirectResponse
    {
        $news->update([
            'is_published' => !$news->is_published,
            'published_at' => !$news->is_published ? now() : $news->published_at,
        ]);

        $status = $news->is_published ? 'نُشر' : 'أُلغي نشره';

        return back()->with('success', "تم {$status} الخبر بنجاح");
    }
}
