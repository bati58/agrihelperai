import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, Download, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axiosClient';
import { useLanguage } from '../context/LanguageContext';

const severityClass = { Low: 'severity-low', Medium: 'severity-medium', High: 'severity-high' };

export default function Result() {
    const { t } = useLanguage();
    const { id } = useParams();
    const navigate = useNavigate();
    const [pred, setPred] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/api/predictions/${id}`)
            .then((r) => setPred(r.data))
            .catch(() => setError(t('result.errorNotFound')))
            .finally(() => setLoading(false));
    }, [id, t]);

    const downloadReport = () => {
        const w = window.open('', '_blank');
        w.document.write(`<pre>${JSON.stringify(pred, null, 2)}</pre>`);
        w.document.close();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-700" /></div>;
    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-gray-500">{error}</p>
            <Link to="/detect" className="flex items-center gap-2 text-green-700"><ArrowLeft className="w-4 h-4" /> {t('result.tryAgain')}</Link>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-6">
                <div className="flex justify-between mb-6">
                    <Link to="/detect" className="text-green-700 font-medium flex items-center gap-2 hover:text-green-800 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> {t('result.newScan')}
                    </Link>
                    <button onClick={downloadReport} className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition-colors shadow-sm">
                        <Download className="w-4 h-4" /> {t('result.downloadBtn')}
                    </button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border border-green-100 overflow-hidden">
                    <img src={pred.image_url} alt="leaf" className="w-full max-h-80 object-contain bg-gray-50" />
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Leaf className="w-5 h-5 text-green-700" />
                            <h1 className="font-display text-2xl font-bold">{pred.disease}</h1>
                        </div>
                        <p className="text-gray-500 mb-4">{t('result.crop')}: <span className="font-semibold text-gray-700">{pred.crop}</span></p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${pred.is_healthy ? 'bg-green-100 text-green-800' : severityClass[pred.severity]}`}>
                                {pred.is_healthy ? t('result.healthy') : `${pred.severity} ${t('result.severity')}`}
                            </span>
                            {pred.confidence != null && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                    {Math.round(pred.confidence * 100)}% {t('result.confidence')}
                                </span>
                            )}
                        </div>
                        {pred.symptoms?.length > 0 && (
                            <Section title={t('result.symptoms')}><ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">{pred.symptoms.map((s, i) => <li key={i}>{s}</li>)}</ul></Section>
                        )}
                        {pred.cause && <Section title={t('result.cause')}><p className="text-sm text-gray-600">{pred.cause}</p></Section>}
                        {pred.treatment_organic && <Section title={t('result.organic')}><p className="text-sm text-gray-600">{pred.treatment_organic}</p></Section>}
                        {pred.treatment_chemical && <Section title={t('result.chemical')}><p className="text-sm text-gray-600">{pred.treatment_chemical}</p></Section>}
                        {pred.prevention?.length > 0 && (
                            <Section title={t('result.prevention')}><ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">{pred.prevention.map((s, i) => <li key={i}>{s}</li>)}</ul></Section>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-5">
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            {children}
        </div>
    );
}