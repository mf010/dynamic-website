<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use App\Services\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function __construct(
        protected NewsService $newsService,
        protected SettingService $settingService
    ) {}

    /**
     * Display news listing.
     */
    public function index(): Response
    {
        return Inertia::render('Public/News/Index', [
            'news' => $this->newsService->getPublished(12),
            'settings' => $this->settingService->all(),
        ]);
    }

    /**
     * Display single news article.
     */
    public function show(string $slug): Response
    {
        $news = $this->newsService->getBySlug($slug);

        if (!$news) {
            abort(404);
        }

        $this->newsService->incrementViews($news);

        return Inertia::render('Public/News/Show', [
            'news' => $news,
            'relatedNews' => $this->newsService->getRelated($news, 4),
            'settings' => $this->settingService->all(),
        ]);
    }
}
