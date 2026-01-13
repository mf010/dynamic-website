import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  NewspaperIcon,
  UsersIcon,
  PlusIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { adminNewsApi, usersApi } from '@/lib/api'

interface DashboardStats {
  news_count: number
  users_count: number
  recent_news: Array<{
    id: number
    title: string
    slug: string
    is_published: boolean
    created_at: string
  }>
  recent_users: Array<{
    id: number
    name: string
    email: string
    created_at: string
  }>
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch news
        const newsResponse = await adminNewsApi.getAll()
        const newsData = newsResponse.data?.data || newsResponse.data || []
        const newsList = Array.isArray(newsData) ? newsData : []

        // Fetch users
        let usersList: any[] = []
        try {
          const usersResponse = await usersApi.getAll()
          const usersData = usersResponse.data?.data || usersResponse.data || []
          usersList = Array.isArray(usersData) ? usersData : []
        } catch (e) {
          console.log('Users API not available')
        }

        setStats({
          news_count: newsList.length,
          users_count: usersList.length,
          recent_news: newsList.slice(0, 5),
          recent_users: usersList.slice(0, 5),
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        setStats({
          news_count: 0,
          users_count: 0,
          recent_news: [],
          recent_users: [],
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-primary-100">Manage your news articles and users from here.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <Link
            to="/admin/news"
            className="block bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Total News</p>
                <p className="text-4xl font-bold text-neutral-900 dark:text-white mt-1">
                  {stats?.news_count || 0}
                </p>
                <p className="text-sm text-primary-600 mt-2">View all articles →</p>
              </div>
              <div className="p-4 bg-blue-500 rounded-xl">
                <NewspaperIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/admin/users"
            className="block bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Users</p>
                <p className="text-4xl font-bold text-neutral-900 dark:text-white mt-1">
                  {stats?.users_count || 0}
                </p>
                <p className="text-sm text-primary-600 mt-2">Manage users →</p>
              </div>
              <div className="p-4 bg-green-500 rounded-xl">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/news/create"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:bg-blue-500 transition-colors">
              <PlusIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Add News
            </span>
          </Link>
          
          <Link
            to="/admin/news"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:bg-purple-500 transition-colors">
              <PencilSquareIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Edit News
            </span>
          </Link>
          
          <Link
            to="/admin/users/create"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
          >
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:bg-green-500 transition-colors">
              <PlusIcon className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Add User
            </span>
          </Link>
          
          <Link
            to="/admin/users"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
          >
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full group-hover:bg-orange-500 transition-colors">
              <UsersIcon className="w-6 h-6 text-orange-600 dark:text-orange-400 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Manage Users
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Recent Items */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent News */}
        <motion.div
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Recent News
            </h2>
            <Link
              to="/admin/news"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {stats?.recent_news && stats.recent_news.length > 0 ? (
              stats.recent_news.map((news) => (
                <Link
                  key={news.id}
                  to={`/admin/news/${news.id}/edit`}
                  className="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">
                      {news.title}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {new Date(news.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`ml-4 px-2 py-1 text-xs font-medium rounded-full ${
                    news.is_published 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {news.is_published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-500">
                No news articles yet.{' '}
                <Link to="/admin/news/create" className="text-primary-600 hover:underline">
                  Create one
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Recent Users
            </h2>
            <Link
              to="/admin/users"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {stats?.recent_users && stats.recent_users.length > 0 ? (
              stats.recent_users.map((user) => (
                <Link
                  key={user.id}
                  to={`/admin/users/${user.id}/edit`}
                  className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-500">
                No users yet.{' '}
                <Link to="/admin/users/create" className="text-primary-600 hover:underline">
                  Add one
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
