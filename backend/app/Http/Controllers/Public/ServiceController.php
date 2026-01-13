<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    /**
     * Display services listing.
     */
    public function index(): Response
    {
        return Inertia::render('Public/Services/Index', [
            'services' => Service::active()->ordered()->get(),
            'settings' => $this->settingService->all(),
        ]);
    }

    /**
     * Display single service.
     */
    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)->active()->firstOrFail();
        
        $otherServices = Service::where('id', '!=', $service->id)
            ->active()
            ->ordered()
            ->take(4)
            ->get();

        return Inertia::render('Public/Services/Show', [
            'service' => $service,
            'otherServices' => $otherServices,
            'settings' => $this->settingService->all(),
        ]);
    }
}
