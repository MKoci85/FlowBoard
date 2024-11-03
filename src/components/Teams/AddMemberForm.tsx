import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { TeamMemberForm } from "@/types/index";
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail,
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data)
    }

    const resetForm = () => {
        reset()
        mutation.reset()
    }

    return (
        <>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="mb-6 relative">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        User Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            placeholder="user@example.com"
                            className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                                errors.email ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold 
                            py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out"
                    >
                        Search User
                    </button>
                </div>
            </form>
            <div className="mt-5">
                {mutation.isPending && <p className="text-center mt-4">Loading...</p>}
                {mutation.error && <p className="text-center">{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data} reset={resetForm} />}
            </div>
        </>
    )
}

