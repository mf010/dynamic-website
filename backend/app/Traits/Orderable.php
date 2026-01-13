<?php

namespace App\Traits;

trait Orderable
{
    /**
     * Scope for ordering by order field.
     */
    public function scopeOrdered($query, string $direction = 'asc')
    {
        $field = $this->getOrderField();
        return $query->orderBy($field, $direction);
    }

    /**
     * Get the order field name.
     */
    protected function getOrderField(): string
    {
        return property_exists($this, 'orderField') ? $this->orderField : 'order';
    }

    /**
     * Move to specific position.
     */
    public function moveTo(int $position): bool
    {
        $field = $this->getOrderField();
        $this->{$field} = $position;
        return $this->save();
    }
}
