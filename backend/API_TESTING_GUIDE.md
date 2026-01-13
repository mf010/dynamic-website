# API Testing Guide

## Available API Endpoints

### Authentication Endpoints (Public)
- **POST** `/api/register` - Register a new user
- **POST** `/api/login` - Login user

### Protected Endpoints (Require Authentication Token)
- **POST** `/api/logout` - Logout current user

### User Management (Protected)
- **GET** `/api/users` - List all users
- **POST** `/api/users` - Create a new user
- **GET** `/api/users/{id}` - Get specific user
- **PUT/PATCH** `/api/users/{id}` - Update user
- **DELETE** `/api/users/{id}` - Delete user

### News Management (Protected)
- **GET** `/api/news` - List all news
- **POST** `/api/news` - Create news
- **GET** `/api/news/{id}` - Get specific news
- **PUT/PATCH** `/api/news/{id}` - Update news
- **DELETE** `/api/news/{id}` - Delete news

## Testing with cURL or Postman

### 1. Register a User
```bash
curl -X POST http://127.0.0.1:8000/api/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Create News (Use token from login)
```bash
curl -X POST http://127.0.0.1:8000/api/news \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Breaking News",
    "content": "This is the news content"
  }'
```

### 4. Get All News
```bash
curl -X GET http://127.0.0.1:8000/api/news \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Database Setup Required

**Important**: Before testing the APIs, you need to set up the database:

### Option 1: Use MySQL
1. Start MySQL server
2. Create database: `CREATE DATABASE news_website;`
3. Update `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=news_website
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
4. Run migrations: `php artisan migrate`

### Option 2: Enable SQLite (Requires PHP Extension)
1. Enable `extension=pdo_sqlite` and `extension=sqlite3` in `php.ini`
2. Restart PHP
3. Run: `php artisan migrate`

## Next Steps
1. Set up your database (see above)
2. Run: `php artisan migrate`
3. Start server: `php artisan serve`
4. Test the endpoints using the examples above
