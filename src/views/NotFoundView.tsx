import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const BoardSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
    <rect x="20" y="20" width="160" height="160" rx="8" stroke="currentColor" strokeWidth="4" className="animate-draw-1" />
    <line x1="20" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="4" className="animate-draw-2" />
    <line x1="80" y1="20" x2="80" y2="180" stroke="currentColor" strokeWidth="4" className="animate-draw-3" />
    <line x1="140" y1="20" x2="140" y2="180" stroke="currentColor" strokeWidth="4" className="animate-draw-4" />
  </svg>
)

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center animate-fade-in-down mt-[-450px]">
        <h1 className="text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">404</h1>
        <p className="text-2xl mb-8 text-gray-600">This page got lost in cyberspace</p>
      </div>
      
      <div className="animate-fade-in">
        <BoardSVG />
      </div>
      
      <p className="text-xl mb-8 max-w-xl text-center text-gray-600 animate-fade-in">
        Uh-oh! It seems this page has wandered off into the digital wilderness. 🧭 
        But don't worry, let's get you back on track!
      </p>
      
      <div className="flex gap-4 animate-fade-in-up">
        <Link to="/">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300">
            <HomeIcon className="w-5 h-5" />
            Take me home!
          </button>
        </Link>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-white text-blue-500 px-6 py-2 rounded-full flex items-center gap-2 border border-blue-500 hover:bg-blue-50 transition-colors duration-300"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Retry, please!
        </button>
      </div>
    </div>
  )
}