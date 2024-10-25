'use client'

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ConfirmToken, NewPasswordForm } from "../../types";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@tanstack/react-query';
import { updatePasswordWithToken } from '@/api/AuthAPI';
import { toast } from 'react-toastify';

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}


export default function NewPasswordForm({token}: NewPasswordFormProps) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const initialValues: NewPasswordForm = {
        password: '',
        confirmPassword: '',
    }
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    }) 

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData, 
            token
        }
        mutate(data)
        navigate('/auth/login')
    }

    const password = watch('password');

    return (
        <div className="w-full max-w-md">
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
                noValidate
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Set New Password</h2>

                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                                errors.password ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.password.message}</p>
                    )}
                </div>

                <div className="mb-6 relative">
                    <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                                errors.confirmPassword ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: value => value === password || 'Passwords do not match'
                            })}
                        />
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out hover:scale-105"
                    >
                        Set New Password
                    </button>
                </div>
            </form>
        </div>
    )
}