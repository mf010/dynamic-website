# React Frontend - Laravel API Connection

This document explains how the React frontend connects to the Laravel backend API.

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory with the following:

```env
# Laravel Backend API URL
VITE_API_URL=http://localhost:8000/api
```

For production, update this to your production API URL:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Vite Proxy (Development)

The `vite.config.ts` is configured to proxy `/api` requests to `http://localhost:8000` during development, which helps avoid CORS issues.

## API Structure

### Laravel API Routes

Based on the Laravel `routes/api.php`:

```
Public Routes:
- POST /api/register - User registration
- POST /api/login    - User login

Protected Routes (requires authentication):
- POST /api/logout   - User logout
- GET/POST/PUT/DELETE /api/users - User management
- GET/POST/PUT/DELETE /api/news  - News management
```

### Authentication

The frontend uses **Laravel Sanctum** token-based authentication:

1. **Login**: User credentials are sent to `/api/login`
2. **Token Storage**: The returned token is stored in `localStorage` as `admin_token`
3. **Authenticated Requests**: All subsequent API requests include the token in the `Authorization: Bearer {token}` header
4. **Logout**: Token is invalidated on the server and removed from localStorage

## File Structure

```
src/
├── lib/
│   ├── api.ts      # Axios configuration and API service functions
│   ├── auth.ts     # Authentication service
│   └── index.ts    # Library exports
├── store/
│   └── index.ts    # Zustand stores (auth, settings, language, theme)
├── pages/
│   ├── News.tsx         # Public news listing page
│   ├── NewsDetail.tsx   # Public single news page
│   └── admin/
│       ├── Login.tsx    # Admin login page
│       ├── Layout.tsx   # Admin layout with auth guard
│       ├── Dashboard.tsx
│       └── news/
│           ├── NewsList.tsx  # Admin news management
│           └── NewsForm.tsx  # Create/Edit news
```

## API Services

### Authentication (`authApi`)
```typescript
authApi.login({ email, password })  // POST /api/login
authApi.logout()                     // POST /api/logout
authApi.register(data)               // POST /api/register
```

### News (`newsApi` - Public)
```typescript
newsApi.getAll(params)    // GET /api/news
newsApi.getOne(id)        // GET /api/news/{id}
newsApi.getBySlug(slug)   // GET /api/news/{slug}
```

### Admin News (`adminNewsApi` - Protected)
```typescript
adminNewsApi.getAll(params)      // GET /api/news
adminNewsApi.getOne(id)          // GET /api/news/{id}
adminNewsApi.create(data)        // POST /api/news
adminNewsApi.update(id, data)    // PUT /api/news/{id}
adminNewsApi.delete(id)          // DELETE /api/news/{id}
```

## Running the Application

### Development

1. Start the Laravel backend:
   ```bash
   cd backend
   php artisan serve
   ```

2. Start the React frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5173/admin/login

### Production Build

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist` (or `../public/react` based on vite.config.ts).

## Important Notes

### CORS Configuration

Make sure Laravel's CORS is configured to allow requests from your frontend domain. In Laravel, check `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173', 'https://yourdomain.com'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### Authentication Flow

1. User visits `/admin/login`
2. Submits credentials
3. Laravel validates and returns a Sanctum token
4. Token is stored in `localStorage`
5. All subsequent requests include the token
6. Protected routes check `isAuthenticated` from the auth store
7. On logout or token expiry, user is redirected to login

### Error Handling

The API interceptors handle:
- **401 Unauthorized**: Clears stored auth data and redirects to login
- **Validation Errors**: Returns Laravel validation messages
- **Network Errors**: Handled gracefully with user-friendly messages

## Troubleshooting

### "Network Error" or CORS Issues
- Ensure Laravel is running on `http://localhost:8000`
- Check CORS configuration in Laravel
- Verify `VITE_API_URL` environment variable

### 401 Unauthorized on Protected Routes
- Ensure you're logged in
- Check if token exists in localStorage
- Verify token hasn't expired

### News Not Loading
- The news routes require authentication in Laravel
- Login first, then access news pages
- Or modify Laravel to make news routes public (not recommended without modification permission)
