<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\News;
use App\Models\Page;
use App\Models\Service;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $stats = [
            'total_news' => News::count(),
            'published_news' => News::where('is_published', true)->count(),
            'total_pages' => Page::count(),
            'total_services' => Service::count(),
            'total_users' => User::count(),
            'unread_contacts' => Contact::unread()->count(),
        ];

        $latestNews = News::with('author')
            ->latest('created_at')
            ->take(5)
            ->get();

        $latestContacts = Contact::unread()
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'latestNews' => $latestNews,
            'latestContacts' => $latestContacts,
        ]);
    }
}
