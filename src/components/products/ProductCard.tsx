import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Box, ShoppingCart, Check, Scale } from 'lucide-react'
import { Product } from '../../types'
import { useCartWishlist } from '../../context/CartWishlistContext'
import { VerificationBadge } from '../common/VerificationBadge'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isWishlisted,
    toggleWishlist,
    addToCart,
    compareList,
    addToCompare,
    removeFromCompare
  } = useCartWishlist()

  const wishlisted = isWishlisted(product.id)
  const isCompared = compareList.includes(product.id)

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCompared) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product.id)
    }
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <div className="group bg-white rounded-xl border border-[#E5DED3] overflow-hidden hover:shadow-md hover:border-[#78816A]/50 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
          <Link to={`/products/${product.slug}`} className="block w-full h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
          </Link>

          {/* Badges on Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.has3DModel && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#244C3A]/90 backdrop-blur-xs text-white text-[11px] font-medium shadow-xs">
                <Box className="w-3 h-3 text-[#E8DCCB]" />
                3D Preview
              </span>
            )}
            <span className="inline-block px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-[#244C3A] text-[10px] font-semibold tracking-wide uppercase border border-[#E5DED3]">
              {product.categoryId}
            </span>
          </div>

          {/* Action Buttons on Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-xs shadow-xs transition-all ${
                wishlisted
                  ? 'bg-[#B85C38] text-white'
                  : 'bg-white/90 text-[#252722] hover:bg-white hover:text-[#B85C38]'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Compare Button */}
            <button
              onClick={handleCompareToggle}
              className={`p-2 rounded-full backdrop-blur-xs shadow-xs transition-all ${
                isCompared
                  ? 'bg-[#244C3A] text-white'
                  : 'bg-white/90 text-[#252722] hover:bg-white hover:text-[#244C3A]'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              aria-label="Compare craft"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Availability Tag at Bottom of Image */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
              {product.locality}, {product.district}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs text-[#6B6A63] truncate">
              By {product.artisanId === 'art-001' ? 'Guru Mohan Meher' : product.artisanId === 'art-002' ? 'Smt. Priyamvada Mohapatra' : product.artisanId === 'art-003' ? 'Rama Gouda' : product.artisanId === 'art-004' ? 'Pradeep K. Sahoo' : 'Master Artisan'}
            </span>
            <VerificationBadge status={product.verificationStatus} size="sm" />
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#244C3A] group-hover:text-[#B85C38] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#6B6A63] line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>

          {/* Materials Tag List */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.materials.slice(0, 2).map((mat, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#FAF8F5] text-[#252722] border border-[#E5DED3] px-2 py-0.5 rounded"
              >
                {mat}
              </span>
            ))}
            {product.materials.length > 2 && (
              <span className="text-[10px] text-[#6B6A63] self-center">
                +{product.materials.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Price & Add to Cart */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#E5DED3]/70 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] text-[#6B6A63] block">Direct Craft Price</span>
          <span className="font-serif text-lg font-bold text-[#244C3A]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-medium text-[#244C3A] hover:text-[#B85C38] px-2 py-1.5 rounded transition-colors hidden sm:block"
          >
            Details
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-medium px-3 py-2 rounded-md transition-colors shadow-xs"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
