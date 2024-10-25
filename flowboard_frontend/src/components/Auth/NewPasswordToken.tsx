'use client'

import { validateToken } from '@/api/AuthAPI'
import { ConfirmToken } from '@/types/index'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: Dispatch<React.SetStateAction<string>>
    setIsValidToken: Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
            navigate('/auth/new-password')
        }
    })
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({token})

    return (
            <div className="w-full max-w-md">
                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all duration-500 ease-in-out">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Verification Code</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Enter the 6-digit code sent to your email
                    </p>
                    <div className="mb-6">
                        <label htmlFor="pin-input" className="block text-gray-700 text-sm font-bold mb-2 sr-only">
                            Enter your code
                        </label>
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <div className="flex justify-center gap-2">
                                {[...Array(6)].map((_, index) => (
                                    <PinInputField
                                        key={index}
                                        className="w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    />
                                ))}
                            </div>
                        </PinInput>
                    </div>
                    <div className="text-center">
                        <Link
                            to='/auth/forgot-password'
                            className="text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                        >
                            Request a new code
                        </Link>
                    </div>
                </form>
            </div>
    )
}