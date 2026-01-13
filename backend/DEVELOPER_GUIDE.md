# 👨‍💻 دليل المطور - Elite Website

## 🎯 نظرة سريعة

هذا المشروع مبني على:
- **Backend**: Laravel 12 + Inertia.js
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Auth**: Laravel Breeze + Spatie Laravel Permission
- **Database**: SQLite (يمكن تغييره لـ MySQL)

---

## 📋 المتطلبات

- PHP 8.2+
- Node.js 18+
- Composer 2+

---

## 🚀 بدء سريع

```bash
# تثبيت التبعيات
composer install
npm install

# إعداد البيئة
cp .env.example .env
php artisan key:generate

# تشغيل الـ migrations
php artisan migrate --seed

# إنشاء رابط التخزين
php artisan storage:link

# تشغيل السيرفر
php artisan serve
npm run dev
```

---

## 🔐 الصلاحيات والأدوار

### الأدوار المتاحة

| الدور | الوصف |
|-------|-------|
| `admin` | صلاحيات كاملة |
| `editor` | تعديل المحتوى فقط |
| `user` | مستخدم عادي |

### الصلاحيات

```php
// الأخبار
'view news', 'create news', 'edit news', 'delete news', 'manage news'

// الصفحات
'view pages', 'create pages', 'edit pages', 'delete pages', 'manage pages'

// الخدمات
'view services', 'create services', 'edit services', 'delete services', 'manage services'

// السلايدر
'view sliders', 'create sliders', 'edit sliders', 'delete sliders', 'manage sliders'

// الرسائل
'view contacts', 'delete contacts', 'manage contacts'

// الإعدادات
'view settings', 'edit settings', 'manage settings'

// المستخدمين
'view users', 'create users', 'edit users', 'delete users', 'manage users'
```

### التحقق من الصلاحيات

```php
// في Controller
$this->authorize('create news');

// في Blade/React
@can('edit news')
// أو في React
{can('edit news') && <EditButton />}
```

---

## 🗃️ Services Layer

### SettingService

```php
use App\Services\SettingService;

$settingService = app(SettingService::class);

// الحصول على قيمة
$value = $settingService->get('site_name', 'القيمة الافتراضية');

// تعيين قيمة
$settingService->set('site_name', 'Elite');

// الحصول على مجموعة
$settings = $settingService->getByGroup('general');

// مسح الكاش
$settingService->clearCache();
```

### FileUploadService

```php
use App\Services\FileUploadService;

$fileService = app(FileUploadService::class);

// رفع ملف
$path = $fileService->upload($request->file('image'), 'news');

// حذف ملف
$fileService->delete($oldPath);

// استبدال ملف
$newPath = $fileService->replace($oldPath, $newFile, 'news');
```

### NewsService

```php
use App\Services\NewsService;

$newsService = app(NewsService::class);

// الحصول على الأخبار المنشورة
$news = $newsService->getPublished(10);

// البحث
$results = $newsService->search('كلمة البحث');

// إنشاء خبر
$news = $newsService->create($validatedData);

// تحديث
$news = $newsService->update($news, $validatedData);

// حذف
$newsService->delete($news);
```

---

## 🎨 Frontend Components

### UI Components

```tsx
import { Button, Input, Modal, Card, Alert } from '@/Components/UI';

// Button
<Button variant="primary" size="md" isLoading={loading}>
    حفظ
</Button>

// Input
<Input
    label="العنوان"
    error={errors.title}
    required
/>

// Modal
<Modal isOpen={isOpen} onClose={close} title="تأكيد">
    <p>هل أنت متأكد؟</p>
</Modal>

// Card
<Card>
    <Card.Header>العنوان</Card.Header>
    <Card.Body>المحتوى</Card.Body>
    <Card.Footer>الأزرار</Card.Footer>
</Card>
```

### Custom Hooks

```tsx
import { 
    useDebounce, 
    useDisclosure, 
    useLocalStorage,
    useMediaQuery 
} from '@/hooks';

// Debounce
const debouncedSearch = useDebounce(searchTerm, 300);

// Modal/Dropdown control
const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

// Local Storage
const [value, setValue] = useLocalStorage('key', defaultValue);

// Media Query
const isMobile = useMediaQuery('(max-width: 639px)');
```

### Utility Functions

```tsx
import { 
    formatDate, 
    formatRelativeTime, 
    truncate, 
    cn,
    storageUrl 
} from '@/utils';

// تنسيق التاريخ
formatDate('2024-01-15'); // "15 يناير 2024"

// وقت نسبي
formatRelativeTime('2024-01-15T10:00:00'); // "منذ 3 ساعات"

// قص النص
truncate('نص طويل جداً...', 50);

// دمج الكلاسات
cn('base-class', isActive && 'active-class', className);

// رابط الصورة
storageUrl(news.image); // "/storage/news/image.jpg"
```

---

## 📝 إضافة ميزة جديدة

### 1. إنشاء Migration

```bash
php artisan make:migration create_projects_table
```

### 2. إنشاء Model

```php
// app/Models/Project.php
namespace App\Models;

use App\Traits\HasSlug;
use App\Traits\HasStatus;

class Project extends Model
{
    use HasSlug, HasStatus;

    protected $fillable = ['title', 'slug', 'content', 'image', 'is_active'];
    protected string $slugSource = 'title';
}
```

### 3. إنشاء Service

```php
// app/Services/ProjectService.php
namespace App\Services;

class ProjectService
{
    public function getActive()
    {
        return Project::active()->ordered()->get();
    }
    
    // ... باقي الدوال
}
```

### 4. إنشاء Controller

```php
// app/Http/Controllers/Admin/ProjectsController.php
namespace App\Http\Controllers\Admin;

class ProjectsController extends Controller
{
    public function __construct(protected ProjectService $projectService) {}
    
    public function index()
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $this->projectService->getPaginated()
        ]);
    }
}
```

### 5. إنشاء صفحة React

```tsx
// resources/js/Pages/Admin/Projects/Index.tsx
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader, EmptyState } from '@/Components/Common';
import { Button, Card } from '@/Components/UI';

export default function Index({ projects }) {
    return (
        <AdminLayout title="المشاريع">
            <PageHeader 
                title="المشاريع"
                actions={<Button>إضافة مشروع</Button>}
            />
            {/* ... */}
        </AdminLayout>
    );
}
```

### 6. إضافة Route

```php
// routes/web.php
Route::resource('admin/projects', ProjectsController::class);
```

---

## 🧪 الاختبار

```bash
# تشغيل جميع الاختبارات
php artisan test

# اختبار ملف محدد
php artisan test --filter=NewsTest

# اختبار مع تغطية
php artisan test --coverage
```

---

## 🔧 أوامر مفيدة

```bash
# مسح جميع أنواع الكاش
php artisan optimize:clear

# إعادة إنشاء الـ autoload
composer dump-autoload

# تحديث التبعيات
composer update
npm update

# فحص الكود
./vendor/bin/pint  # Laravel Pint للـ PHP
npm run lint       # ESLint للـ TypeScript
```

---

## 📞 الدعم

للأسئلة والاستفسارات، يرجى التواصل عبر:
- البريد: dev@elite.sa
- الهاتف: +966 xx xxx xxxx
