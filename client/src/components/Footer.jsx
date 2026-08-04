import { Link } from 'react-router-dom';
import { Leaf, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PLATFORM = [
    { labelKey: 'footer.home',     to: '/'        },
    { labelKey: 'footer.detect',   to: '/detect'  },
    { labelKey: 'footer.crops',    to: '/crops'   },
    { labelKey: 'footer.diseases', to: '/diseases'},
    { labelKey: 'footer.history',  to: '/history' },
];

const COMPANY = [
    { labelKey: 'footer.about',   to: '/about'    },
    { labelKey: 'footer.contact', to: '/contact'  },
    { labelKey: 'footer.signUp',  to: '/register' },
    { labelKey: 'footer.support', to: '/support', highlight: true },
    { labelKey: 'footer.privacy', to: '/privacy'  },
    { labelKey: 'footer.terms',   to: '/terms'    },
];

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer style={{ background: '#051a09' }} className="text-green-300">

            {/* ── Main grid ── */}
            <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* Brand — spans 2 cols on md */}
                    <div className="md:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center shadow">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-white text-[15px]">CropDoctor AI</span>
                        </Link>
                        <p className="text-sm text-green-500 leading-relaxed max-w-xs mb-4">
                            {t('footer.desc')}
                        </p>
                        <a href="mailto:hello@cropdoctor.ai"
                            className="inline-flex items-center gap-2 text-sm text-green-500 hover:text-green-300 transition-colors">
                            <Mail className="w-4 h-4" />
                            hello@cropdoctor.ai
                        </a>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-white font-semibold mb-5">{t('footer.platform')}</h4>
                        <ul className="space-y-3">
                            {PLATFORM.map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to}
                                        className="text-sm text-green-500 hover:text-green-200 transition-colors flex items-center gap-1 group">
                                        {t(l.labelKey)}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-5">{t('footer.company')}</h4>
                        <ul className="space-y-3">
                            {COMPANY.map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to}
                                        className={`text-sm transition-colors flex items-center gap-1 group ${l.highlight ? 'text-pink-400 hover:text-pink-200 font-medium' : 'text-green-500 hover:text-green-200'}`}>
                                        {l.highlight && <Heart className="w-3 h-3 fill-current" />}
                                        {t(l.labelKey)}
                                        {!l.highlight && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* ── Bottom border ── */}
            <div className="border-t border-green-900/50">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-green-700">
                        © {new Date().getFullYear()} CropDoctor AI. {t('footer.copyright')}
                    </p>
                    <p className="text-xs text-green-700 flex items-center gap-1.5">
                        {t('footer.tagline')}
                    </p>
                </div>
            </div>

        </footer>
    );
}
