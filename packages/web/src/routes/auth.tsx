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
    const [authFormError, setAuthFormError] = useState<Record<keyof TAuthForm, string | null>>({
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
    });

    const handleFormChange = (page: string) => {
        setIsDropdownOpen(false);
        setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
        setAuthFormError({ name: null, email: null, password: null, confirmPassword: null });

        if (page === 'signup') {
            navigate(`./signup`);
            return;
        }

        navigate(`/auth/login`);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (field: keyof TAuthForm, value: string) => {
        setAuthForm((prev) => ({ ...prev, [field]: value }));

        if (field === 'name' && isRegister && value.length >= 3) {
            setAuthFormError((prev) => ({ ...prev, name: null }));
        }

        if (field === 'email') {
            if (emailRegex.test(value)) {
                setAuthFormError((prev) => ({ ...prev, email: null }));
            }
        }

        if (field === 'password' && value.length >= 10) {
            setAuthFormError((prev) => ({ ...prev, password: null }));
        }

        if (field === 'confirmPassword' && value === authForm.password) {
            setAuthFormError((prev) => ({ ...prev, confirmPassword: null }));
        }
    };

    const handleInputBlur = (field: keyof TAuthForm, value: string) => {
        if (field === 'name' && isRegister && value.length < 3) {
            setAuthFormError((prev) => ({ ...prev, name: 'auth.input.error.nameLength' }));
        }

        if (field === 'email') {
            if (!emailRegex.test(value)) {
                setAuthFormError((prev) => ({ ...prev, email: 'auth.input.error.invalidEmail' }));
            }
        }

        if (field === 'password' && value.length < 10) {
            setAuthFormError((prev) => ({ ...prev, password: 'auth.input.error.passwordLength' }));
        }

        if (field === 'confirmPassword' && value !== authForm.password) {
            setAuthFormError((prev) => ({
                ...prev,
                confirmPassword: 'auth.input.error.passwordMatch',
            }));
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<keyof TAuthForm, string> = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (isRegister && authForm.name.trim().length < 3) {
            errors.name = 'auth.input.error.nameLength';
        }

        if (!emailRegex.test(authForm.email)) {
            errors.email = 'auth.input.error.invalidEmail';
        }

        if (authForm.password.length < 10) {
            errors.password = 'auth.input.error.passwordLength';
        }

        if (isRegister && authForm.password !== authForm.confirmPassword) {
            errors.confirmPassword = 'auth.input.error.passwordMatch';
        }

        setAuthFormError(errors);

        return Object.values(errors).every((e) => e === '');
    };

    const handleFormSubmit = () => {
        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        console.log('Form valid! Submitting:', authForm);
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

                <div className="mt-2 space-y-4">
                    {isRegister && (
                        <Input
                            id="auth-input-name"
                            type="text"
                            icon="user"
                            title={t('auth.input.title.name')}
                            placeholder={t('auth.input.placeholder.name')}
                            value={authForm.name}
                            errorMessage={t(authFormError.name ?? '')}
                            onChange={(e) => handleInputChange('name', e.currentTarget.value)}
                            onBlur={(e) => handleInputBlur('name', e.currentTarget.value)}
                        />
                    )}

                    <Input
                        id="auth-input-email"
                        type="email"
                        icon="email"
                        title={t('auth.input.title.email')}
                        placeholder={t('auth.input.placeholder.email')}
                        value={authForm.email}
                        errorMessage={t(authFormError.email ?? '')}
                        onChange={(e) => handleInputChange('email', e.currentTarget.value)}
                        onBlur={(e) => handleInputBlur('email', e.currentTarget.value)}
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
                        errorMessage={t(authFormError.password ?? '')}
                        onChange={(e) => handleInputChange('password', e.currentTarget.value)}
                        onBlur={(e) => handleInputBlur('password', e.currentTarget.value)}
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
                            errorMessage={t(authFormError.confirmPassword ?? '')}
                            onChange={(e) => handleInputChange('confirmPassword', e.currentTarget.value)}
                            onBlur={(e) => handleInputBlur('confirmPassword', e.currentTarget.value)}
                        />
                    )}

                    <Button
                        text={isRegister ? t('auth.button.signUp') : t('auth.button.signIn')}
                        className="w-full"
                        onClick={handleFormSubmit}
                    />
                </div>
            </div>

            <Dropdown
                text={currentLang}
                icon="translate"
                className="rounded-sm border-0 bg-transparent p-0 pl-1 uppercase hover:bg-transparent"
                open={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                onBlur={() => setIsDropdownOpen(false)}
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
