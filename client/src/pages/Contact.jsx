import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);

    const contactInfo = [
        { icon: <Mail className="w-5 h-5" />, titleKey: 'contact.info1Title', value: 'hello@cropdoctor.ai', subKey: 'contact.info1Sub' },
        { icon: <Phone className="w-5 h-5" />, titleKey: 'contact.info2Title', value: '+251 91 234 5678', subKey: 'contact.info2Sub' },
        { icon: <MapPin className="w-5 h-5" />, titleKey: 'contact.info3Title', value: 'Addis Ababa, Ethiopia', subKey: 'contact.info3Sub' },
    ];

    const faqs = [
        { qKey: 'contact.faq1Q', aKey: 'contact.faq1A' },
        { qKey: 'contact.faq2Q', aKey: 'contact.faq2A' },
        { qKey: 'contact.faq3Q', aKey: 'contact.faq3A' },
        { qKey: 'contact.faq4Q', aKey: 'contact.faq4A' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        await new Promise((r) => setTimeout(r, 1200));
        setSending(false);
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" className="bg-white">
            {/* Hero */}
            <section className="hero-gradient text-white py-20">
                <motion.div variants={fadeIn} className="max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-800/50 rounded-full px-4 py-2 text-sm mb-6">
                        <MessageSquare className="w-3.5 h-3.5" /> {t('contact.badge')}
                    </div>
                    <h1 className="font-display text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('contact.title') }}></h1>
                    <p className="text-green-200 text-lg">{t('contact.subtitle')}</p>
                </motion.div>
            </section>

            {/* Contact Info Cards */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 mb-16">
                <motion.div variants={staggerContainer} className="grid sm:grid-cols-3 gap-4">
                    {contactInfo.map((c, i) => (
                        <motion.div variants={fadeIn} key={i} className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1">
                            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-700">
                                {c.icon}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t(c.titleKey)}</p>
                                <p className="font-semibold text-gray-900 text-sm">{c.value}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{t(c.subKey)}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Form + FAQ */}
            <section className="max-w-5xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <motion.div variants={fadeIn}>
                        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">{t('contact.formTitle')}</h2>
                        <AnimatePresence>
                            {sent && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm overflow-hidden">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    {t('contact.formSuccess')}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.labelName')}</label>
                                    <input
                                        required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Amara Diallo"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.labelEmail')}</label>
                                    <input
                                        type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.labelSubject')}</label>
                                <input
                                    required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder={t('contact.phSubject')}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">{t('contact.labelMessage')}</label>
                                <textarea
                                    required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder={t('contact.phMessage')}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                                />
                            </div>
                            <button
                                type="submit" disabled={sending}
                                className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3.5 rounded-xl hover:bg-green-800 disabled:opacity-60 transition-colors"
                            >
                                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {sending ? t('contact.btnSending') : t('contact.btnSend')}
                            </button>
                        </form>
                    </motion.div>

                    {/* FAQ */}
                    <motion.div variants={fadeIn}>
                        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">{t('contact.faqTitle')}</h2>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border border-green-100 rounded-xl overflow-hidden bg-white">
                                    <button
                                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                        className="w-full text-left px-5 py-4 flex justify-between items-start gap-3 hover:bg-green-50 transition-colors"
                                    >
                                        <span className="font-medium text-gray-900 text-sm">{t(faq.qKey)}</span>
                                        <span className="text-green-700 font-bold text-lg flex-shrink-0 leading-none">
                                            {faqOpen === i ? '−' : '+'}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {faqOpen === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 text-sm text-gray-600 leading-relaxed border-t border-green-100">
                                                <div className="py-4">{t(faq.aKey)}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}