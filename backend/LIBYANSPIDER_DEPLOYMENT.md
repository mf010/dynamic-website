# 🚀 دليل رفع النظام على استضافة LibyanSpider (Megalon)

## 📋 المتطلبات الأساسية

تأكد أن باقتك تدعم:
- ✅ PHP 8.2 أو أعلى
- ✅ MySQL / MariaDB
- ✅ SSH Access (مفضل) أو Terminal في cPanel
- ✅ Composer
- ✅ Node.js (أو ارفع مجلد build جاهز)

---

## 🔧 الخطوة 1: تجهيز الملفات للرفع

### على جهازك المحلي:

```powershell
# ادخل لمجلد المشروع
cd c:\xampp\htdocs\elite-wepsite\news-website

# تأكد من بناء ملفات الإنتاج
npm run build

# احذف الملفات غير الضرورية
# لا ترفع: node_modules, .git, vendor
```

### الملفات المطلوب رفعها:
```
news-website/
├── app/                 ✅
├── bootstrap/           ✅
├── config/              ✅
├── database/            ✅
├── public/              ✅ (يشمل build/)
├── resources/           ✅
├── routes/              ✅
├── storage/             ✅
├── artisan              ✅
├── composer.json        ✅
├── composer.lock        ✅
├── .env.example         ✅
├── node_modules/        ❌ لا ترفع
├── vendor/              ❌ لا ترفع
├── .env                 ❌ سننشئه على السيرفر
```

---

## 🔧 الخطوة 2: إنشاء قاعدة البيانات

### من cPanel:

1. ادخل **cPanel** → **MySQL® Databases**
2. أنشئ قاعدة بيانات جديدة: `elite_db`
3. أنشئ مستخدم جديد: `elite_user` مع كلمة مرور قوية
4. اربط المستخدم بقاعدة البيانات مع **ALL PRIVILEGES**

> 📝 سجّل هذه المعلومات:
> - اسم قاعدة البيانات: `username_elite_db`
> - اسم المستخدم: `username_elite_user`
> - كلمة المرور: `********`

---

## 🔧 الخطوة 3: رفع الملفات

### الطريقة 1: عبر File Manager في cPanel

1. ادخل **cPanel** → **File Manager**
2. اذهب إلى مجلد `public_html` أو المجلد الفرعي المطلوب
3. اضغط **Upload** وارفع ملف zip للمشروع
4. فك الضغط

### الطريقة 2: عبر FTP

```
Host: ftp.yourdomain.com
Username: (من cPanel)
Password: (من cPanel)
Port: 21
```

### هيكل الملفات على السيرفر:

**الخيار أ: الموقع الرئيسي**
```
public_html/
├── (محتويات مجلد public/)
│   ├── index.php
│   ├── .htaccess
│   ├── build/
│   └── ...
│
الملفات خارج public_html (في المجلد الرئيسي):
/home/username/
├── elite-app/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── artisan
│   ├── composer.json
│   └── .env
```

**الخيار ب: نطاق فرعي / مجلد فرعي**
```
public_html/
└── elite/
    ├── (كل ملفات المشروع)
    └── public/
        ├── index.php
        └── ...
```

---

## 🔧 الخطوة 4: تعديل index.php (مهم جداً!)

### إذا رفعت الملفات بالخيار أ:

عدّل ملف `public_html/index.php`:

```php
<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// تعديل المسارات للإشارة لمجلد التطبيق
$appPath = dirname(__DIR__) . '/elite-app';

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $appPath.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $appPath.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once $appPath.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
```

### إذا رفعت بالخيار ب (مجلد فرعي):

عدّل `.htaccess` في المجلد الرئيسي:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

---

## 🔧 الخطوة 5: إنشاء ملف .env

### عبر File Manager أو SSH:

أنشئ ملف `.env` في مجلد التطبيق:

```env
APP_NAME="Elite Company"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_TIMEZONE=Africa/Tripoli
APP_URL=https://yourdomain.com

APP_LOCALE=ar
APP_FALLBACK_LOCALE=ar

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=username_elite_db
DB_USERNAME=username_elite_user
DB_PASSWORD=your_strong_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=true

CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=info@yourdomain.com
MAIL_PASSWORD=email_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=info@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

LOG_CHANNEL=daily
LOG_LEVEL=error
```

---

## 🔧 الخطوة 6: تثبيت Composer

### عبر SSH (Terminal):

```bash
# اتصل بـ SSH
ssh username@yourdomain.com

# اذهب لمجلد التطبيق
cd ~/elite-app

# أو إذا كان في public_html
cd ~/public_html/elite

# تثبيت Composer
composer install --optimize-autoloader --no-dev
```

### إذا لم يكن SSH متاحاً:

1. ثبّت Composer محلياً على جهازك
2. شغّل: `composer install --no-dev`
3. ارفع مجلد `vendor/` كاملاً

---

## 🔧 الخطوة 7: إعداد Laravel

### عبر SSH:

```bash
# إنشاء مفتاح التطبيق
php artisan key:generate

# تشغيل الهجرات
php artisan migrate --force

# إضافة البيانات الأولية
php artisan db:seed --force

# إنشاء رابط التخزين
php artisan storage:link

# تخزين الإعدادات
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### عبر cPanel (إذا لم يكن SSH متاحاً):

استخدم **Terminal** في cPanel وشغّل نفس الأوامر.

---

## 🔧 الخطوة 8: ضبط الصلاحيات

```bash
# صلاحيات المجلدات
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# إذا واجهت مشاكل
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

## 🔧 الخطوة 9: إعداد SSL (HTTPS)

### من cPanel:

1. اذهب إلى **SSL/TLS** أو **Let's Encrypt**
2. فعّل شهادة SSL مجانية للنطاق
3. في `.env` تأكد أن `APP_URL=https://...`

### في `.htaccess` (public):

فعّل سطر HTTPS:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## ✅ الخطوة 10: اختبار الموقع

1. افتح: `https://yourdomain.com`
2. جرب تسجيل الدخول: `https://yourdomain.com/login`
   - البريد: `admin@example.com`
   - كلمة المرور: `password`
3. ادخل لوحة التحكم: `https://yourdomain.com/admin`

---

## ⚠️ مهم جداً بعد النشر:

### 1. غيّر كلمات المرور الافتراضية:
```bash
php artisan tinker
>>> $user = User::where('email', 'admin@example.com')->first();
>>> $user->password = bcrypt('كلمة_مرور_جديدة_قوية');
>>> $user->save();
```

### 2. تأكد من إعدادات الأمان:
- `APP_DEBUG=false` ✅
- `APP_ENV=production` ✅

---

## 🔧 استكشاف الأخطاء

### خطأ 500:
```bash
# تحقق من السجلات
cat storage/logs/laravel.log

# امسح الذاكرة المؤقتة
php artisan config:clear
php artisan cache:clear
```

### صفحة بيضاء:
```bash
chmod -R 775 storage bootstrap/cache
```

### الصور لا تظهر:
```bash
php artisan storage:link
```

### خطأ في قاعدة البيانات:
- تأكد من بيانات `.env`
- تأكد من ربط المستخدم بقاعدة البيانات في cPanel

---

## 📞 الدعم الفني

إذا واجهت أي مشكلة:
1. تحقق من `storage/logs/laravel.log`
2. تواصل مع دعم LibyanSpider
3. تأكد من إصدار PHP (8.2+)

---

**🎉 مبروك! موقعك الآن على الإنترنت!**
