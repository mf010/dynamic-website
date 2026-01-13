<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\News;
use App\Models\Page;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Display the home page.
     */
    public function home(): Response
    {
        $sliders = Slider::active()->ordered()->get();
        $services = Service::active()->ordered()->take(6)->get();
        $latestNews = News::published()->latest()->with('author')->take(6)->get();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/Home', [
            'sliders' => $sliders,
            'services' => $services,
            'latestNews' => $latestNews,
            'settings' => $settings,
        ]);
    }

    /**
     * Display the about page.
     */
    public function about(): Response
    {
        $page = Page::where('slug', 'about')->published()->first();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/About', [
            'page' => $page,
            'settings' => $settings,
        ]);
    }

    /**
     * Display all services.
     */
    public function services(): Response
    {
        $services = Service::active()->ordered()->get();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/Services', [
            'services' => $services,
            'settings' => $settings,
        ]);
    }

    /**
     * Display a single service.
     */
    public function service(string $slug): Response
    {
        $service = Service::where('slug', $slug)->active()->firstOrFail();
        $otherServices = Service::where('id', '!=', $service->id)
            ->active()
            ->ordered()
            ->take(4)
            ->get();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/ServiceDetail', [
            'service' => $service,
            'otherServices' => $otherServices,
            'settings' => $settings,
        ]);
    }

    /**
     * Display all news.
     */
    public function news(Request $request): Response
    {
        $news = News::published()
            ->latest()
            ->with('author')
            ->paginate(9)
            ->withQueryString();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/News', [
            'news' => $news,
            'settings' => $settings,
        ]);
    }

    /**
     * Display a single news article.
     */
    public function newsDetail(string $slug): Response
    {
        $news = News::where('slug', $slug)
            ->published()
            ->with(['author', 'images'])
            ->firstOrFail();
        
        // Increment views
        $news->incrementViews();

        $relatedNews = News::where('id', '!=', $news->id)
            ->published()
            ->latest()
            ->take(3)
            ->get();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/NewsDetail', [
            'news' => $news,
            'relatedNews' => $relatedNews,
            'settings' => $settings,
        ]);
    }

    /**
     * Display the contact page.
     */
    public function contact(): Response
    {
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/Contact', [
            'settings' => $settings,
        ]);
    }

    /**
     * Store a contact message.
     */
    public function storeContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Contact::create($validated);

        return back()->with('success', 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً');
    }

    /**
     * Display a custom page.
     */
    public function page(string $slug): Response
    {
        $page = Page::where('slug', $slug)->published()->firstOrFail();
        $settings = Setting::getAllSettings();

        return Inertia::render('Public/Page', [
            'page' => $page,
            'settings' => $settings,
        ]);
    }
}
