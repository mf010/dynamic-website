<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the contacts.
     */
    public function index(): Response
    {
        $contacts = Contact::latest()->paginate(15);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Display the specified contact.
     */
    public function show(Contact $contact): Response
    {
        // Mark as read
        if (!$contact->is_read) {
            $contact->markAsRead();
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Remove the specified contact from storage.
     */
    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()
            ->route('admin.contacts.index')
            ->with('success', 'تم حذف الرسالة بنجاح');
    }

    /**
     * Mark contact as read.
     */
    public function markAsRead(Contact $contact): RedirectResponse
    {
        $contact->markAsRead();

        return back()->with('success', 'تم تحديد الرسالة كمقروءة');
    }
}
