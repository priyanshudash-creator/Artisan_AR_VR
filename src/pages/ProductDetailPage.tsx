import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  ShoppingCart,
  Box,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Share2,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  Info
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_ARTISANS } from '../data/mockData'
import { useCartWishlist } from '../context/CartWishlistContext'
import { VerificationBadge } from '../components/common/VerificationBadge'
import { PriceBreakdown } from '../components/pricing/PriceBreakdown'
import { Craft3DViewer } from '../components/showroom/Craft3DViewer'
import { ProductCard } from '../components/products/ProductCard'

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const {
    addToCart,
    isWishlisted,
    toggleWishlist,
    addToCompare,
    compareList,
    showToast
  } = useCartWishlist()

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'details' | '3d-view' | 'process' | 'pricing'>('details')

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0]
  const artisan = MOCK_ARTISANS.find((a) => a.id === product.artisanId) || MOCK_ARTISANS[0]
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)

  const wishlisted = isWishlisted(product.id)
  const isCompared = compareList.includes(product.id)

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    showToast('Product link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#6B6A63]">
          <div className="flex items-center gap-2 truncate">
            <Link to="/" className="hover:text-[#B85C38]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/marketplace" className="hover:text-[#B85C38]">Marketplace</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/marketplace?category=${encodeURIComponent(product.categoryId)}`} className="hover:text-[#B85C38]">
              {product.categoryId}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252722] font-semibold truncate">{product.name}</span>
          </div>

          <Link
            to="/marketplace"
            className="flex items-center gap-1 font-medium text-[#244C3A] hover:text-[#B85C38] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Gallery or 3D Viewer */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between bg-white border border-[#E5DED3] p-1.5 rounded-xl">
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTab === 'details'
                      ? 'bg-[#244C3A] text-white'
                      : 'text-[#6B6A63] hover:text-[#252722]'
                  }`}
                >
                  Gallery Photography
                </button>
                <button
                  onClick={() => setActiveTab('3d-view')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                    activeTab === '3d-view'
                      ? 'bg-[#B85C38] text-white'
                      : 'text-[#6B6A63] hover:text-[#252722]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Interactive 3D Preview</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-[#6B6A63] hover:text-[#252722] rounded-md hover:bg-[#FAF8F5]"
                  title="Share craft"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToCompare(product.id)}
                  className={`p-1.5 rounded-md transition-colors ${
                    isCompared ? 'text-[#244C3A] font-bold' : 'text-[#6B6A63] hover:text-[#252722]'
                  }`}
                  title="Compare craft"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Display Area: 3D or Photo */}
            {activeTab === '3d-view' ? (
              <Craft3DViewer product={product} />
            ) : (
              <div className="space-y-3">
                <div className="relative aspect-4/3 sm:aspect-16/11 bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E5DED3] shadow-xs">
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.has3DModel && (
                    <button
                      onClick={() => setActiveTab('3d-view')}
                      className="absolute bottom-4 right-4 bg-black/75 hover:bg-black backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Box className="w-4 h-4 text-[#B85C38]" />
                      <span>Switch to 3D Orbit View</span>
                    </button>
                  )}
                </div>

                {/* Thumbnails row */}
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-[#B85C38] shadow-xs' : 'border-[#E5DED3] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveTab('3d-view')}
                    className="w-20 h-20 rounded-xl border border-dashed border-[#B85C38] bg-[#FAF8F5] flex flex-col items-center justify-center text-[#B85C38] text-[11px] font-medium p-1 text-center hover:bg-[#F8F5EF]"
                  >
                    <Box className="w-5 h-5 mb-1" />
                    <span>3D Model</span>
                  </button>
                </div>
              </div>
            )}

            {/* Digital Passport Teaser Card */}
            <div className="bg-white border border-[#E5DED3] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8DCCB] text-[#244C3A] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#244C3A] uppercase tracking-wide">
                    Digital Craft Passport Attached
                  </h4>
                  <p className="text-[11px] text-[#6B6A63]">
                    Includes verified provenance, village GPS, materials audit & artisan seal.
                  </p>
                </div>
              </div>
              <Link
                to={`/passport/${product.id}`}
                className="text-xs font-semibold text-[#B85C38] hover:underline shrink-0"
              >
                Inspect Passport →
              </Link>
            </div>

          </div>

          {/* Right Column: Information, Pricing, & Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category & Status */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#B85C38]">
                {product.categoryId}
              </span>
              <VerificationBadge status={product.verificationStatus} size="sm" />
            </div>

            {/* Title & Origin */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#6B6A63]">
                <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>Handcrafted in {product.locality}, District of {product.district}, Odisha</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DED3]">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#6B6A63] block">Direct Artisan Price</span>
                  <span className="font-serif text-3xl font-bold text-[#244C3A]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#6B6A63] ml-1.5 font-normal">incl. of all village taxes</span>
                </div>
                <span className="text-xs font-semibold text-[#244C3A] bg-[#E8DCCB] px-2.5 py-1 rounded-full">
                  100% Fair Return
                </span>
              </div>
              <p className="text-[11px] text-[#6B6A63] mt-2">
                Every rupee paid connects directly to {artisan.name}'s master artisan studio.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-[#252722] leading-relaxed">
              {product.description}
            </p>

            {/* Artisan Profile Snippet */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex items-center gap-3">
              <img
                src={artisan.profileImage}
                alt={artisan.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E5DED3]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#6B6A63] tracking-wider block">
                  Created by Master Artisan
                </span>
                <Link
                  to={`/artisans/${artisan.id}`}
                  className="font-serif font-bold text-sm text-[#244C3A] hover:text-[#B85C38] truncate block"
                >
                  {artisan.name}
                </Link>
                <span className="text-[11px] text-[#6B6A63] truncate block">
                  {artisan.experienceYears} Years Master Crafting • {artisan.locality}
                </span>
              </div>
              <Link
                to={`/artisans/${artisan.id}`}
                className="text-xs font-semibold text-[#B85C38] hover:underline shrink-0"
              >
                Meet →
              </Link>
            </div>

            {/* Material & Spec Chips */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-[#252722] block">Key Materials & Techniques:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white border border-[#E5DED3] rounded-md text-[#252722]"
                  >
                    {mat}
                  </span>
                ))}
                {product.dimensions && (
                  <span className="px-2.5 py-1 bg-white border border-[#E5DED3] rounded-md text-[#6B6A63]">
                    Dim: {product.dimensions}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector and Purchase CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E5DED3] rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-sm font-semibold hover:bg-[#FAF8F5]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-[#252722]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2.5 text-sm font-semibold hover:bg-[#FAF8F5]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-[#B85C38] hover:bg-[#9E4928] text-white py-3 px-6 rounded-lg font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    wishlisted
                      ? 'bg-[#B85C38] border-[#B85C38] text-white'
                      : 'bg-white border-[#E5DED3] text-[#252722] hover:text-[#B85C38]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6A63] pt-1 px-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#244C3A]" />
                  In Stock ({product.stockQuantity} available)
                </span>
                <span>Insured Craft Delivery across India</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Story, Process, Price Breakdown, Specifications */}
        <div className="mt-16 pt-10 border-t border-[#E5DED3]">
          
          <div className="space-y-12">
            
            {/* Section 1: Craftsmanship & Manufacturing Process */}
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8">
              <div className="max-w-3xl mb-8">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
                  HEREDITY & METHOD
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A] mt-1">
                  The Multi-Stage Craft Process
                </h2>
                <p className="text-sm text-[#6B6A63] mt-2">
                  {product.story}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.manufacturingStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-7 h-7 rounded-full bg-[#E8DCCB] text-[#244C3A] font-serif font-bold text-xs flex items-center justify-center">
                          {stage.step}
                        </span>
                        <span className="text-[11px] font-semibold text-[#B85C38] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {stage.duration}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-1">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-[#6B6A63] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Transparent Price Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <PriceBreakdown
                  data={product.priceBreakdown}
                  sellingPrice={product.price}
                  productName={product.name}
                />
              </div>

              {/* Care Instructions & Specs */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-[#E5DED3] rounded-xl p-5">
                  <h3 className="font-serif font-bold text-base text-[#244C3A] mb-3">
                    Care & Preservation Instructions
                  </h3>
                  <ul className="space-y-2 text-xs text-[#6B6A63]">
                    {product.careInstructions.map((care, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] mt-1.5 shrink-0" />
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#E5DED3] rounded-xl p-5">
                  <h3 className="font-serif font-bold text-base text-[#244C3A] mb-3">
                    Product Specifications
                  </h3>
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#E5DED3]/60">
                      <dt className="text-[#6B6A63]">District Origin</dt>
                      <dd className="font-medium text-[#252722]">{product.district}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E5DED3]/60">
                      <dt className="text-[#6B6A63]">Locality / Guild</dt>
                      <dd className="font-medium text-[#252722]">{product.locality}</dd>
                    </div>
                    {product.weight && (
                      <div className="flex justify-between py-1 border-b border-[#E5DED3]/60">
                        <dt className="text-[#6B6A63]">Net Weight</dt>
                        <dd className="font-medium text-[#252722]">{product.weight}</dd>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <dt className="text-[#6B6A63]">3D Digital Scan</dt>
                      <dd className="font-medium text-[#244C3A]">
                        {product.has3DModel ? 'Available in 3D' : 'In Digitization'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Section 3: Related Products from Same Tradition */}
            {relatedProducts.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#244C3A] mb-6">
                  More from {product.categoryId}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}
