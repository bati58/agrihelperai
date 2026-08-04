import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Microscope, Camera, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosClient';
import { useLanguage } from '../context/LanguageContext';

/* ── Static image map for crops (Unsplash) ─────────────── */
const CROP_IMAGES = {
    Maize: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=360&fit=crop&auto=format',
    Tomato: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9tYXRvfGVufDB8fDB8fHww',
    Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=360&fit=crop&auto=format',
    Coffee: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=360&fit=crop&auto=format',
    Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=360&fit=crop&auto=format',
    Banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=360&fit=crop&auto=format',
    Pepper: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D',
    Mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=360&fit=crop&auto=format',
    Onion: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600&h=360&fit=crop&auto=format',
    Barley: 'https://images.unsplash.com/photo-1574860910121-12b0a65a6209?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFybGV5fGVufDB8fDB8fHww',
    Cassava: 'https://images.unsplash.com/photo-1726497573569-5e7040b8128b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhc3NhdmF8ZW58MHx8MHx8fDA%3D',
    Rice: 'https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D',
    Sorghum: 'https://images.unsplash.com/photo-1704627647734-61e38adedc4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U29yZ2h1bXxlbnwwfHwwfHx8MA%3D%3D',
    Soybean: 'https://plus.unsplash.com/premium_photo-1661840453139-aef1ff57f4da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U295YmVhbnxlbnwwfHwwfHx8MA%3D%3D',
};

/* ── Disease name color pills ───────────────────────────── */
const PILL_COLORS = [
    'bg-green-100 text-green-800',
    'bg-blue-100 text-blue-800',
    'bg-amber-100 text-amber-800',
    'bg-rose-100 text-rose-800',
    'bg-purple-100 text-purple-800',
];

export default function CropLibrary() {
    const { t } = useLanguage();
    const [crops, setCrops] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/api/crops'),
            api.get('/api/diseases'),
        ]).then(([cropsRes, diseasesRes]) => {
            setCrops(cropsRes.data);
            setDiseases(diseasesRes.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filtered = crops.filter((c) =>
        `${c.name} ${c.scientific_name}`.toLowerCase().includes(q.toLowerCase())
    );

    /* Get diseases for a crop */
    const cropDiseases = (cropName) =>
        diseases.filter((d) => d.crop_name === cropName);

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="min-h-screen bg-gray-50">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden" style={{ minHeight: 260 }}>
                <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop"
                    alt="Farm field"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(4,25,8,0.92) 0%,rgba(10,60,20,0.75) 100%)' }} />
                <motion.div variants={fadeIn} className="relative z-10 text-white py-16">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-green-500/25 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-300 font-medium mb-5">
                            <Leaf className="w-3.5 h-3.5 text-green-400" /> {t('cropLibrary.badge')}
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                            {t('cropLibrary.title')}
                        </h1>
                        <p className="text-green-200 text-base mb-8 max-w-lg mx-auto">
                            {t('cropLibrary.subtitle')}
                        </p>
                        {/* Search */}
                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder={t('cropLibrary.searchPlaceholder')}
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg transition-shadow focus:shadow-xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── Grid ── */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-24 text-gray-400 flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
                        {t('cropLibrary.loading')}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300 shadow-sm border border-gray-100">
                            <Leaf className="w-8 h-8" />
                        </div>
                        <h3 className="text-gray-900 font-semibold mb-1">{t('cropLibrary.noResultsTitle')}</h3>
                        <p className="text-gray-500 text-sm">{t('cropLibrary.noResultsSubtitle')} "{q}"</p>
                    </div>
                ) : (
                    <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filtered.map((crop) => {
                                const cDiseases = cropDiseases(crop.name);
                                const imgUrl = CROP_IMAGES[crop.name] || 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=360&fit=crop';
                                return (
                                    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={crop._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                                        <div className="relative h-48 overflow-hidden bg-green-50">
                                            <img
                                                src={imgUrl}
                                                alt={crop.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h2 className="text-2xl font-bold text-white mb-0.5">{crop.name}</h2>
                                                <p className="text-green-200 text-xs italic opacity-90">{crop.scientific_name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                    {crop.description || t('cropLibrary.noDesc')}
                                                </p>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 rounded-2xl p-4">
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t('cropLibrary.optimalTemp')}</p>
                                                    <p className="text-sm font-semibold text-gray-900">{crop.optimal_temperature || '—'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t('cropLibrary.waterNeeds')}</p>
                                                    <p className="text-sm font-semibold text-gray-900">{crop.water_requirements || '—'}</p>
                                                </div>
                                                <div className="col-span-2 pt-2 border-t border-gray-200/60 mt-1">
                                                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">{t('cropLibrary.soilType')}</p>
                                                    <p className="text-sm font-medium text-gray-800">{crop.soil_type || '—'}</p>
                                                </div>
                                            </div>

                                            {/* Diseases list */}
                                            <div className="mt-auto">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                                        {t('cropLibrary.knownDiseases')} ({cDiseases.length})
                                                    </h4>
                                                </div>
                                                {cDiseases.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {cDiseases.slice(0, 5).map((d, i) => (
                                                            <Link to="/diseases" key={d._id} title="View in Disease Library"
                                                                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${PILL_COLORS[i % PILL_COLORS.length]} hover:opacity-80 transition-opacity cursor-pointer`}>
                                                                {d.name}
                                                            </Link>
                                                        ))}
                                                        {cDiseases.length > 5 && (
                                                            <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
                                                                +{cDiseases.length - 5}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic bg-gray-50 rounded-lg px-3 py-2 border border-dashed border-gray-200">
                                                        {t('cropLibrary.noDiseasesListed')}
                                                    </p>
                                                )}
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
            
            {/* CTA */}
            <section className="bg-green-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{t('cropLibrary.ctaTitle')}</h2>
                    <p className="text-green-200 text-sm md:text-base mb-8">{t('cropLibrary.ctaSubtitle')}</p>
                    <Link to="/detect" className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                        <Camera className="w-5 h-5" /> {t('cropLibrary.ctaBtn')}
                    </Link>
                </div>
            </section>
        </motion.div>
    );
}