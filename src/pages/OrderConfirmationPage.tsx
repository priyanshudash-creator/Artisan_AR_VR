import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react'
import { MOCK_PRODUCTS } from '../data/mockData'

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const sampleProduct = MOCK_PRODUCTS[0]

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Confirmation Card */}
        <div className="bg-white border border-[#E5DED3] rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[#244C3A]/10 border-2 border-[#244C3A] text-[#244C3A] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] block mb-1">
              DEMO ORDER RECEIVED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
              Thank You for Supporting Rural Craft!
            </h1>
            <p className="text-sm text-[#6B6A63] mt-2 max-w-lg mx-auto leading-relaxed">
              Your demonstration order has been successfully recorded. In production, this directly notifies the master artisan's village loom in Odisha.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="inline-block bg-[#FAF8F5] border border-[#E5DED3] rounded-xl px-5 py-3">
            <span className="text-xs text-[#6B6A63] block">Order Reference:</span>
            <span className="font-mono text-lg font-bold text-[#244C3A] tracking-wider">
              {id || 'ORD-OD-89241'}
            </span>
          </div>

          {/* Order Status Notice */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 text-left flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Scheduled for Direct Artisan Studio Dispatch:</strong>
              Your order has been recorded and allocated to the master artisan's guild in Sambalpur. A digital craft passport link and tracking receipt have been confirmed.
            </div>
          </div>

          {/* Order Snapshot Table */}
          <div className="text-left border-t border-[#E5DED3] pt-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#244C3A]">
              Order Snapshot
            </h3>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={sampleProduct.images[0]}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover border border-[#E5DED3]"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#244C3A]">{sampleProduct.name}</h4>
                  <span className="text-xs text-[#6B6A63]">Master Artisan Guild • Barpali, Sambalpur</span>
                </div>
              </div>
              <span className="font-serif font-bold text-sm text-[#252722]">
                ₹{sampleProduct.price.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 bg-white border border-[#E5DED3] rounded-xl">
                <span className="text-[#6B6A63] block text-[11px] font-semibold">Estimated Delivery Timeline</span>
                <strong className="text-[#244C3A] font-bold text-sm block mt-0.5">5 - 7 Business Days</strong>
                <span className="text-[11px] text-[#6B6A63]">Insured Rural Craft Express Transit</span>
              </div>

              <div className="p-3.5 bg-white border border-[#E5DED3] rounded-xl">
                <span className="text-[#6B6A63] block text-[11px] font-semibold">Digital Passport Status</span>
                <strong className="text-[#B85C38] font-bold text-sm block mt-0.5">Generated & QR Ready</strong>
                <Link to={`/passport/${sampleProduct.id}`} className="text-[11px] text-[#244C3A] hover:underline">
                  Inspect Digital Passport →
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation CTA Buttons */}
          <div className="pt-6 border-t border-[#E5DED3] flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/account/orders"
              className="w-full sm:w-auto bg-[#244C3A] hover:bg-[#193528] text-white text-xs font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              View Order in Account
            </Link>
            <Link
              to="/marketplace"
              className="w-full sm:w-auto bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore More Crafts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
