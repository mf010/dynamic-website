<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    /**
     * Display about page.
     */
    public function about(): Response
    {
        $page = Page::where('slug', 'about')->published()->first();

        return Inertia::render('Public/Pages/About', [
            'page' => $page,
            'settings' => $this->settingService->all(),
        ]);
    }

    /**
     * Display a dynamic page.
     */
    public function show(string $slug): Response
    {
        $page = Page::where('slug', $slug)->published()->firstOrFail();

        return Inertia::render('Public/Pages/Show', [
            'page' => $page,
            'settings' => $this->settingService->all(),
        ]);
    }
}
