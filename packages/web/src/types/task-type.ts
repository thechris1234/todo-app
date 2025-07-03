import type { PriorityTag } from './priority-type';
import type { StatusTag } from './status-type';

export type TaskType = {
    id: number;
    title: string;
    desc?: string;
    status: StatusTag;
    priority: PriorityTag;
    dueDate: number;
    allDay: boolean;
    completed: boolean;
};
