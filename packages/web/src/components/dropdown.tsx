import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import { HiCheck, HiPlus, HiOutlineFilter, HiChevronDown, HiChevronUp } from 'react-icons/hi';

type ValidIcon = 'new' | 'filter';

type DropdownProps = {
    id?: string;
    text: string;
    icon?: ValidIcon;
    open?: boolean;
    customStyle?: string;
    onClick?: () => void;
    onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};

type DropdownItemProps = {
    id: string;
    text: string;
    selected?: boolean;
    onClick?: () => void;
};

export default function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(props.open);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const iconMap: Record<ValidIcon, IconType> = {
        new: HiPlus,
        filter: HiOutlineFilter,
    };

    const IconComponent = props.icon ? iconMap[props.icon] : undefined;
    const ChevronComponent = isOpen ? HiChevronUp : HiChevronDown;

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
            props.onBlur?.(e);
        }
    };

    useEffect(() => {
        setIsOpen(props.open ?? false);
    }, [props.open]);

    return (
        <div ref={dropdownRef} className="relative inline-block w-full sm:w-fit">
            <button
                id={'menu-' + (props.id ?? 'button')}
                type="button"
                className={cn(
                    'inline-flex w-full cursor-pointer items-center justify-between gap-x-1.5 rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-4 text-sm text-gray-900 hover:bg-gray-50',
                    {
                        'focus:border-gray-400 focus:outline focus:outline-gray-400': props.open,
                    },
                    props.customStyle,
                )}
                aria-expanded={isOpen}
                onClick={props.onClick}
                onBlur={handleBlur}
            >
                {props.icon && IconComponent && <IconComponent className="size-4 shrink-0 text-gray-600" />}

                {props.text}

                <ChevronComponent className="size-5 shrink-0 text-gray-600" />
            </button>

            {isOpen && props.children && (
                <div
                    className="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white p-1"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    {props.children}
                </div>
            )}
        </div>
    );
}

export function DropdownItem(props: DropdownItemProps) {
    return (
        <div
            className={cn('flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 hover:bg-gray-50', {
                'bg-gray-100 hover:bg-gray-200': props.selected,
            })}
            onMouseDown={(e) => {
                e.preventDefault();
                props.onClick?.();
            }}
        >
            <HiCheck
                className={cn('size-4 text-gray-900', {
                    'text-transparent': !props.selected,
                })}
            />

            <span
                id={'menu-item-' + props.id}
                className={cn('block cursor-pointer text-sm text-gray-700', {
                    'text-gray-900': props.selected,
                })}
                tabIndex={-1}
            >
                {props.text}
            </span>
        </div>
    );
}
