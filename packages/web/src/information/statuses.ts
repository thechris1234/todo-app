import type { StatusStyleProps, StatusTag } from '../types/status-type';
import { HiOutlineTag, HiOutlineTicket, HiOutlineBadgeCheck, HiOutlineSupport, HiOutlineClock } from 'react-icons/hi';

export const StatusStyles: Record<StatusTag, StatusStyleProps> = {
    new: {
        title: 'New',
        icon: HiOutlineTag,
        text: 'text-emerald-700',
        bg: 'bg-emerald-300',
        border: 'border-emerald-700',
    },
    inProgress: {
        title: 'In Progress',
        icon: HiOutlineTicket,
        text: 'text-amber-700',
        bg: 'bg-amber-300',
        border: 'border-amber-700',
    },
    done: {
        title: 'Done',
        icon: HiOutlineBadgeCheck,
        text: 'text-indigo-700',
        bg: 'bg-indigo-300',
        border: 'border-indigo-700',
    },
    blocked: {
        title: 'Blocked',
        icon: HiOutlineSupport,
        text: 'text-fuchsia-700',
        bg: 'bg-fuchsia-300',
        border: 'border-fuchsia-700',
    },
    overdue: {
        title: 'Overdue',
        icon: HiOutlineClock,
        text: 'text-rose-700',
        bg: 'bg-rose-300',
        border: 'border-rose-700',
    },
};
