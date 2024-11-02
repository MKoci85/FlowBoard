import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import { XMarkIcon, CalendarIcon, ClockIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import NotesPanel from '../Notes/NotesPanel';

export default function TaskModalDetails() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const queryClient = useQueryClient()
  
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message, { toastId: 'error' })
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status}
        mutate(data)
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.message, { toastId: 'error' })
            navigate(location.pathname, {replace: true})
        }
    }, [isError, error, navigate, location.pathname]);

    const show = taskId ? true : false
    
    if(data) return (
        <Transition appear show={show} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-10" 
                onClose={() => navigate(location.pathname, {replace: true})}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold text-center mb-2 text-gray-800"
                                >
                                    {data.name}
                                </Dialog.Title>
                                <button
                                    type="button"
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                                    onClick={() => navigate(location.pathname, {replace: true})}
                                >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <div className="mt-2 space-y-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        Added: {formatDate(data.createdAt)}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        Last update: {formatDate(data.updatedAt)}
                                    </div>
                                    <p className="text-gray-700">{data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='text-lg text-purple-900 font-bold mb-2'>Changes history</p>

                                            <ul className='list-decimal'>
                                                {data.completedBy.slice(-7).map((activityLog) => (
                                                    <li key={activityLog._id}>
                                                        <span className='text-slate-900'>
                                                            {statusTranslations[activityLog.status]}:
                                                        </span> {' '}
                                                        <span className='text-purple-900'>{activityLog.user.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ): null}
                                    
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                            Current Status
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="status"
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md appearance-none bg-gray-100 transition-colors duration-200 ease-in-out hover:bg-indigo-100"
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                            >
                                                {Object.entries(statusTranslations).map(([key, value]) => (
                                                    <option key={key} value={key}>{value}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <NotesPanel 
                                    notes={data.notes}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
    return null;
}