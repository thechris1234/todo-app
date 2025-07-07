import { createBrowserRouter, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import i18n from './localization';
import { supportedLocales } from './types/locale-type';

import App from './App';
import Index from './routes/index';
import Profile from './routes/profile';
import Auth from './routes/auth';

const currentLang = i18n.language?.slice(0, 2);

const withLangValidation = (loader?: (args: LoaderFunctionArgs) => Promise<unknown> | unknown) => {
    return (args: LoaderFunctionArgs) => {
        const lang = args.params.lang;
        if (!supportedLocales.includes(lang ?? '')) {
            throw new Response('Not Found', { status: 404 });
        }

        return loader ? loader(args) : null;
    };
};

const authIndexRedirect = ({ params }: LoaderFunctionArgs) => {
    const lang = params.lang;
    if (lang && lang !== 'hu') {
        throw redirect(`/${lang}/auth/login`);
    }
    throw redirect(`/auth/login`);
};

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: Index },
            { path: 'profile', Component: Profile },
            {
                path: 'auth',
                Component: Auth,
                children: [
                    {
                        index: true,
                        loader: authIndexRedirect,
                    },
                    { path: 'login', Component: Auth },
                    { path: 'signup', Component: Auth },
                    {
                        path: '*',
                        loader: () => redirect(`/auth/login`),
                    },
                ],
            },
        ],
    },
    {
        path: '/:lang',
        loader: ({ params }) => {
            const lang = params.lang;

            if (!lang) {
                return redirect('/');
            }

            if (supportedLocales.includes(lang)) {
                if (lang === 'hu') {
                    return redirect('/');
                }

                return null;
            }

            return redirect('/en');
        },
        Component: App,
        children: [
            { index: true, Component: Index },
            { path: 'profile', Component: Profile },
            {
                path: 'auth',
                Component: Auth,
                children: [
                    {
                        index: true,
                        loader: authIndexRedirect,
                    },
                    { path: 'login', Component: Auth },
                    { path: 'signup', Component: Auth },
                    {
                        path: '*',
                        loader: ({ params }) => redirect(`/${params.lang}/auth/login`),
                    },
                ],
            },
        ],
    },
]);

export default router;
