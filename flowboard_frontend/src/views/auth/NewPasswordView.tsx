import NewPasswordForm from "@/components/Auth/NewPasswordForm"
import NewPasswordToken from "@/components/Auth/NewPasswordToken"
import { ConfirmToken } from "@/types/index"
import { useState } from "react"

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 transform transition-all duration-500 ease-in-out">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Forgot Password</h2>
            {isValidToken ? (
                <p className="text-center text-gray-600 mb-6">
                Enter your email to receive password reset instructions
            </p>
            ):(
                <p className="text-center text-gray-600 mb-6">
                Enter your code
            </p>
            )}
            {!isValidToken ? 
            <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> : 
            <NewPasswordForm token={token} />}
        </div>
    </>
  )
}
