<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ContactService
{
    /**
     * Get paginated contacts for admin.
     */
    public function getPaginated(int $perPage = 15, ?string $status = null): LengthAwarePaginator
    {
        $query = Contact::query()->latest();

        if ($status === 'read') {
            $query->whereNotNull('read_at');
        } elseif ($status === 'unread') {
            $query->whereNull('read_at');
        }

        return $query->paginate($perPage);
    }

    /**
     * Get unread contacts count.
     */
    public function getUnreadCount(): int
    {
        return Contact::whereNull('read_at')->count();
    }

    /**
     * Mark contact as read.
     */
    public function markAsRead(Contact $contact): Contact
    {
        if (!$contact->read_at) {
            $contact->update(['read_at' => now()]);
        }

        return $contact;
    }

    /**
     * Mark contact as unread.
     */
    public function markAsUnread(Contact $contact): Contact
    {
        $contact->update(['read_at' => null]);

        return $contact;
    }

    /**
     * Mark multiple contacts as read.
     */
    public function markMultipleAsRead(array $ids): int
    {
        return Contact::whereIn('id', $ids)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
    }

    /**
     * Delete a contact.
     */
    public function delete(Contact $contact): bool
    {
        return $contact->delete();
    }

    /**
     * Delete multiple contacts.
     */
    public function deleteMultiple(array $ids): int
    {
        return Contact::whereIn('id', $ids)->delete();
    }
}
