import { cn } from '../utils/cn';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import Dropdown, { DropdownItem } from '../components/dropdown';
import Button from '../components/button';
import Input from '../components/input';

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

    const isLogin = pathname.match('/auth');
    const isRegister = pathname.match('/auth/sign-up');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [authForm, setAuthForm] = useState<TAuthForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleFormChange = (page: string) => {
        if (page === 'signup') {
            navigate(`./signup`);
            return;
        }

        navigate(`/auth`);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-2xs">
                <div className="space-y-1.5 text-center">
                    <h1 className="text-xl font-bold text-gray-900">{t('auth.title')}</h1>
                    <span className="text-sm text-gray-600">{t('auth.description')}</span>
                </div>

                <div className="mt-6 grid h-10 w-full grid-cols-2 items-center justify-center gap-1 rounded-md bg-gray-100 p-1">
                    <Button
                        text="Sign In"
                        className={cn('h-full p-0 text-gray-400', { 'bg-white text-gray-900': isLogin })}
                        onClick={() => {
                            handleFormChange('login');
                        }}
                    />
                    <Button
                        text="Sign Up"
                        className={cn('h-full bg-transparent p-0 text-gray-400', {
                            'bg-white text-gray-900': isRegister,
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
                            title="Name"
                            placeholder="Enter your name"
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        />
                    )}

                    <Input
                        id="auth-input-email"
                        type="email"
                        icon="email"
                        title="Email"
                        placeholder="Enter your email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    />

                    <Input
                        id="auth-input-password"
                        type={showPassword ? 'text' : 'password'}
                        icon="password"
                        title="Password"
                        placeholder="Enter your password"
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
                            type="password"
                            icon="password"
                            title="Confirm Password"
                            placeholder="Confirm your password"
                            value={authForm.confirmPassword}
                            onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                        />
                    )}

                    <Button text="Sign In" className="w-full" />
                </form>
            </div>

            <Dropdown
                text="HU"
                icon="translate"
                className="rounded-sm border-0 bg-transparent p-0 pl-1 hover:bg-transparent"
            >
                <DropdownItem id="asd" text="sad" />
            </Dropdown>
        </div>
    );
}
