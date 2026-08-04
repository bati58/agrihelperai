import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import om from '../i18n/om.json';
import am from '../i18n/am.json';

const translations = { en, om, am };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Try to get saved language from localStorage, default to 'en'
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return ['en', 'om', 'am'].includes(saved) ? saved : 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Apply amharic font class to body if language is am
        if (language === 'am') {
            document.body.classList.add('font-amharic');
        } else {
            document.body.classList.remove('font-amharic');
        }
    }, [language]);

    // Helper function to resolve dot notation paths (e.g. "nav.home")
    const getNestedTranslation = (obj, path) => {
        return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
    };

    const t = (key) => {
        if (!key || typeof key !== 'string') return key || '';
        const value = getNestedTranslation(translations[language], key);
        // Fallback to English if translation is missing, then to the key itself
        if (!value) {
            const fallbackValue = getNestedTranslation(translations['en'], key);
            return fallbackValue || key;
        }
        return value;
    };

    const changeLanguage = (lang) => {
        if (['en', 'om', 'am'].includes(lang)) {
            setLanguage(lang);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
