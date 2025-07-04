import { useState } from 'react';

import { formatTimestampIntl } from '../utils/time';
import Checkbox from './checkbox';
import StatusTag from './status-tag';
import PriorityTag from './priority-tag';

import type { TaskType } from '../types/task-type';
import Dropdown, { DropdownItem } from './dropdown';
import { cn } from '../utils/cn';

type TaskProps = {
    options: TaskType;
    onCheckBoxChange?: () => void;
};

export default function Task(props: TaskProps) {
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

    const handleTimestampDisplay = () => {
        const time = props.options.dueDate;
        const isAllDay = props.options.allDay;

        const date = new Date(time);
        const now = new Date();

        const isCurrentYear = date.getFullYear() === now.getFullYear();
        const isToday = isCurrentYear && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

        if (isToday) {
            return `Today${
                !isAllDay
                    ? `, ${formatTimestampIntl(time, 'hu-HU', {
                          hour: '2-digit',
                          minute: '2-digit',
                      })}`
                    : ''
            }`;
        }

        const timestampSetting: Intl.DateTimeFormatOptions = {
            year: !isCurrentYear ? 'numeric' : undefined,
            month: isCurrentYear ? 'long' : '2-digit',
            day: '2-digit',
            hour: !isAllDay ? '2-digit' : undefined,
            minute: !isAllDay ? '2-digit' : undefined,
        };

        return formatTimestampIntl(time, 'hu-HU', timestampSetting);
    };

    return (
        <tr className="not-last:border-b not-last:border-gray-200 hover:bg-gray-50">
            <td
                className={cn('py-3 pr-2 pl-4', {
                    'mt-1 inline-flex': props.options.desc,
                })}
            >
                <Checkbox checked={props.options.completed ?? false} onChange={props.onCheckBoxChange} />
            </td>
            <td className="py-3 pr-3 pl-2">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <PriorityTag type={props.options.priority} className="h-fit sm:hidden" />
                        <h3
                            className={cn(
                                'font-medium whitespace-nowrap text-gray-900 line-through decoration-transparent transition-colors',
                                {
                                    'text-gray-500 decoration-gray-500': props.options.completed,
                                },
                            )}
                        >
                            {props.options.title}
                        </h3>
                    </div>

                    {props.options.desc && <span className="mt-1 text-sm text-gray-600">{props.options.desc}</span>}
                </div>
            </td>
            <td className="p-3">
                <StatusTag type={props.options.status} />
            </td>
            <td className="hidden p-3 sm:table-cell">
                <PriorityTag type={props.options.priority} />
            </td>
            <td className="p-3">
                <span className="whitespace-nowrap text-gray-900">{handleTimestampDisplay()}</span>
            </td>
            <td className="py-3 pr-4 pl-3 text-center text-gray-900">
                <Dropdown
                    id="task-status-filter"
                    text={''}
                    icon="dots"
                    open={isActionMenuOpen} //isActionMenuOpen
                    disableChevron
                    onClick={() => setIsActionMenuOpen((prev) => !prev)}
                    onBlur={() => setIsActionMenuOpen(false)}
                    customStyle="hover:bg-gray-100 border-transparent focus:outline-transparent"
                >
                    <DropdownItem
                        id={'task-action-edit'}
                        text={'Edit task'}
                        onClick={() => {}}
                        iconOptions={{ icon: 'edit', alwaysActive: true }}
                    />

                    <DropdownItem
                        id={'task-action-delete'}
                        text={'Delete task'}
                        onClick={() => {}}
                        customColors={{ text: 'text-red-900', icon: 'text-red-900' }}
                        iconOptions={{ icon: 'trash', alwaysActive: true }}
                    />
                </Dropdown>
            </td>
        </tr>
    );
}
