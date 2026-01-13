# API Testing Instructions

## Your `.env` file is configured correctly:
- Database: MySQL
- Database Name: `roken`
- Host: 127.0.0.1
- Username: root
- Password: (empty)

## The Issue:
The `/api/users` endpoint returns 500 error because it's trying to redirect unauthenticated users to a `login` route that doesn't exist.

## Solution Applied:
I've created `app/Http/Middleware/Authenticate.php` that returns JSON response instead of redirecting for API requests.

## To Test Your APIs:

### 1. Make sure MySQL is running and database `roken` exists

### 2. Start the Laravel server (if not already running):
```powershell
cd "c:\Users\magic\Desktop\New folder (17)\news-website"
php artisan serve
```

### 3. Test Register (Public - No Auth Required):
```powershell
$body = @{name='John Doe';email='john@example.com';password='password123';password_confirmation='password123'} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:8000/api/register -Method POST -Body $body -ContentType 'application/json' -Headers @{Accept='application/json'}
```

### 4. Test Login (Public - No Auth Required):
```powershell
$body = @{email='john@example.com';password='password123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:8000/api/login -Method POST -Body $body -ContentType 'application/json' -Headers @{Accept='application/json'}
$token = $response.data.token
Write-Output "Your token: $token"
```

### 5. Test Get Users (Protected - Requires Auth Token):
```powershell
# Use the token from step 4
Invoke-RestMethod -Uri http://localhost:8000/api/users -Method GET -Headers @{Accept='application/json';Authorization="Bearer $token"}
```

### 6. Test Create News (Protected - Requires Auth Token):
```powershell
$body = @{title='My News Title';content='News content here'} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:8000/api/news -Method POST -Body $body -ContentType 'application/json' -Headers @{Accept='application/json';Authorization="Bearer $token"}
```

## If you get 401 Unauthorized on `/api/users`:
This is CORRECT behavior! The endpoint is protected and requires a token.
You must first:
1. Register or login to get a token
2. Use that token in the Authorization header

## If you still get 500 errors:
Check the Laravel log:
```powershell
Get-Content "storage/logs/laravel.log" -Tail 50
```
