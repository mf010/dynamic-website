import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const MissionVision = lazy(() => import('./pages/MissionVision'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminLayout = lazy(() => import('./pages/admin/Layout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const NewsList = lazy(() => import('./pages/admin/news/NewsList'))
const NewsForm = lazy(() => import('./pages/admin/news/NewsForm'))
const UsersList = lazy(() => import('./pages/admin/users/UsersList'))
const UserForm = lazy(() => import('./pages/admin/users/UserForm'))

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="mission-vision" element={<MissionVision />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/create" element={<NewsForm />} />
          <Route path="news/:id/edit" element={<NewsForm />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UserForm />} />
          <Route path="users/:id/edit" element={<UserForm />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
