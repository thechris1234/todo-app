import { cn } from '../utils/cn';

import type { StatusTag } from '../types/status-type';
import { StatusStyles } from '../information/statuses';

type StatusProps = {
    type: StatusTag;
};

export default function StatusTag(props: StatusProps) {
    const tagStyle = StatusStyles[props.type];

    return (
        <div
            className={cn(
                'flex w-fit items-center gap-2 rounded-lg border border-gray-700 bg-gray-300 px-2 whitespace-nowrap text-gray-700',
                {
                    [tagStyle.text]: tagStyle?.text,
                    [tagStyle.bg]: tagStyle?.bg,
                    [tagStyle.border]: tagStyle?.border,
                },
            )}
        >
            <tagStyle.icon />
            <span>{tagStyle.title}</span>
        </div>
    );
}
