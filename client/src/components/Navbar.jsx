import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, History, User, LogOut, Menu, X, ShieldCheck, ChevronDown, Globe, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { t, language, changeLanguage } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    const NAV_LINKS = [
        { to: '/', label: 'nav.home' },
        { to: '/crops', label: 'nav.crops' },
        { to: '/diseases', label: 'nav.diseases' },
        { to: '/detect', label: 'nav.detect' },
        { to: '/about', label: 'nav.about' },
        { to: '/support', label: 'nav.support', icon: Heart, highlight: true },
    ];

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        setMenuOpen(false);
        navigate('/');
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'om', label: 'Afaan Oromoo' },
        { code: 'am', label: 'አማርኛ' },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* ── Logo ── */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 flex-shrink-0"
                    onClick={() => setMenuOpen(false)}
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-green-800 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 text-[15px] tracking-tight">CropDoctor</span>
                </Link>

                {/* ── Desktop nav links ── */}
                <div className="hidden md:flex items-center gap-0.5">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                                l.highlight
                                    ? isActive(l.to)
                                        ? 'text-pink-700 bg-pink-50'
                                        : 'text-pink-600 hover:text-pink-700 hover:bg-pink-50'
                                    : isActive(l.to)
                                        ? 'text-green-700 bg-green-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {l.icon && <l.icon className="w-3.5 h-3.5" />}
                            {t(l.label)}
                        </Link>
                    ))}
                </div>

                {/* ── Desktop actions ── */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            {languages.find(l => l.code === language)?.label}
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </button>

                        {langMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-30" onClick={() => setLangMenuOpen(false)} />
                                <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {(user.full_name || user.email || 'U')[0].toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700 max-w-[90px] truncate">
                                    {user.full_name || user.email}
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-40">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                            <p className="text-xs text-gray-400 font-medium">{t('nav.signedAs')}</p>
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700">
                                            <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                                        </Link>
                                        <Link to="/history" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700">
                                            <History className="w-4 h-4" /> {t('nav.history')}
                                        </Link>
                                        <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700">
                                            <User className="w-4 h-4" /> {t('nav.profile')}
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-purple-700 hover:bg-purple-50">
                                                <ShieldCheck className="w-4 h-4" /> {t('nav.admin')}
                                            </Link>
                                        )}
                                        <div className="border-t border-gray-100 mt-1 pt-1">
                                            <button onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut className="w-4 h-4" /> {t('nav.signOut')}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                                {t('nav.signIn')}
                            </Link>
                            <Link to="/register"
                                className="px-4 py-2 text-sm font-bold bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors shadow-sm">
                                {t('nav.getStarted')}
                            </Link>
                        </>
                    )}
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen
                        ? <X className="w-5 h-5 text-gray-700" />
                        : <Menu className="w-5 h-5 text-gray-700" />
                    }
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-0.5 shadow-lg">
                    {/* Mobile Language Selector */}
                    <div className="flex gap-2 pb-2 mb-2 border-b border-gray-100 overflow-x-auto">
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    changeLanguage(lang.code);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${language === lang.code ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>

                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                isActive(l.to)
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {t(l.label)}
                        </Link>
                    ))}

                    <div className="border-t border-gray-100 pt-2 mt-2 space-y-0.5">
                        {user ? (
                            <>
                                <div className="px-4 py-2">
                                    <p className="text-xs text-gray-400">{t('nav.signedAs')} <span className="font-semibold text-gray-600">{user.email}</span></p>
                                </div>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                                </Link>
                                <Link to="/history" onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <History className="w-4 h-4" /> {t('nav.history')}
                                </Link>
                                <Link to="/profile" onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <User className="w-4 h-4" /> {t('nav.profile')}
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-purple-700 hover:bg-purple-50">
                                        <ShieldCheck className="w-4 h-4" /> {t('nav.admin')}
                                    </Link>
                                )}
                                <button onClick={handleLogout}
                                    className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">
                                    <LogOut className="w-4 h-4" /> {t('nav.signOut')}
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-2 pt-1 pb-1">
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    {t('nav.signIn')}
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center py-3 rounded-xl bg-green-700 text-white text-sm font-bold hover:bg-green-800">
                                    {t('nav.getStarted')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
