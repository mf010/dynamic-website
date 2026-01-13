import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Setting {
    id: number;
    key: string;
    group: string;
    type: string;
    value: string;
    label: string;
    description: string;
}

interface Props {
    settings: Record<string, Setting[]>;
}

export default function SettingsIndex({ settings }: Props) {
    const [activeTab, setActiveTab] = useState('general');
    
    const allSettings: Record<string, string> = {};
    Object.values(settings).flat().forEach(s => {
        allSettings[s.key] = s.value || '';
    });

    const { data, setData, post, processing } = useForm({
        settings: allSettings,
        files: {} as Record<string, File>,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    const tabs = [
        { key: 'general', label: 'عام' },
        { key: 'company', label: 'الشركة' },
        { key: 'social', label: 'التواصل الاجتماعي' },
        { key: 'seo', label: 'SEO' },
    ];

    const currentSettings = settings[activeTab] || [];

    return (
        <AdminLayout header="الإعدادات">
            <Head title="الإعدادات" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-6 py-4 text-sm font-medium ${
                                    activeTab === tab.key
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {currentSettings.map((setting) => (
                            <div key={setting.key}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {setting.label}
                                </label>
                                {setting.description && (
                                    <p className="text-xs text-gray-500 mb-1">{setting.description}</p>
                                )}
                                
                                {setting.type === 'text' && (
                                    <input
                                        type="text"
                                        value={data.settings[setting.key] || ''}
                                        onChange={(e) => setData('settings', {
                                            ...data.settings,
                                            [setting.key]: e.target.value,
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                )}
                                
                                {setting.type === 'textarea' && (
                                    <textarea
                                        value={data.settings[setting.key] || ''}
                                        onChange={(e) => setData('settings', {
                                            ...data.settings,
                                            [setting.key]: e.target.value,
                                        })}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                )}
                                
                                {setting.type === 'image' && (
                                    <div className="mt-1">
                                        {setting.value && (
                                            <img
                                                src={`/storage/${setting.value}`}
                                                alt=""
                                                className="mb-2 h-20 w-auto rounded"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData('files', {
                                                        ...data.files,
                                                        [setting.key]: file,
                                                    });
                                                }
                                            }}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                )}
                                
                                {setting.type === 'boolean' && (
                                    <input
                                        type="checkbox"
                                        checked={data.settings[setting.key] === '1' || data.settings[setting.key] === 'true'}
                                        onChange={(e) => setData('settings', {
                                            ...data.settings,
                                            [setting.key]: e.target.checked ? '1' : '0',
                                        })}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 px-6 py-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
                        >
                            {processing ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
