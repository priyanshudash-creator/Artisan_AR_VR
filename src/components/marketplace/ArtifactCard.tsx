import React from 'react'
import { Heart, Box, ShoppingCart, Scale, ExternalLink, Play, Sparkles, MapPin } from 'lucide-react'
import { OdishaArtifactItem } from '../../data/odishaArtifactsData'
import { useCartWishlist } from '../../context/CartWishlistContext'
import { artifactToProduct, getConfidenceBadge } from '../../utils/artifactAdapter'

interface ArtifactCardProps {
  artifact: OdishaArtifactItem
  onSelect: (artifact: OdishaArtifactItem) => void
  onPlayVideo?: (videoUrl: string, title: string) => void
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, onSelect, onPlayVideo }) => {
  const {
    isWishlisted,
    toggleWishlist,
    addToCart,
    compareList,
    addToCompare,
    removeFromCompare
  } = useCartWishlist()

  const wishlisted = isWishlisted(artifact.id)
  const isCompared = compareList.includes(artifact.id)
  const confidence = getConfidenceBadge(artifact.priceConfidence)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(artifact.id)
  }

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCompared) {
      removeFromCompare(artifact.id)
    } else {
      addToCompare(artifact.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    const product = artifactToProduct(artifact)
    addToCart(product, 1)
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onPlayVideo && artifact.processVideoUrl) {
      onPlayVideo(artifact.processVideoUrl, artifact.name)
    } else if (artifact.processVideoUrl) {
      window.open(artifact.processVideoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div 
      onClick={() => onSelect(artifact)}
      className="group bg-white rounded-2xl border border-[#E5DED3] overflow-hidden hover:shadow-xl hover:border-[#B85C38]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
          <img
            src={artifact.image}
            alt={artifact.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 max-w-[70%]">
            <span className="inline-block px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#244C3A] text-[10px] font-bold tracking-wide uppercase border border-[#E5DED3] shadow-xs truncate">
              {artifact.category}
            </span>
            {artifact.has3D && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#244C3A]/90 backdrop-blur-xs text-white text-[10px] font-semibold shadow-xs">
                <Box className="w-3 h-3 text-[#E8DCCB]" />
                3D Showroom
              </span>
            )}
          </div>

          {/* Top Right Action Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-xs shadow-xs transition-all ${
                wishlisted
                  ? 'bg-[#B85C38] text-white'
                  : 'bg-white/90 text-[#252722] hover:bg-white hover:text-[#B85C38]'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCompareToggle}
              className={`p-2 rounded-full backdrop-blur-xs shadow-xs transition-all ${
                isCompared
                  ? 'bg-[#244C3A] text-white'
                  : 'bg-white/90 text-[#252722] hover:bg-white hover:text-[#244C3A]'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              aria-label="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Left District Tag */}
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium shadow-xs">
              <MapPin className="w-3 h-3 text-[#E8DCCB]" />
              {artifact.district} District
            </span>
          </div>

          {/* Process Video Floating Button */}
          {artifact.processVideoUrl && (
            <button
              onClick={handleVideoClick}
              className="absolute bottom-2.5 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 hover:bg-[#B85C38] hover:text-white text-[#244C3A] text-[10px] font-semibold backdrop-blur-xs shadow-xs transition-colors"
              title="Watch craft making video"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Process Video</span>
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Artisan Verification Status */}
          <div className="mb-2">
            {artifact.localArtisans ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Verified: {artifact.localArtisans.split('(')[0].trim()}
                </span>
                {artifact.localArtisansOdia && (
                  <span className="text-[11px] text-[#78816A] font-serif font-medium">
                    ({artifact.localArtisansOdia.split(',')[0].trim()})
                  </span>
                )}
              </div>
            ) : artifact.masterArtisans ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                  <Sparkles className="w-2.5 h-2.5 text-sky-600" />
                  Master: {artifact.masterArtisans.split('(')[0].trim()}
                </span>
                {artifact.masterArtisansOdia && (
                  <span className="text-[11px] text-[#78816A] font-serif font-medium">
                    ({artifact.masterArtisansOdia.split(',')[0].trim()})
                  </span>
                )}
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50/80 text-amber-800 border border-amber-200/80">
                Artisan profile coming soon (Field survey)
              </span>
            )}
          </div>

          {/* Artifact Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#244C3A] group-hover:text-[#B85C38] transition-colors line-clamp-1">
            {artifact.name}
          </h3>

          {/* What makes it special snippet */}
          <p className="text-xs text-[#6B6A63] line-clamp-2 mt-1.5 leading-relaxed">
            {artifact.specialNotes || artifact.history}
          </p>

          {/* Price Range & Confidence Level */}
          <div className="mt-3 pt-3 border-t border-[#E5DED3]/70 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#78816A] font-semibold block">
                Price Range ({artifact.priceUnit})
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-serif text-base sm:text-lg font-bold text-[#244C3A]">
                  ₹{artifact.priceMin.toLocaleString('en-IN')}
                </span>
                {artifact.priceMax > artifact.priceMin && (
                  <span className="text-xs text-[#6B6A63] font-medium">
                    – ₹{artifact.priceMax.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Price Confidence Badge */}
            <div 
              className={`px-2 py-1 rounded-md text-[10px] font-semibold border flex items-center gap-1 cursor-help ${confidence.bg}`}
              title={confidence.tooltip}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${confidence.dot}`} />
              <span>{confidence.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#E5DED3]/70 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(artifact)
          }}
          className="text-xs font-semibold text-[#244C3A] hover:text-[#B85C38] transition-colors py-1.5 flex items-center gap-1"
        >
          <span>Craft Story</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex items-center gap-1.5 bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-xs"
          aria-label={`Add ${artifact.name} to inquiry cart`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  )
}
