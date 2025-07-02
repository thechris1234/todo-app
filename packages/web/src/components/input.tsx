import { HiOutlineSearch, HiOutlineCalendar } from 'react-icons/hi';

import type { IconType } from 'react-icons';
import type { InputError } from '../types/input-type';
import { cn } from '../utils/cn';

type ValidIcon = 'search' | 'user' | 'password' | 'email';

type InputProps = {
    id: string;
    type: 'text' | 'password' | 'email';
    placeholder: string;
    value?: string;
    icon?: ValidIcon;
    full?: boolean;
    error?: InputError;
    errorText?: string;
    maxLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
    const iconMap: Record<ValidIcon, IconType> = {
        search: HiOutlineSearch,
        user: HiOutlineCalendar,
        password: HiOutlineCalendar,
        email: HiOutlineCalendar,
    };
    const IconComponent = props.icon ? iconMap[props.icon] : undefined;

    return (
        <div
            className={cn('', {
                'w-full': props.full,
            })}
        >
            <div className="relative block">
                {props.icon && IconComponent && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IconComponent className="size-4 text-gray-600" />
                    </div>
                )}

                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props.maxLength}
                    className={cn(
                        'block w-full rounded-md border border-gray-200 bg-transparent px-3 py-2.5 pr-3 pl-10 text-sm text-gray-900 placeholder:text-gray-400 placeholder:italic focus:border-gray-400 focus:outline focus:outline-gray-400',
                    )}
                ></input>
            </div>

            {props.error && props.errorText && (
                <span className="invisible peer-invalid:visible ...">{props.errorText}</span>
            )}
        </div>
    );
}
