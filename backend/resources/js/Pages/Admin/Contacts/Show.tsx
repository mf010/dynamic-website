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
    contact: Contact;
}

export default function ContactsShow({ contact }: Props) {
    const deleteContact = () => {
        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            router.delete(route('admin.contacts.destroy', contact.id));
        }
    };

    return (
        <AdminLayout header="عرض الرسالة">
            <Head title="عرض الرسالة" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                            {contact.subject || 'بدون موضوع'}
                        </h3>
                        <span className="text-sm text-gray-500">
                            {new Date(contact.created_at).toLocaleDateString('ar', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">الاسم</label>
                            <p className="mt-1 text-gray-900">{contact.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">البريد الإلكتروني</label>
                            <p className="mt-1 text-gray-900" dir="ltr">{contact.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">رقم الهاتف</label>
                            <p className="mt-1 text-gray-900" dir="ltr">{contact.phone || 'غير محدد'}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500">الرسالة</label>
                        <div className="mt-2 rounded-lg bg-gray-50 p-4">
                            <p className="whitespace-pre-wrap text-gray-900">{contact.message}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'رسالتك'}`}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
                        >
                            الرد عبر البريد
                        </a>
                        {contact.phone && (
                            <a
                                href={`tel:${contact.phone}`}
                                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-500"
                            >
                                الاتصال
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 px-6 py-3">
                    <Link
                        href={route('admin.contacts.index')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        رجوع
                    </Link>
                    <button
                        onClick={deleteContact}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500"
                    >
                        حذف الرسالة
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
