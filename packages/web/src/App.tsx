import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import { supportedLocales } from './types/locale-type';
import i18n from './localization';

export default function App() {
    const { lang } = useParams();

    useEffect(() => {
        const languageToUse = supportedLocales.includes(lang ?? '') ? lang! : 'hu';

        if (i18n.language !== languageToUse) {
            i18n.changeLanguage(languageToUse).then(() => {
                console.log('Language changed to:', i18n.language);
            });
        }
    }, [lang]);

    return (
        <>
            <Outlet />
        </>
    );
}
