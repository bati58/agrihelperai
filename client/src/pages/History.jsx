import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosClient';
import { useLanguage } from '../context/LanguageContext';

export default function History() {
    const { t } = useLanguage();
    const [scans, setScans] = useState([]);
    const [q, setQ] = useState('');
    const [filter, setFilter] = useState('all');

    const load = () => api.get('/api/predictions').then((r) => setScans(r.data));
    useEffect(() => { load(); }, []);

    const del = async (id) => {
        await api.delete(`/api/predictions/${id}`);
        load();
    };

    const filtered = scans.filter((s) => {
        if (filter === 'healthy' && !s.is_healthy) return false;
        if (filter === 'diseased' && s.is_healthy) return false;
        if (q && !`${s.crop} ${s.disease}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
    });

    const exportCsv = () => {
        const rows = [['Crop', 'Disease', 'Confidence', 'Severity', 'Date']];
        filtered.forEach((s) => rows.push([s.crop, s.disease, s.confidence, s.severity || '', new Date(s.createdAt).toISOString()]));
        const csv = rows.map((r) => r.join(',')).join('\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        const a = document.createElement('a');
        a.href = url; a.download = 'history.csv'; a.click();
    };

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
            <div className="max-w-5xl mx-auto px-6">
                <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                    <h1 className="font-display text-3xl font-bold">{t('history.title')}</h1>
                    <button onClick={exportCsv} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-800 transition-colors shadow-sm">{t('history.exportBtn')}</button>
                </motion.div>
                <motion.div variants={itemVariants} className="flex gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input placeholder={t('history.searchPlaceholder')} value={q} onChange={(e) => setQ(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" />
                    </div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border shadow-sm outline-none focus:ring-2 focus:ring-green-500">
                        <option value="all">{t('history.filterAll')}</option>
                        <option value="healthy">{t('history.filterHealthy')}</option>
                        <option value="diseased">{t('history.filterDiseased')}</option>
                    </select>
                </motion.div>
                
                {filtered.length === 0 ? (
                    <motion.p variants={itemVariants} className="text-gray-400 text-center py-20">{t('history.noScans')} <Link to="/detect" className="text-green-700">{t('history.startScanning')}</Link></motion.p>
                ) : (
                    <motion.div variants={itemVariants} className="space-y-3">
                        <AnimatePresence>
                            {filtered.map((s) => (
                                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={s._id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                    <Link to={`/result/${s._id}`} className="flex items-center gap-4 flex-1">
                                        <img src={s.image_url} alt="" className="w-14 h-14 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-medium">{s.crop} — {s.disease}</p>
                                            <p className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()} · {s.is_healthy ? t('history.healthy') : s.severity}</p>
                                        </div>
                                    </Link>
                                    <button onClick={() => del(s._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}