import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Palette,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Building,
  HelpCircle
} from 'lucide-react'
import { useCartWishlist } from '../../context/CartWishlistContext'
import { ALL_30_ODISHA_DISTRICTS } from '../../data/odishaArtifactsData'

export const ArtisanLoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useCartWishlist()

  // Form states — strictly empty on mount so user enters their own details
  const [artisanId, setArtisanId] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = () => {
    if (!artisanId.trim()) {
      setErrorMsg('Please enter your mobile number or Artisan Registry ID to receive an OTP.')
      return
    }
    setOtpSent(true)
    setErrorMsg('')
    showToast('6-digit verification code sent to your registered mobile number.')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!artisanId.trim() || !pin.trim()) {
      setErrorMsg('Please enter your Artisan ID / Mobile Number and secret passcode.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      const artisanSession = {
        authenticated: true,
        artisanId: artisanId.trim(),
        name: artisanId.includes('9876') || artisanId.toLowerCase().includes('mohan')
          ? 'Guru Mohan Meher'
          : 'Master Artisan',
        studioName: 'Meher Heritage Handloom Studio',
        district: selectedDistrict || 'Sambalpur',
        craftType: 'Sambalpuri Ikat & Silk Weaving',
        verified: true,
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('artisan_studio_session', JSON.stringify(artisanSession))
      showToast('Welcome to your Artisan Studio Portal!')

      const searchParams = new URLSearchParams(location.search)
      const redirectPath = searchParams.get('redirect') || '/artisan/dashboard'
      navigate(redirectPath)
    }, 650)
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between relative overflow-hidden text-[#252722]">
      {/* Background Craft Dot Matrix Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#78816A 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          
          {/* Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C38]/10 border border-[#B85C38]/20 text-[#B85C38] text-xs font-semibold mb-3 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-[#B85C38]" />
              <span>Odisha Master Artisan & Weaver Suite</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
              Artisan Studio Portal
            </h1>
            <p className="text-xs text-[#6B6A63] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Sign in to manage your workshop inventory, declare audited pricing breakdowns, and publish authentic craft stories.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-[#E5DED3] rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Artisan ID / Mobile */}
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Artisan Mobile Number or Registry ID *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={artisanId}
                    onChange={(e) => setArtisanId(e.target.value)}
                    placeholder="e.g. +91 98765 43210 or OD-ART-1042"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Secret PIN / Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#252722]">
                    Studio Secret PIN or Passkey *
                  </label>
                  <span className="text-[11px] text-[#6B6A63] hover:text-[#B85C38] cursor-pointer">
                    Forgot PIN?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your secret PIN or password"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6A63] hover:text-[#252722]"
                    aria-label="Toggle PIN visibility"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* District Craft Cluster */}
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Artisan Cluster District (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <Building className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  >
                    <option value="">Select your craft district...</option>
                    {ALL_30_ODISHA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} District
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* OTP Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#252722]">
                    Mobile Verification OTP
                  </label>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[11px] font-semibold text-[#B85C38] hover:underline"
                  >
                    {otpSent ? 'Resend OTP' : 'Send SMS OTP'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP (e.g. 742109)"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#252722] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#E5DED3] text-[#244C3A] focus:ring-0 cursor-pointer w-4 h-4"
                  />
                  <span>Keep studio session active</span>
                </label>

                <Link to="/about" className="text-[#6B6A63] hover:text-[#244C3A] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Artisan Help</span>
                </Link>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#244C3A] hover:bg-[#193528] text-white py-3 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Palette className="w-4 h-4 text-[#D4A373]" />
                    <span>Enter Artisan Studio Suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom Register Prompt */}
            <div className="mt-6 pt-5 border-t border-[#E5DED3] text-center text-xs text-[#6B6A63]">
              <span>Not registered as an Odisha artisan yet? </span>
              <Link
                to="/become-an-artisan"
                className="font-bold text-[#B85C38] hover:underline"
              >
                Apply for Artisan Verification →
              </Link>
            </div>

          </div>

          {/* Directorate Protection Notice */}
          <div className="mt-6 text-center text-[11px] text-[#78816A]">
            <p>Protected by SHILPA SETU Cryptographic Craft Registry Protocol.</p>
            <p className="mt-0.5 text-[#6B6A63]">Odisha State Directorate of Handloom & Handicrafts</p>
          </div>

        </div>
      </main>

      {/* Footer minimal bar */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 py-4 border-t border-[#E5DED3] flex items-center justify-between text-[11px] text-[#78816A]">
        <span>© 2026 SHILPA SETU • Artisan Studio Suite</span>
        <div className="flex items-center gap-4">
          <Link to="/admin/login" className="hover:text-[#B85C38] transition-colors">Admin Portal</Link>
          <Link to="/marketplace" className="hover:text-[#244C3A] transition-colors">Marketplace</Link>
        </div>
      </footer>
    </div>
  )
}
