import { useCallback, useMemo, useReducer, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { demoTasks } from '../information/demo';
import { StatusStyles } from '../information/statuses';
import { PriorityStyles } from '../information/priorities';

import type { TaskType } from '../types/task-type';
import type { StatusTag } from '../types/status-type';
import type { PriorityTag } from '../types/priority-type';

import Checkbox from '../components/checkbox';
import Task from '../components/task';
import Input from '../components/input';
import Button from '../components/button';
import Dropdown, { DropdownItem } from '../components/dropdown';

import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineChartPie } from 'react-icons/hi';

import Modal from '../components/modal';

type CreateTaskFormType = {
    title: string;
    desc: string;
    status: StatusTag;
    priority: PriorityTag;
    time: string;
    isAllDay: boolean;
};

type CreateTaskActionType =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_DESC'; payload: string }
    | { type: 'SET_STATUS'; payload: StatusTag }
    | { type: 'SET_PRIORITY'; payload: PriorityTag }
    | { type: 'SET_TIME'; payload: string }
    | { type: 'SET_IS_ALL_DAY'; payload: boolean };

export default function Index() {
    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = location.pathname === '/new';

    const reducer = (state: CreateTaskFormType, action: CreateTaskActionType) => {
        switch (action.type) {
            case 'SET_TITLE':
                return { ...state, title: action.payload };
            case 'SET_DESC':
                return { ...state, desc: action.payload };
            case 'SET_STATUS':
                return { ...state, status: action.payload };
            case 'SET_PRIORITY':
                return { ...state, priority: action.payload };
            case 'SET_TIME':
                return { ...state, time: action.payload };
            case 'SET_IS_ALL_DAY':
                return { ...state, isAllDay: action.payload };
            default:
                return state;
        }
    };

    const [createTaskForm, dispatch] = useReducer(reducer, {
        title: '',
        desc: '',
        status: 'new',
        priority: 'normal',
        time: '',
        isAllDay: false,
    });

    const [isCreateTaskStatusMenuOpen, setIsCreateTaskStatusMenuOpen] = useState(false);
    const [isCreateTaskPriorityMenuOpen, setIsCreateTaskPriorityMenuOpen] = useState(false);

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            if (value.trim() === '') {
                params.delete('search');
            } else {
                params.set('search', value);
            }

            setSearchParams(params);
        },
        [params, setSearchParams],
    );

    const handleStatusChange = (value: string) => {
        if (value === status) {
            params.delete('status');
        } else {
            params.set('status', value);
        }

        setSearchParams(params);
    };

    const memoizedIcons = {
        chartPie: useMemo(() => <HiOutlineChartPie className="inline-block align-middle" />, []),
        chartBar: useMemo(() => <HiOutlineChartBar className="inline-block align-middle" />, []),
        calendar: useMemo(() => <HiOutlineCalendar className="inline-block align-middle" />, []),
    };

    const filteredTasks = useMemo(() => {
        return demoTasks.filter((task) => {
            const taskName = task.title.toLowerCase();
            const matchesSearch = search ? taskName.includes(search.toLowerCase()) : true;
            const matchesStatus = status ? task.status === status : true;
            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    const handleCheckBoxChange = useCallback((task: TaskType) => {
        return () => {
            console.log(`Task '${task.title}' completed status now: ${!task.completed}`);
        };
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex w-full flex-col">
                                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">todo app</h1>
                                <span className="text-sm font-medium text-gray-600 sm:text-base">
                                    Manage your tasks and projects efficiently
                                </span>
                            </div>

                            <div className="flex w-full items-center justify-between gap-4 font-medium sm:w-fit">
                                <Dropdown
                                    id="profile-menu-button"
                                    text="Teszt Lajos"
                                    textStyle="hidden sm:block"
                                    image={{ src: 'https://i.imgur.com/5WXqSz7.jpeg' }}
                                    className="gap-2 border-transparent px-1 py-[0.1875rem] whitespace-nowrap sm:px-4"
                                    disableChevron
                                    open={isProfileMenuOpen}
                                    onClick={useCallback(() => setIsProfileMenuOpen((prev) => !prev), [])}
                                    onBlur={useCallback(() => setIsProfileMenuOpen(false), [])}
                                >
                                    <DropdownItem
                                        id="profile-menu-profile"
                                        text="Your profile"
                                        iconOptions={{ icon: 'user', alwaysActive: true }}
                                    />
                                    <DropdownItem
                                        id="profile-menu-logout"
                                        text="Sign out"
                                        iconOptions={{ icon: 'signout', alwaysActive: true }}
                                    />
                                </Dropdown>

                                <Button
                                    text="New Task"
                                    icon="new"
                                    onClick={() => {
                                        navigate('/new');
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 text-black sm:flex-row">
                            <Input
                                id="task-search-input"
                                type="text"
                                placeholder="Search tasks..."
                                icon="search"
                                value={search ?? ''}
                                onChange={handleSearchChange}
                            />

                            <Dropdown
                                id="task-status-filter"
                                text={status ? StatusStyles[status as StatusTag]?.title : 'All Tasks'}
                                icon="filter"
                                open={isFilterMenuOpen}
                                onClick={useCallback(() => setIsFilterMenuOpen((prev) => !prev), [])}
                                onBlur={useCallback(() => setIsFilterMenuOpen(false), [])}
                                className="pl-4"
                                width="w-full sm:w-48"
                            >
                                {Object.keys(StatusStyles).map((statusKey) => {
                                    return (
                                        <DropdownItem
                                            key={statusKey}
                                            id={statusKey}
                                            text={StatusStyles[statusKey as StatusTag]?.title}
                                            onClick={() => handleStatusChange(statusKey)}
                                            selected={statusKey === status}
                                        />
                                    );
                                })}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="sticky top-0 z-[5] border-b border-gray-200 bg-gray-50">
                                    <tr>
                                        <th className="w-0 py-3 pr-2 pl-4 text-gray-900">
                                            <Checkbox id="table-checkbox" checked={false} isIndeterminate={true} />
                                        </th>
                                        <th className="py-3 pr-3 pl-2 text-left font-medium text-gray-900">
                                            <span>Task</span>
                                        </th>
                                        <th className="space-x-2 px-3 py-3 text-left font-medium text-gray-900">
                                            {memoizedIcons.chartPie}
                                            <span className="inline-block align-middle">Status</span>
                                        </th>
                                        <th className="hidden space-x-2 px-3 py-3 text-left font-medium text-gray-900 sm:block">
                                            {memoizedIcons.chartBar}
                                            <span className="inline-block align-middle">Priority</span>
                                        </th>
                                        <th className="space-x-2 px-3 py-3 text-left font-medium whitespace-nowrap text-gray-900">
                                            {memoizedIcons.calendar}
                                            <span className="inline-block align-middle">Due Date</span>
                                        </th>
                                        <th className="w-0 py-3 pr-4 pl-3 text-left font-medium text-gray-900">
                                            <span>Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.length <= 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-gray-500">
                                                No tasks found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTasks.map((task: TaskType) => {
                                            return (
                                                <Task
                                                    key={task.id}
                                                    options={task}
                                                    onCheckBoxChange={handleCheckBoxChange(task)}
                                                />
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onBackdropClick={() => {
                    navigate('');
                }}
            >
                <div className="w-full max-w-lg space-y-4 rounded-md bg-white p-4">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-lg">Create New Task</h1>

                    <Input
                        id="create-task-input-name"
                        type="text"
                        title="Title"
                        value={createTaskForm.title}
                        placeholder="Enter a task title..."
                        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                    />

                    <Input
                        id="create-task-input-description"
                        type="textarea"
                        title="Description"
                        value={createTaskForm.desc}
                        placeholder="Enter an optional description..."
                        className="min-h-20"
                        onChange={(e) => dispatch({ type: 'SET_DESC', payload: e.target.value })}
                    />

                    <Dropdown
                        id="create-task-dropdown-status"
                        title="Status"
                        text={StatusStyles[createTaskForm.status as StatusTag]?.title}
                        open={isCreateTaskStatusMenuOpen}
                        onClick={useCallback(() => setIsCreateTaskStatusMenuOpen((prev) => !prev), [])}
                        onBlur={useCallback(() => setIsCreateTaskStatusMenuOpen(false), [])}
                        className="w-full"
                    >
                        {Object.keys(StatusStyles).map((statusKey) => {
                            return (
                                <DropdownItem
                                    key={statusKey}
                                    id={statusKey}
                                    text={StatusStyles[statusKey as StatusTag]?.title}
                                    onClick={() => dispatch({ type: 'SET_STATUS', payload: statusKey as StatusTag })}
                                    selected={statusKey === createTaskForm.status}
                                />
                            );
                        })}
                    </Dropdown>

                    <Dropdown
                        id="create-task-dropdown-priority"
                        title="Priority"
                        text={PriorityStyles[createTaskForm.priority as PriorityTag]?.title}
                        open={isCreateTaskPriorityMenuOpen}
                        onClick={useCallback(() => setIsCreateTaskPriorityMenuOpen((prev) => !prev), [])}
                        onBlur={useCallback(() => setIsCreateTaskPriorityMenuOpen(false), [])}
                        className="w-full"
                    >
                        {Object.keys(PriorityStyles).map((priorityKey) => {
                            return (
                                <DropdownItem
                                    key={priorityKey}
                                    id={priorityKey}
                                    text={PriorityStyles[priorityKey as PriorityTag]?.title}
                                    onClick={() =>
                                        dispatch({ type: 'SET_PRIORITY', payload: priorityKey as PriorityTag })
                                    }
                                    selected={priorityKey === createTaskForm.priority}
                                />
                            );
                        })}
                    </Dropdown>
                </div>
            </Modal>
        </>
    );
}
