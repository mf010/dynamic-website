<?php

namespace App\Traits;

trait HasStatus
{
    /**
     * Scope for published/active items.
     */
    public function scopePublished($query)
    {
        $field = $this->getStatusField();
        return $query->where($field, true);
    }

    /**
     * Scope for unpublished/inactive items.
     */
    public function scopeUnpublished($query)
    {
        $field = $this->getStatusField();
        return $query->where($field, false);
    }

    /**
     * Scope alias for active.
     */
    public function scopeActive($query)
    {
        return $this->scopePublished($query);
    }

    /**
     * Scope alias for inactive.
     */
    public function scopeInactive($query)
    {
        return $this->scopeUnpublished($query);
    }

    /**
     * Toggle the status.
     */
    public function toggleStatus(): bool
    {
        $field = $this->getStatusField();
        $this->{$field} = !$this->{$field};
        return $this->save();
    }

    /**
     * Get the status field name.
     */
    protected function getStatusField(): string
    {
        return property_exists($this, 'statusField') ? $this->statusField : 'is_published';
    }
}
