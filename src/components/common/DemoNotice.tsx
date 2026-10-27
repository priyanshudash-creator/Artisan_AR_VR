import React, { useState } from 'react'
import { Info, X } from 'lucide-react'

export const DemoNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-[#244C3A] text-[#F8F5EF] text-xs py-2 px-4 border-b border-[#78816A]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <Info className="w-3.5 h-3.5 text-[#E8DCCB] shrink-0" />
          <span className="font-light tracking-wide truncate">
            <strong className="font-semibold text-white">ArtisanAR/VR — Gaon to Growth:</strong> Connecting rural Odisha master weavers and tribal sculptors directly to conscious buyers with 3D heritage showcases and transparent pricing.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#E8DCCB] hover:text-white transition-colors text-xs flex items-center gap-1 shrink-0 px-1 py-0.5"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
