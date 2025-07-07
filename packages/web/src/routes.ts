import { createBrowserRouter, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import App from './App';
import Index from './routes/index';
import Profile from './routes/profile';
import Auth from './routes/auth';

const supportedLanguages = ['hu', 'en'];

const withLangValidation = (loader?: (args: LoaderFunctionArgs) => Promise<unknown> | unknown) => {
    return (args: LoaderFunctionArgs) => {
        const lang = args.params.lang;
        if (!supportedLanguages.includes(lang ?? '')) {
            throw new Response('Not Found', { status: 404 });
        }

        return loader ? loader(args) : null;
    };
};

const authIndexRedirect = ({ params }: LoaderFunctionArgs) => {
    throw redirect(`/${params.lang}/auth/login`);
};

const router = createBrowserRouter([
    {
        path: '/:lang',
        Component: App,
        loader: withLangValidation(),
        children: [
            { index: true, Component: Index },
            { path: 'profile', Component: Profile },
            {
                path: 'auth',
                Component: Auth,
                children: [
                    {
                        index: true,
                        loader: withLangValidation(authIndexRedirect),
                    },
                    { path: 'login', Component: Auth },
                    { path: 'register', Component: Auth },
                    {
                        path: '*',
                        loader: withLangValidation((args) => {
                            const lang = args.params.lang!;
                            throw redirect(`/${lang}/auth/login`);
                        }),
                    },
                ],
            },
        ],
    },
    {
        path: '/',
        loader: () => {
            throw redirect('/en');
        },
    },
]);

export default router;
