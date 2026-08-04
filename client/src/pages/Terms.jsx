import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
    const { t } = useLanguage();

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="min-h-screen bg-white py-20">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div variants={fadeIn} className="mb-12">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-6">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">{t('terms.title')}</h1>
                    <p className="text-gray-500">{t('terms.lastUpdated')}</p>
                </motion.div>

                <motion.div variants={fadeIn} className="prose prose-green max-w-none text-gray-600">
                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('terms.s1Title')}</h2>
                    <p className="mb-4">{t('terms.s1Text')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('terms.s2Title')}</h2>
                    <p className="mb-4">{t('terms.s2Text')}</p>
                    
                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('terms.s3Title')}</h2>
                    <p className="mb-4">{t('terms.s3Text')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('terms.s4Title')}</h2>
                    <p className="mb-4">{t('terms.s4Text')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('terms.s5Title')}</h2>
                    <p className="mb-4">{t('terms.s5Text')}</p>

                    <div className="mt-12 p-6 bg-green-50 rounded-2xl border border-green-100">
                        <h3 className="font-bold text-gray-900 mb-2">{t('terms.contactTitle')}</h3>
                        <p className="text-sm">{t('terms.contactText')} <a href="mailto:legal@cropdoctor.ai" className="text-green-700 font-medium hover:underline">legal@cropdoctor.ai</a></p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
