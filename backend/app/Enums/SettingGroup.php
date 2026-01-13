<?php

namespace App\Enums;

enum SettingGroup: string
{
    case GENERAL = 'general';
    case COMPANY = 'company';
    case SOCIAL = 'social';
    case SEO = 'seo';
    case CONTACT = 'contact';

    /**
     * Get the label for the group.
     */
    public function label(): string
    {
        return match($this) {
            self::GENERAL => 'عام',
            self::COMPANY => 'الشركة',
            self::SOCIAL => 'التواصل الاجتماعي',
            self::SEO => 'SEO',
            self::CONTACT => 'التواصل',
        };
    }

    /**
     * Get all groups with labels.
     */
    public static function options(): array
    {
        return array_map(
            fn ($case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
