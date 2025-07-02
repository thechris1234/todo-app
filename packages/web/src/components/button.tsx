import { cn } from '../utils/cn';

import type { IconType } from 'react-icons';
import { HiPlus } from 'react-icons/hi';

type ValidIcon = 'new';

type ButtonProps = {
    text: string;
    icon?: ValidIcon;
    customStyle?: string;
    onClick?: () => void;
};

export default function Button(props: ButtonProps) {
    const iconMap: Record<ValidIcon, IconType> = {
        new: HiPlus,
    };

    const IconComponent = props.icon ? iconMap[props.icon] : undefined;

    return (
        <button
            className={cn(
                'flex cursor-pointer items-center gap-3.5 rounded-md bg-purple-600 px-4 py-2.5 text-sm whitespace-nowrap transition-colors hover:bg-purple-700',
                props.customStyle,
            )}
            onClick={props.onClick}
        >
            {props.icon && IconComponent && <IconComponent className="size-4" />}

            <span className="text-gray-100">{props.text}</span>
        </button>
    );
}
