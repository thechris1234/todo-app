import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

import { AnimatePresence, motion } from 'motion/react';

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
    textStyle?: string;
    title?: string;
    icon?: ValidIcon;
    image?: {
        src: string;
        className?: string;
    };
    disableChevron?: boolean;
    open?: boolean;
    className?: string;
    width?: string;
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
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const IconComponent = props.icon && iconMap[props.icon];
    const ChevronComponent = props.open ? HiChevronUp : HiChevronDown;

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
            props.onBlur?.(e);
        }
    };

    useEffect(() => {
        setIsOpen(props.open ?? false);
    }, [props.open]);

    useLayoutEffect(() => {
        if (!isOpen) return;

        const calculatePosition = () => {
            if (isOpen && buttonRef.current && dropdownRef.current && menuRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                const dropdownRect = dropdownRef.current.getBoundingClientRect();
                const menuRect = menuRef.current?.getBoundingClientRect();

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let top = buttonRect.bottom + 8;
                let left = buttonRect.right - menuRect.width;

                if (isOpen)
                    if (top + dropdownRect.height > viewportHeight) {
                        top = buttonRect.top - menuRect.height - 8;
                    }

                if (left + dropdownRect.width > viewportWidth) {
                    left = dropdownRect.right - menuRect.width;
                }

                if (left < 0) {
                    const canAlignToLeft = buttonRect.left + dropdownRect.width <= viewportWidth;
                    if (canAlignToLeft) {
                        left = buttonRect.left;
                    } else {
                        left = Math.max(viewportWidth - dropdownRect.width, 0);
                    }
                }

                setMenuStyles({
                    position: 'fixed',
                    top: top,
                    left: left,
                });
            }
        };

        const raf = requestAnimationFrame(calculatePosition);

        window.addEventListener('resize', calculatePosition);
        window.addEventListener('scroll', calculatePosition, true);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', calculatePosition);
            window.removeEventListener('scroll', calculatePosition, true);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={cn('relative', props.width)}>
            {props.title && (
                <label htmlFor={props.id} className="text-sm leading-none font-medium text-gray-900">
                    {props.title}
                </label>
            )}

            <button
                ref={buttonRef}
                id={props.id}
                type="button"
                className={cn(
                    'inline-flex w-fit cursor-pointer items-center justify-between gap-x-1.5 rounded-md border border-gray-200 bg-transparent py-2.5 pr-3 pl-3 text-sm whitespace-nowrap text-gray-900 outline outline-transparent transition-colors hover:bg-gray-50 focus:outline-gray-400',
                    props.className,
                    props.width,
                )}
                aria-expanded={props.open}
                onClick={props.onClick}
                onBlur={handleBlur}
            >
                {props.icon && IconComponent && <IconComponent className="size-4 shrink-0 text-gray-600" />}

                {props.image?.src && (
                    <img
                        src={props.image.src}
                        className={cn('flex aspect-square size-8 shrink-0 rounded-full', props.image.className)}
                    ></img>
                )}

                {props.text && <span className={cn('', props.textStyle)}>{props.text}</span>}

                {!props.disableChevron && <ChevronComponent className="size-5 shrink-0 text-gray-600" />}
            </button>

            <AnimatePresence onExitComplete={() => setIsOpen(false)}>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="fixed z-10 w-fit divide-y divide-gray-100 rounded-md border border-gray-200 bg-white p-1"
                        style={menuStyles}
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        {props.children}
                    </motion.div>
                )}
            </AnimatePresence>
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
