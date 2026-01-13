import { useEffect, useState } from 'react'
import { EnvelopeIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import api from '@/lib/api'

interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await api.get('/admin/messages', {
        params: { 
          page, 
          per_page: 15,
          is_read: filter === 'all' ? undefined : filter === 'read',
        },
      })
      setMessages(response.data.data)
      setMeta(response.data.meta)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [page, filter])

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    try {
      await api.patch(`/admin/messages/${id}`, { is_read: isRead })
      setMessages(messages.map((m) => m.id === id ? { ...m, is_read: isRead } : m))
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: isRead })
      }
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    setDeleting(id)
    try {
      await api.delete(`/admin/messages/${id}`)
      setMessages(messages.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    } finally {
      setDeleting(null)
    }
  }

  const openMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      handleMarkAsRead(message.id, true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Contact Messages</h1>
          <p className="text-neutral-500">View and manage contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-4">
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f)
                setPage(1)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-xl shadow-soft overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length > 0 ? (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700 max-h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`w-full text-left p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  } ${!message.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${!message.is_read ? 'bg-primary-600' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-neutral-900 dark:text-white ${!message.is_read ? 'font-semibold' : ''}`}>
                        {message.name}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {message.subject}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <EnvelopeIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No messages found</p>
            </div>
          )}

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="text-sm text-primary-600 hover:text-primary-700 disabled:text-neutral-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-neutral-500">
                {page} / {meta.last_page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === meta.last_page}
                className="text-sm text-primary-600 hover:text-primary-700 disabled:text-neutral-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-xl shadow-soft">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-neutral-500 mt-1">
                      From: <span className="font-medium text-neutral-700 dark:text-neutral-300">{selectedMessage.name}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.is_read)}
                      className={`p-2 rounded-lg transition-colors ${
                        selectedMessage.is_read
                          ? 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                          : 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      }`}
                      title={selectedMessage.is_read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {selectedMessage.is_read ? <XMarkIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      disabled={deleting === selectedMessage.id}
                      className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700/30 border-b border-neutral-200 dark:border-neutral-700">
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Email:</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary-600 hover:underline ml-2">
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <span className="text-neutral-500">Phone:</span>
                      <a href={`tel:${selectedMessage.phone}`} className="text-primary-600 hover:underline ml-2">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-500">Date:</span>
                    <span className="text-neutral-700 dark:text-neutral-300 ml-2">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn-primary"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center py-16">
              <div>
                <EnvelopeIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
