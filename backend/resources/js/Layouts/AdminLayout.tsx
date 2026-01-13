import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface AdminLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

export default function AdminLayout({ header, children }: AdminLayoutProps) {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigation = [
        { name: 'لوحة التحكم', href: route('admin.dashboard'), icon: HomeIcon, current: route().current('admin.dashboard') },
        { name: 'الأخبار', href: route('admin.news.index'), icon: NewspaperIcon, current: route().current('admin.news.*') },
        { name: 'الصفحات', href: route('admin.pages.index'), icon: DocumentIcon, current: route().current('admin.pages.*') },
        { name: 'الخدمات', href: route('admin.services.index'), icon: BriefcaseIcon, current: route().current('admin.services.*') },
        { name: 'السلايدر', href: route('admin.sliders.index'), icon: PhotoIcon, current: route().current('admin.sliders.*') },
        { name: 'الرسائل', href: route('admin.contacts.index'), icon: EnvelopeIcon, current: route().current('admin.contacts.*') },
    ];

    const adminNavigation = [
        { name: 'المستخدمين', href: route('admin.users.index'), icon: UsersIcon, current: route().current('admin.users.*') },
        { name: 'الإعدادات', href: route('admin.settings.index'), icon: CogIcon, current: route().current('admin.settings.*') },
    ];

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Sidebar for mobile */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-primary-950/80 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 right-0 flex w-72 flex-col">
                    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
                        <div className="flex h-20 items-center justify-between border-b border-primary-700/50 px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 shadow-lg">
                                    <EliteIcon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white">Elite</span>
                                    <span className="block text-xs text-secondary-400">لوحة التحكم</span>
                                </div>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-primary-800 hover:text-white transition-colors">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">القائمة الرئيسية</p>
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current ? 'bg-secondary-500 text-white shadow-lg' : 'text-gray-300 hover:bg-primary-700/50 hover:text-white'}`}>
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {item.name}
                                    {item.current && <span className="mr-auto flex h-2 w-2 rounded-full bg-white" />}
                                </Link>
                            ))}
                            <div className="my-6 border-t border-primary-700/50" />
                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">الإدارة</p>
                            {adminNavigation.map((item) => (
                                <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current ? 'bg-secondary-500 text-white shadow-lg' : 'text-gray-300 hover:bg-primary-700/50 hover:text-white'}`}>
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {item.name}
                                    {item.current && <span className="mr-auto flex h-2 w-2 rounded-full bg-white" />}
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t border-primary-700/50 p-4">
                            <div className="flex items-center gap-3 rounded-xl bg-primary-800/50 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-sm font-bold text-white">{user.name.charAt(0)}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-white">{user.name}</p>
                                    <p className="truncate text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:flex lg:w-72 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
                    <div className="flex h-20 items-center border-b border-primary-700/50 px-6">
                        <Link href={route('home')} className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-500 shadow-lg">
                                <EliteIcon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white">Elite</span>
                                <span className="block text-xs text-secondary-400">للمقاولات والبناء</span>
                            </div>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">القائمة الرئيسية</p>
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current ? 'bg-secondary-500 text-white shadow-lg' : 'text-gray-300 hover:bg-primary-700/50 hover:text-white'}`}>
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {item.name}
                                {item.current && <span className="mr-auto flex h-2 w-2 rounded-full bg-white" />}
                            </Link>
                        ))}
                        <div className="my-6 border-t border-primary-700/50" />
                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">الإدارة</p>
                        {adminNavigation.map((item) => (
                            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current ? 'bg-secondary-500 text-white shadow-lg' : 'text-gray-300 hover:bg-primary-700/50 hover:text-white'}`}>
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {item.name}
                                {item.current && <span className="mr-auto flex h-2 w-2 rounded-full bg-white" />}
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t border-primary-700/50 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-primary-800/50 p-3 transition-colors hover:bg-primary-800">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-sm font-bold text-white shadow-lg">{user.name.charAt(0)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                                <Link href={route('logout')} method="post" as="button" className="text-xs text-gray-400 hover:text-secondary-400 transition-colors">تسجيل الخروج</Link>
                            </div>
                            <ChevronIcon className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pr-72">
                <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-lg px-4 shadow-sm sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <div className="h-6 w-px bg-gray-200 lg:hidden" />
                    <div className="flex flex-1 justify-between items-center">
                        <div className="flex items-center gap-4">
                            {header && <h1 className="text-xl font-bold text-primary-900">{header}</h1>}
                        </div>
                        <div className="flex items-center gap-x-4">
                            <Link href={route('home')} target="_blank" className="hidden sm:flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-all hover:bg-primary-100">
                                <ExternalLinkIcon className="h-4 w-4" />
                                عرض الموقع
                            </Link>
                            <button className="relative rounded-xl bg-gray-100 p-2.5 text-gray-600 hover:bg-gray-200 transition-colors">
                                <BellIcon className="h-5 w-5" />
                                <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">3</span>
                            </button>
                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-gray-100 transition-colors">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-800 to-primary-900 text-sm font-bold text-white">{user.name.charAt(0)}</div>
                                    <div className="hidden md:block text-right">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">مدير</p>
                                    </div>
                                    <ChevronDownIcon className="h-4 w-4 text-gray-400 hidden md:block" />
                                </button>
                                {userMenuOpen && (
                                    <>
                                        <div className="fixed inset-0" onClick={() => setUserMenuOpen(false)} />
                                        <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
                                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                <UserIcon className="h-4 w-4" />
                                                الملف الشخصي
                                            </Link>
                                            <Link href={route('admin.settings.index')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                <CogIcon className="h-4 w-4" />
                                                الإعدادات
                                            </Link>
                                            <div className="my-1 border-t border-gray-100" />
                                            <Link href={route('logout')} method="post" as="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                                <LogoutIcon className="h-4 w-4" />
                                                تسجيل الخروج
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
                <footer className="border-t border-gray-200 bg-white py-4">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} Elite للمقاولات. جميع الحقوق محفوظة.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function EliteIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
}
function HomeIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
}
function NewspaperIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>;
}
function DocumentIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
}
function BriefcaseIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>;
}
function PhotoIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>;
}
function EnvelopeIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
}
function UsersIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>;
}
function CogIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
}
function Bars3Icon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
}
function XMarkIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;
}
function BellIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>;
}
function ExternalLinkIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>;
}
function ChevronIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>;
}
function ChevronDownIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
}
function UserIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
}
function LogoutIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>;
}
