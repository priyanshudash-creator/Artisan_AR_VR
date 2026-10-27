import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShieldCheck,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_ARTISANS } from '../data/mockData'
import { VerificationBadge } from '../components/common/VerificationBadge'

export const ProductPassportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0]
  const artisan = MOCK_ARTISANS.find((a) => a.id === product.artisanId) || MOCK_ARTISANS[0]

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#244C3A] hover:text-[#B85C38]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Product Details</span>
          </Link>
        </div>

        {/* The Passport Card Container */}
        <div className="bg-white border-2 border-[#E5DED3] rounded-3xl shadow-xl overflow-hidden relative">
          
          {/* Top Security Header */}
          <div className="bg-[#244C3A] text-[#F8F5EF] p-6 sm:p-8 border-b-4 border-[#B85C38]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8DCCB] uppercase block">
                  HERITAGE CRAFT PROVENANCE PASSPORT
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Artisan Provenance Certificate
                </h1>
                <p className="text-xs text-[#E8DCCB] mt-1">
                  Passport Serial: OD-PASSPORT-{product.id.toUpperCase()}-2026
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                <ShieldCheck className="w-4 h-4 text-[#E8DCCB]" />
                <span className="text-xs font-semibold text-white">Demonstration Certificate</span>
              </div>
            </div>
          </div>

          {/* Passport Body */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-[#E5DED3]">
              <div className="md:col-span-4">
                <div className="aspect-square rounded-2xl overflow-hidden border border-[#E5DED3] shadow-md bg-[#FAF8F5]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B85C38]">
                    {product.categoryId}
                  </span>
                  <VerificationBadge status={product.verificationStatus} size="sm" />
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#244C3A]">
                  {product.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DED3]">
                    <span className="text-[#6B6A63] block text-[11px]">Master Artisan</span>
                    <strong className="text-[#252722] font-semibold">{artisan.name}</strong>
                    <span className="text-[11px] text-[#6B6A63] block">{artisan.studioName}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DED3]">
                    <span className="text-[#6B6A63] block text-[11px]">Geographic Provenance</span>
                    <strong className="text-[#252722] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B85C38]" />
                      {product.locality}
                    </strong>
                    <span className="text-[11px] text-[#6B6A63] block">District of {product.district}, Odisha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials & Ecological Footprint */}
            <div className="space-y-3 pb-8 border-b border-[#E5DED3]">
              <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                Constituent Natural Materials & Chemistry
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.materials.map((mat, i) => (
                  <div key={i} className="p-3 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs">
                    <span className="text-[#B85C38] font-bold block mb-0.5">Component {i + 1}</span>
                    <span className="font-medium text-[#252722]">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Stages Recorded */}
            <div className="space-y-3 pb-8 border-b border-[#E5DED3]">
              <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                Recorded Manufacturing Stages
              </h3>
              <div className="space-y-2">
                {product.manufacturingStages.map((stg) => (
                  <div
                    key={stg.step}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#244C3A] text-white font-serif font-bold text-[11px] flex items-center justify-center">
                        {stg.step}
                      </span>
                      <div>
                        <strong className="text-[#252722] font-semibold block">{stg.title}</strong>
                        <span className="text-[#6B6A63] text-[11px]">{stg.description}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#B85C38] shrink-0 ml-2">
                      {stg.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Verification Placeholder & Disclaimer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3]">
              
              <div className="md:col-span-3 flex justify-center">
                {/* Visual QR Code Representation */}
                <div className="p-3 bg-white border border-[#E5DED3] rounded-xl shadow-xs text-center">
                  <div className="w-28 h-28 mx-auto bg-[#244C3A] p-2 rounded-lg flex items-center justify-center">
                    <QrCode className="w-full h-full text-white" />
                  </div>
                  <span className="text-[10px] text-[#6B6A63] mt-1.5 block font-mono">
                    VERIFY-SCAN-DEMO
                  </span>
                </div>
              </div>

              <div className="md:col-span-9 space-y-2 text-xs text-[#6B6A63]">
                <div className="flex items-center gap-2 text-[#244C3A] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#B85C38]" />
                  <span>Digital Craft Passport Authenticity Seal</span>
                </div>
                <p className="leading-relaxed">
                  This passport provides complete transparency into authentic master artisanal wages, raw materials, and indigenous handcrafting techniques directly verified from rural Odisha artisan studios.
                </p>
                <div className="pt-1 flex items-center gap-3 font-semibold text-[#244C3A]">
                  <span>Indicative Fair Valuation: ₹{product.price.toLocaleString('en-IN')}</span>
                  <span>•</span>
                  <span>100% Odishan Provenance</span>
                </div>
              </div>

            </div>

          </div>

          {/* Passport Footer Seal */}
          <div className="bg-[#FAF8F5] px-6 sm:px-10 py-4 border-t border-[#E5DED3] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6B6A63]">
            <span>ArtisanAR/VR — Gaon to Growth Initiative</span>
            <span>Issued in the Handloom & Handicraft Clusters of Odisha</span>
          </div>

        </div>

      </div>
    </div>
  )
}
