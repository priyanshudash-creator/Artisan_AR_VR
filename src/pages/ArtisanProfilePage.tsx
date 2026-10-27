import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Award,
  Calendar,
  Phone,
  Mail,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { MOCK_ARTISANS, MOCK_PRODUCTS } from '../data/mockData'
import { VerificationBadge } from '../components/common/VerificationBadge'
import { ProductCard } from '../components/products/ProductCard'
import { useCartWishlist } from '../context/CartWishlistContext'

export const ArtisanProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { showToast } = useCartWishlist()

  const artisan = MOCK_ARTISANS.find((a) => a.id === id) || MOCK_ARTISANS[0]
  const artisanProducts = MOCK_PRODUCTS.filter((p) => p.artisanId === artisan.id)

  const handleStudioInquiry = () => {
    showToast(`Inquiry sent to ${artisan.name}'s studio. The artisan guild will respond directly.`)
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Breadcrumb Nav */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#6B6A63]">
          <div className="flex items-center gap-2 truncate">
            <Link to="/" className="hover:text-[#B85C38]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/artisans" className="hover:text-[#B85C38]">Artisans</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252722] font-semibold truncate">{artisan.name}</span>
          </div>

          <Link
            to="/artisans"
            className="flex items-center gap-1 font-medium text-[#244C3A] hover:text-[#B85C38]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Artisans</span>
          </Link>
        </div>
      </div>

      {/* Hero Profile Header with Cover */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-64 sm:h-80 w-full overflow-hidden bg-[#244C3A] relative">
          {artisan.coverImage && (
            <img
              src={artisan.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Profile Card Floating Over Cover */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
          <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img
                src={artisan.profileImage}
                alt={artisan.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-lg bg-[#FAF8F5]"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
                    {artisan.name}
                  </h1>
                  <VerificationBadge status={artisan.verificationStatus} size="sm" />
                </div>

                {artisan.studioName && (
                  <p className="text-sm font-semibold text-[#B85C38]">
                    {artisan.studioName}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B6A63] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                    {artisan.locality}, {artisan.district}, {artisan.state}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#244C3A]" />
                    {artisan.experienceYears} Years Crafting Legacy
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleStudioInquiry}
                className="flex-1 md:flex-none bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs transition-colors"
              >
                Inquire with Studio
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Profile Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Sample Profile Disclaimer */}
        <div className="mb-8 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] text-xs text-[#6B6A63] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B85C38] shrink-0" />
            <span>
              <strong>Sample Demonstration Profile:</strong> This profile illustrates how authentic Odisha master artisans present their heritage, pricing, and certified handcrafted catalog.
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Biography & Heritage Story */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* The Hands Behind the Craft */}
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
                LINEAGE & TRADITION
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#244C3A] mt-1 mb-4">
                The Hands Behind the Craft
              </h2>

              <p className="text-sm text-[#252722] leading-relaxed mb-4">
                {artisan.story}
              </p>
              <p className="text-sm text-[#6B6A63] leading-relaxed">
                {artisan.biography}
              </p>

              {/* Honors & Recognitions */}
              {artisan.awards && artisan.awards.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#E5DED3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#244C3A] mb-3">
                    Recognitions & State Honours
                  </h4>
                  <ul className="space-y-2 text-xs text-[#252722]">
                    {artisan.awards.map((award, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#244C3A]" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Products from This Artisan */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
                    AUTHENTIC CATALOG
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#244C3A] mt-0.5">
                    Explore More from {artisan.name}
                  </h3>
                </div>
                <span className="text-xs text-[#6B6A63]">
                  {artisanProducts.length} authenticated {artisanProducts.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>

              {artisanProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {artisanProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#6B6A63]">No active products listed currently.</p>
              )}
            </div>

          </div>

          {/* Right Column: Workshop & Specialization Specs */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6">
              <h3 className="font-serif font-bold text-base text-[#244C3A] mb-4">
                Artisan Guild Details
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#6B6A63] block mb-1 font-medium">Craft Specializations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {artisan.craftSpecializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E5DED3] text-[#244C3A] font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {artisan.workshopLocation && (
                  <div className="pt-3 border-t border-[#E5DED3]">
                    <span className="text-[#6B6A63] block mb-1 font-medium">Workshop Address:</span>
                    <p className="text-[#252722] leading-relaxed font-normal">
                      {artisan.workshopLocation}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E5DED3] space-y-2">
                  <div className="flex items-center gap-2 text-[#6B6A63]">
                    <Phone className="w-3.5 h-3.5 text-[#B85C38]" />
                    <span>{artisan.contactPhone || '+91 94370 XXXXX'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6A63]">
                    <Mail className="w-3.5 h-3.5 text-[#B85C38]" />
                    <span className="truncate">{artisan.contactEmail || 'studio@sample.artisanar.in'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fair Return Commitment */}
            <div className="p-5 rounded-2xl bg-[#244C3A] text-white space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#E8DCCB] font-semibold">
                GAON TO GROWTH PLEDGE
              </span>
              <h4 className="font-serif text-lg font-bold">100% Direct Remuneration</h4>
              <p className="text-xs text-[#E8DCCB] leading-relaxed">
                Purchases directly credit the artisan’s village studio, eliminating traditional predatory middleman cuts.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
