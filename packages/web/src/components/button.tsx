import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import { HiPlus } from 'react-icons/hi';

type ValidIcon = 'new';

type ButtonProps = {
    text: string;
    icon?: ValidIcon;
    className?: string;
    onClick?: () => void;
};

const iconMap: Record<ValidIcon, IconType> = {
    new: HiPlus,
};

export default function Button(props: ButtonProps) {
    const IconComponent = props.icon && iconMap[props.icon];

    return (
        <button
            className={cn(
                'flex cursor-pointer items-center justify-center gap-3.5 rounded-md bg-purple-600 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-gray-100 outline-offset-2 transition-colors hover:bg-purple-700 focus:outline focus:outline-gray-400',
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.icon && IconComponent && <IconComponent className="size-4" />}

            {props.text}
        </button>
    );
}
