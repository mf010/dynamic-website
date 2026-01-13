<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $redirect = $this->getRedirectPath($request) . '?verified=1';

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended($redirect);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended($redirect);
    }

    /**
     * Get the redirect path based on user role.
     */
    protected function getRedirectPath(EmailVerificationRequest $request): string
    {
        if ($request->user()->hasAnyRole(['admin', 'editor'])) {
            return route('admin.dashboard', absolute: false);
        }
        return '/';
    }
}
