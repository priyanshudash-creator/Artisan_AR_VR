import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Award, ChevronRight } from 'lucide-react'
import { Artisan } from '../../types'
import { VerificationBadge } from '../common/VerificationBadge'

interface ArtisanCardProps {
  artisan: Artisan
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5DED3] p-5 hover:shadow-md hover:border-[#244C3A]/50 transition-all flex flex-col justify-between">
      <div>
        {/* Header with Avatar and Badge */}
        <div className="flex items-start gap-4">
          <img
            src={artisan.profileImage}
            alt={artisan.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#E8DCCB] shrink-0"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-1">
              <Link to={`/artisans/${artisan.id}`}>
                <h3 className="font-serif text-lg font-bold text-[#244C3A] hover:text-[#B85C38] transition-colors truncate">
                  {artisan.name}
                </h3>
              </Link>
            </div>
            {artisan.studioName && (
              <p className="text-xs text-[#6B6A63] font-medium truncate">
                {artisan.studioName}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-xs text-[#6B6A63] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#B85C38] shrink-0" />
              <span className="truncate">{artisan.locality}, {artisan.district}</span>
            </div>
          </div>
        </div>

        {/* Verification Status & Experience */}
        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#E5DED3]/60 text-xs">
          <VerificationBadge status={artisan.verificationStatus} size="sm" />
          <span className="text-[#6B6A63] flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#B85C38]" />
            {artisan.experienceYears} Years Crafting
          </span>
        </div>

        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {artisan.craftSpecializations.map((spec) => (
            <span
              key={spec}
              className="text-[11px] bg-[#FAF8F5] text-[#244C3A] border border-[#E5DED3] px-2.5 py-0.5 rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Biography Excerpt */}
        <p className="text-xs text-[#6B6A63] mt-3 line-clamp-3 leading-relaxed">
          {artisan.biography}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-5 pt-3 border-t border-[#E5DED3]/60 flex items-center justify-between">
        <span className="text-[11px] text-[#6B6A63]">
          {artisan.productIds.length} Authenticated Works
        </span>
        <Link
          to={`/artisans/${artisan.id}`}
          className="text-xs font-semibold text-[#B85C38] hover:text-[#9E4928] flex items-center gap-1 transition-colors"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
