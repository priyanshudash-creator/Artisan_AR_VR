import React from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Box,
  Layers,
  ArrowRight,
  Compass
} from 'lucide-react'
import heroCraftImg from '../assets/hero-craft.jpg'

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Hero */}
      <section className="artisan-grid border-b border-[#E5DED3] py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B85C38]">
            GAON TO GROWTH INITIATIVE
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#244C3A] leading-tight">
            Bridging Ancient Village Looms<br className="hidden sm:inline" />
            With Conscious Global Patrons
          </h1>
          <p className="text-sm sm:text-base text-[#6B6A63] max-w-2xl mx-auto leading-relaxed">
            ArtisanAR/VR was conceived to protect, celebrate, and economically empower India's traditional master craftsmen through immersive 3D technology, honest storytelling, and transparent pricing.
          </p>
        </div>
      </section>

      {/* Main Philosophy Sections */}
      <section className="py-16 md:py-20 border-b border-[#E5DED3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
                WHY ODISHA FIRST
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#244C3A]">
                The Epicenter of Unbroken Craft Traditions
              </h2>
              <p className="text-sm text-[#6B6A63] leading-relaxed">
                Odisha possesses an unbroken continuum of artisanal heritage spanning millennia. From the 4,000-year-old lost-wax metallurgy of Koraput Dhokra to the temple-born Pattachitra scrolls of Raghurajpur and the gossamer silver webs of Cuttack Tarakasi, each cluster represents living human history.
              </p>
              <p className="text-sm text-[#6B6A63] leading-relaxed">
                Yet, rural master artisans often struggle against industrial counterfeits and opaque retail markups. Our platform ensures customers experience the genuine craft in 3D and understand the true cost of making it.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E5DED3] shadow-md">
                <img
                  src={heroCraftImg}
                  alt="Odisha craft heritage"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-16 md:py-20 bg-[#FAF8F5] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#244C3A]">
              Our Three Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex items-center justify-center text-[#B85C38]">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                1. 3D Digital Preservation
              </h3>
              <p className="text-xs text-[#6B6A63] leading-relaxed">
                Digitizing physical craft masterworks with photogrammetric precision allows buyers to inspect textures, weaves, and angles before purchasing.
              </p>
            </div>

            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex items-center justify-center text-[#244C3A]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                2. Transparent Pricing
              </h3>
              <p className="text-xs text-[#6B6A63] leading-relaxed">
                Breaking down materials, artisan labor, overheads, and logistics to clearly demonstrate fair value and celebrate rural master compensation.
              </p>
            </div>

            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex items-center justify-center text-[#B85C38]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                3. Digital Craft Passports
              </h3>
              <p className="text-xs text-[#6B6A63] leading-relaxed">
                Every verified creation carries a digital certificate of provenance detailing the master artisan, village coordinates, materials, and care guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[#244C3A]">
            Experience Genuine Odisha Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6A63]">
            Start your discovery journey across Sambalpur, Puri, Cuttack, and Koraput.
          </p>
          <div className="pt-2">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-xs transition-colors"
            >
              <span>Explore the Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
