import { Link, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    settings?: Record<string, string>;
}

export default function PublicLayout({ children, settings = {} }: PublicLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'الرئيسية', href: route('home') },
        { name: 'من نحن', href: route('about') },
        { name: 'خدماتنا', href: route('services') },
        { name: 'الأخبار', href: route('news') },
        { name: 'اتصل بنا', href: route('contact') },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            {/* Top Bar */}
            <div className="hidden bg-primary-900 py-2 text-sm text-white lg:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            {settings.company_phone && (
                                <a href={`tel:${settings.company_phone}`} className="flex items-center gap-2 hover:text-secondary-400 transition-colors">
                                    <PhoneIcon className="h-4 w-4" />
                                    <span>{settings.company_phone}</span>
                                </a>
                            )}
                            {settings.company_email && (
                                <a href={`mailto:${settings.company_email}`} className="flex items-center gap-2 hover:text-secondary-400 transition-colors">
                                    <EnvelopeIcon className="h-4 w-4" />
                                    <span>{settings.company_email}</span>
                                </a>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            {settings.social_facebook && (
                                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary-400 transition-colors">
                                    <FacebookIcon className="h-4 w-4" />
                                </a>
                            )}
                            {settings.social_twitter && (
                                <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="hover:text-secondary-400 transition-colors">
                                    <TwitterIcon className="h-4 w-4" />
                                </a>
                            )}
                            {settings.social_instagram && (
                                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary-400 transition-colors">
                                    <InstagramIcon className="h-4 w-4" />
                                </a>
                            )}
                            {settings.social_linkedin && (
                                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary-400 transition-colors">
                                    <LinkedInIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-lg shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex items-center gap-3 group">
                                {settings.site_logo ? (
                                    <img src={`/storage/${settings.site_logo}`} alt={settings.site_name || 'Logo'} className="h-12 w-auto" />
                                ) : (
                                    <>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-800 to-primary-900 shadow-lg group-hover:shadow-xl transition-shadow">
                                            <EliteIcon className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xl font-bold text-primary-900">{settings.site_name || 'Elite'}</span>
                                            <span className="block text-xs text-secondary-600 font-medium">للمقاولات والبناء</span>
                                        </div>
                                    </>
                                )}
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center gap-1 lg:flex">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-primary-900 group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-secondary-500 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-secondary-600 hover:to-secondary-700 transform hover:-translate-y-0.5"
                            >
                                <PhoneIcon className="h-4 w-4" />
                                تواصل معنا
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-gray-100 lg:hidden transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-100 py-4">
                            <div className="space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href={route('contact')}
                                    className="mt-4 block rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 px-4 py-3 text-center text-base font-semibold text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    تواصل معنا
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-primary-950 text-white">
                {/* Main Footer */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 shadow-lg">
                                    <EliteIcon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-white">{settings.company_name || 'Elite'}</span>
                                    <span className="block text-xs text-secondary-400">للمقاولات والبناء</span>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                                {settings.company_description || 'شركة رائدة في مجال المقاولات والبناء، نقدم خدمات عالية الجودة مع الالتزام بالمواعيد والمعايير العالمية.'}
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {settings.social_facebook && (
                                    <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-gray-400 hover:bg-secondary-500 hover:text-white transition-all">
                                        <FacebookIcon className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.social_twitter && (
                                    <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-gray-400 hover:bg-secondary-500 hover:text-white transition-all">
                                        <TwitterIcon className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.social_instagram && (
                                    <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-gray-400 hover:bg-secondary-500 hover:text-white transition-all">
                                        <InstagramIcon className="h-5 w-5" />
                                    </a>
                                )}
                                {settings.social_linkedin && (
                                    <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-gray-400 hover:bg-secondary-500 hover:text-white transition-all">
                                        <LinkedInIcon className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-400 mb-6">روابط سريعة</h3>
                            <ul className="space-y-3">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-400 hover:text-secondary-400 transition-colors flex items-center gap-2">
                                            <ChevronLeftIcon className="h-3 w-3" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-400 mb-6">تواصل معنا</h3>
                            <ul className="space-y-4">
                                {settings.company_phone && (
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-800">
                                            <PhoneIcon className="h-5 w-5 text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">الهاتف</p>
                                            <a href={`tel:${settings.company_phone}`} className="text-gray-300 hover:text-secondary-400 transition-colors">
                                                {settings.company_phone}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {settings.company_email && (
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-800">
                                            <EnvelopeIcon className="h-5 w-5 text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">البريد الإلكتروني</p>
                                            <a href={`mailto:${settings.company_email}`} className="text-gray-300 hover:text-secondary-400 transition-colors">
                                                {settings.company_email}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {settings.company_address && (
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-800">
                                            <MapPinIcon className="h-5 w-5 text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">العنوان</p>
                                            <p className="text-gray-300">{settings.company_address}</p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-primary-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <p className="text-sm text-gray-500">
                                © {new Date().getFullYear()} {settings.company_name || 'Elite'}. جميع الحقوق محفوظة.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <Link href="#" className="hover:text-secondary-400 transition-colors">سياسة الخصوصية</Link>
                                <span>|</span>
                                <Link href="#" className="hover:text-secondary-400 transition-colors">الشروط والأحكام</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <ScrollToTopButton />
        </div>
    );
}

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setVisible(window.scrollY > 300);
        });
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 text-white shadow-lg hover:bg-secondary-600 transition-all hover:shadow-xl transform hover:-translate-y-1"
        >
            <ChevronUpIcon className="h-6 w-6" />
        </button>
    );
}

// Icons
function EliteIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
}
function PhoneIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>;
}
function EnvelopeIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
}
function MapPinIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>;
}
function Bars3Icon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
}
function XMarkIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;
}
function ChevronLeftIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>;
}
function ChevronUpIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>;
}
function FacebookIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
}
function TwitterIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
}
function InstagramIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>;
}
function LinkedInIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
}
