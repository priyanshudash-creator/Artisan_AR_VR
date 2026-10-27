import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Home, ArrowLeft } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-[#F8F5EF] flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white border border-[#E5DED3] rounded-3xl p-8 sm:p-10 shadow-lg space-y-5">
        <span className="font-serif text-6xl font-bold text-[#B85C38] block">404</span>
        <h1 className="font-serif text-2xl font-bold text-[#244C3A]">
          Craft Trail Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6A63] leading-relaxed">
          The craft story or page you are looking for might have been relocated or is currently in digitization.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[#244C3A] hover:bg-[#193528] text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/marketplace"
            className="w-full sm:w-auto bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Craft Marketplace</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
