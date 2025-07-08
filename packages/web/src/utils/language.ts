import i18n from '../localization';
import { supportedLocales } from '../types/locale-type';

export const DEFAULT_LANG = 'hu';
export const FALLBACK_LANG = 'us';

export function isSupportedLocale(lang: string): boolean {
    return supportedLocales.includes(lang);
}

export function getBrowserLocale(): string {
    const browserLang = navigator.language.toLowerCase();
    const shortLang = browserLang.split('-')[0];

    if (isSupportedLocale(shortLang)) {
        return shortLang;
    }

    return FALLBACK_LANG;
}

export function getLanguageFromPath(pathname: string): string {
    if (typeof pathname !== 'string') return DEFAULT_LANG;

    const pathSegment = pathname.split('/')[1];

    if (!pathSegment) return DEFAULT_LANG;

    if (isSupportedLocale(pathSegment)) {
        return pathSegment;
    }

    if (/^[a-z]{2}$/.test(pathSegment)) {
        return FALLBACK_LANG;
    }

    return DEFAULT_LANG;
}

export function hasExplicitLanguageInPath(pathname: string): boolean {
    const pathSegment = pathname.split('/')[1];
    return !!pathSegment && isSupportedLocale(pathSegment);
}

export function stripLangFromPath(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    const isPrefixed = isSupportedLocale(segments[0]);

    const relevantSegments = isPrefixed ? segments.slice(1) : segments;

    return '/' + relevantSegments.join('/');
}

export function getPathWithLanguage(pathname: string, lang: string): string {
    const stripped = stripLangFromPath(pathname);

    if (lang === DEFAULT_LANG) {
        return stripped;
    }

    return `/${lang}${stripped}`;
}

export async function changeLanguage(lang: string, navigate: (path: string) => void) {
    if (!isSupportedLocale(lang)) return;

    await i18n.changeLanguage(lang);

    const newPath = getPathWithLanguage(window.location.pathname, lang);
    if (window.location.pathname !== newPath) {
        navigate(newPath);
    }
}
