import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { DEFAULT_LANG, getLanguageFromPath, isSupportedLocale } from './utils/language';
import i18n from './localization';

export default function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        const pathLang = getLanguageFromPath(pathname);

        if (isSupportedLocale(pathLang) && i18n.language !== pathLang) {
            i18n.changeLanguage(pathLang);
        } else if (!isSupportedLocale(pathLang) && i18n.language !== DEFAULT_LANG) {
            i18n.changeLanguage(DEFAULT_LANG);
        }
    }, [pathname]);

    return (
        <>
            <Outlet />
        </>
    );
}
