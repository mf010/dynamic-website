<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'site_name',
                'group' => 'general',
                'type' => 'text',
                'value' => 'اسم الشركة',
                'label' => 'اسم الموقع',
                'description' => 'اسم الموقع الذي سيظهر في الهيدر والفوتر',
            ],
            [
                'key' => 'site_logo',
                'group' => 'general',
                'type' => 'image',
                'value' => null,
                'label' => 'شعار الموقع',
                'description' => 'شعار الموقع (PNG أو SVG)',
            ],
            [
                'key' => 'site_favicon',
                'group' => 'general',
                'type' => 'image',
                'value' => null,
                'label' => 'أيقونة الموقع',
                'description' => 'أيقونة التبويب (ICO أو PNG)',
            ],

            // Company Settings
            [
                'key' => 'company_name',
                'group' => 'company',
                'type' => 'text',
                'value' => 'اسم الشركة',
                'label' => 'اسم الشركة',
                'description' => 'الاسم الرسمي للشركة',
            ],
            [
                'key' => 'company_description',
                'group' => 'company',
                'type' => 'textarea',
                'value' => 'وصف مختصر عن الشركة وخدماتها',
                'label' => 'وصف الشركة',
                'description' => 'وصف مختصر يظهر في الصفحة الرئيسية',
            ],
            [
                'key' => 'company_email',
                'group' => 'company',
                'type' => 'text',
                'value' => 'info@example.com',
                'label' => 'البريد الإلكتروني',
                'description' => 'البريد الإلكتروني الرسمي للشركة',
            ],
            [
                'key' => 'company_phone',
                'group' => 'company',
                'type' => 'text',
                'value' => '+966 xx xxx xxxx',
                'label' => 'رقم الهاتف',
                'description' => 'رقم الهاتف الرسمي',
            ],
            [
                'key' => 'company_address',
                'group' => 'company',
                'type' => 'textarea',
                'value' => 'العنوان الكامل للشركة',
                'label' => 'العنوان',
                'description' => 'عنوان مقر الشركة',
            ],
            [
                'key' => 'company_working_hours',
                'group' => 'company',
                'type' => 'text',
                'value' => 'الأحد - الخميس: 9 صباحاً - 5 مساءً',
                'label' => 'ساعات العمل',
                'description' => 'أوقات الدوام الرسمي',
            ],

            // Social Media Settings
            [
                'key' => 'social_facebook',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'فيسبوك',
                'description' => 'رابط صفحة الفيسبوك',
            ],
            [
                'key' => 'social_twitter',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'تويتر (X)',
                'description' => 'رابط حساب تويتر',
            ],
            [
                'key' => 'social_instagram',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'انستقرام',
                'description' => 'رابط حساب انستقرام',
            ],
            [
                'key' => 'social_linkedin',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'لينكد إن',
                'description' => 'رابط صفحة لينكد إن',
            ],
            [
                'key' => 'social_youtube',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'يوتيوب',
                'description' => 'رابط قناة اليوتيوب',
            ],
            [
                'key' => 'social_whatsapp',
                'group' => 'social',
                'type' => 'text',
                'value' => '',
                'label' => 'واتساب',
                'description' => 'رقم الواتساب للتواصل المباشر',
            ],

            // SEO Settings
            [
                'key' => 'seo_title',
                'group' => 'seo',
                'type' => 'text',
                'value' => 'اسم الشركة - الموقع الرسمي',
                'label' => 'عنوان SEO',
                'description' => 'العنوان الذي يظهر في محركات البحث',
            ],
            [
                'key' => 'seo_description',
                'group' => 'seo',
                'type' => 'textarea',
                'value' => 'وصف الموقع الذي سيظهر في نتائج البحث',
                'label' => 'وصف SEO',
                'description' => 'وصف الموقع لمحركات البحث (150-160 حرف)',
            ],
            [
                'key' => 'seo_keywords',
                'group' => 'seo',
                'type' => 'textarea',
                'value' => 'كلمة1, كلمة2, كلمة3',
                'label' => 'الكلمات المفتاحية',
                'description' => 'الكلمات المفتاحية مفصولة بفواصل',
            ],
            [
                'key' => 'seo_og_image',
                'group' => 'seo',
                'type' => 'image',
                'value' => null,
                'label' => 'صورة المشاركة',
                'description' => 'الصورة التي تظهر عند مشاركة الموقع على السوشيال ميديا',
            ],

            // Footer Settings
            [
                'key' => 'footer_text',
                'group' => 'general',
                'type' => 'textarea',
                'value' => 'جميع الحقوق محفوظة © 2025',
                'label' => 'نص الفوتر',
                'description' => 'النص الذي يظهر في أسفل الموقع',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }

        $this->command->info('Settings created successfully!');
    }
}
