<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use App\Services\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        protected NewsService $newsService,
        protected SettingService $settingService
    ) {}

    /**
     * Display the home page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('Public/Home', [
            'sliders' => \App\Models\Slider::active()->ordered()->get(),
            'services' => \App\Models\Service::active()->ordered()->take(6)->get(),
            'latestNews' => $this->newsService->getLatest(6),
            'settings' => $this->settingService->all(),
        ]);
    }
}
