import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Box,
  Compass,
  BookOpen,
  Users,
  Scale,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { useCartWishlist } from '../../context/CartWishlistContext'
import { MOCK_PRODUCTS } from '../../data/mockData'
import logoImg from '../../assets/logo.jpg'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount, wishlistCount, compareCount } = useCartWishlist()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchModalOpen(false)
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F5EF] border-b border-[#E5DED3] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark & Konark Wheel Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group py-1"
            aria-label="ArtisanAR/VR — Gaon to Growth Homepage"
          >
            <img
              src={logoImg}
              alt="ArtisanAR/VR Konark Wheel Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-xs border border-[#B85C38]/30 group-hover:rotate-12 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <div className="flex items-baseline tracking-tight">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A] tracking-tight group-hover:opacity-90 transition-opacity">
                  Artisan
                </span>
                <span className="font-sans text-2xl sm:text-3xl font-bold text-[#B85C38] ml-0.5 tracking-tight">
                  AR/VR
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] text-[#6B6A63] uppercase -mt-0.5 group-hover:text-[#252722] transition-colors">
                GAON TO GROWTH
              </span>
            </div>
          </Link>

          {/* Utility Controls & CTA (Right Side) */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
            {/* Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#252722] hover:text-[#B85C38] transition-colors rounded-full hover:bg-[#E5DED3]/40"
              aria-label="Search crafts and artisans"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Wishlist Heart Icon */}
            <Link
              to="/account/wishlist"
              className="p-2 text-[#252722] hover:text-[#B85C38] transition-colors rounded-full hover:bg-[#E5DED3]/40 relative"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B85C38] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              to="/cart"
              className="p-2 text-[#252722] hover:text-[#B85C38] transition-colors rounded-full hover:bg-[#E5DED3]/40 relative"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#244C3A] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <Link
              to="/account"
              className="p-2 text-[#252722] hover:text-[#B85C38] transition-colors rounded-full hover:bg-[#E5DED3]/40 hidden sm:flex"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </Link>

            {/* Terracotta "Become an Artisan" Button */}
            <Link
              to="/become-an-artisan"
              className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-md shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Become an Artisan</span>
            </Link>

            {/* Hamburger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#252722] hover:text-[#B85C38] transition-colors rounded-full hover:bg-[#E5DED3]/40"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

        </div>
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fadeIn">
          <div className="bg-[#F8F5EF] border border-[#E5DED3] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-[#E5DED3] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#B85C38] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Odisha crafts (e.g. Sambalpuri, Pattachitra, Dhokra, Silver filigree)..."
                className="w-full bg-transparent text-base text-[#252722] focus:outline-hidden placeholder:text-[#6B6A63]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-[#6B6A63] hover:text-[#252722]"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6A63] mb-3">
                    Popular Craft Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Sambalpuri Handloom',
                      'Pattachitra Painting',
                      'Dhokra Metal Craft',
                      'Silver Filigree',
                      'Pipili Appliqué',
                      'Stone Carving',
                      'Puri',
                      'Sambalpur'
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchModalOpen(false)
                          navigate(`/marketplace?search=${encodeURIComponent(term)}`)
                        }}
                        className="px-3 py-1.5 bg-white border border-[#E5DED3] rounded-full text-xs text-[#252722] hover:border-[#B85C38] hover:text-[#B85C38] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-[#6B6A63] mb-2">
                    Found {searchResults.length} matching handcrafted products:
                  </p>
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSearchModalOpen(false)
                        navigate(`/products/${prod.slug}`)
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer border border-transparent hover:border-[#E5DED3] transition-all"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded object-cover border border-[#E5DED3]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[#244C3A] truncate">{prod.name}</h4>
                        <p className="text-xs text-[#6B6A63]">{prod.categoryId} • {prod.district}</p>
                      </div>
                      <span className="font-serif font-bold text-sm text-[#252722]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-[#6B6A63]">
                  No crafts found matching "{searchQuery}". Try searching for Sambalpuri, Dhokra, or Puri.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={closeMenu}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F8F5EF] border-l border-[#E5DED3] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-[#E5DED3]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={logoImg}
                      alt="ArtisanAR/VR Logo"
                      className="w-8 h-8 rounded-full object-cover border border-[#B85C38]/30"
                    />
                    <div className="flex items-baseline">
                      <span className="font-serif text-xl font-bold text-[#244C3A]">Artisan</span>
                      <span className="font-sans text-xl font-bold text-[#B85C38] ml-0.5">AR/VR</span>
                    </div>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-[#6B6A63] hover:text-[#252722] rounded-full hover:bg-[#E5DED3]/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Craft Navigation */}
                <div className="py-5 border-b border-[#E5DED3]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A63] block mb-3">
                    Craft Discovery
                  </span>
                  <nav className="space-y-1">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#B85C38]" /> Homepage
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>

                    <Link
                      to="/marketplace"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/marketplace' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-[#B85C38]" /> Craft Marketplace
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>

                    <Link
                      to="/showroom"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/showroom' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Box className="w-4 h-4 text-[#B85C38]" /> 3D Digital Showroom
                      </span>
                      <span className="text-[10px] bg-[#E8DCCB] text-[#244C3A] px-1.5 py-0.5 rounded font-semibold">
                        Interactive
                      </span>
                    </Link>

                    <Link
                      to="/craft-stories"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/craft-stories' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-[#B85C38]" /> Craft Stories & Processes
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>

                    <Link
                      to="/artisans"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/artisans' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-[#B85C38]" /> Meet the Artisans
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>

                    <Link
                      to="/compare"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/compare' ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Scale className="w-4 h-4 text-[#B85C38]" /> Product Comparison
                      </span>
                      {compareCount > 0 && (
                        <span className="text-[11px] bg-[#B85C38] text-white px-1.5 py-0.2 rounded-full">
                          {compareCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/passport/prod-001"
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname.startsWith('/passport') ? 'bg-[#244C3A] text-white' : 'text-[#252722] hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-[#B85C38]" /> Digital Craft Passport
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>

                    <Link
                      to="/about"
                      onClick={closeMenu}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#252722] hover:bg-white"
                    >
                      <span>About Gaon to Growth</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  </nav>
                </div>

                {/* Customer Section */}
                <div className="py-4 border-b border-[#E5DED3]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A63] block mb-2">
                    Customer Experience
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      to="/cart"
                      onClick={closeMenu}
                      className="p-2.5 bg-white border border-[#E5DED3] rounded-lg hover:border-[#B85C38] flex items-center justify-between"
                    >
                      <span>Shopping Cart</span>
                      <span className="font-bold text-[#244C3A]">{cartCount}</span>
                    </Link>
                    <Link
                      to="/account/wishlist"
                      onClick={closeMenu}
                      className="p-2.5 bg-white border border-[#E5DED3] rounded-lg hover:border-[#B85C38] flex items-center justify-between"
                    >
                      <span>Wishlist</span>
                      <span className="font-bold text-[#B85C38]">{wishlistCount}</span>
                    </Link>
                    <Link
                      to="/account/orders"
                      onClick={closeMenu}
                      className="p-2.5 bg-white border border-[#E5DED3] rounded-lg hover:border-[#B85C38] col-span-2 flex items-center justify-between"
                    >
                      <span>My Orders & Tracking</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#6B6A63]" />
                    </Link>
                  </div>
                </div>

                {/* Platform Portals (Artisan & Admin) */}
                <div className="py-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A63] block mb-2">
                    Platform Dashboards
                  </span>
                  <div className="space-y-2">
                    <Link
                      to="/artisan/dashboard"
                      onClick={closeMenu}
                      className="block p-3 bg-white border border-[#E5DED3] rounded-lg hover:border-[#244C3A] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#244C3A]">Artisan Studio Portal</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#6B6A63]" />
                      </div>
                      <p className="text-[11px] text-[#6B6A63] mt-0.5">
                        Manage products, inventory, verification & pricing tool
                      </p>
                    </Link>

                    <Link
                      to="/admin/login"
                      onClick={closeMenu}
                      className="block p-3 bg-white border border-[#E5DED3] rounded-lg hover:border-[#B85C38] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#B85C38]">Admin Moderation Portal</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#6B6A63]" />
                      </div>
                      <p className="text-[11px] text-[#6B6A63] mt-0.5">
                        Secure login, review artisan applications & curation
                      </p>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Drawer Footer CTA */}
              <div className="pt-4 border-t border-[#E5DED3]">
                <Link
                  to="/become-an-artisan"
                  onClick={closeMenu}
                  className="w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Become an Artisan Today</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-[#6B6A63] mt-2">
                  ArtisanAR/VR • Gaon to Growth • Odisha Heritage
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
