import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import { HiCheck, HiOutlineFilter, HiChevronDown, HiChevronUp, HiOutlineDotsHorizontal } from 'react-icons/hi';

type ValidIcon = 'filter' | 'dots';

type DropdownProps = {
    id?: string;
    text: string;
    icon?: ValidIcon;
    disableChevron?: boolean;
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
    const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
    const [isOpen, setIsOpen] = useState(props.open);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const iconMap: Record<ValidIcon, IconType> = {
        filter: HiOutlineFilter,
        dots: HiOutlineDotsHorizontal,
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

        const calculatePosition = () => {
            if (props.open && buttonRef.current && dropdownRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const dropdownRect = dropdownRef.current.getBoundingClientRect();

                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;

                let top = buttonRect.bottom + 8;
                let left = buttonRect.right;

                if (top + dropdownRect.height > viewportHeight) {
                    top = buttonRect.top - dropdownRect.height - 8;
                }

                if (buttonRect.left + dropdownRect.width > viewportWidth) {
                    left = buttonRect.right - dropdownRect.width + window.scrollX;
                    if (left < 0) left = 0;
                }

                setMenuStyles({
                    position: 'fixed',
                    top: top,
                    left: left,
                });
            }
        };

        calculatePosition();

        window.addEventListener('resize', calculatePosition);
        window.addEventListener('scroll', calculatePosition, true);

        return () => {
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition, true);
        };
    }, [props.open]);

    return (
        <div ref={dropdownRef} className="relative inline-block w-full sm:w-fit">
            <button
                ref={buttonRef}
                id={'menu-' + (props.id ?? 'button')}
                type="button"
                className={cn(
                    'inline-flex w-full cursor-pointer items-center justify-between gap-x-1.5 rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors hover:bg-gray-50',
                    {
                        'focus:border-gray-400 focus:outline-gray-400': props.open,
                    },
                    props.customStyle,
                )}
                aria-expanded={isOpen}
                onClick={props.onClick}
                onBlur={handleBlur}
            >
                {props.icon && IconComponent && <IconComponent className="size-4 shrink-0 text-gray-600" />}

                {props.text}

                {!props.disableChevron && <ChevronComponent className="size-5 shrink-0 text-gray-600" />}
            </button>

            {isOpen && props.children && (
                <div
                    className="fixed right-0 z-10 w-fit translate-x-[-100%] divide-y divide-gray-100 rounded-md border border-gray-200 bg-white p-1"
                    style={menuStyles}
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
            className={cn(
                'flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 whitespace-nowrap hover:bg-gray-50',
                {
                    'bg-gray-100 hover:bg-gray-200': props.selected,
                },
            )}
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
