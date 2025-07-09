import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';

import {
    HiOutlineSearch,
    HiOutlineUser,
    HiOutlineLockClosed,
    HiOutlineMail,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';

type ValidIcon = 'search' | 'user' | 'password' | 'email' | 'eyeOn' | 'eyeOff';

type InputProps = {
    id: string;
    type: 'text' | 'textarea' | 'password' | 'email' | 'date' | 'datetime-local';
    title?: string;
    placeholder?: string;
    value?: string;
    valueVisible?: {
        isVisible: boolean;
        onClick: () => void;
    };
    icon?: ValidIcon;
    width?: boolean;
    errorMessage?: string;
    maxLength?: number;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const iconMap: Record<ValidIcon, IconType> = {
    search: HiOutlineSearch,
    user: HiOutlineUser,
    password: HiOutlineLockClosed,
    email: HiOutlineMail,
    eyeOn: HiOutlineEye,
    eyeOff: HiOutlineEyeOff,
};

export default function Input(props: InputProps) {
    const IconComponent = props.icon && iconMap[props.icon];
    const EyeComponent = props.valueVisible?.isVisible ? iconMap['eyeOff'] : iconMap['eyeOn'];

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
                        <IconComponent
                            className={cn('size-4 text-gray-400', {
                                'text-red-400': props.errorMessage,
                            })}
                        />
                    </div>
                )}

                {props.type === 'textarea' ? (
                    <textarea
                        id={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        maxLength={props.maxLength}
                        className={cn(
                            'block w-full rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors placeholder:text-gray-400 placeholder:italic focus:outline-gray-400',
                            {
                                'pl-10': props.icon,
                                'border-red-200 text-red-500 placeholder:text-red-300': props.errorMessage,
                            },
                            props.className,
                        )}
                    ></textarea>
                ) : props.type === 'date' || props.type === 'datetime-local' ? (
                    <input
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        className={cn(
                            'block w-full rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors placeholder:text-gray-400 placeholder:italic focus:outline-gray-400',
                            {
                                'pl-10': props.icon,
                                'border-red-200 text-red-500 placeholder:text-red-300': props.errorMessage,
                            },
                            props.className,
                        )}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    />
                ) : (
                    <input
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        maxLength={props.maxLength}
                        className={cn(
                            'block w-full rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors placeholder:text-gray-400 placeholder:italic focus:outline-gray-400',
                            {
                                'pl-10': props.icon,
                                'pr-10': props.valueVisible,
                                'border-red-300 text-red-500 placeholder:text-red-300': props.errorMessage,
                            },
                            props.className,
                        )}
                    ></input>
                )}

                {props.valueVisible && EyeComponent && (
                    <div
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                        onClick={props.valueVisible.onClick}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <EyeComponent className="size-4 text-gray-400" />
                    </div>
                )}
            </div>

            {props.errorMessage && (
                <span
                    className={cn('text-xs text-red-400 opacity-0 transition-opacity duration-250', {
                        'opacity-100': props.errorMessage,
                    })}
                >
                    {props.errorMessage}
                </span>
            )}
        </div>
    );
}
