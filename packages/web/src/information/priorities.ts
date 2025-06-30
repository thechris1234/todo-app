import type { PriorityStyleProps, PriorityTag } from '../types/priority-type';
import { HiChevronDown, HiMinusSm, HiChevronUp, HiChevronDoubleUp } from 'react-icons/hi';

export const PriorityStyles: Record<PriorityTag, PriorityStyleProps> = {
    low: {
        title: 'Low',
        icon: HiChevronDown,
        text: 'text-stone-700',
        bg: 'bg-stone-300',
        border: 'border-stone-700',
    },
    normal: {
        title: 'Normal',
        icon: HiMinusSm,
        text: 'text-indigo-700',
        bg: 'bg-indigo-300',
        border: 'border-indigo-700',
    },
    high: {
        title: 'High',
        icon: HiChevronUp,
        text: 'text-orange-700',
        bg: 'bg-orange-300',
        border: 'border-orange-700',
    },
    important: {
        title: 'Important',
        icon: HiChevronDoubleUp,
        text: 'text-red-700',
        bg: 'bg-red-300',
        border: 'border-red-700',
    },
};
