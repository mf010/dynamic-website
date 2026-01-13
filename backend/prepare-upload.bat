@echo off
echo ========================================
echo    تجهيز ملفات Elite للرفع
echo ========================================
echo.

set SOURCE=c:\xampp\htdocs\elite-wepsite\news-website
set DEST=c:\xampp\htdocs\elite-wepsite\elite-upload

echo [1/4] حذف مجلد الرفع القديم...
if exist "%DEST%" rmdir /s /q "%DEST%"

echo [2/4] إنشاء مجلد الرفع...
mkdir "%DEST%"

echo [3/4] نسخ الملفات المطلوبة...

:: نسخ المجلدات الأساسية
xcopy "%SOURCE%\app" "%DEST%\app\" /e /i /q
xcopy "%SOURCE%\bootstrap" "%DEST%\bootstrap\" /e /i /q
xcopy "%SOURCE%\config" "%DEST%\config\" /e /i /q
xcopy "%SOURCE%\database" "%DEST%\database\" /e /i /q
xcopy "%SOURCE%\public" "%DEST%\public\" /e /i /q
xcopy "%SOURCE%\resources" "%DEST%\resources\" /e /i /q
xcopy "%SOURCE%\routes" "%DEST%\routes\" /e /i /q
xcopy "%SOURCE%\storage" "%DEST%\storage\" /e /i /q

:: نسخ الملفات الجذرية
copy "%SOURCE%\artisan" "%DEST%\" /q
copy "%SOURCE%\composer.json" "%DEST%\" /q
copy "%SOURCE%\composer.lock" "%DEST%\" /q
copy "%SOURCE%\.env.example" "%DEST%\" /q
copy "%SOURCE%\.env.production" "%DEST%\" /q
copy "%SOURCE%\package.json" "%DEST%\" /q
copy "%SOURCE%\vite.config.js" "%DEST%\" /q
copy "%SOURCE%\tailwind.config.js" "%DEST%\" /q
copy "%SOURCE%\tsconfig.json" "%DEST%\" /q
copy "%SOURCE%\postcss.config.js" "%DEST%\" /q 2>nul
copy "%SOURCE%\LIBYANSPIDER_DEPLOYMENT.md" "%DEST%\" /q

echo [4/4] تنظيف الملفات غير الضرورية...
:: حذف ملفات التطوير من storage
if exist "%DEST%\storage\logs\*" del /q "%DEST%\storage\logs\*" 2>nul
if exist "%DEST%\storage\framework\cache\data\*" del /q /s "%DEST%\storage\framework\cache\data\*" 2>nul
if exist "%DEST%\storage\framework\sessions\*" del /q "%DEST%\storage\framework\sessions\*" 2>nul
if exist "%DEST%\storage\framework\views\*" del /q "%DEST%\storage\framework\views\*" 2>nul

echo.
echo ========================================
echo    تم التجهيز بنجاح!
echo ========================================
echo.
echo الملفات جاهزة في:
echo %DEST%
echo.
echo الخطوة التالية:
echo 1. اضغط الملفات في ملف ZIP
echo 2. ارفعها على الاستضافة
echo 3. اتبع دليل LIBYANSPIDER_DEPLOYMENT.md
echo.
pause
