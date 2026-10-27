import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  MapPin,
  Sparkles,
  Award,
  Box,
  ShoppingCart,
  Heart,
  Scale,
  ExternalLink,
  Play,
  Info,
  Calendar,
  Share2
} from 'lucide-react'
import { OdishaArtifactItem } from '../../data/odishaArtifactsData'
import { useCartWishlist } from '../../context/CartWishlistContext'
import { artifactToProduct, getConfidenceBadge } from '../../utils/artifactAdapter'

interface ArtifactDetailModalProps {
  artifact: OdishaArtifactItem | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export const ArtifactDetailModal: React.FC<ArtifactDetailModalProps> = ({
  artifact,
  onClose,
  onPrev,
  onNext
}) => {
  const {
    isWishlisted,
    toggleWishlist,
    addToCart,
    compareList,
    addToCompare,
    removeFromCompare,
    showToast
  } = useCartWishlist()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  if (!artifact) return null

  const wishlisted = isWishlisted(artifact.id)
  const isCompared = compareList.includes(artifact.id)
  const confidence = getConfidenceBadge(artifact.priceConfidence)

  const handleAddToCart = () => {
    const product = artifactToProduct(artifact)
    addToCart(product, 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artifact.name} — Odisha Artisan Crafts`,
        text: `Explore traditional ${artifact.name} from ${artifact.district}, Odisha on ArtisanAR/VR`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('Link copied to clipboard')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E5DED3] z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#E5DED3] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B85C38]">
              {artifact.category}
            </span>
            <span className="text-xs text-[#78816A]">•</span>
            <span className="text-xs font-medium text-[#244C3A] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
              {artifact.district} District, Odisha
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#6B6A63] hover:text-[#252722] hover:bg-white rounded-full transition-colors"
              title="Share craft"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#6B6A63] hover:text-[#252722] hover:bg-white rounded-full transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Imagery & Visual Highlights */}
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E5DED3] shadow-xs">
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />

                {artifact.has3D && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#244C3A]/90 backdrop-blur-xs text-white text-xs font-semibold shadow-md">
                      <Box className="w-4 h-4 text-[#E8DCCB]" />
                      3D Experience Ready
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3">
                  <span className="inline-block px-3 py-1 rounded-lg bg-black/65 backdrop-blur-xs text-white text-xs font-medium">
                    {artifact.district} Traditional Cluster
                  </span>
                </div>
              </div>

              {/* Price Transparency Card */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E5DED3]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#6B6A63] font-semibold">
                    Price Range ({artifact.priceUnit})
                  </span>
                  <div className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border flex items-center gap-1.5 ${confidence.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${confidence.dot}`} />
                    <span>{confidence.label}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-[#244C3A]">
                    ₹{artifact.priceMin.toLocaleString('en-IN')}
                  </span>
                  {artifact.priceMax > artifact.priceMin && (
                    <span className="text-sm font-medium text-[#6B6A63]">
                      – ₹{artifact.priceMax.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-[#E5DED3] flex items-start gap-2 text-xs text-[#6B6A63]">
                  <Info className="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {confidence.tooltip}
                  </p>
                </div>
              </div>

              {/* Process Video Preview Box */}
              {artifact.processVideoUrl && (
                <a
                  href={artifact.processVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-[#B85C38]/30 bg-amber-50/50 hover:bg-[#B85C38] hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#B85C38] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#B85C38] transition-colors">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">
                        Watch Traditional Making Process
                      </span>
                      <span className="text-[11px] opacity-75">
                        Authentic workshop & artisan technique footage
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>
              )}

              {/* 3D Showroom Link if Available */}
              {artifact.has3D && (
                <Link
                  to="/showroom"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#244C3A]/30 bg-[#244C3A]/5 hover:bg-[#244C3A] hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#244C3A] text-[#E8DCCB] flex items-center justify-center group-hover:bg-white group-hover:text-[#244C3A]">
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">
                        Launch in 3D Virtual Showroom
                      </span>
                      <span className="text-[11px] opacity-75">
                        Rotate, inspect 360°, and view scale
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </Link>
              )}
            </div>

            {/* Right Column: Artisan Details & Cultural History */}
            <div className="space-y-6">
              
              {/* Title & Category */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A] tracking-tight">
                  {artifact.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-[#78816A]">
                  <span className="font-medium">{artifact.category}</span>
                  <span>•</span>
                  <span>{artifact.district} District</span>
                </div>
              </div>

              {/* Documented Master Artisan Card */}
              <div className="p-4 rounded-xl border border-[#E5DED3] bg-[#FAF8F5] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#244C3A] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#B85C38]" />
                    Artisan Heritage & Recognition
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#E5DED3] text-[#78816A] font-medium">
                    Public Record Verified
                  </span>
                </div>

                {artifact.localArtisans ? (
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <strong className="text-sm font-serif text-[#244C3A]">
                        {artifact.localArtisans}
                      </strong>
                      {artifact.localArtisansOdia && (
                        <span className="text-sm font-serif font-bold text-[#B85C38]">
                          ({artifact.localArtisansOdia})
                        </span>
                      )}
                    </div>
                    {artifact.recognition && (
                      <p className="text-xs text-[#6B6A63] mt-1">
                        <strong>Honors:</strong> {artifact.recognition}
                      </p>
                    )}
                  </div>
                ) : artifact.masterArtisans ? (
                  <div>
                    <span className="text-xs text-[#6B6A63] block">
                      Recognized Statewide Masters:
                    </span>
                    <div className="flex items-baseline gap-2 flex-wrap mt-0.5">
                      <strong className="text-sm font-serif text-[#244C3A]">
                        {artifact.masterArtisans}
                      </strong>
                      {artifact.masterArtisansOdia && (
                        <span className="text-sm font-serif font-bold text-[#B85C38]">
                          ({artifact.masterArtisansOdia})
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-[#6B6A63] leading-relaxed">
                    <p className="font-medium text-[#252722]">
                      Local Artisan Profile in Progress
                    </p>
                    <p className="mt-0.5">
                      Field survey active via District Industries Centre & Self-Help Group (SHG) cooperatives.
                    </p>
                  </div>
                )}
              </div>

              {/* What Makes It Special */}
              {artifact.specialNotes && (
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B85C38] flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
                    What Makes This Craft Unique
                  </h4>
                  <p className="text-xs sm:text-sm text-[#252722] leading-relaxed font-medium">
                    {artifact.specialNotes}
                  </p>
                </div>
              )}

              {/* Cultural History & Lineage */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#244C3A] mb-2">
                  Historical Context & Craft Tradition
                </h4>
                <p className="text-xs sm:text-sm text-[#6B6A63] leading-relaxed">
                  {artifact.history}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DED3] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#B85C38] hover:bg-[#9E4928] text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Inquiry Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(artifact.id)}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors ${
                    wishlisted
                      ? 'border-[#B85C38] bg-[#B85C38] text-white'
                      : 'border-[#E5DED3] bg-white hover:bg-[#FAF8F5] text-[#252722]'
                  }`}
                  title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{wishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>

                <button
                  onClick={() => isCompared ? removeFromCompare(artifact.id) : addToCompare(artifact.id)}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors ${
                    isCompared
                      ? 'border-[#244C3A] bg-[#244C3A] text-white'
                      : 'border-[#E5DED3] bg-white hover:bg-[#FAF8F5] text-[#252722]'
                  }`}
                  title={isCompared ? 'Remove from comparison' : 'Compare craft'}
                >
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Navigation (Prev / Next) */}
        {(onPrev || onNext) && (
          <div className="px-6 py-3 border-t border-[#E5DED3] bg-[#FAF8F5] flex items-center justify-between text-xs text-[#6B6A63]">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="hover:text-[#B85C38] font-medium disabled:opacity-40"
            >
              ← Previous Craft
            </button>
            <span className="text-[11px] text-[#78816A]">
              Listing #{artifact.rowNum - 1} of 300
            </span>
            <button
              onClick={onNext}
              disabled={!onNext}
              className="hover:text-[#B85C38] font-medium disabled:opacity-40"
            >
              Next Craft →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
