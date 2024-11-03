'use client'

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCodeForm } from "../../types";
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestConfirmationCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
        <div className="w-full max-w-md">
            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all duration-500 ease-in-out hover:scale-95"
                noValidate
            >
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Request Confirmation Code</h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter your email to receive a{' '}
                    <span className="text-purple-600 font-semibold">new confirmation code</span>
                </p>

                <div className="mb-6 relative">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
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

                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out"
                    >
                        Send Code
                    </button>
                </div>

                <div className="flex flex-col space-y-2 text-center">
                    <Link
                        to='/auth/login'
                        className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                    >
                        Already have an account? Sign In
                    </Link>
                    <Link
                        to='/auth/forgot-password'
                        className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                    >
                        Forgot your password? Reset
                    </Link>
                </div>
            </form>
        </div>
    )
}