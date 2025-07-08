import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANG, FALLBACK_LANG } from '../utils/language';

import translationHu from './locales/hu.json';
import translationGb from './locales/gb.json';
import translationUs from './locales/us.json';

const resources = {
    hu: { translation: translationHu },
    gb: { translation: translationGb },
    us: { translation: translationUs },
};

let initialized = false;

export function initI18n() {
    if (initialized) return i18n;
    initialized = true;

    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources,
        lng: DEFAULT_LANG,
        fallbackLng: FALLBACK_LANG,
        interpolation: {
            escapeValue: false,
        },
    });

    return i18n;
}

export default i18n;
