import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'

export default function AppLayout() {
  return (
    <>
        <header className='bg-blue-900 text-white p-6 shadow-lg'>
            <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='w-24 mb-2'>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <NavMenu />
            </div>
        </header>
        
        <section className='max-w-screen-xl mx-auto mt-10 p-5'>
            <Outlet />
        </section>

        <footer className='py-5'>
            <p className='text-center'>
                All rights reserved &copy; Flowboard {new Date().getFullYear()}
            </p>
        </footer>
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
