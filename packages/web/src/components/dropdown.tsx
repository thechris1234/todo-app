import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import {
    HiCheck,
    HiOutlineFilter,
    HiChevronDown,
    HiChevronUp,
    HiOutlineDotsHorizontal,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlineUser,
    HiOutlineLogout,
} from 'react-icons/hi';

type ValidIcon = 'filter' | 'dots' | 'edit' | 'trash' | 'signout' | 'user';

type DropdownProps = {
    id?: string;
    text: string;
    icon?: ValidIcon;
    image?: {
        src: string;
        customStyle?: string;
    };
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
    customColors?: {
        text?: string;
        icon?: string;
    };
    iconOptions?: {
        icon?: ValidIcon;
        alwaysActive?: boolean;
    };
    onClick?: () => void;
};

const iconMap: Record<ValidIcon, IconType> = {
    filter: HiOutlineFilter,
    dots: HiOutlineDotsHorizontal,
    edit: HiOutlinePencilAlt,
    trash: HiOutlineTrash,
    user: HiOutlineUser,
    signout: HiOutlineLogout,
};

export default function Dropdown(props: DropdownProps) {
    const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
    const [isOpen, setIsOpen] = useState(props.open);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div ref={dropdownRef} className="relative inline-flex w-full sm:w-fit">
            <button
                ref={buttonRef}
                id={'menu-' + (props.id ?? 'button')}
                type="button"
                className={cn(
                    'inline-flex w-full cursor-pointer items-center justify-between gap-x-1.5 rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm text-gray-900 outline outline-transparent transition-colors hover:bg-gray-50',
                    {
                        'focus:outline-gray-400': props.open,
                    },
                    props.customStyle,
                )}
                aria-expanded={isOpen}
                onClick={props.onClick}
                onBlur={handleBlur}
            >
                {props.icon && IconComponent && <IconComponent className="size-4 shrink-0 text-gray-600" />}

                {props.image?.src && (
                    <img
                        src={props.image.src}
                        className={cn('flex aspect-square size-8 shrink-0 rounded-full', props.image.customStyle)}
                    ></img>
                )}

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
    const icon = props.iconOptions?.icon;
    const IconComponent = icon ? iconMap[icon] : HiCheck;

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
            <IconComponent
                className={cn(
                    'size-4 text-gray-900',
                    {
                        'text-transparent': !props.selected && !props.iconOptions?.alwaysActive,
                    },
                    props.customColors?.icon,
                )}
            />

            <span
                id={'menu-item-' + props.id}
                className={cn(
                    'block cursor-pointer text-sm text-gray-700',
                    {
                        'text-gray-900': props.selected,
                    },
                    props.customColors?.text,
                )}
                tabIndex={-1}
            >
                {props.text}
            </span>
        </div>
    );
}
