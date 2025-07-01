import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import { HiPlus, HiOutlineFilter, HiChevronDown } from 'react-icons/hi';

type ValidIcon = 'new' | 'filter';

type DropdownProps = {
    text: string;
    icon?: ValidIcon;
    open?: boolean;
    customStyle?: string;
    onClick?: () => void;
    children?: React.ReactNode;
};

export default function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(props.open);

    const iconMap: Record<ValidIcon, IconType> = {
        new: HiPlus,
        filter: HiOutlineFilter,
    };

    const IconComponent = props.icon ? iconMap[props.icon] : undefined;

    useEffect(() => {
        setIsOpen(props.open ?? false);
    }, [props.open]);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
            >
                {props.icon && IconComponent && (
                    <div className="">
                        <IconComponent />
                    </div>
                )}

                {props.text}

                <HiChevronDown className="-mr-1 size-5 text-gray-400" />
            </button>

            {isOpen && props.children && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                    role="menu"
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

export function DropDownItem() {
    return (
        <div className="py-1" role="none">
            <a
                href="#"
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
            >
                Edit
            </a>
        </div>
    );
}
