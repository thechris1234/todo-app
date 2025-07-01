import { useSearchParams } from 'react-router';

import { demoTasks } from '../information/demo';
import type { TaskType } from '../types/task-type';

import Checkbox from '../components/checkbox';
import Task from '../components/task';
import Input from '../components/input';

import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineChartPie, HiPlus } from 'react-icons/hi';

export default function Index() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value.trim() === '') {
            params.delete('search');
        } else {
            params.set('search', value);
        }

        setSearchParams(params);
    };

    const filteredTasks = demoTasks.filter((task) => {
        const taskName = task.title.toLocaleLowerCase();
        const matchesSearch = search ? taskName.includes(search.toLowerCase()) : true;
        const matchesStatus = status ? task.status === status : true;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-900">todo app</h1>
                            <span className="font-medium text-gray-600">
                                Manage your tasks and projects efficiently
                            </span>
                        </div>

                        <div className="flex items-center gap-4 font-medium">
                            <button className="flex items-center gap-2 px-4 whitespace-nowrap">
                                <img
                                    src="https://i.imgur.com/5WXqSz7.jpeg"
                                    className="flex aspect-square size-10 shrink-0 rounded-full"
                                    alt="Profile picture"
                                ></img>

                                <span className="hidden text-gray-900 sm:inline">Teszt Lajos</span>
                            </button>
                            <button className="flex cursor-pointer items-center gap-2 rounded-md bg-purple-600 px-4 py-2 whitespace-nowrap transition-colors hover:bg-purple-700">
                                <HiPlus />
                                <span className="text-gray-100">New Task</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-black sm:flex-row">
                        <Input
                            id="task-search-input"
                            type="text"
                            placeholder="Search tasks..."
                            icon="search"
                            value={search ?? ''}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            full
                        />
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-0 py-3 pr-2 pl-4 text-gray-900">
                                        <Checkbox checked={false} isIndeterminate={true} />
                                    </th>
                                    <th className="py-3 pr-3 pl-2 text-left font-medium text-gray-900">
                                        <span>Task</span>
                                    </th>
                                    <th className="space-x-2 px-3 py-3 text-left font-medium text-gray-900">
                                        <HiOutlineChartPie className="inline-block align-middle" />
                                        <span className="inline-block align-middle">Status</span>
                                    </th>
                                    <th className="space-x-2 px-3 py-3 text-left font-medium text-gray-900">
                                        <HiOutlineChartBar className="inline-block align-middle" />
                                        <span className="inline-block align-middle">Priority</span>
                                    </th>
                                    <th className="space-x-2 px-3 py-3 text-left font-medium text-gray-900">
                                        <HiOutlineCalendar className="inline-block align-middle" />
                                        <span className="inline-block align-middle">Due Date</span>
                                    </th>
                                    <th className="w-0 py-3 pr-4 pl-3 text-left font-medium text-gray-900">
                                        <span>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task: TaskType) => {
                                    return <Task key={task.id} options={task} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
