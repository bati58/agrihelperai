import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, X, Loader2, Leaf, AlertCircle, CheckCircle, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosClient';
import CameraCapture from '../components/CameraCapture';
import { useLanguage } from '../context/LanguageContext';

export default function Detect() {
    const { t } = useLanguage();
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const fileRef = useRef();
    const navigate = useNavigate();

    const handleFile = (file) => {
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            return setError(t('detect.errorType'));
        }
        if (file.size > 10 * 1024 * 1024) return setError(t('detect.errorSize'));
        setError('');
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    }, []);

    const analyze = async () => {
        if (!imageFile) return;
        setLoading(true);
        setError('');
        try {
            const fd = new FormData();
            fd.append('image', imageFile);
            const { data } = await api.post('/api/predictions', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate(`/result/${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || t('detect.errorApi'));
        } finally {
            setLoading(false);
        }
    };

    const tips = [
        { icon: <ImageIcon className="w-4 h-4" />, tipKey: 'detect.tip1' },
        { icon: <CheckCircle className="w-4 h-4" />, tipKey: 'detect.tip2' },
        { icon: <Camera className="w-4 h-4" />, tipKey: 'detect.tip3' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={containerVariants} className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-green-700 text-sm font-medium mb-4">
                        <Leaf className="w-4 h-4" /> {t('detect.badge')}
                    </div>
                    <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">{t('detect.title')}</h1>
                    <p className="text-gray-500 text-lg">{t('detect.subtitle')}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-green-100 p-8">
                    {!image ? (
                        <div className={`upload-zone rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${dragging ? 'bg-green-50 border-2 border-dashed border-green-400' : 'border-2 border-dashed border-gray-200 hover:bg-gray-50'}`}
                            onDrop={onDrop} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
                            onClick={() => fileRef.current.click()}>
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110">
                                <Upload className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-lg mb-2">{t('detect.dropzoneTitle')}</h3>
                            <p className="text-gray-400 text-sm mb-6">{t('detect.dropzoneSubtitle')}</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-800 transition-colors shadow-sm"
                                    onClick={(e) => { e.stopPropagation(); fileRef.current.click(); }}>
                                    <Upload className="w-4 h-4" /> {t('detect.btnUpload')}
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border border-green-700 px-6 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setShowCamera(true); }}>
                                    <Camera className="w-4 h-4" /> {t('detect.btnCamera')}
                                </button>
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden"
                                onChange={(e) => handleFile(e.target.files[0])} />
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                            <div className="relative">
                                <img src={image} alt="Uploaded leaf" className="w-full max-h-96 object-contain rounded-2xl bg-gray-50" />
                                <button onClick={() => { setImage(null); setImageFile(null); setError(''); }}
                                    className="absolute top-3 right-3 w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 z-10 transition-colors shadow-md">
                                    <X className="w-4 h-4" />
                                </button>
                                {loading && (
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                        <div className="absolute inset-0 bg-green-900/20" />
                                        <div className="scan-line" />
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
                                            <Loader2 className="w-3 h-3 animate-spin" /> {t('detect.analyzing')}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        <AlertCircle className="w-4 h-4" /> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {loading ? (
                                <div className="text-center py-4">
                                    <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-3" />
                                    <p className="text-green-700 font-medium">{t('detect.analyzing')}</p>
                                    <p className="text-gray-400 text-sm mt-1">{t('detect.waitMessage')}</p>
                                </div>
                            ) : (
                                <button onClick={analyze} className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 shadow-lg pulse-green text-lg transition-transform hover:-translate-y-0.5">
                                    <Leaf className="w-5 h-5" /> {t('detect.btnAnalyze')}
                                </button>
                            )}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">{tip.icon}</div>
                            <p className="text-xs text-gray-500 leading-relaxed">{t(tip.tipKey)}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
            {showCamera && (
                <CameraCapture onCapture={(file) => { handleFile(file); setShowCamera(false); }} onClose={() => setShowCamera(false)} />
            )}
        </motion.div>
    );
}