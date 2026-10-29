import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Heart,
  Compass,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useCartWishlist } from '../context/CartWishlistContext'
import { saveUserSession, getUserSession } from '../utils/userAuth'
import { ALL_30_ODISHA_DISTRICTS } from '../data/odishaArtifactsData'

interface UserLoginPageProps {
  defaultTab?: 'signin' | 'signup'
}

const POPULAR_CRAFTS = [
  'Sambalpuri Handloom',
  'Cuttack Silver Filigree',
  'Pattachitra Paintings',
  'Pipili Appliqué',
  'Dhokra Bell Metal',
  'Konark Stone Carving',
  'Palm Leaf Engraving',
  'Terracotta & Pottery'
]

export const UserLoginPage: React.FC<UserLoginPageProps> = ({ defaultTab = 'signin' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useCartWishlist()

  const [mode, setMode] = useState<'signin' | 'signup'>(defaultTab)

  // Sign In form states (EMPTY by default)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Sign Up form states (EMPTY by default)
  const [fullName, setFullName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [selectedCrafts, setSelectedCrafts] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const toggleCraft = (craft: string) => {
    setSelectedCrafts((prev) =>
      prev.includes(craft) ? prev.filter((c) => c !== craft) : [...prev, craft]
    )
  }

  const getRedirectUrl = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('redirect') || '/account'
  }

  // Handle Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Please enter both your email/phone and password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)

      const existingSession = getUserSession()
      let userProfile

      if (existingSession && (existingSession.email === loginEmail.trim() || existingSession.phone === loginEmail.trim())) {
        userProfile = existingSession
      } else {
        // Derive name gracefully from email if not already registered
        const derivedName = loginEmail.includes('@')
          ? loginEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          : 'Patron of Odisha Craft'

        userProfile = saveUserSession({
          fullName: derivedName,
          email: loginEmail.includes('@') ? loginEmail.trim() : `${loginEmail.trim()}@shilpasetu.in`,
          phone: !loginEmail.includes('@') ? loginEmail.trim() : '+91 98200 12345',
          craftAffinity: ['Sambalpuri Handloom', 'Cuttack Silver Filigree']
        })
      }

      showToast(`Welcome back, ${userProfile.fullName}!`)
      navigate(getRedirectUrl())
    }, 600)
  }

  // Handle Sign Up
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.')
      return
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile phone number.')
      return
    }
    if (!signUpPassword.trim()) {
      setErrorMsg('Please enter a security password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)

      const profile = saveUserSession({
        fullName: fullName.trim(),
        email: signUpEmail.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        district: district.trim() || 'Khordha',
        postalCode: postalCode.trim(),
        craftAffinity: selectedCrafts.length > 0 ? selectedCrafts : ['Sambalpuri Handloom', 'Cuttack Silver Filigree']
      })

      showToast(`Account created successfully! Welcome, ${profile.fullName}.`)
      navigate(getRedirectUrl())
    }, 650)
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-10 sm:py-16 relative overflow-hidden flex flex-col justify-between">
      {/* Background craft matrix */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#78816A 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <main className="relative z-10 max-w-lg w-full mx-auto px-4">
        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#244C3A]/10 border border-[#244C3A]/20 text-[#244C3A] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
            <span>SHILPA SETU Patron Access</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
            {mode === 'signin' ? 'Sign In to Your Account' : 'Create Patron Account'}
          </h1>
          <p className="text-xs text-[#6B6A63] mt-1.5 max-w-sm mx-auto">
            {mode === 'signin'
              ? 'Access your craft inquiries, saved artisan pieces, and personalized cultural recommendations.'
              : 'Join as a conscious patron to directly connect with rural Odisha master weavers & sculptors.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#EFEAE1] p-1 rounded-2xl flex items-center mb-6 max-w-xs mx-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('signin')
              setErrorMsg('')
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#244C3A] shadow-xs'
                : 'text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup')
              setErrorMsg('')
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#244C3A] shadow-xs'
                : 'text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card Form */}
        <div className="bg-white border border-[#E5DED3] rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE 1: SIGN IN */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Email Address or Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email or phone"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#252722]">
                    Password *
                  </label>
                  <span className="text-[11px] text-[#6B6A63] hover:text-[#B85C38] cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6A63] hover:text-[#252722]"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#244C3A] hover:bg-[#1D3D2F] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-70"
                >
                  {isLoading ? (
                    <span>Signing In...</span>
                  ) : (
                    <>
                      <span>Sign In & Open Profile</span>
                      <ArrowRight className="w-4 h-4 text-[#B85C38]" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#6B6A63]">
                  New to Shilpa Setu?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-semibold text-[#B85C38] hover:underline"
                  >
                    Create an account
                  </button>
                </span>
              </div>
            </form>
          )}

          {/* MODE 2: SIGN UP / CREATE ACCOUNT */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priyanshu Dash"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1.5">
                  Create Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6A63]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B6A63] hover:text-[#252722]"
                  >
                    {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="pt-2 border-t border-[#E5DED3]">
                <label className="block text-xs font-semibold text-[#244C3A] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Primary Delivery Address</span>
                </label>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street Address / House No. / Landmark"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none transition-colors"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City / Town"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] outline-none"
                    />

                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-2 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] outline-none truncate"
                    >
                      <option value="">District...</option>
                      {ALL_30_ODISHA_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="PIN Code"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] placeholder:text-[#6B6A63] focus:bg-white focus:border-[#244C3A] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Craft Preferences */}
              <div className="pt-2 border-t border-[#E5DED3]">
                <label className="block text-xs font-semibold text-[#244C3A] mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Favorite Craft Affinities (Optional)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CRAFTS.map((craft) => {
                    const isSelected = selectedCrafts.includes(craft)
                    return (
                      <button
                        type="button"
                        key={craft}
                        onClick={() => toggleCraft(craft)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#244C3A] text-white border-[#244C3A] shadow-xs'
                            : 'bg-[#FAF8F5] text-[#6B6A63] border-[#E5DED3] hover:border-[#244C3A]'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {craft}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-70"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration & View Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#6B6A63]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="font-semibold text-[#244C3A] hover:underline"
                  >
                    Sign in here
                  </button>
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Other Portal Navigation links */}
        <div className="mt-8 text-center text-xs text-[#6B6A63] space-x-3">
          <Link to="/artisan/login" className="hover:text-[#B85C38] transition-colors underline decoration-dotted">
            Artisan Studio Portal
          </Link>
          <span>•</span>
          <Link to="/admin/login" className="hover:text-[#B85C38] transition-colors underline decoration-dotted">
            Admin Moderation Portal
          </Link>
          <span>•</span>
          <Link to="/marketplace" className="hover:text-[#244C3A] transition-colors">
            Browse Marketplace
          </Link>
        </div>
      </main>
    </div>
  )
}
