<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    /**
     * Display contact page.
     */
    public function index(): Response
    {
        return Inertia::render('Public/Contact', [
            'settings' => $this->settingService->all(),
        ]);
    }

    /**
     * Store contact message.
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        Contact::create($request->validated());

        return redirect()
            ->back()
            ->with('success', 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
    }
}
