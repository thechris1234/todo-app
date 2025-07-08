import { cn } from '../utils/cn';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import Dropdown, { DropdownItem } from '../components/dropdown';
import Button from '../components/button';
import Input from '../components/input';

import { localeConfigs, supportedLocales } from '../types/locale-type';
import type { ValidIcon } from '../types/icon-type';

import { changeLanguage, DEFAULT_LANG, getLanguageFromPath } from '../utils/language';
import i18n from '../localization';

type TAuthForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Auth() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const pathLang = getLanguageFromPath(pathname);
    const currentLang = pathLang === DEFAULT_LANG ? i18n.language : pathLang;

    const isLogin = pathname.match('/auth/login');
    const isRegister = pathname.match('/auth/signup');

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [authForm, setAuthForm] = useState<TAuthForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleFormChange = (page: string) => {
        setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });

        if (page === 'signup') {
            navigate(`./signup`);
            return;
        }

        navigate(`/auth/login`);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-2xs">
                <div className="space-y-1.5 text-center">
                    <h1 className="text-xl font-bold text-gray-900">{t('auth.title')}</h1>
                    <span className="text-sm text-gray-600">{t('auth.description')}</span>
                </div>

                <div className="mt-6 grid h-20 w-full grid-cols-1 items-center justify-center gap-1 rounded-md bg-gray-100 p-1 sm:h-10 sm:grid-cols-2">
                    <Button
                        text={t('auth.button.signIn')}
                        className={cn('h-full bg-transparent p-0 text-gray-400 transition-colors hover:bg-gray-50', {
                            'bg-white text-gray-900 hover:bg-white': isLogin,
                        })}
                        onClick={() => {
                            handleFormChange('login');
                        }}
                    />
                    <Button
                        text={t('auth.button.signUp')}
                        className={cn('h-full bg-transparent p-0 text-gray-400 transition-colors hover:bg-gray-50', {
                            'bg-white text-gray-900 hover:bg-white': isRegister,
                        })}
                        onClick={() => {
                            handleFormChange('signup');
                        }}
                    />
                </div>

                <form className="mt-2 space-y-4">
                    {isRegister && (
                        <Input
                            id="auth-input-name"
                            type="text"
                            icon="user"
                            title={t('auth.input.title.name')}
                            placeholder={t('auth.input.placeholder.name')}
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        />
                    )}

                    <Input
                        id="auth-input-email"
                        type="email"
                        icon="email"
                        title={t('auth.input.title.email')}
                        placeholder={t('auth.input.placeholder.email')}
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    />

                    <Input
                        id="auth-input-password"
                        type={showPassword ? 'text' : 'password'}
                        icon="password"
                        title={t('auth.input.title.password')}
                        placeholder={t('auth.input.placeholder.password')}
                        value={authForm.password}
                        valueVisible={{
                            isVisible: showPassword,
                            onClick: () => {
                                setShowPassword((prev) => !prev);
                            },
                        }}
                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    />

                    {isRegister && (
                        <Input
                            id="auth-input-confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            icon="password"
                            title={t('auth.input.title.confirmPassword')}
                            placeholder={t('auth.input.placeholder.confirmPassword')}
                            value={authForm.confirmPassword}
                            valueVisible={{
                                isVisible: showPassword,
                                onClick: () => {
                                    setShowPassword((prev) => !prev);
                                },
                            }}
                            onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                        />
                    )}

                    <Button text={t('auth.button.signIn')} className="w-full" />
                </form>
            </div>

            <Dropdown
                text={currentLang}
                icon="translate"
                className="rounded-sm border-0 bg-transparent p-0 pl-1 uppercase hover:bg-transparent"
                open={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                {supportedLocales.map((lang) => {
                    const locale = localeConfigs[lang];

                    return (
                        <DropdownItem
                            key={`menu-lang-${locale.flagKey}`}
                            id={`menu-lang-${locale.flagKey}`}
                            text={locale.displayName}
                            iconOptions={{
                                icon: `flag-${locale.flagKey}` as ValidIcon,
                                localSVG: true,
                                alwaysActive: true,
                            }}
                            onClick={() => {
                                changeLanguage(lang, navigate);
                            }}
                            selected={lang === currentLang}
                        />
                    );
                })}
            </Dropdown>
        </div>
    );
}
