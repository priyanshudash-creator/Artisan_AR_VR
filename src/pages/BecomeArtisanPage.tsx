import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Save,
  Info,
  Layers,
  Users
} from 'lucide-react'
import {
  ODISHA_DISTRICTS,
  CRAFT_CATEGORIES
} from '../data/mockData'
import { CraftCategory, OdishaDistrict } from '../types'
import { PriceBreakdown } from '../components/pricing/PriceBreakdown'
import { useCartWishlist } from '../context/CartWishlistContext'

export const BecomeArtisanPage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useCartWishlist()

  const [step, setStep] = useState(1)

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: 'Bikram Keshari Bindhani',
    studioName: 'Mayurbhanj Tribal Brass Guild',
    mobileNumber: '+91 94371 88291',
    email: 'bikram.bindhani@sample.artisanar.in',
    preferredLanguage: 'Odia' as 'Odia' | 'Hindi' | 'English',

    // Step 2: Craft & Location
    primaryCraft: 'Dhokra Metal Craft' as CraftCategory,
    specializations: ['Dhokra Metal Craft', 'Tribal Art'] as CraftCategory[],
    state: 'Odisha',
    district: 'Mayurbhanj' as OdishaDistrict,
    locality: 'Kuliana Village',
    craftDescription: 'Practicing hereditary lost-wax bell-metal casting for three generations. We make ceremonial tribal trumpets, animal figures, and temple bells using local river clay and wild beeswax.',
    experienceYears: 19,

    // Step 3: Verification Information
    evidenceType: 'State Artisan Identity Card (Odisha Directorate of Handicrafts)',
    practiceExplanation: 'All products are cast manually without electrical molds using natural clay and pure beeswax harvested from local forests.',
    consentGiven: true,

    // Step 4: First Product
    productName: 'Mayurbhanj Dhokra Deer Family',
    productDescription: 'Lost-wax bell-metal figurine of spotted deer grazing in Similipal forest with tribal geometric wirework.',
    productCategory: 'Dhokra Metal Craft' as CraftCategory,
    productMaterials: 'Bell Metal, Brass, Natural Beeswax, Riverbed Clay',
    productDimensions: '8 x 6 x 3 inches',
    productPrice: 4500,
    productStock: 4,

    // Step 5: Pricing
    materialsCost: 1400,
    labourCost: 2100,
    overheadCost: 350,
    packagingCost: 200,
    distributionCost: 200,
    sellerMargin: 250
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required'
      if (!formData.mobileNumber.trim()) errs.mobileNumber = 'Mobile Number is required'
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required'
    } else if (currentStep === 2) {
      if (!formData.locality.trim()) errs.locality = 'Village or Locality is required'
      if (!formData.craftDescription.trim()) errs.craftDescription = 'Craft Description is required'
    } else if (currentStep === 3) {
      if (!formData.consentGiven) errs.consentGiven = 'Consent to verify authentic craft practice is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const scrollToWizard = () => {
    const el = document.getElementById('onboarding-wizard')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(5, s + 1))
      scrollToWizard()
    }
  }

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1))
    scrollToWizard()
  }

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep <= step || validateStep(step)) {
      setStep(targetStep)
      scrollToWizard()
    }
  }

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('artisan_onboarding_draft', JSON.stringify(formData))
      showToast('Draft application preserved locally.')
    } catch {
      // ignore
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    // Demo submission
    navigate('/artisan/application-submitted')
  }

  const calculatedTotal =
    Number(formData.materialsCost) +
    Number(formData.labourCost) +
    Number(formData.overheadCost) +
    Number(formData.packagingCost) +
    Number(formData.distributionCost) +
    Number(formData.sellerMargin)

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Hero Section */}
      <section className="artisan-grid border-b border-[#E5DED3] py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B85C38]">
            GAON TO GROWTH ARTISAN ONBOARDING
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#244C3A] leading-tight">
            Your Craft Deserves a Wider World.
          </h1>

          <p className="text-sm sm:text-base text-[#6B6A63] max-w-2xl mx-auto leading-relaxed">
            Bring your craftsmanship to a wider audience. Share your story, showcase your products, and help customers discover the people and traditions behind every creation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToWizard}
              className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Start 5-Step Application
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="bg-white border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] text-xs sm:text-sm font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              How It Works & Benefits
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-14 border-b border-[#E5DED3] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A]">
              Why Master Artisans Partner With Us
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6A63] mt-2">
              Empowering rural Odisha creators with technology, dignity, and transparent economic returns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Showcase Your Craft',
                desc: 'Present your weaving, painting, or lost-wax casting in 3D digital replicas and high-resolution galleries.'
              },
              {
                title: 'Reach Conscious Patrons',
                desc: 'Connect directly with art collectors and patrons across India without unfair middleman brokerage.'
              },
              {
                title: 'Build Customer Trust',
                desc: 'Verified artisan badges and digital craft passports guarantee authenticity for every buyer.'
              },
              {
                title: 'Explain Your Pricing',
                desc: 'Transparent pricing components celebrate the real value of your raw materials and laborious hours.'
              },
              {
                title: 'Share Your Lineage Story',
                desc: 'Dedicate an authenticated profile honoring your village, ancestors, and apprentice disciples.'
              },
              {
                title: 'Zero Predatory Fees',
                desc: 'Fair community margin model ensuring majority proceeds directly benefit your studio and guild.'
              }
            ].map((b, i) => (
              <div key={i} className="p-5 bg-white border border-[#E5DED3] rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-[#244C3A] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-1">{b.title}</h4>
                <p className="text-xs text-[#6B6A63] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five-Step Registration Wizard */}
      <section id="onboarding-wizard" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Wizard Card Container */}
          <div className="bg-white border border-[#E5DED3] rounded-3xl p-6 sm:p-10 shadow-lg">
            
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6A63] mb-2">
                <span>Step {step} of 5: {
                  step === 1 ? 'Personal Details' :
                  step === 2 ? 'Craft & Location' :
                  step === 3 ? 'Supporting Evidence' :
                  step === 4 ? 'First Product Listing' :
                  'Pricing & Application Review'
                }</span>
                <span className="text-[#B85C38]">{step * 20}% Completed</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#E5DED3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B85C38] transition-all duration-300"
                  style={{ width: `${step * 20}%` }}
                />
              </div>

              {/* Step Pills */}
              <div className="grid grid-cols-5 gap-1 mt-3 text-[10px] text-center font-medium">
                {['1. Personal', '2. Craft', '3. Evidence', '4. Product', '5. Review'].map((label, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleJumpToStep(i + 1)}
                    className={`py-1.5 px-1 rounded transition-all cursor-pointer ${
                      step === i + 1
                        ? 'bg-[#244C3A] text-white font-bold shadow-xs'
                        : step > i + 1
                        ? 'bg-[#E8DCCB] text-[#244C3A] hover:bg-[#244C3A]/20 font-semibold'
                        : 'text-[#6B6A63] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Security & Confidentiality Notice */}
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Confidential & Secure Application:</strong> All artisan documentation, GI credentials, and workshop proofs are kept strictly confidential and verified under Gaon to Growth cultural standards.
              </span>
            </div>

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Step 1: Artisan & Studio Details
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Master Artisan Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Studio / Workshop / Cooperative Society Name
                  </label>
                  <input
                    type="text"
                    name="studioName"
                    value={formData.studioName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                    {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Preferred Communication Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  >
                    <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Craft & Location */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Step 2: Craft Practice & Geographical Cluster
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Primary Craft Tradition *
                    </label>
                    <select
                      name="primaryCraft"
                      value={formData.primaryCraft}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    >
                      {CRAFT_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Odisha District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    >
                      {ODISHA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Village / Locality (e.g. Barpali, Raghurajpur, Kuliana) *
                    </label>
                    <input
                      type="text"
                      name="locality"
                      value={formData.locality}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                    {errors.locality && <p className="text-[11px] text-red-600 mt-1">{errors.locality}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Describe Your Craft Tradition & Raw Materials *
                  </label>
                  <textarea
                    rows={4}
                    name="craftDescription"
                    value={formData.craftDescription}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                  {errors.craftDescription && <p className="text-[11px] text-red-600 mt-1">{errors.craftDescription}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Verification Information */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Step 3: Verification & Studio Evidence
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Supporting Proof Document Type
                  </label>
                  <select
                    name="evidenceType"
                    value={formData.evidenceType}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  >
                    <option value="State Artisan Identity Card (Odisha Directorate of Handicrafts)">
                      State Artisan Identity Card (Odisha Directorate of Handicrafts)
                    </option>
                    <option value="District Industries Center (DIC) Handicraft Registration">
                      District Industries Center (DIC) Handicraft Registration
                    </option>
                    <option value="Handloom Weavers Cooperative Membership">
                      Handloom Weavers Cooperative Membership
                    </option>
                    <option value="Puri Heritage Crafts Council Certificate">
                      Puri Heritage Crafts Council Certificate
                    </option>
                  </select>
                </div>

                {/* File Selection Dropzones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-dashed border-[#E5DED3] rounded-xl text-center bg-[#FAF8F5]">
                    <Upload className="w-6 h-6 text-[#B85C38] mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-[#244C3A] block">Artisan ID / Proof</span>
                    <span className="text-[11px] text-[#6B6A63]">Select sample PDF/JPEG</span>
                    <span className="mt-2 inline-block px-2 py-0.5 rounded bg-white text-[10px] text-[#244C3A] border border-[#E5DED3]">
                      artisan_id_card.pdf
                    </span>
                  </div>

                  <div className="p-4 border-2 border-dashed border-[#E5DED3] rounded-xl text-center bg-[#FAF8F5]">
                    <Upload className="w-6 h-6 text-[#244C3A] mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-[#244C3A] block">Workshop Studio Photos</span>
                    <span className="text-[11px] text-[#6B6A63]">Select workshop photo</span>
                    <span className="mt-2 inline-block px-2 py-0.5 rounded bg-white text-[10px] text-[#244C3A] border border-[#E5DED3]">
                      workshop_pit_loom.jpg
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Explanation of Authentic Practice
                  </label>
                  <textarea
                    rows={3}
                    name="practiceExplanation"
                    value={formData.practiceExplanation}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>

                <label className="flex items-start gap-3 p-3 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-0.5 text-[#B85C38] focus:ring-0"
                  />
                  <span className="text-xs text-[#252722]">
                    I confirm that the handcrafted works listed are made using genuine traditional techniques without industrial machine duplicates. I agree to the transparent price breakdown guidelines.
                  </span>
                </label>
                {errors.consentGiven && <p className="text-[11px] text-red-600">{errors.consentGiven}</p>}
              </div>
            )}

            {/* Step 4: First Product */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                    Step 4: Your First Handcrafted Listing
                  </h3>
                  <button
                    onClick={handleNext}
                    className="text-xs text-[#6B6A63] hover:text-[#B85C38] underline"
                  >
                    Skip for now
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Materials Used
                    </label>
                    <input
                      type="text"
                      name="productMaterials"
                      value={formData.productMaterials}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Approximate Dimensions
                    </label>
                    <input
                      type="text"
                      name="productDimensions"
                      value={formData.productDimensions}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Selling Price (INR)
                    </label>
                    <input
                      type="number"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs font-bold text-[#244C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Available Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="productStock"
                      value={formData.productStock}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Pricing & Review */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                    Step 5: Transparent Cost Components & Final Review
                  </h3>
                  <p className="text-xs text-[#6B6A63] mt-1">
                    Enter your estimated costs. This informs the transparent breakdown displayed to conscious patrons.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Raw Materials (₹)
                    </label>
                    <input
                      type="number"
                      name="materialsCost"
                      value={formData.materialsCost}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Artisan Labour (₹)
                    </label>
                    <input
                      type="number"
                      name="labourCost"
                      value={formData.labourCost}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Studio Overhead (₹)
                    </label>
                    <input
                      type="number"
                      name="overheadCost"
                      value={formData.overheadCost}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Eco-Packaging (₹)
                    </label>
                    <input
                      type="number"
                      name="packagingCost"
                      value={formData.packagingCost}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Rural Logistics (₹)
                    </label>
                    <input
                      type="number"
                      name="distributionCost"
                      value={formData.distributionCost}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#252722] mb-1">
                      Guild Margin (₹)
                    </label>
                    <input
                      type="number"
                      name="sellerMargin"
                      value={formData.sellerMargin}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Application Summary Box */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B6A63]">Artisan Name:</span>
                    <span className="font-semibold text-[#252722]">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6A63]">Craft & District:</span>
                    <span className="font-semibold text-[#252722]">{formData.primaryCraft} ({formData.district})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6A63]">First Listing:</span>
                    <span className="font-semibold text-[#252722]">{formData.productName}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E5DED3]">
                    <span className="text-[#6B6A63] font-bold">Total Indicative Cost:</span>
                    <span className="font-serif font-bold text-sm text-[#244C3A]">₹{calculatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-[#E5DED3] flex items-center justify-between gap-4">
              <div>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E5DED3] text-xs font-semibold text-[#252722] hover:bg-[#FAF8F5]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex items-center gap-1.5 text-xs text-[#6B6A63] hover:text-[#252722]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Draft</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#244C3A] hover:bg-[#193528] text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E8DCCB]" />
                    <span>Submit Demo Application</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
