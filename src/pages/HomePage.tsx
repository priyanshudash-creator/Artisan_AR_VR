import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Box,
  ShieldCheck,
  Sparkles,
  Layers,
  Heart,
  ChevronRight,
  Compass,
  CheckCircle2,
  Users
} from 'lucide-react'
import heroCraftImg from '../assets/hero-craft.jpg'
import { CRAFT_CATEGORIES, MOCK_PRODUCTS, MOCK_ARTISANS } from '../data/mockData'
import { ProductCard } from '../components/products/ProductCard'
import { ArtisanCard } from '../components/artisans/ArtisanCard'
import { PriceBreakdown } from '../components/pricing/PriceBreakdown'

export const HomePage: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4)
  const featuredArtisans = MOCK_ARTISANS.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* ======================================================== */}
      {/* PART 1 — LOVABLE REPLICATED HERO SECTION (SOURCE OF TRUTH) */}
      {/* ======================================================== */}
      <section className="relative artisan-grid border-b border-[#E5DED3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Content Column (Left-Aligned, Generous Whitespace) */}
          <div className="max-w-4xl">
            {/* Eyebrow Text */}
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C38] mb-4 md:mb-5">
              EXPERIENCE THE CRAFT, UNDERSTAND THE VALUE
            </p>

            {/* Main Headline (Playfair Display, Forest Green, 2 Lines on Desktop) */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#244C3A] leading-[1.12] tracking-tight mb-6 md:mb-7">
              Every Craft Has a Story.<br className="hidden sm:inline" />
              Every Story Has a Value.
            </h1>

            {/* Hero Description */}
            <p className="text-base sm:text-lg text-[#252722] leading-relaxed max-w-2xl font-normal mb-8 md:mb-9">
              Discover India's traditional craftsmanship through immersive 3D experiences, authentic artisan stories, and transparent product pricing — from Sambalpuri handloom to Pattachitra and Dhokra.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-12 md:mb-14">
              {/* Primary: Explore Crafts */}
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2.5 bg-[#B85C38] hover:bg-[#9E4928] text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <span>Explore Crafts</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </Link>

              {/* Secondary: Enter the 3D Showroom */}
              <Link
                to="/showroom"
                className="inline-flex items-center justify-center gap-2.5 bg-[#FAF8F5] hover:bg-white border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] font-medium text-sm sm:text-base px-6 py-3.5 rounded-lg transition-all"
              >
                <Box className="w-4 h-4 stroke-[2] text-[#244C3A]" />
                <span>Enter the 3D Showroom</span>
              </Link>
            </div>
          </div>

          {/* Large-Format Hero Craft Image (Sambalpuri Ikat + Terracotta Vessel) */}
          <div className="w-full mt-2">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#E5DED3] shadow-md bg-[#FAF8F5]">
              <img
                src={heroCraftImg}
                alt="Authentic Indian craft materials: Sambalpuri handloom ikat fabric draped alongside a terracotta water pot under natural sunlight"
                className="w-full h-auto aspect-16/9 sm:aspect-16/8 object-cover"
                loading="eager"
              />
              
              {/* Subtle corner badge for craft origin */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-lg border border-white/10 hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B85C38]" />
                <span>Sambalpuri Ikat & Terracotta • Odisha Craft Traditions</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 1. EXPLORE BY CRAFT CATEGORY */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B85C38] mb-2">
                HERITAGE OF ODISHA
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
                Explore by Craft Category
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#B85C38] hover:text-[#9E4928] flex items-center gap-1 group"
            >
              <span>View All 8 Traditional Clusters</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CRAFT_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${encodeURIComponent(cat.id)}`}
                className="group relative bg-white border border-[#E5DED3] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#B85C38]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-medium">
                    Explore Collection →
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#244C3A] group-hover:text-[#B85C38] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6B6A63] line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FEATURED HANDCRAFTED PRODUCTS */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B85C38] mb-2">
                AUTHENTIC MASTERWORKS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
                Featured Handcrafted Works
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#B85C38] hover:text-[#9E4928] flex items-center gap-1 group"
            >
              <span>Browse All Marketplace Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ENTER THE 3D SHOWROOM PROMOTION */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#244C3A] text-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#E8DCCB] text-xs font-medium border border-white/15">
                <Box className="w-3.5 h-3.5 text-[#B85C38]" />
                Virtual Heritage Gallery
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Inspect Every Weave & Chisel in Full 3D
              </h2>

              <p className="text-sm sm:text-base text-[#E8DCCB] leading-relaxed">
                Step into our 3D showroom to examine the intricate lost-wax metal coils of Koraput Dhokra, the microscopic hair-drawn silver filigree of Cuttack, and the natural mineral pigments of Raghurajpur scrolls before you purchase.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-white/15 bg-white/5 rounded-xl p-4">
                  <span className="font-serif text-2xl font-bold text-white block">360°</span>
                  <span className="text-xs text-[#E8DCCB]">Interactive Orbit & Zoom Inspection</span>
                </div>
                <div className="border border-white/15 bg-white/5 rounded-xl p-4">
                  <span className="font-serif text-2xl font-bold text-white block">100%</span>
                  <span className="text-xs text-[#E8DCCB]">Honest Craft Texture Fidelity</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/showroom"
                  className="inline-flex items-center gap-2 bg-[#B85C38] hover:bg-[#9E4928] text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-all"
                >
                  <Box className="w-4 h-4" />
                  <span>Launch 3D Digital Showroom</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 p-4">
                <img
                  src={heroCraftImg}
                  alt="3D Showroom Preview"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 rounded-xl pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#E8DCCB] block">Interactive Replica</span>
                    <h4 className="text-white font-serif font-bold text-sm">Sambalpuri Bomkai Handloom</h4>
                  </div>
                  <Link
                    to="/showroom"
                    className="px-3 py-1.5 rounded bg-[#B85C38] text-white text-xs font-medium"
                  >
                    Rotate & View 3D
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. DISCOVER THE CRAFT PROCESS */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B85C38] mb-2">
              SLOW HANDMADE TRADITIONS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
              Discover the Authentic Craft Process
            </h2>
            <p className="text-sm text-[#6B6A63] mt-3">
              True Indian craftsmanship cannot be rushed. Explore the stages required to bring raw forest and earth materials into timeless art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Sacred Raw Materials',
                desc: 'Alluvial river clay, wild forest beeswax, natural indigo, mulberry silk cocoons, and hallmarked silver.',
                icon: Layers
              },
              {
                step: '02',
                title: 'Hereditary Technique',
                desc: 'Centuries-old techniques handed down through generations of guild families in Odisha villages.',
                icon: Users
              },
              {
                step: '03',
                title: 'Manual Devotion',
                desc: 'From 3 weeks on a wooden pit-loom to 80 hours of gossamer silver wire drawing by hand.',
                icon: Heart
              },
              {
                step: '04',
                title: 'Digital Craft Passport',
                desc: 'Every completed product receives an illustrative pricing breakdown and provenance story.',
                icon: ShieldCheck
              }
            ].map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E5DED3] rounded-xl p-6 relative hover:border-[#78816A] transition-all"
                >
                  <span className="font-serif text-3xl font-bold text-[#E8DCCB] absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] flex items-center justify-center text-[#B85C38] mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#244C3A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B6A63] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/craft-stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B85C38] hover:text-[#9E4928]"
            >
              <span>Explore Detailed Manufacturing Timelines & Videos</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TRANSPARENT PRICING DEMONSTRATION */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B85C38]">
                GAON TO GROWTH PHILOSOPHY
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A] leading-tight">
                Understand Exactly Where Your Money Goes
              </h2>
              <p className="text-sm text-[#6B6A63] leading-relaxed">
                Industrial mass-production hides exploitative margins. ArtisanAR/VR champions transparent pricing by detailing raw materials, artisan wages, studio overheads, and logistics.
              </p>

              <ul className="space-y-3 pt-2 text-xs text-[#252722]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244C3A] shrink-0" />
                  <span>Fair wages calculated directly from artisan hours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244C3A] shrink-0" />
                  <span>Eco-friendly packaging and insured transit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#244C3A] shrink-0" />
                  <span>Community margin reinvested in artisan village funds</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <PriceBreakdown
                data={MOCK_PRODUCTS[0].priceBreakdown}
                sellingPrice={MOCK_PRODUCTS[0].price}
                productName={MOCK_PRODUCTS[0].name}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. MEET THE ARTISANS */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-b border-[#E5DED3] bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B85C38] mb-2">
                THE HANDS BEHIND THE CRAFT
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
                Meet Master Artisans of Odisha
              </h2>
            </div>
            <Link
              to="/artisans"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#B85C38] hover:text-[#9E4928] flex items-center gap-1 group"
            >
              <span>Explore All Verified Village Profiles</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. HOW ARTISAN AR/VR WORKS */}
      {/* ======================================================== */}
      <section className="py-16 md:py-20 border-b border-[#E5DED3] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
              How ArtisanAR/VR Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6A63] mt-2">
              From remote rural villages to conscious urban homes across the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5">
              <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#244C3A] font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-serif font-bold text-base text-[#244C3A] mb-1">Discover & Inspect</h4>
              <p className="text-xs text-[#6B6A63]">
                Browse authentic craft collections and inspect details in 360° 3D preview.
              </p>
            </div>

            <div className="p-5">
              <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#244C3A] font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-serif font-bold text-base text-[#244C3A] mb-1">Understand the Value</h4>
              <p className="text-xs text-[#6B6A63]">
                Review the transparent cost components and see how the artisan is compensated.
              </p>
            </div>

            <div className="p-5">
              <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#244C3A] font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-serif font-bold text-base text-[#244C3A] mb-1">Support Rural Artisans</h4>
              <p className="text-xs text-[#6B6A63]">
                Direct order flow ensures money reaches rural weavers and sculptors directly.
              </p>
            </div>

            <div className="p-5">
              <div className="w-12 h-12 rounded-full bg-[#E8DCCB] text-[#244C3A] font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h4 className="font-serif font-bold text-base text-[#244C3A] mb-1">Receive Craft Passport</h4>
              <p className="text-xs text-[#6B6A63]">
                Every handcrafted heirloom includes a digital provenance certificate and care guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. BECOME AN ARTISAN CTA */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 bg-[#F8F5EF] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B85C38]">
            JOIN OUR GAON TO GROWTH COMMUNITY
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#244C3A]">
            Your Craft Deserves a Wider World.
          </h2>

          <p className="text-base sm:text-lg text-[#6B6A63] max-w-2xl mx-auto leading-relaxed">
            Bring your craftsmanship to a wider audience. Share your story, showcase your products, and help customers discover the people and traditions behind every creation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/become-an-artisan"
              className="w-full sm:w-auto bg-[#B85C38] hover:bg-[#9E4928] text-white text-base font-semibold px-8 py-3.5 rounded-lg shadow-sm transition-all"
            >
              Become an Artisan
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto bg-white border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] text-base font-medium px-8 py-3.5 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
