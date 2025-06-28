import { cn } from '../utils/cn';

import type { PriorityTag } from '../information/priority-type';
import { PriorityStyles } from '../information/priority-type';

type PriorityProps = {
    type: PriorityTag;
};

export default function PriorityTag(props: PriorityProps) {
    const tagStyle = PriorityStyles[props.type];

    return (
        <div
            className={cn(
                'flex w-fit items-center gap-2 rounded-lg border border-gray-700 bg-gray-300 px-2 text-gray-700',
                {
                    [tagStyle.text]: tagStyle?.text,
                    [tagStyle.bg]: tagStyle?.bg,
                    [tagStyle.border]: tagStyle?.border,
                },
            )}
        >
            <tagStyle.icon />
            <span className="">{tagStyle.title}</span>
        </div>
    );
}
