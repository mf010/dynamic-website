<?php

namespace App\Enums;

enum SettingType: string
{
    case TEXT = 'text';
    case TEXTAREA = 'textarea';
    case IMAGE = 'image';
    case BOOLEAN = 'boolean';
    case NUMBER = 'number';
    case EMAIL = 'email';
    case URL = 'url';
    case JSON = 'json';

    /**
     * Get the label for the type.
     */
    public function label(): string
    {
        return match($this) {
            self::TEXT => 'نص',
            self::TEXTAREA => 'نص طويل',
            self::IMAGE => 'صورة',
            self::BOOLEAN => 'نعم/لا',
            self::NUMBER => 'رقم',
            self::EMAIL => 'بريد إلكتروني',
            self::URL => 'رابط',
            self::JSON => 'JSON',
        };
    }
}
