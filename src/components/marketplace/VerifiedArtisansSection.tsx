import React, { useState } from 'react'
import { Award, ChevronRight, ExternalLink, Sparkles, UserCheck } from 'lucide-react'
import { VERIFIED_MASTER_ARTISANS, VerifiedMasterArtisan } from '../../data/odishaArtifactsData'

interface VerifiedArtisansSectionProps {
  onSelectCraft: (craftName: string) => void
}

export const VerifiedArtisansSection: React.FC<VerifiedArtisansSectionProps> = ({ onSelectCraft }) => {
  const [selectedArtisan, setSelectedArtisan] = useState<VerifiedMasterArtisan | null>(null)
  const [showAll, setShowAll] = useState(false)

  const displayedArtisans = showAll 
    ? VERIFIED_MASTER_ARTISANS 
    : VERIFIED_MASTER_ARTISANS.slice(0, 6)

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DED3] rounded-3xl p-6 sm:p-8 my-10 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-[#E5DED3]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Public Record Verified Artisans</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
            Masters of Odisha's Craft Heritage
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6A63] mt-1 max-w-2xl">
            Meet the 33 state & national awardee craftspersons documented from the Odisha Directorate of Handicrafts, Padma Shri, and Shilp Guru public records.
          </p>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-[#B85C38] hover:text-[#9E4928] flex items-center gap-1 shrink-0 self-start md:self-auto"
        >
          <span>{showAll ? 'Show Fewer Masters' : `View All ${VERIFIED_MASTER_ARTISANS.length} Documented Masters`}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Master Artisans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedArtisans.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-white rounded-2xl border border-[#E5DED3] p-5 hover:border-[#B85C38]/40 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#244C3A]">
                    {artisan.name}
                  </h3>
                  {artisan.nameOdia && (
                    <span className="text-xs font-serif font-bold text-[#B85C38] block mt-0.5">
                      {artisan.nameOdia}
                    </span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200 shrink-0">
                  <Award className="w-3 h-3 text-emerald-600" />
                  {artisan.minYearsActive} yrs active
                </span>
              </div>

              {/* Craft & District */}
              <div className="text-xs text-[#78816A] mb-2 font-medium">
                <span>{artisan.craft}</span>
                {artisan.district && (
                  <>
                    <span> • </span>
                    <span>{artisan.district}</span>
                  </>
                )}
              </div>

              {/* Recognition */}
              <p className="text-xs text-[#252722] line-clamp-2 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DED3]/60 mb-2">
                <strong>Recognition:</strong> {artisan.recognition}
              </p>

              {artisan.notes && (
                <p className="text-[11px] text-[#6B6A63] line-clamp-2 italic">
                  {artisan.notes}
                </p>
              )}
            </div>

            {/* Footer Links */}
            <div className="pt-3 border-t border-[#E5DED3]/60 mt-3 flex items-center justify-between text-xs">
              {artisan.sourceUrl ? (
                <a
                  href={artisan.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#6B6A63] hover:text-[#B85C38] flex items-center gap-1"
                >
                  <span>Public Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : <div />}

              <button
                onClick={() => onSelectCraft(artisan.craft.split('(')[0].trim())}
                className="text-xs font-semibold text-[#244C3A] hover:text-[#B85C38] transition-colors"
              >
                Browse Craft →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
