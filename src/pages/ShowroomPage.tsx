import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BlenderShowroomViewer } from '../components/showroom/BlenderShowroomViewer'

export const ShowroomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111412] text-[#F8F5EF] flex flex-col">
      {/* Showroom Top Nav Banner */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Back to Catalog"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B85C38] animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D4A373]">
                  3D INTERACTIVE SHOWROOM
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                Heritage 3D Exhibition Stage
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="text-xs text-[#E8DCCB] hover:text-white px-3.5 py-1.5 rounded-lg border border-white/15 hover:border-white transition-colors"
            >
              Browse 2D Catalog
            </Link>
          </div>
        </div>
      </header>

      {/* Main 3D Interactive Showroom Window Only */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <BlenderShowroomViewer className="w-full shadow-2xl" />
      </main>
    </div>
  )
}
