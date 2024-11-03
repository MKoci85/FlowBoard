import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
  return (
    <>
        <div className="bg-gradient-to-b from-blue-950 to-gray-950 min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
                <div className="w-60 -mt-14 mb-10 mx-auto">
                    <Logo />
                </div>
                <div className="mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
        <ToastContainer 
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
    </>
  )
}
