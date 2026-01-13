import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
    };
}

export default function ContactsIndex({ contacts }: Props) {
    const markAsRead = (id: number) => {
        router.post(route('admin.contacts.read', id));
    };

    const deleteContact = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            router.delete(route('admin.contacts.destroy', id));
        }
    };

    return (
        <AdminLayout header="رسائل التواصل">
            <Head title="رسائل التواصل" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">رسائل التواصل</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الحالة
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الاسم
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    البريد الإلكتروني
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الموضوع
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    التاريخ
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {contacts.data.map((contact) => (
                                <tr key={contact.id} className={!contact.is_read ? 'bg-blue-50' : ''}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        {contact.is_read ? (
                                            <span className="text-gray-400">✓ مقروء</span>
                                        ) : (
                                            <span className="font-semibold text-blue-600">● جديد</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {contact.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500" dir="ltr">
                                        {contact.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {contact.subject || 'بدون موضوع'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(contact.created_at).toLocaleDateString('ar')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={route('admin.contacts.show', contact.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                عرض
                                            </Link>
                                            {!contact.is_read && (
                                                <button
                                                    onClick={() => markAsRead(contact.id)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    تحديد كمقروء
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteContact(contact.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {contacts.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        لا توجد رسائل
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
