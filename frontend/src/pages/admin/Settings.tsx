import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import api from '@/lib/api'

interface SettingsData {
  site_name: string
  site_name_ar: string
  site_description: string
  site_description_ar: string
  logo: string
  favicon: string
  email: string
  phone: string
  address: string
  address_ar: string
  working_hours: string
  working_hours_ar: string
  google_maps_url: string
  google_maps_embed: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
  whatsapp: string
  footer_text: string
  footer_text_ar: string
  seo_title: string
  seo_description: string
  google_analytics: string
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await api.get('/admin/settings')
      setSettings(response.data.data)
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (settings) {
      setSettings({ ...settings, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setSaving(true)
    setSuccess(false)
    setError('')

    try {
      await api.put('/admin/settings', settings)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'contact', label: 'Contact' },
    { id: 'social', label: 'Social Media' },
    { id: 'seo', label: 'SEO' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Site Settings</h1>
        <p className="text-neutral-500">Configure your website settings</p>
      </div>

      {/* Status Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
        >
          <CheckCircleIcon className="w-6 h-6 text-green-600" />
          <p className="text-green-700 dark:text-green-400">Settings saved successfully!</p>
        </motion.div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
          <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                English
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="site_name"
                    value={settings.site_name}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Site Description
                  </label>
                  <textarea
                    name="site_description"
                    value={settings.site_description}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Footer Text
                  </label>
                  <input
                    type="text"
                    name="footer_text"
                    value={settings.footer_text}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Arabic (العربية)
              </h2>
              <div className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    اسم الموقع
                  </label>
                  <input
                    type="text"
                    name="site_name_ar"
                    value={settings.site_name_ar}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    وصف الموقع
                  </label>
                  <textarea
                    name="site_description_ar"
                    value={settings.site_description_ar}
                    onChange={handleChange}
                    rows={3}
                    className="input resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    نص التذييل
                  </label>
                  <input
                    type="text"
                    name="footer_text_ar"
                    value={settings.footer_text_ar}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6 md:col-span-2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Branding
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    name="logo"
                    value={settings.logo}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    name="favicon"
                    value={settings.favicon}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Address (English)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    العنوان (Arabic)
                  </label>
                  <input
                    type="text"
                    name="address_ar"
                    value={settings.address_ar}
                    onChange={handleChange}
                    className="input"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Working Hours (English)
                  </label>
                  <input
                    type="text"
                    name="working_hours"
                    value={settings.working_hours}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    ساعات العمل (Arabic)
                  </label>
                  <input
                    type="text"
                    name="working_hours_ar"
                    value={settings.working_hours_ar}
                    onChange={handleChange}
                    className="input"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Google Maps
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="text"
                    name="google_maps_url"
                    value={settings.google_maps_url}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Google Maps Embed URL
                  </label>
                  <input
                    type="text"
                    name="google_maps_embed"
                    value={settings.google_maps_embed}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://www.google.com/maps/embed..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Social Media Links
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Twitter / X
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={settings.twitter}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  YouTube
                </label>
                <input
                  type="text"
                  name="youtube"
                  value={settings.youtube}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                  className="input"
                  placeholder="+218..."
                />
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              SEO Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Default SEO Title
                </label>
                <input
                  type="text"
                  name="seo_title"
                  value={settings.seo_title}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Default SEO Description
                </label>
                <textarea
                  name="seo_description"
                  value={settings.seo_description}
                  onChange={handleChange}
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  name="google_analytics"
                  value={settings.google_analytics}
                  onChange={handleChange}
                  className="input"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
