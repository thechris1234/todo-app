import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationHu from './locales/hu.json';
import translationEn from './locales/en.json';
import { supportedLocales } from '../types/locale-type';

const resources = {
    hu: { translation: translationHu },
    en: { translation: translationEn },
};

function initI18n() {
    const urlLang = window.location.pathname.split('/')[1];
    const fallbackLang = 'en';
    const defaultLang = 'hu';

    let languageToUse: string;

    if (!urlLang) {
        // pl. / vagy üres path
        languageToUse = defaultLang;
    } else if (supportedLocales.includes(urlLang)) {
        languageToUse = urlLang;
    } else if (/^[a-z]{2}$/.test(urlLang)) {
        languageToUse = fallbackLang;
    } else {
        languageToUse = defaultLang;
    }

    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources,
        lng: languageToUse,
        fallbackLng: fallbackLang,
        interpolation: {
            escapeValue: false,
        },
    });
}

initI18n();

export default i18n;
