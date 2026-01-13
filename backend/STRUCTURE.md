# 📁 هيكلة المشروع - Elite Website

## 🏗️ نظرة عامة على الهيكلة

تم تنظيم المشروع بطريقة احترافية تسهل الصيانة والتطوير المستقبلي.

---

## 📂 Backend Structure (Laravel)

```
app/
├── Enums/                      # ثوابت النظام
│   ├── UserRole.php           # أدوار المستخدمين (admin, editor, user)
│   ├── SettingType.php        # أنواع الإعدادات
│   └── SettingGroup.php       # مجموعات الإعدادات
│
├── Http/
│   ├── Controllers/
│   │   ├── Admin/             # Controllers لوحة التحكم
│   │   │   ├── DashboardController.php
│   │   │   ├── NewsController.php
│   │   │   ├── PagesController.php
│   │   │   ├── ServicesController.php
│   │   │   ├── SlidersController.php
│   │   │   ├── SettingsController.php
│   │   │   ├── ContactsController.php
│   │   │   └── UsersController.php
│   │   │
│   │   └── Public/            # Controllers الموقع العام
│   │       ├── HomeController.php
│   │       ├── NewsController.php
│   │       ├── ServiceController.php
│   │       ├── PageController.php
│   │       └── ContactController.php
│   │
│   ├── Middleware/
│   │   └── Authenticate.php
│   │
│   └── Requests/
│       ├── Admin/             # Form Requests للوحة التحكم
│       │   ├── NewsRequest.php
│       │   ├── PageRequest.php
│       │   ├── ServiceRequest.php
│       │   ├── SliderRequest.php
│       │   ├── SettingRequest.php
│       │   └── UserRequest.php
│       │
│       └── Public/            # Form Requests للموقع العام
│           └── ContactRequest.php
│
├── Models/                    # نماذج قاعدة البيانات
│   ├── User.php
│   ├── News.php
│   ├── Page.php
│   ├── Service.php
│   ├── Slider.php
│   ├── Contact.php
│   └── Setting.php
│
├── Services/                  # Business Logic Layer
│   ├── SettingService.php     # إدارة الإعدادات مع Cache
│   ├── FileUploadService.php  # رفع وحذف الملفات
│   ├── NewsService.php        # منطق الأخبار
│   ├── PageService.php        # منطق الصفحات
│   ├── ServiceService.php     # منطق الخدمات
│   ├── SliderService.php      # منطق السلايدر
│   └── ContactService.php     # منطق الرسائل
│
└── Traits/                    # سمات مشتركة للنماذج
    ├── HasSlug.php           # توليد slug تلقائي
    ├── HasStatus.php         # scopes للحالة
    └── Orderable.php         # ترتيب العناصر
```

---

## 📂 Frontend Structure (React + TypeScript)

```
resources/js/
├── Components/
│   ├── UI/                    # مكونات واجهة المستخدم الأساسية
│   │   ├── index.ts          # Barrel export
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Modal.tsx
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Spinner.tsx
│   │   ├── Pagination.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Toggle.tsx
│   │   ├── Avatar.tsx
│   │   └── Tooltip.tsx
│   │
│   └── Common/                # مكونات مشتركة
│       ├── index.ts
│       ├── Breadcrumb.tsx
│       ├── PageHeader.tsx
│       ├── SectionTitle.tsx
│       ├── EmptyState.tsx
│       ├── LoadingScreen.tsx
│       ├── ImageUploader.tsx
│       ├── ConfirmDialog.tsx
│       └── SearchInput.tsx
│
├── Layouts/                   # تخطيطات الصفحات
│   ├── AdminLayout.tsx
│   └── PublicLayout.tsx
│
├── Pages/
│   ├── Admin/                 # صفحات لوحة التحكم
│   │   ├── Dashboard.tsx
│   │   ├── News/
│   │   ├── Pages/
│   │   ├── Services/
│   │   ├── Sliders/
│   │   ├── Settings/
│   │   ├── Contacts/
│   │   └── Users/
│   │
│   └── Public/                # صفحات الموقع العام
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── News/
│       ├── Services/
│       └── Pages/
│
├── hooks/                     # React Hooks مخصصة
│   ├── index.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useClickOutside.ts
│   ├── useMediaQuery.ts
│   ├── useToggle.ts
│   ├── useDisclosure.ts
│   ├── useCopyToClipboard.ts
│   └── useScrollPosition.ts
│
├── utils/                     # دوال مساعدة
│   ├── index.ts
│   ├── format.ts             # تنسيق التواريخ والأرقام
│   ├── validation.ts         # التحقق من الصحة
│   ├── helpers.ts            # دوال عامة
│   └── api.ts                # دوال API
│
├── types/                     # TypeScript Types
│   ├── index.ts
│   ├── models.ts             # أنواع النماذج
│   ├── api.ts                # أنواع API
│   ├── forms.ts              # أنواع النماذج
│   └── common.ts             # أنواع عامة
│
└── constants/                 # ثوابت التطبيق
    ├── index.ts
    ├── app.ts                # إعدادات التطبيق
    ├── navigation.ts         # قوائم التنقل
    └── permissions.ts        # الصلاحيات
```

---

## 🔧 كيفية الاستخدام

### استيراد المكونات

```tsx
// استيراد مكونات UI
import { Button, Input, Modal, Card } from '@/Components/UI';

// استيراد مكونات مشتركة
import { PageHeader, EmptyState, ImageUploader } from '@/Components/Common';

// استيراد Hooks
import { useDebounce, useDisclosure, useLocalStorage } from '@/hooks';

// استيراد Utils
import { formatDate, formatRelativeTime, cn } from '@/utils';

// استيراد Types
import type { News, User, PaginatedResponse } from '@/types';

// استيراد Constants
import { PERMISSIONS, APP_NAME, PUBLIC_NAV_ITEMS } from '@/constants';
```

### استخدام Services في Laravel

```php
// في Controller
public function __construct(
    protected NewsService $newsService,
    protected FileUploadService $fileUploadService
) {}

public function store(NewsRequest $request)
{
    $news = $this->newsService->create($request->validated());
    return redirect()->route('admin.news.index');
}
```

### استخدام Traits في Models

```php
use App\Traits\HasSlug;
use App\Traits\HasStatus;
use App\Traits\Orderable;

class News extends Model
{
    use HasSlug, HasStatus, Orderable;
    
    protected string $slugSource = 'title';
}
```

### استخدام Enums

```php
use App\Enums\UserRole;

// الحصول على جميع الأدوار
$roles = UserRole::cases();

// الحصول على التسمية بالعربية
$label = UserRole::ADMIN->label(); // 'مدير'
```

---

## 📝 ملاحظات مهمة

1. **Barrel Exports**: كل مجلد يحتوي على `index.ts` لتسهيل الاستيراد
2. **Type Safety**: جميع الملفات تستخدم TypeScript
3. **RTL Support**: جميع المكونات تدعم الاتجاه من اليمين لليسار
4. **Arabic Labels**: جميع الرسائل والتسميات بالعربية
5. **Caching**: Services تستخدم Cache لتحسين الأداء

---

## 🚀 أوامر مفيدة

```bash
# تشغيل السيرفر
php artisan serve

# تشغيل Vite للتطوير
npm run dev

# بناء للإنتاج
npm run build

# تنظيف الكاش
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# إعادة تشغيل الـ queue
php artisan queue:restart
```
