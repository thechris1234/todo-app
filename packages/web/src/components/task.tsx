import { useState } from 'react';

import { formatTimestampIntl } from '../utils/time';
import Checkbox from './checkbox';
import StatusTag from './status-tag';
import PriorityTag from './priority-tag';

import type { TaskType } from '../types/task-type';
import Dropdown, { DropdownItem } from './dropdown';

type TaskProps = {
    options: TaskType;
    selected?: boolean;
};

export default function Task(props: TaskProps) {
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

    const handleTimestampDisplay = () => {
        const time = props.options.dueDate;
        const isAllDay = props.options.allDay;

        const date = new Date(time);
        const now = new Date();

        const isToday =
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate();

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

        return formatTimestampIntl(time, 'hu-HU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            ...(!isAllDay && {
                hour: '2-digit',
                minute: '2-digit',
            }),
        });
    };

    return (
        <tr className="not-last:border-b not-last:border-gray-200 hover:bg-gray-50">
            <td className="py-3 pr-2 pl-4">
                <Checkbox checked={props.selected || false} />
            </td>
            <td className="py-3 pr-3 pl-2">
                <div className="flex flex-col transition-colors peer-checked:[&>h3]:text-gray-400 peer-checked:[&>h3]:decoration-gray-600">
                    <h3 className="font-medium whitespace-nowrap text-gray-900 line-through decoration-transparent transition-colors">
                        {props.options.title}
                    </h3>
                    {props.options.desc && <span className="mt-1 text-sm text-gray-600">{props.options.desc}</span>}
                </div>
            </td>
            <td className="p-3">
                <StatusTag type={props.options.status} />
            </td>
            <td className="p-3">
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
                    customStyle="hover:bg-gray-100 focus:border-transparent focus:outline-transparent border-transparent"
                >
                    {/* {Object.keys(StatusStyles).map((statusKey) => {
                                                return ( */}
                    <DropdownItem key={'asd'} id={'asd'} text={'asd'} onClick={() => {}} selected={false} />
                    {/*   );
                                            })} */}
                </Dropdown>
            </td>
        </tr>
    );
}
