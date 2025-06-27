import { HiPlus } from 'react-icons/hi';

function App() {
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

                    <div className="text-black">search tasks... | filter button</div>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="p-4 text-left font-medium text-gray-900">Task</th>
                                    <th className="p-4 text-left font-medium text-gray-900">Status</th>
                                    <th className="p-4 text-left font-medium text-gray-900">Due Date</th>
                                    <th className="p-4 text-left font-medium text-gray-900">Priority</th>
                                    <th className="p-4 text-left font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-black">
                                <tr className="not-last:border-b not-last:border-gray-200 hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-start gap-3">
                                            <input
                                                id="todo-1"
                                                type="checkbox"
                                                className="peer mt-1 size-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-gray-600 transition-colors checked:appearance-auto checked:accent-gray-900"
                                            ></input>
                                            <div className="flex flex-col transition-colors peer-checked:[&>h3]:text-gray-400 peer-checked:[&>h3]:decoration-gray-600">
                                                <h3 className="font-medium text-gray-900 line-through decoration-transparent transition-colors">
                                                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                </h3>
                                                <span className="mt-1 text-sm text-gray-600">asd</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">asd</td>
                                    <td className="p-4">asd</td>
                                    <td className="p-4">asd</td>
                                    <td className="p-4">asd</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
