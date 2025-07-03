import { cn } from '../utils/cn';

import type { PriorityTag } from '../types/priority-type';
import { PriorityStyles } from '../information/priorities';

type PriorityProps = {
    type: PriorityTag;
    className?: string;
};

export default function PriorityTag(props: PriorityProps) {
    const tagStyle = PriorityStyles[props.type];

    return (
        <div
            className={cn(
                'flex w-fit items-center gap-2 rounded-md border border-gray-700 bg-gray-300 text-gray-700 sm:rounded-lg sm:px-2',
                {
                    [tagStyle.text]: tagStyle?.text,
                    [tagStyle.bg]: tagStyle?.bg,
                    [tagStyle.border]: tagStyle?.border,
                },
                props.className,
            )}
        >
            <tagStyle.icon />
            <span className="hidden sm:inline">{tagStyle.title}</span>
        </div>
    );
}
