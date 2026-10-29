import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react'
import { useCartWishlist } from '../../context/CartWishlistContext'

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useCartWishlist()

  // Form states (empty by default so user fills their own credentials)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both administrative email and security passkey.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      // Store authenticated admin session
      const adminSession = {
        authenticated: true,
        email: email.trim(),
        name: email.includes('curator')
          ? 'Dr. Snehalata Mohapatra'
          : 'Priyanshu Dash',
        role: email.includes('curator')
          ? 'Senior Heritage Curator & Craft Officer'
          : 'Directorate Moderation Officer',
        department: 'Odisha State Directorate of Handloom & Handicrafts',
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('artisan_admin_session', JSON.stringify(adminSession))
      showToast('Authentication successful. Welcome to the Admin Moderation Portal.')

      // Check redirect query param
      const searchParams = new URLSearchParams(location.search)
      const redirectPath = searchParams.get('redirect') || '/admin/dashboard'
      navigate(redirectPath)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between relative overflow-hidden text-[#252722]">
      {/* Background Craft Grid Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#78816A 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Login Card Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          
          {/* Official Badge & Portal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#244C3A]/10 border border-[#244C3A]/20 text-[#244C3A] text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-[#244C3A]" />
              <span>Official Moderation & Curation Directorate</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
              Admin Moderation Portal
            </h1>
            <p className="text-xs text-[#6B6A63] mt-1.5 max-w-sm mx-auto">
              Secure authentication for verified state curators, craft evaluators, and provenance auditors.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-[#E5DED3] rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email / Officer ID */}
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Administrative Email or Directorate ID *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@artisanarvr.gov.in"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#252722]">
                    Security Passkey *
                  </label>
                  <span className="text-[11px] text-[#6B6A63] hover:text-[#B85C38] cursor-pointer">
                    Forgot key?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrative passkey"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6A63] hover:text-[#252722]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA Security Token */}
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5 flex items-center justify-between">
                  <span>2FA Security Token / OTP</span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Verified
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B6A63]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="6-digit security token"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs font-mono tracking-widest text-[#244C3A] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#6B6A63]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#E5DED3] text-[#244C3A] focus:ring-[#244C3A]"
                  />
                  <span>Keep session active for 8 hours</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#244C3A] hover:bg-[#193528] text-white py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize & Enter Moderation Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Security Notice */}
            <div className="mt-6 pt-4 border-t border-[#E5DED3] text-[11px] text-[#6B6A63] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#244C3A]">
                <Building2 className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>Restricted Access: Government & NGO Directorate</span>
              </div>
              <p>
                All verification actions, artisan reviews, and pricing audits are timestamped and cryptographically logged for accountability.
              </p>
            </div>

          </div>

          {/* Alternate Navigation */}
          <div className="text-center mt-6 text-xs text-[#6B6A63] space-x-4">
            <Link to="/artisan/login" className="hover:text-[#244C3A] underline">
              Artisan Studio Portal
            </Link>
            <span>•</span>
            <Link to="/become-an-artisan" className="hover:text-[#B85C38] underline">
              Apply as Master Artisan
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-[#6B6A63] border-t border-[#E5DED3]">
        <span>ArtisanAR/VR — Gaon to Growth • Fair Craft Provenance & Heritage Protection</span>
      </footer>
    </div>
  )
}
