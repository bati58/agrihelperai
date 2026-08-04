import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, ChevronDown, ChevronUp, Camera, AlertCircle, Microscope, Shield, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosClient';
import { useLanguage } from '../context/LanguageContext';

/* ── Crop thumbnail images (matching CropLibrary) ─────── */
const CROP_IMAGES = {
    Maize:    'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=80&h=80&fit=crop&auto=format',
    Tomato:   'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=80&h=80&fit=crop&auto=format',
    Potato:   'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=80&h=80&fit=crop&auto=format',
    Coffee:   'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=80&h=80&fit=crop&auto=format',
    Wheat:    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop&auto=format',
    Banana:   'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&h=80&fit=crop&auto=format',
    Pepper:   'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=80&h=80&fit=crop&auto=format',
    Mango:    'https://images.unsplash.com/photo-1553279768-865429fa0078?w=80&h=80&fit=crop&auto=format',
    Onion:    'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=80&h=80&fit=crop&auto=format',
    Barley:   'https://images.unsplash.com/photo-1574860910121-12b0a65a6209?w=80&h=80&fit=crop&auto=format',
    Cassava:  'https://images.unsplash.com/photo-1726497573569-5e7040b8128b?w=80&h=80&fit=crop&auto=format',
    Rice:     'https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=80&h=80&fit=crop&auto=format',
    Sorghum:  'https://images.unsplash.com/photo-1704627647734-61e38adedc4d?w=80&h=80&fit=crop&auto=format',
    Soybean:  'https://plus.unsplash.com/premium_photo-1661840453139-aef1ff57f4da?w=80&h=80&fit=crop&auto=format',
};

const SEVERITY_STYLE = {
    High:   'bg-red-100 text-red-700 border border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border border-amber-200',
    Low:    'bg-green-100 text-green-700 border border-green-200',
};

export default function DiseaseLibrary() {
    const { t } = useLanguage();
    const [diseases, setDiseases] = useState([]);
    const [cropNames, setCropNames] = useState([]);
    const [q, setQ] = useState('');
    const [activeCrop, setActiveCrop] = useState('All');
    const [openId, setOpenId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/diseases').then((r) => {
            setDiseases(r.data);
            const names = [...new Set(r.data.map((d) => d.crop_name))].sort();
            setCropNames(names);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filtered = diseases.filter((d) => {
        const matchesCrop = activeCrop === 'All' || d.crop_name === activeCrop;
        const matchesQ = `${d.name} ${d.crop_name}`.toLowerCase().includes(q.toLowerCase());
        return matchesCrop && matchesQ;
    });

    const toggle = (id) => setOpenId(openId === id ? null : id);

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="min-h-screen bg-gray-50">
            {/* ── Hero ── */}
            <section className="relative overflow-hidden" style={{ minHeight: 270 }}>
                <img
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80&auto=format&fit=crop"
                    alt="Crop field"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(4,25,8,0.92) 0%,rgba(10,55,20,0.78) 100%)' }} />
                <motion.div variants={fadeIn} className="relative z-10 text-white py-16">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-green-500/25 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-300 font-medium mb-5">
                            <Microscope className="w-3.5 h-3.5 text-green-400" /> {t('diseaseLibrary.badge')}
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                            {t('diseaseLibrary.title')}
                        </h1>
                        <p className="text-green-200 text-base mb-8 max-w-lg mx-auto">
                            {t('diseaseLibrary.subtitle')}
                        </p>
                        {/* Search */}
                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder={t('diseaseLibrary.searchPlaceholder')}
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg transition-shadow focus:shadow-xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* ── Crop filter tabs ── */}
                {!loading && cropNames.length > 0 && (
                    <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-8">
                        <button
                            onClick={() => setActiveCrop('All')}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors shadow-sm ${
                                activeCrop === 'All'
                                    ? 'bg-green-700 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }`}
                        >
                            {t('diseaseLibrary.allCrops')}
                        </button>
                        {cropNames.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActiveCrop(c)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 ${
                                    activeCrop === c
                                        ? 'bg-green-700 text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:bg-green-50'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* ── Loading / Empty ── */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
                        {t('diseaseLibrary.loading')}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-900 font-semibold mb-1">{t('diseaseLibrary.noResultsTitle')}</h3>
                        <p className="text-gray-500 text-sm">{t('diseaseLibrary.noResultsSubtitle')} "{q}"</p>
                    </div>
                ) : (
                    /* ── List ── */
                    <motion.div variants={staggerContainer} className="space-y-4">
                        <AnimatePresence>
                            {filtered.map((disease) => {
                                const isOpen = openId === disease._id;
                                const cropImg = CROP_IMAGES[disease.crop_name] || 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=80&h=80&fit=crop';
                                const severityClass = SEVERITY_STYLE[disease.severity] || SEVERITY_STYLE.Medium;

                                return (
                                    <motion.div layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} key={disease._id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <button
                                            onClick={() => toggle(disease._id)}
                                            className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 bg-white hover:bg-gray-50/50 transition-colors"
                                        >
                                            <div className="flex items-start sm:items-center gap-4 flex-1">
                                                <img
                                                    src={cropImg}
                                                    alt={disease.crop_name}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-gray-100 shadow-sm flex-shrink-0"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                                                            {disease.crop_name}
                                                        </span>
                                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${severityClass}`}>
                                                            {disease.severity || 'Medium'} {t('diseaseLibrary.severity')}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">{disease.name}</h3>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-gray-100 bg-gray-50/30"
                                                >
                                                    <div className="p-5 sm:p-6 grid md:grid-cols-2 gap-8">
                                                        <div className="space-y-6">
                                                            <div>
                                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                                                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                                                                    {t('diseaseLibrary.symptoms')}
                                                                </h4>
                                                                <ul className="space-y-2">
                                                                    {disease.symptoms?.map((s, idx) => (
                                                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                                                                            <span className="text-rose-400 mt-1 flex-shrink-0">•</span>
                                                                            {s}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                                                    <Microscope className="w-3.5 h-3.5 text-amber-500" />
                                                                    {t('diseaseLibrary.cause')}
                                                                </h4>
                                                                <p className="text-sm text-gray-700 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                                                                    {disease.cause || t('diseaseLibrary.noInfo')}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <div>
                                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                                                    <Leaf className="w-3.5 h-3.5 text-green-500" />
                                                                    {t('diseaseLibrary.organicTreatment')}
                                                                </h4>
                                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                                    {disease.treatment_organic || t('diseaseLibrary.noInfo')}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                                                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                                                                    {t('diseaseLibrary.chemicalTreatment')}
                                                                </h4>
                                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                                    {disease.treatment_chemical || t('diseaseLibrary.noInfo')}
                                                                </p>
                                                            </div>
                                                            {disease.prevention?.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                                                        <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                                                                        {t('diseaseLibrary.prevention')}
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {disease.prevention.map((p, idx) => (
                                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                                                                                <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                                                                                {p}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}