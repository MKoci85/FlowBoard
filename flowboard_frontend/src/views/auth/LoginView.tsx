'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserLoginForm } from '@/types/index'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { login } from '@/api/AuthAPI'
import { toast } from 'react-toastify'

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false)

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <div >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all duration-500 ease-in-out hover:scale-95"
          noValidate
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back!</h2>
          <div className="mb-6 relative">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete='off'
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
              <p className="text-red-500 text-xs italic mt-1 slide-down">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                  errors.password ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
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
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Forgot Password?
            </a>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}