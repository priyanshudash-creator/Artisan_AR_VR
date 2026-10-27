import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, Box, Compass, Sparkles } from 'lucide-react'
import logoImg from '../../assets/logo.jpg'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E5DED3] text-[#252722] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5DED3]">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="ArtisanAR/VR Konark Wheel Logo"
                className="w-12 h-12 rounded-full object-cover border border-[#B85C38]/40 shadow-xs group-hover:rotate-12 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-serif text-2xl font-bold text-[#244C3A]">Artisan</span>
                  <span className="font-sans text-2xl font-bold text-[#B85C38] ml-0.5">AR/VR</span>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6B6A63] uppercase -mt-0.5">
                  GAON TO GROWTH
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#6B6A63] leading-relaxed max-w-sm">
              Connecting India's traditional rural master artisans directly to conscious global patrons through immersive 3D experiences, honest storytelling, and transparent pricing.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8DCCB] text-[#244C3A] text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
                Starting from Odisha's Heritage Clusters
              </span>
            </div>
          </div>

          {/* Traditional Crafts Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#244C3A] uppercase tracking-wider mb-4">
              Odisha Crafts
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6A63]">
              <li>
                <Link to="/marketplace?category=Sambalpuri+Handloom" className="hover:text-[#B85C38] transition-colors">
                  Sambalpuri Handloom (Ikat)
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Pattachitra+Painting" className="hover:text-[#B85C38] transition-colors">
                  Pattachitra Cloth Scrolls
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Dhokra+Metal+Craft" className="hover:text-[#B85C38] transition-colors">
                  Dhokra Lost-Wax Bell Metal
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Silver+Filigree" className="hover:text-[#B85C38] transition-colors">
                  Cuttack Silver Filigree (Tarakasi)
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Pipili+Appliqué" className="hover:text-[#B85C38] transition-colors">
                  Pipili Chandua Appliqué
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Stone+Carving" className="hover:text-[#B85C38] transition-colors">
                  Konark Sandstone Sculptures
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Palm+Leaf+Engraving" className="hover:text-[#B85C38] transition-colors">
                  Talapatra Palm Leaf Engraving
                </Link>
              </li>
            </ul>
          </div>

          {/* Discovery & Experience */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#244C3A] uppercase tracking-wider mb-4">
              Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6A63]">
              <li>
                <Link to="/marketplace" className="hover:text-[#B85C38] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#B85C38]" /> Craft Marketplace
                </Link>
              </li>
              <li>
                <Link to="/showroom" className="hover:text-[#B85C38] transition-colors flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-[#B85C38]" /> 3D Digital Showroom
                </Link>
              </li>
              <li>
                <Link to="/craft-stories" className="hover:text-[#B85C38] transition-colors">
                  Craft Processes & Stories
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="hover:text-[#B85C38] transition-colors">
                  Artisan Village Directory
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#B85C38] transition-colors">
                  Product Comparison Matrix
                </Link>
              </li>
              <li>
                <Link to="/passport/prod-001" className="hover:text-[#B85C38] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#244C3A]" /> Digital Craft Passport
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B85C38] transition-colors">
                  About the Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Artisans & Platform Portals */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#244C3A] uppercase tracking-wider mb-4">
              Artisan & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6A63]">
              <li>
                <Link to="/become-an-artisan" className="text-[#B85C38] font-semibold hover:underline">
                  Become an Artisan →
                </Link>
              </li>
              <li>
                <Link to="/artisan/dashboard" className="hover:text-[#244C3A] transition-colors">
                  Artisan Studio Portal
                </Link>
              </li>
              <li>
                <Link to="/artisan/products/new" className="hover:text-[#244C3A] transition-colors">
                  Add Handcrafted Product
                </Link>
              </li>
              <li>
                <Link to="/artisan/pricing" className="hover:text-[#244C3A] transition-colors">
                  Pricing Breakdown Tool
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#B85C38] transition-colors">
                  Admin Moderation Portal
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-[#244C3A] transition-colors">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Platform Integrity & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B6A63]">
          <p className="text-center md:text-left">
            © 2026 <strong>ArtisanAR/VR — Gaon to Growth</strong>. Created with care for Odisha traditional craftsmanship.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Transparent Pricing</span>
            <span>Verified Moderation</span>
            <span className="flex items-center gap-1">
              Made for Rural Craft with <Heart className="w-3 h-3 text-[#B85C38] fill-[#B85C38]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
