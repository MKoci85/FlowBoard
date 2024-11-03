import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { EnvelopeIcon } from "@heroicons/react/24/solid"
import { UserIcon } from "@heroicons/react/24/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user']})
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-xl font-light text-gray-500 mt-2">Modify your details here.</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Name</label>
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                                errors.name ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                {...register("name", {
                                required: "Name is required",
                                })}
                            />
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="email"
                        >E-mail</label>
                         <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                                errors.email ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email format',
                                },
                                })}
                            />
                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Save Changes'
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out cursor-pointer"
                    />
                </form>
            </div>
        </>
    )
}