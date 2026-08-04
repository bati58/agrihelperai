import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, User, Mail, Phone, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../api/axiosClient';

export default function Profile() {
    const { user, login } = useAuth();
    const { t } = useLanguage();
    const [form, setForm] = useState({ full_name: '', phone: '', country: '' });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) setForm({ full_name: user.full_name || '', phone: user.phone || '', country: user.country || '' });
    }, [user]);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            const { data } = await api.put('/api/auth/me', form);
            const meRes = await api.get('/api/auth/me');
            window.dispatchEvent(new CustomEvent('auth:refresh', { detail: meRes.data }));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || t('profile.errorSave'));
        } finally {
            setSaving(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-2xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-500 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-white text-2xl font-bold">
                            {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h1 className="font-display text-3xl font-bold">{user?.full_name || t('profile.title')}</h1>
                        <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {user?.role === 'admin' ? t('profile.roleAdmin') : t('profile.roleFarmer')}
                        </p>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</motion.div>
                    )}
                    {saved && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm overflow-hidden">
                            <CheckCircle className="w-4 h-4" /> {t('profile.success')}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={save} className="bg-white rounded-3xl border border-green-100 p-6 space-y-5 shadow-sm">
                    {/* Email (readonly) */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1.5">
                            <Mail className="w-4 h-4 text-gray-400" /> {t('profile.labelEmail')}
                        </label>
                        <input
                            disabled value={user?.email || ''}
                            className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-500 text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">{t('profile.emailNote')}</p>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1.5">
                            <User className="w-4 h-4 text-gray-400" /> {t('profile.labelName')}
                        </label>
                        <input
                            value={form.full_name}
                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                            placeholder={t('profile.phName')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1.5">
                            <Phone className="w-4 h-4 text-gray-400" /> {t('profile.labelPhone')}
                        </label>
                        <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+251 91 234 5678"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1.5">
                            <Globe className="w-4 h-4 text-gray-400" /> {t('profile.labelCountry')}
                        </label>
                        <input
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            placeholder={t('profile.phCountry')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit" disabled={saving}
                        className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3.5 rounded-xl hover:bg-green-800 disabled:opacity-60 transition-colors"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : null}
                        {saved ? t('profile.btnSaved') : saving ? t('profile.btnSaving') : t('profile.btnSave')}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}