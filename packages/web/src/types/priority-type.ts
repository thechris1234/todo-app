import type { IconType } from 'react-icons';

export type PriorityTag = 'low' | 'normal' | 'high' | 'important';

export type PriorityStyleProps = {
    title: string;
    icon: IconType;
    text: string;
    bg: string;
    border: string;
};
