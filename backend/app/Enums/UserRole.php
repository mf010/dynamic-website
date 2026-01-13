<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case USER = 'user';

    /**
     * Get the label for the role.
     */
    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'مدير',
            self::EDITOR => 'محرر',
            self::USER => 'مستخدم',
        };
    }

    /**
     * Get all roles as array.
     */
    public static function toArray(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get all roles with labels.
     */
    public static function options(): array
    {
        return array_map(
            fn ($case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
