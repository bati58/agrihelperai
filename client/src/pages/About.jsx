import { Leaf, Users, Zap, Globe, Award, Target, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
    const { t } = useLanguage();

    const stats = [
        { value: '14+', labelKey: 'about.stat1' },
        { value: '30+', labelKey: 'about.stat2' },
        { value: '95%', labelKey: 'about.stat3' },
        { value: '10s', labelKey: 'about.stat4' },
    ];

    const features = [
        { icon: <Zap className="w-6 h-6" />, titleKey: 'about.feat1Title', descKey: 'about.feat1Desc' },
        { icon: <Shield className="w-6 h-6" />, titleKey: 'about.feat2Title', descKey: 'about.feat2Desc' },
        { icon: <Globe className="w-6 h-6" />, titleKey: 'about.feat3Title', descKey: 'about.feat3Desc' },
        { icon: <Smartphone className="w-6 h-6" />, titleKey: 'about.feat4Title', descKey: 'about.feat4Desc' },
        { icon: <Award className="w-6 h-6" />, titleKey: 'about.feat5Title', descKey: 'about.feat5Desc' },
        { icon: <Users className="w-6 h-6" />, titleKey: 'about.feat6Title', descKey: 'about.feat6Desc' },
    ];

    const team = [
        { name: 'Dr. Amara Diallo', roleKey: 'about.team1Role' },
        { name: 'Kemi Adeyemi', roleKey: 'about.team2Role' },
        { name: 'Bati Mulugeta', roleKey: 'about.team3Role' },
        { name: 'Fatima Nkosi', roleKey: 'about.team4Role' },
    ];

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="bg-white">
            {/* Hero */}
            <section className="hero-gradient text-white py-24">
                <motion.div variants={fadeIn} className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-800/50 rounded-full px-4 py-2 text-sm mb-6">
                        <Leaf className="w-3.5 h-3.5" /> {t('about.missionBadge')}
                    </div>
                    <h1 className="font-display text-5xl font-bold leading-tight mb-6">
                        {t('about.heroTitleLine1')}<br />
                        <span className="text-green-400">{t('about.heroTitleLine2')}</span>
                    </h1>
                    <p className="text-green-100 text-xl leading-relaxed max-w-2xl mx-auto">
                        {t('about.heroDesc')}
                    </p>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-green-50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s, i) => (
                            <motion.div variants={fadeIn} key={i} className="text-center">
                                <div className="text-4xl font-bold text-green-700 mb-1">{s.value}</div>
                                <div className="text-sm text-gray-500 font-medium">{t(s.labelKey)}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Problem & Vision */}
            <section className="py-20 max-w-4xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                            <Target className="w-4 h-4" /> {t('about.problemBadge')}
                        </div>
                        <h2 className="font-display text-3xl font-bold mb-4 text-gray-900">
                            {t('about.problemTitle')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('about.problemDesc1') }}></p>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.problemDesc2')}
                        </p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-8 text-white shadow-xl">
                        <h3 className="font-display text-2xl font-bold mb-4">{t('about.visionTitle')}</h3>
                        <p className="text-green-100 leading-relaxed mb-6">
                            {t('about.visionDesc')}
                        </p>
                        <ul className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <li key={i} className="flex items-center gap-2 text-green-200 text-sm">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                                    {t(`about.visionList${i}`)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">{t('about.whyTitle')}</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">{t('about.whySubtitle')}</p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div variants={fadeIn} key={i} className="bg-white rounded-2xl p-6 border border-green-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-4">
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{t(f.titleKey)}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{t(f.descKey)}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 max-w-5xl mx-auto px-6">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">{t('about.teamTitle')}</h2>
                    <p className="text-gray-500">{t('about.teamSubtitle')}</p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((teamItem, i) => (
                        <motion.div variants={fadeIn} key={i} className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md transform hover:scale-110 transition-transform">
                                <span className="text-white text-xl font-bold">{teamItem.name[0]}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">{teamItem.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{t(teamItem.roleKey)}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-green-700 text-white text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-2xl mx-auto px-6">
                    <h2 className="font-display text-3xl font-bold mb-4">{t('about.ctaTitle')}</h2>
                    <p className="text-green-200 mb-8">{t('about.ctaSubtitle')}</p>
                    <Link to="/detect"
                        className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                        <Leaf className="w-5 h-5" /> {t('about.ctaBtn')}
                    </Link>
                </motion.div>
            </section>
        </motion.div>
    );
}