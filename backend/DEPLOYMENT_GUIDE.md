# 🚀 دليل نشر موقع Elite على الويب

## ✅ حالة النظام

النظام **جاهز للنشر** ويعمل بشكل كامل!

---

## 📋 متطلبات الاستضافة

| المتطلب | الحد الأدنى | الموصى به |
|---------|-------------|-----------|
| PHP | 8.2+ | 8.3 |
| MySQL/MariaDB | 8.0+ / 10.4+ | 8.0+ |
| Node.js | 18+ | 20 LTS |
| RAM | 512 MB | 1 GB+ |
| مساحة التخزين | 500 MB | 1 GB+ |

### إضافات PHP المطلوبة:
- BCMath
- Ctype
- Fileinfo
- JSON
- Mbstring
- OpenSSL
- PDO (MySQL)
- Tokenizer
- XML
- cURL

---

## 🔧 خطوات النشر

### 1️⃣ رفع الملفات

```bash
# استخدم FTP أو Git لرفع الملفات
# تأكد من رفع جميع الملفات ما عدا:
# - node_modules/
# - vendor/ (سيتم تثبيته على السيرفر)
# - .env (سيتم إنشاؤه على السيرفر)
```

### 2️⃣ إعداد قاعدة البيانات

```sql
-- أنشئ قاعدة بيانات جديدة
CREATE DATABASE elite_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- أنشئ مستخدم (اختياري)
CREATE USER 'elite_user'@'localhost' IDENTIFIED BY 'كلمة_مرور_قوية';
GRANT ALL PRIVILEGES ON elite_website.* TO 'elite_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3️⃣ إعداد ملف `.env`

```env
APP_NAME="Elite Company"
APP_ENV=production
APP_KEY=base64:MOVGk03GokUyM8H4SZaXk0NmcDUI/s+HIYB7F9fLl30=
APP_DEBUG=false
APP_URL=https://yourdomain.com

APP_LOCALE=ar
APP_FALLBACK_LOCALE=ar
APP_FAKER_LOCALE=ar_SA

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=elite_website
DB_USERNAME=elite_user
DB_PASSWORD=كلمة_مرور_قوية

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=info@yourdomain.com
MAIL_PASSWORD=كلمة_مرور_البريد
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=info@yourdomain.com
MAIL_FROM_NAME="Elite Company"
```

### 4️⃣ تثبيت التبعيات

```bash
# على السيرفر عبر SSH
cd /path/to/your/website

# تثبيت Composer
composer install --optimize-autoloader --no-dev

# تثبيت NPM وبناء الملفات (إذا لم ترفع مجلد public/build)
npm install
npm run build
```

### 5️⃣ إعداد Laravel

```bash
# إنشاء مفتاح التطبيق (إذا لزم الأمر)
php artisan key:generate

# تشغيل الهجرات
php artisan migrate --force

# تشغيل البذور (إذا أردت بيانات أولية)
php artisan db:seed --force

# تخزين الإعدادات
php artisan config:cache
php artisan route:cache
php artisan view:cache

# إنشاء رابط التخزين
php artisan storage:link
```

### 6️⃣ إعداد الصلاحيات

```bash
# تأكد من صلاحيات المجلدات
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 7️⃣ إعداد خادم الويب

#### Apache (.htaccess موجود بالفعل في public/)

```apache
# في httpd.conf أو virtual host
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /path/to/your/website/public
    
    <Directory /path/to/your/website/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/your/website/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

---

## 🔐 بيانات الدخول الافتراضية

| الدور | البريد الإلكتروني | كلمة المرور |
|-------|------------------|-------------|
| مدير | admin@example.com | password |
| محرر | editor@example.com | password |

⚠️ **هام**: غيّر كلمات المرور فور النشر!

---

## 🛡️ نصائح الأمان

1. **غيّر `APP_DEBUG=false`** في الإنتاج
2. **غيّر كلمات المرور الافتراضية**
3. **استخدم HTTPS** (شهادة SSL)
4. **احتفظ بنسخ احتياطية** منتظمة
5. **حدّث التبعيات** بانتظام

---

## 📁 الملفات المطلوب رفعها

```
elite-website/
├── app/                 ✅ مطلوب
├── bootstrap/           ✅ مطلوب
├── config/              ✅ مطلوب
├── database/            ✅ مطلوب
├── public/              ✅ مطلوب (يشمل build/)
├── resources/           ✅ مطلوب
├── routes/              ✅ مطلوب
├── storage/             ✅ مطلوب
├── artisan              ✅ مطلوب
├── composer.json        ✅ مطلوب
├── composer.lock        ✅ مطلوب
├── package.json         ✅ مطلوب
├── vite.config.js       ✅ مطلوب
├── tailwind.config.js   ✅ مطلوب
├── tsconfig.json        ✅ مطلوب
├── .env.example         ✅ مطلوب
├── node_modules/        ❌ لا ترفع
├── vendor/              ❌ لا ترفع (composer install)
└── .env                 ❌ أنشئه على السيرفر
```

---

## 🔄 التحديثات المستقبلية

```bash
# عند التحديث
git pull origin main  # أو ارفع الملفات الجديدة

composer install --optimize-autoloader --no-dev
npm install && npm run build

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## ❓ استكشاف الأخطاء

### صفحة بيضاء أو خطأ 500
```bash
php artisan config:clear
php artisan cache:clear
chmod -R 755 storage bootstrap/cache
```

### الصور لا تظهر
```bash
php artisan storage:link
```

### أخطاء قاعدة البيانات
```bash
php artisan migrate:status
php artisan migrate --force
```

---

## 📞 الدعم

للمساعدة في النشر، تواصل مع المطور أو راجع:
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)

---

**النظام جاهز للإنتاج! 🎉**
