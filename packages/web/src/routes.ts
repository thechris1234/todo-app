import { createBrowserRouter, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import { DEFAULT_LANG, FALLBACK_LANG, getBrowserLocale, isSupportedLocale, stripLangFromPath } from './utils/language';

import NotFound from './routes/not-found';
import App from './App';
import Index from './routes/index';
import Profile from './routes/profile';
import Auth from './routes/auth';
import i18n, { initI18n } from './localization';

initI18n();

const rootLoader = async ({ request, params }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const pathLang = params.lang;

    if (pathLang && !isSupportedLocale(pathLang)) {
        throw redirect(`/notfound`);
    }

    if (pathLang === DEFAULT_LANG) {
        const strippedPath = stripLangFromPath(url.pathname);
        if (strippedPath !== url.pathname) {
            throw redirect(strippedPath + url.search);
        }
    }

    let langToSet = DEFAULT_LANG;

    if (params.lang && isSupportedLocale(params.lang)) {
        langToSet = params.lang;
    } else {
        const browserLang = getBrowserLocale();
        const hasSessionHistory = window.history.length > 1;

        if (browserLang !== DEFAULT_LANG && !hasSessionHistory) {
            const newPath = `/${browserLang}${url.pathname === '/' ? '' : url.pathname}`;
            throw redirect(newPath);
        }

        langToSet = i18n.language || DEFAULT_LANG;
    }

    if (i18n.language !== langToSet) {
        await i18n.changeLanguage(langToSet);
    }

    return null;
};

const authIndexRedirect = ({ params }: LoaderFunctionArgs) => {
    const lang = params.lang;

    if (lang && !isSupportedLocale(lang)) {
        throw redirect(`/notfound`);
    }

    if (lang && lang !== DEFAULT_LANG) {
        throw redirect(`/${lang}/auth/login`);
    }

    throw redirect(`/auth/login`);
};

const router = createBrowserRouter([
    {
        path: '/',
        loader: rootLoader,
        Component: App,
        children: [
            { index: true, Component: Index },
            { path: 'profile', Component: Profile },
            {
                path: 'auth',
                Component: Auth,
                children: [
                    { index: true, loader: authIndexRedirect },
                    { path: 'login', Component: Auth },
                    { path: 'signup', Component: Auth },
                    { path: '*', loader: () => redirect(`/auth/login`) },
                ],
            },
            { path: '*', Component: NotFound, loader: () => ({ lang: DEFAULT_LANG }) },
            { path: 'notfound', Component: NotFound, loader: () => ({ lang: DEFAULT_LANG }) },
        ],
    },

    {
        path: '/:lang',
        loader: rootLoader,
        Component: App,
        children: [
            { index: true, Component: Index },
            { path: 'profile', Component: Profile },
            {
                path: 'auth',
                Component: Auth,
                children: [
                    { index: true, loader: authIndexRedirect },
                    { path: 'login', Component: Auth },
                    { path: 'signup', Component: Auth },
                    {
                        path: '*',
                        loader: ({ params }) => redirect(`/${params.lang}/auth/login`),
                    },
                ],
            },
            { path: '*', Component: NotFound, loader: ({ params }) => ({ lang: params.lang || FALLBACK_LANG }) },
            { path: 'notfound', Component: NotFound, loader: ({ params }) => ({ lang: params.lang || FALLBACK_LANG }) },
        ],
    },
]);

export default router;
