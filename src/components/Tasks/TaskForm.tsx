import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import { ClipboardDocumentIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="mb-6 relative">
                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Task Name
                </label>
                <div className="relative">
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter task name"
                        className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                            errors.name ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        {...register("name", {
                            required: "Task Name is required",
                        })}
                    />
                    <ClipboardDocumentIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.name && (
                    <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.name.message}</p>
                )}
            </div>

            <div className="mb-6 relative">
                <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Task Description
                </label>
                <div className="relative">
                    <textarea
                        id="description"
                        placeholder="Enter task description"
                        rows={4}
                        className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                            errors.description ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        {...register("description", {
                            required: "Task Description is required"
                        })}
                    />
                    <PencilSquareIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                </div>
                {errors.description && (
                    <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.description.message}</p>
                )}
            </div>
        </>
    )
}