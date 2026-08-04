import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Camera, History, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [scans, setScans] = useState([]);

    useEffect(() => {
        api.get('/api/predictions').then((r) => setScans(r.data)).catch(() => { });
    }, []);

    const healthy = scans.filter((s) => s.is_healthy).length;
    const crops = new Set(scans.map((s) => s.crop)).size;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h1 variants={itemVariants} className="font-display text-3xl font-bold mb-1">
                    {t('dashboard.welcome')}, {user?.full_name || t('dashboard.farmer')}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-gray-500 mb-8">{t('dashboard.subtitle')}</motion.p>
                
                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Stat label={t('dashboard.statScans')} value={scans.length} />
                    <Stat label={t('dashboard.statHealthy')} value={healthy} />
                    <Stat label={t('dashboard.statDiseases')} value={scans.length - healthy} />
                    <Stat label={t('dashboard.statCrops')} value={crops} />
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
                    <Action to="/detect" icon={<Camera className="w-5 h-5" />} title={t('dashboard.actionDetect')} />
                    <Action to="/history" icon={<History className="w-5 h-5" />} title={t('dashboard.actionHistory')} />
                    <Action to="/crops" icon={<BookOpen className="w-5 h-5" />} title={t('dashboard.actionLibrary')} />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8">
                    <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><Leaf className="w-5 h-5 text-green-700" /> {t('dashboard.recentTitle')}</h2>
                    {scans.length === 0 ? (
                        <p className="text-gray-400">{t('dashboard.noScans')} <Link to="/detect" className="text-green-700">{t('dashboard.startScan')}</Link></p>
                    ) : (
                        <div className="space-y-3">
                            {scans.slice(0, 5).map((s) => (
                                <Link key={s._id} to={`/result/${s._id}`} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                                    <img src={s.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-medium text-sm">{s.crop} — {s.disease}</p>
                                        <p className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
            <div className="text-2xl font-bold text-green-700">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    );
}

function Action({ to, icon, title }) {
    return (
        <Link to={to} className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-green-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700">{icon}</div>
            <span className="font-medium">{title}</span>
        </Link>
    );
}