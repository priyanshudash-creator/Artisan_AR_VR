import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Compass,
  Info
} from 'lucide-react'

export const ApplicationSubmittedPage: React.FC = () => {
  const applicationRef = `ART-OD-2026-${Math.floor(1000 + Math.random() * 9000)}`
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-[#E5DED3] rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-[#244C3A]/10 border-2 border-[#244C3A] text-[#244C3A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B85C38] block mb-1">
              DEMO APPLICATION RECORDED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
              Your Craft Journey Starts Here.
            </h1>
            <p className="text-sm text-[#6B6A63] mt-2 max-w-md mx-auto leading-relaxed">
              We have received your sample artisan studio application. Thank you for continuing Odisha's timeless heritage.
            </p>
          </div>

          <div className="inline-block bg-[#FAF8F5] border border-[#E5DED3] rounded-xl px-5 py-3 text-left">
            <div className="flex items-center justify-between gap-6 text-xs">
              <div>
                <span className="text-[#6B6A63] block text-[11px]">Demo Application Reference:</span>
                <span className="font-mono font-bold text-[#244C3A] text-sm">{applicationRef}</span>
              </div>
              <div>
                <span className="text-[#6B6A63] block text-[11px]">Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#B85C38]">
                  <Clock className="w-3.5 h-3.5" /> Pending Review
                </span>
              </div>
            </div>
          </div>

          {/* Verification Queue Notice */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 text-left flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Application Successfully Enqueued:</strong>
              Your application has been received by the Gaon to Growth Moderation Directorate. You can access your Artisan Studio dashboard to explore product management and craft pricing tools while verification is underway.
            </div>
          </div>

          {/* Next Steps in Process */}
          <div className="text-left border-t border-[#E5DED3] pt-6 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#244C3A]">
              Heritage Moderation & Onboarding Process
            </h4>
            <div className="space-y-2 text-xs text-[#6B6A63]">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8DCCB] text-[#244C3A] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <span>Workshop documentation and traditional craft practice reviewed by state curators.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8DCCB] text-[#244C3A] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <span>Transparent price breakdown validated against rural loom and material costs.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8DCCB] text-[#244C3A] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <span>3D scanning and photogrammetry scheduling for authenticated catalog inclusion.</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#E5DED3] flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/artisan/dashboard"
              className="w-full sm:w-auto bg-[#244C3A] hover:bg-[#193528] text-white text-xs font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Artisan Studio Dashboard</span>
            </Link>

            <Link
              to="/marketplace"
              className="w-full sm:w-auto bg-white border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] text-xs font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Return to Marketplace</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
