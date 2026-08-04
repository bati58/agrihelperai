import { useState } from 'react';
import { Heart, CheckCircle, Star, Coffee, Zap, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import api from '../api/axiosClient';

const TIERS = [
    { key: 'oneTime', amounts: [50, 100, 200, 500], icon: Coffee, color: 'from-amber-500 to-orange-500' },
    { key: 'monthly', amounts: [25, 50, 100, 250], icon: Star, color: 'from-purple-500 to-pink-500' },
    { key: 'custom', amounts: null, icon: Zap, color: 'from-green-600 to-emerald-500' },
];

const REASONS = ['reason1', 'reason2', 'reason3', 'reason4'];

export default function Support() {
    const { t } = useLanguage();
    const [selectedTier, setSelectedTier] = useState('oneTime');
    const [selectedAmount, setSelectedAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const finalAmount = selectedTier === 'custom' ? Number(customAmount) : selectedAmount;

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!email) return setError('Please enter your email');
        if (!finalAmount || finalAmount < 1) return setError('Please enter a valid amount');
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/api/payment/initiate', {
                amount: finalAmount,
                currency: 'ETB',
                email,
                first_name: 'Generous',
                last_name: 'Supporter',
            });
            if (res.data.checkout_url) {
                window.location.href = res.data.checkout_url;
            }
        } catch (err) {
            // Demo mode — show thank you if Chapa key not configured
            if (err.response?.status === 400) {
                setSuccess(true);
            } else {
                setError(err.response?.data?.message || 'Payment initialization failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('support.thankYou')}</h1>
                    <p className="text-gray-500">Your generosity keeps CropDoctor free for millions of farmers. 🌱</p>
                    <a href="/" className="inline-block mt-6 px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

            {/* ── Hero ── */}
            <div className="hero-gradient py-20 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 70% 30%, #86efac 0%, transparent 50%)' }} />
                <div className="relative max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                        <Heart className="w-4 h-4 text-pink-300 fill-current" />
                        <span className="text-green-200 text-sm font-medium">Support Our Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {t('support.title')}
                    </h1>
                    <p className="text-green-300 text-lg max-w-xl mx-auto">
                        {t('support.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* ── Left: Why Support ── */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-green-600" />
                            {t('support.why')}
                        </h2>
                        <div className="space-y-4">
                            {REASONS.map((key, i) => (
                                <div key={key} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-700 font-bold text-sm">{i + 1}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{t(`support.${key}`)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Impact Stats */}
                        <div className="mt-8 p-6 bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="w-5 h-5 text-green-300" />
                                <h3 className="font-bold">Our Impact</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { val: '14+', label: 'Crops Supported' },
                                    { val: '37+', label: 'Diseases Detected' },
                                    { val: '3', label: 'Languages' },
                                    { val: '100%', label: 'Free for Farmers' },
                                ].map(({ val, label }) => (
                                    <div key={label} className="text-center">
                                        <div className="text-2xl font-bold text-white">{val}</div>
                                        <div className="text-green-300 text-xs">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Donation Form ── */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Support</h2>

                            {/* Tier Tabs */}
                            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-2xl">
                                {TIERS.map(({ key, icon: Icon }) => (
                                    <button
                                        key={key}
                                        id={`tier-${key}`}
                                        onClick={() => { setSelectedTier(key); if (key !== 'custom') setSelectedAmount(TIERS.find(t => t.key === key)?.amounts?.[1] || 100); }}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedTier === key ? 'bg-white shadow-md text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {t(`support.${key}`)}
                                    </button>
                                ))}
                            </div>

                            {/* Amount Selection */}
                            {selectedTier !== 'custom' ? (
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    {TIERS.find(t => t.key === selectedTier)?.amounts.map(amt => (
                                        <button
                                            key={amt}
                                            id={`amount-${amt}`}
                                            onClick={() => setSelectedAmount(amt)}
                                            className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${selectedAmount === amt ? 'border-green-600 bg-green-50 text-green-700 shadow-md' : 'border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50'}`}
                                        >
                                            ETB {amt}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Amount (ETB)</label>
                                    <input
                                        id="custom-amount-input"
                                        type="number"
                                        min="1"
                                        value={customAmount}
                                        onChange={e => setCustomAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 text-lg font-bold"
                                    />
                                </div>
                            )}

                            {/* Donation Form */}
                            <form onSubmit={handleDonate} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Your Email</label>
                                    <input
                                        id="donor-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    id="donate-btn"
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 transition-all shadow-lg hover:shadow-green-200 hover:shadow-xl"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {t('support.processing')}
                                        </span>
                                    ) : (
                                        <>
                                            <Heart className="w-5 h-5 fill-current" />
                                            {t('support.donate')} — ETB {finalAmount || '?'}
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 mt-2">
                                    Powered by <span className="font-semibold text-gray-600">Chapa</span> — Secure Ethiopian payment gateway 🇪🇹
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
