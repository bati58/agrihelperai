import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Privacy() {
    const { t } = useLanguage();

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="min-h-screen bg-white py-20">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div variants={fadeIn} className="mb-12">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-6">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">{t('privacy.title')}</h1>
                    <p className="text-gray-500">{t('privacy.lastUpdated')}</p>
                </motion.div>

                <motion.div variants={fadeIn} className="prose prose-green max-w-none text-gray-600">
                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('privacy.s1Title')}</h2>
                    <p className="mb-4">{t('privacy.s1Text')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('privacy.s2Title')}</h2>
                    <p className="mb-4">{t('privacy.s2Text')}</p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>{t('privacy.s2Li1')}</li>
                        <li>{t('privacy.s2Li2')}</li>
                        <li>{t('privacy.s2Li3')}</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('privacy.s3Title')}</h2>
                    <p className="mb-4">{t('privacy.s3Text')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('privacy.s4Title')}</h2>
                    <p className="mb-4">{t('privacy.s4Text')}</p>

                    <div className="mt-12 p-6 bg-green-50 rounded-2xl border border-green-100">
                        <h3 className="font-bold text-gray-900 mb-2">{t('privacy.contactTitle')}</h3>
                        <p className="text-sm">{t('privacy.contactText')} <a href="mailto:privacy@cropdoctor.ai" className="text-green-700 font-medium hover:underline">privacy@cropdoctor.ai</a></p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
