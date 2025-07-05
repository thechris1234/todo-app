import { cn } from '../utils/cn';
import { memo } from 'react';

import type { IconType } from 'react-icons';
import type { InputError } from '../types/input-type';

import { HiOutlineSearch, HiOutlineCalendar } from 'react-icons/hi';

type ValidIcon = 'search' | 'user' | 'password' | 'email';

type InputProps = {
    id: string;
    type: 'text' | 'password' | 'email' | 'textarea';
    title?: string;
    placeholder: string;
    value?: string;
    icon?: ValidIcon;
    width?: boolean;
    error?: InputError;
    errorText?: string;
    maxLength?: number;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const iconMap: Record<ValidIcon, IconType> = {
    search: HiOutlineSearch,
    user: HiOutlineCalendar,
    password: HiOutlineCalendar,
    email: HiOutlineCalendar,
};

function Input(props: InputProps) {
    const IconComponent = props.icon && iconMap[props.icon];

    return (
        <div className={cn('w-full', props.width)}>
            {props.title && (
                <label htmlFor={props.id} className="text-sm leading-none font-medium text-gray-900">
                    {props.title}
                </label>
            )}

            <div className="relative block">
                {props.icon && IconComponent && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IconComponent className="size-4 text-gray-600" />
                    </div>
                )}

                {props.type === 'textarea' ? (
                    <textarea
                        id={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        maxLength={props.maxLength}
                        className={cn(
                            'block w-full rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors placeholder:text-gray-400 placeholder:italic focus:outline-gray-400',
                            {
                                'pl-10': props.icon,
                            },
                            props.className,
                        )}
                    ></textarea>
                ) : (
                    <input
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        maxLength={props.maxLength}
                        className={cn(
                            'block w-full rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors placeholder:text-gray-400 placeholder:italic focus:outline-gray-400',
                            {
                                'pl-10': props.icon,
                            },
                            props.className,
                        )}
                    ></input>
                )}
            </div>

            {props.error && props.errorText && (
                <span className="invisible peer-invalid:visible ...">{props.errorText}</span>
            )}
        </div>
    );
}

function areEqual(prevProps: InputProps, nextProps: InputProps) {
    return (
        prevProps.id === nextProps.id &&
        prevProps.type === nextProps.type &&
        prevProps.title === nextProps.title &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.value === nextProps.value &&
        prevProps.icon === nextProps.icon &&
        prevProps.width === nextProps.width &&
        prevProps.error === nextProps.error &&
        prevProps.errorText === nextProps.errorText &&
        prevProps.maxLength === nextProps.maxLength &&
        prevProps.className === nextProps.className
    );
}

export default memo(Input, areEqual);
