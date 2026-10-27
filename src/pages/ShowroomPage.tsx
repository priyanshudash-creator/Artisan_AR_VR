import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ShoppingCart,
  Heart,
  ChevronRight,
  MapPin,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_ARTISANS } from '../data/mockData'
import { Craft3DViewer } from '../components/showroom/Craft3DViewer'
import { useCartWishlist } from '../context/CartWishlistContext'
import { VerificationBadge } from '../components/common/VerificationBadge'

export const ShowroomPage: React.FC = () => {
  const { addToCart, toggleWishlist, isWishlisted } = useCartWishlist()
  
  // Products that have 3D models or are featured in showroom
  const showroomProducts = MOCK_PRODUCTS.filter((p) => p.has3DModel)
  const [selectedProductId, setSelectedProductId] = useState<string>(showroomProducts[0]?.id || MOCK_PRODUCTS[0].id)

  const activeProduct = MOCK_PRODUCTS.find((p) => p.id === selectedProductId) || MOCK_PRODUCTS[0]
  const activeArtisan = MOCK_ARTISANS.find((a) => a.id === activeProduct.artisanId) || MOCK_ARTISANS[0]

  const wishlisted = isWishlisted(activeProduct.id)

  return (
    <div className="min-h-screen bg-[#191C1A] text-[#F8F5EF]">
      
      {/* Showroom Top Nav Banner */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B85C38] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E8DCCB]">
                3D DIGITAL CRAFT SHOWROOM
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Interactive Heritage Exhibition
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="text-xs text-[#E8DCCB] hover:text-white px-3 py-1.5 rounded-md border border-white/15 hover:border-white transition-colors"
            >
              Browse 2D Catalog
            </Link>
            <Link
              to={`/products/${activeProduct.slug}`}
              className="text-xs bg-[#B85C38] hover:bg-[#9E4928] text-white px-4 py-1.5 rounded-md font-medium transition-colors"
            >
              Full Details & Story
            </Link>
          </div>
        </div>
      </div>

      {/* Main Showroom Interactive Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main 3D Canvas Viewport */}
          <div className="lg:col-span-8 space-y-4">
            <Craft3DViewer product={activeProduct} height="h-[460px] md:h-[580px]" />

            {/* Product Selector Thumbnails Carousel */}
            <div>
              <p className="text-xs uppercase tracking-wider text-[#E8DCCB]/70 font-semibold mb-2.5">
                Select Craft Artifact to Inspect:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {showroomProducts.map((p) => {
                  const isSelected = p.id === activeProduct.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      className={`p-2 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-white/10 border-[#B85C38] shadow-lg scale-102'
                          : 'bg-black/30 border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-black/40">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate">{p.name}</h4>
                      <span className="text-[10px] text-[#E8DCCB] block">₹{p.price.toLocaleString('en-IN')}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Product Information Card */}
          <div className="lg:col-span-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B85C38]">
                {activeProduct.categoryId}
              </span>
              <VerificationBadge status={activeProduct.verificationStatus} size="sm" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-white leading-snug">
                {activeProduct.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#E8DCCB]/80 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>{activeProduct.locality}, {activeProduct.district}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-[#E8DCCB]/70 block">Direct Craft Value</span>
              <span className="font-serif text-3xl font-bold text-white">
                ₹{activeProduct.price.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-[#E8DCCB]/70 mt-1">
                Authentic handcrafted masterwork with provenance certificate.
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#E8DCCB]/90 leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Materials Breakdown */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-white block">Constituent Materials:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeProduct.materials.map((m, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#E8DCCB]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Artisan Profile Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <img
                src={activeArtisan.profileImage}
                alt={activeArtisan.name}
                className="w-11 h-11 rounded-full object-cover border border-white/20"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-[#E8DCCB]/70 tracking-wider block">
                  Master Artisan
                </span>
                <Link
                  to={`/artisans/${activeArtisan.id}`}
                  className="font-serif font-bold text-sm text-white hover:text-[#B85C38] truncate block"
                >
                  {activeArtisan.name}
                </Link>
                <span className="text-[11px] text-[#E8DCCB]/70 truncate block">
                  {activeArtisan.experienceYears} Years Crafting
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => addToCart(activeProduct, 1)}
                className="w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart (₹{activeProduct.price.toLocaleString('en-IN')})</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    wishlisted
                      ? 'bg-[#B85C38] border-[#B85C38] text-white'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                  <span>{wishlisted ? 'In Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <Link
                  to={`/products/${activeProduct.slug}`}
                  className="flex-1 py-2.5 px-3 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Product Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
