import type { IconType } from 'react-icons';

export type StatusTag = 'new' | 'inProgress' | 'done' | 'blocked' | 'overdue';

export type StatusStyleProps = {
    title: string;
    icon: IconType;
    text: string;
    bg: string;
    border: string;
};
