import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { UpdateCurrentPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentPasswordForm = {
    current_password: '',
    password: '',
    confirm_password: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const password = watch('password');

  const handleChangePassword = (formData: UpdateCurrentPasswordForm) =>{ 
    mutate(formData)
    reset()
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-2xl font-bold">Change Password</h1>
        <p className="text-xl font-light text-gray-500 mt-2">Fill out this form to update your password.</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Current Password</label>
            <div className="relative">
              <input
                id="current_password"
                type='password'
                placeholder="Current Password"
                className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                  errors.password ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('current_password', {
                  required: 'Current Password is Required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >New Password</label>
            <div className="relative">
              <input
                id="password"
                type='password'
                placeholder="New Password"
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
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>


          <div className="mb-5 space-y-3">
            <label
              htmlFor="confirm_password"
              className="text-sm uppercase font-bold"
            >Confirm Password</label>

            <div className="relative">
              <input
                id="confirm_password"
                type='password'
                placeholder="Confirm Password"
                className={`appearance-none border rounded-lg w-full py-3 px-4 pl-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ${
                  errors.password ? 'border-red-500 shake' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('confirm_password', {
                  required: "This field is required",
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.confirm_password && (
              <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Change Password'
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out cursor-pointer"
          />
        </form>
      </div>
    </>
  )
}