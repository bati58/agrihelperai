import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, BookOpen, Microscope, Leaf, Zap, Shield, Smartphone,
    Globe, Award, Users, ChevronDown, ChevronUp, ArrowRight, Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = useState(null);

    /* ─── Crop grid data ─────────────────────────────────── */
    const CROPS = [
        { nameKey: 'crop.banana', sci: 'Musa spp.', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=360&fit=crop&auto=format', risk: 'High', diseases: 3, dot: '#ef4444' },
        { nameKey: 'crop.tomato', sci: 'Solanum lycopersicum', img: 'https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9tYXRvfGVufDB8fDB8fHww', risk: 'High', diseases: 4, dot: '#ef4444' },
        { nameKey: 'crop.potato', sci: 'Solanum tuberosum', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=360&fit=crop&auto=format', risk: 'High', diseases: 3, dot: '#ef4444' },
        { nameKey: 'crop.coffee', sci: 'Coffea arabica', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=360&fit=crop&auto=format', risk: 'High', diseases: 2, dot: '#ef4444' },
        { nameKey: 'crop.wheat', sci: 'Triticum aestivum', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=360&fit=crop&auto=format', risk: 'Medium', diseases: 3, dot: '#f59e0b' },
        { nameKey: 'crop.maize', sci: 'Zea mays', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=360&fit=crop&auto=format', risk: 'High', diseases: 4, dot: '#ef4444' },
        { nameKey: 'crop.pepper', sci: 'Capsicum annuum', img: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D', risk: 'High', diseases: 2, dot: '#ef4444' },
        { nameKey: 'crop.mango', sci: 'Mangifera indica', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=360&fit=crop&auto=format', risk: 'Medium', diseases: 2, dot: '#f59e0b' },
        { nameKey: 'crop.cassava', sci: 'Manihot esculenta', img: 'https://images.unsplash.com/photo-1726497573569-5e7040b8128b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhc3NhdmF8ZW58MHx8MHx8fDA%3D', risk: 'High', diseases: 3, dot: '#ef4444' },
        { nameKey: 'crop.rice', sci: 'Oryza sativa', img: 'https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D', risk: 'High', diseases: 3, dot: '#ef4444' },
        { nameKey: 'crop.soybean', sci: 'Glycine max', img: 'https://plus.unsplash.com/premium_photo-1661840453139-aef1ff57f4da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U295YmVhbnxlbnwwfHwwfHx8MA%3D%3D', risk: 'Medium', diseases: 2, dot: '#f59e0b' },
        { nameKey: 'crop.onion', sci: 'Allium cepa', img: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600&h=360&fit=crop&auto=format', risk: 'Medium', diseases: 2, dot: '#f59e0b' },
    ];

    /* ─── Steps ─────────────────────────────────────────── */
    const STEPS = [
        { icon: <Camera className="w-6 h-6" />, titleKey: 'home.step1Title', descKey: 'home.step1Desc' },
        { icon: <Microscope className="w-6 h-6" />, titleKey: 'home.step2Title', descKey: 'home.step2Desc' },
        { icon: <Leaf className="w-6 h-6" />, titleKey: 'home.step3Title', descKey: 'home.step3Desc' },
        { icon: <BookOpen className="w-6 h-6" />, titleKey: 'home.step4Title', descKey: 'home.step4Desc' },
    ];

    /* ─── Features ──────────────────────────────────────── */
    const FEATURES = [
        { icon: <Zap className="w-5 h-5" />, titleKey: 'home.feat1Title', descKey: 'home.feat1Desc' },
        { icon: <Shield className="w-5 h-5" />, titleKey: 'home.feat2Title', descKey: 'home.feat2Desc' },
        { icon: <Award className="w-5 h-5" />, titleKey: 'home.feat3Title', descKey: 'home.feat3Desc' },
        { icon: <Globe className="w-5 h-5" />, titleKey: 'home.feat4Title', descKey: 'home.feat4Desc' },
        { icon: <Smartphone className="w-5 h-5" />, titleKey: 'home.feat5Title', descKey: 'home.feat5Desc' },
        { icon: <Users className="w-5 h-5" />, titleKey: 'home.feat6Title', descKey: 'home.feat6Desc' },
    ];

    /* ─── Testimonials ──────────────────────────────────── */
    const TESTIMONIALS = [
        { name: 'Amara Diallo', roleKey: 'home.test1Role', stars: 5, initial: 'A', textKey: 'home.test1Text' },
        { name: 'Fatima Nkosi', roleKey: 'home.test2Role', stars: 5, initial: 'F', textKey: 'home.test2Text' },
        { name: 'Samuel Ochieng', roleKey: 'home.test3Role', stars: 5, initial: 'S', textKey: 'home.test3Text' },
    ];

    /* ─── FAQ ───────────────────────────────────────────── */
    const FAQS = [
        { qKey: 'home.faq1Q', aKey: 'home.faq1A' },
        { qKey: 'home.faq2Q', aKey: 'home.faq2A' },
        { qKey: 'home.faq3Q', aKey: 'home.faq3A' },
        { qKey: 'home.faq4Q', aKey: 'home.faq4A' },
        { qKey: 'home.faq5Q', aKey: 'home.faq5A' },
    ];

    // Animation variants
    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="bg-white">

            {/* ═══════════════════════ HERO — full-bleed image ══════════════════════ */}
            <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
                <img
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=85&auto=format&fit=crop"
                    alt="Agricultural field"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ zIndex: 0 }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        zIndex: 1,
                        background: 'linear-gradient(100deg, rgba(4,25,8,0.96) 0%, rgba(6,35,12,0.93) 38%, rgba(8,50,18,0.70) 65%, rgba(10,60,20,0.25) 100%)',
                    }}
                />

                <div className="relative text-white" style={{ zIndex: 2 }}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-36 md:py-44">
                        <motion.div variants={fadeIn} className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 text-sm text-green-300 font-medium mb-7">
                                <Leaf className="w-3.5 h-3.5 text-green-400" />
                                {t('home.heroBadge')}
                            </div>
                            <h1 className="font-display font-bold leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}>
                                {t('home.heroTitleLine1')}<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">
                                    {t('home.heroTitleLine2')}
                                </span><br />
                                {t('home.heroTitleLine3')}
                            </h1>
                            <p className="text-green-100/80 text-lg leading-relaxed mb-10 max-w-lg">
                                {t('home.heroSubtitle')}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/detect"
                                    className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-7 py-3.5 rounded-xl hover:bg-green-50 transition-all shadow-2xl pulse-green text-base">
                                    <Camera className="w-5 h-5" />
                                    {t('home.heroCta1')}
                                </Link>
                                <Link to="/crops"
                                    className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:border-white/60 hover:bg-white/10 transition-all text-base">
                                    <BookOpen className="w-5 h-5" />
                                    {t('home.heroCta2')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeIn} className="bg-black/60 backdrop-blur-sm border-t border-white/10">
                        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
                            {[
                                { val: '14', labelKey: 'home.stat1' },
                                { val: '54+', labelKey: 'home.stat2' },
                                { val: '30+', labelKey: 'home.stat3' },
                                { val: '95%+', labelKey: 'home.stat4' },
                            ].map((s, i) => (
                                <div key={i} className="text-center px-4">
                                    <div className="text-2xl md:text-3xl font-bold text-white">{s.val}</div>
                                    <div className="text-xs text-green-300 mt-0.5 font-medium">{t(s.labelKey)}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ STEPS ════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                            <Zap className="w-3.5 h-3.5" /> {t('home.stepsBadge')}
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                            {t('home.stepsTitle')}
                        </h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STEPS.map((s, i) => (
                            <motion.div variants={fadeIn} key={i} className="text-center relative group">
                                {i < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[58%] right-[-42%] h-px bg-gradient-to-r from-green-200 to-transparent z-0" />
                                )}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-green-50 border-2 border-green-100 group-hover:border-green-400 group-hover:bg-green-100 rounded-2xl flex items-center justify-center text-green-700 transition-all duration-300 shadow-sm">
                                        {s.icon}
                                    </div>
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-green-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm md:text-base">{t(s.titleKey)}</h3>
                                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{t(s.descKey)}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link to="/detect"
                            className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-800 transition-colors shadow-lg">
                            <Camera className="w-5 h-5" /> {t('home.stepsCta')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ CROP GRID ════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex items-end justify-between mb-10">
                        <div>
                            <div className="inline-flex items-center gap-2 text-green-700 bg-green-100 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
                                <Leaf className="w-3.5 h-3.5" /> {t('home.cropsBadge')}
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                                {t('home.cropsTitle')}
                            </h2>
                        </div>
                        <Link to="/crops"
                            className="hidden md:inline-flex items-center gap-1.5 text-green-700 font-semibold text-sm border border-green-200 px-4 py-2 rounded-xl hover:bg-green-50 transition-colors">
                            {t('home.viewAll')} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {CROPS.map((crop) => (
                            <motion.div variants={fadeIn} key={crop.nameKey}>
                                <Link to="/detect"
                                    className="block group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
                                    <div className="relative h-40 overflow-hidden bg-green-50">
                                        <img src={crop.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                        <div className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: crop.dot }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 inline-block" />
                                            {t('home.risk')} {crop.risk}
                                        </div>
                                        <div className="absolute bottom-2 left-3 text-white text-[11px] font-semibold">
                                            {crop.diseases} {t('home.diseases')}
                                        </div>
                                    </div>
                                    <div className="p-3.5">
                                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{t(crop.nameKey)}</h3>
                                        <p className="text-[11px] italic text-gray-400 mt-0.5 truncate">{crop.sci}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ FEATURES ═════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                            <Award className="w-3.5 h-3.5" /> {t('home.featuresBadge')}
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                            {t('home.featuresTitle')}
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
                            {t('home.featuresSubtitle')}
                        </p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {FEATURES.map((f, i) => (
                            <motion.div variants={fadeIn} key={i}
                                className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white hover:bg-green-50/20">
                                <div className="w-11 h-11 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-4 transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm md:text-base">{t(f.titleKey)}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{t(f.descKey)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ TESTIMONIALS ════════════════ */}
            <section className="py-20" style={{ background: 'linear-gradient(135deg,#051e0a 0%,#0d4a1c 55%,#146328 100%)' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-green-800/60 border border-green-600/30 rounded-full px-4 py-1.5 text-sm text-green-300 font-semibold mb-4">
                            <Users className="w-3.5 h-3.5" /> {t('home.testimonialsBadge')}
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                            {t('home.testimonialsTitle')}
                        </h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((tItem, i) => (
                            <motion.div variants={fadeIn} key={i}
                                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(tItem.stars)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-green-100 text-sm leading-relaxed mb-5">"{t(tItem.textKey)}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">{tItem.initial}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{tItem.name}</p>
                                        <p className="text-green-300 text-xs">{t(tItem.roleKey)}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════ FAQ ══════════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-2xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                            {t('home.faqTitle')}
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm">{t('home.faqSubtitle')}</p>
                    </motion.div>
                    <div className="space-y-3">
                        {FAQS.map((faq, i) => (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-900 pr-4 text-sm md:text-base">{t(faq.qKey)}</span>
                                    {openFaq === i
                                        ? <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100"
                                        >
                                            <div className="py-4">{t(faq.aKey)}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ CTA BANNER ══════════════════ */}
            <section className="py-20 bg-green-900">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-800 border border-green-600/40 rounded-full px-4 py-1.5 text-sm text-green-300 font-medium mb-6">
                        <Zap className="w-3.5 h-3.5" /> {t('home.ctaBadge')}
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                        {t('home.ctaTitle')}
                    </h2>
                    <p className="text-green-300 text-base md:text-lg mb-10 max-w-xl mx-auto">
                        {t('home.ctaSubtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/detect"
                            className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl">
                            <Camera className="w-5 h-5" /> {t('home.heroCta1')}
                        </Link>
                        <Link to="/register"
                            className="inline-flex items-center gap-2 border-2 border-green-500/50 text-white font-semibold px-8 py-4 rounded-xl hover:border-green-400 hover:bg-white/5 transition-colors">
                            <ArrowRight className="w-5 h-5" /> {t('home.ctaRegister')}
                        </Link>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
}