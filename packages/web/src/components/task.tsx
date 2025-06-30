import { MdMoreHoriz } from 'react-icons/md';

import { formatTimestampIntl } from '../utils/time';
import Checkbox from './checkbox';
import StatusTag from './status-tag';
import PriorityTag from './priority-tag';

import type { TaskType } from '../types/task-type';

type TaskProps = {
    options: TaskType;
    selected?: boolean;
};

export default function Task(props: TaskProps) {
    return (
        <tr className="not-last:border-b not-last:border-gray-200 hover:bg-gray-50">
            <td className="py-3 pr-2 pl-4">
                <Checkbox checked={props.selected || false} />
            </td>
            <td className="py-3 pr-3 pl-2">
                <div className="flex flex-col transition-colors peer-checked:[&>h3]:text-gray-400 peer-checked:[&>h3]:decoration-gray-600">
                    <h3 className="font-medium text-gray-900 line-through decoration-transparent transition-colors">
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
                <span className="text-gray-900">
                    {formatTimestampIntl(props.options.dueDate, undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </td>
            <td className="place-items-center py-3 pr-4 pl-3 text-gray-900">
                <MdMoreHoriz />
            </td>
        </tr>
    );
}
