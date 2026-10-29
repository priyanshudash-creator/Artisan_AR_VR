import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  Trash2,
  ShoppingCart,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Edit3,
  Save,
  X,
  Sparkles,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react'
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../data/mockData'
import { ODISHA_ARTIFACTS, ALL_30_ODISHA_DISTRICTS } from '../data/odishaArtifactsData'
import { artifactToProduct } from '../utils/artifactAdapter'
import { useCartWishlist } from '../context/CartWishlistContext'
import { Order, Product } from '../types'
import { getUserSession, saveUserSession, clearUserSession, getInitials, UserProfile } from '../utils/userAuth'

// Complete catalog lookup across both featured items and 300 marketplace artifacts
const allCatalogProducts: Product[] = [
  ...MOCK_PRODUCTS,
  ...ODISHA_ARTIFACTS.map(artifactToProduct)
]

export const AccountPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { wishlist, toggleWishlist, addToCart, showToast } = useCartWishlist()

  // Dynamic user session
  const [user, setUser] = useState<UserProfile | null>(() => getUserSession())
  const [isEditing, setIsEditing] = useState(false)

  // Edit form states
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editStreet, setEditStreet] = useState('')
  const [editCity, setEditCity] = useState('')
  const [editDistrict, setEditDistrict] = useState('')
  const [editPostalCode, setEditPostalCode] = useState('')
  const [editCraftAffinity, setEditCraftAffinity] = useState<string[]>([])

  // Listen to auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getUserSession())
    }
    window.addEventListener('shilpa_auth_change', handleAuthChange)
    return () => window.removeEventListener('shilpa_auth_change', handleAuthChange)
  }, [])

  // Populate edit fields when edit mode opened
  const handleOpenEdit = () => {
    if (!user) return
    setEditName(user.fullName)
    setEditEmail(user.email)
    setEditPhone(user.phone)
    setEditStreet(user.street || '')
    setEditCity(user.city || '')
    setEditDistrict(user.district || '')
    setEditPostalCode(user.postalCode || '')
    setEditCraftAffinity(user.craftAffinity || [])
    setIsEditing(true)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editName.trim()) {
      showToast('Please enter your full name.')
      return
    }

    const updated = saveUserSession({
      fullName: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      street: editStreet.trim(),
      city: editCity.trim(),
      district: editDistrict.trim(),
      postalCode: editPostalCode.trim(),
      craftAffinity: editCraftAffinity
    })

    setUser(updated)
    setIsEditing(false)
    showToast('Your profile details have been updated successfully.')
  }

  const handleSignOut = () => {
    clearUserSession()
    setUser(null)
    showToast('You have signed out of your account.')
    navigate('/login')
  }

  // Determine active tab from URL path
  const getInitialTab = () => {
    if (location.pathname.includes('/orders')) return 'orders'
    if (location.pathname.includes('/wishlist')) return 'wishlist'
    return 'profile'
  }

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>(getInitialTab())
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const wishlistedProducts = wishlist
    .map((id) => allCatalogProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))

  // If NOT logged in, show clean Login/Registration prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-12 sm:py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#244C3A]/10 border border-[#244C3A]/20 text-[#244C3A] flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#244C3A]" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B85C38] block mb-1">
            SHILPA SETU PATRON PORTAL
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#244C3A] mb-3">
            Sign In to View Your Profile
          </h1>
          <p className="text-xs text-[#6B6A63] leading-relaxed mb-8 max-w-sm mx-auto">
            You are not signed in yet. Please log in or create an account to view your personalized profile, shipping addresses, and craft orders.
          </p>

          <div className="space-y-3">
            <Link
              to="/login?redirect=/account"
              className="w-full bg-[#244C3A] hover:bg-[#1D3D2F] text-white py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4 text-[#B85C38]" />
            </Link>

            <Link
              to="/signup?redirect=/account"
              className="w-full bg-white hover:bg-[#FAF8F5] border border-[#B85C38] text-[#B85C38] py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <span>Create New Patron Account</span>
            </Link>

            <Link
              to="/marketplace"
              className="inline-block text-xs text-[#6B6A63] hover:text-[#252722] pt-3"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header with Real User Info */}
        <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#244C3A] text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs border-2 border-[#E5DED3]">
              {getInitials(user.fullName)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl font-bold text-[#244C3A]">
                  {user.fullName}
                </h1>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                  Verified Patron
                </span>
              </div>
              <p className="text-xs text-[#6B6A63] mt-0.5">
                {user.email} • {user.phone || '+91 Registered'} • Patron of Odisha Craft Heritage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <button
              onClick={handleOpenEdit}
              className="bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#B85C38]" />
              <span>Edit Profile</span>
            </button>

            <Link
              to="/marketplace"
              className="bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] px-3.5 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Catalog
            </Link>

            <button
              onClick={handleSignOut}
              className="border border-red-200 hover:bg-red-50 text-red-700 px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DED3] mb-8 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#B85C38] text-[#B85C38]'
                : 'border-transparent text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#B85C38] text-[#B85C38]'
                : 'border-transparent text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({MOCK_ORDERS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-[#B85C38] text-[#B85C38]'
                : 'border-transparent text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* Tab 1: Profile & Addresses */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Personal Profile Details (Reflecting Exact User Input) */}
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#244C3A]">
                  Personal Profile
                </h3>
                <button
                  onClick={handleOpenEdit}
                  className="text-xs text-[#B85C38] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Update</span>
                </button>
              </div>

              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-[#6B6A63]">Full Name:</dt>
                  <dd className="font-semibold text-[#252722] text-sm mt-0.5">
                    {user.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Email:</dt>
                  <dd className="font-medium text-[#252722] mt-0.5">
                    {user.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Phone:</dt>
                  <dd className="font-medium text-[#252722] mt-0.5">
                    {user.phone || 'Not provided'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Craft Affinity:</dt>
                  <dd className="font-medium text-[#244C3A] mt-0.5">
                    {user.craftAffinity && user.craftAffinity.length > 0
                      ? user.craftAffinity.join(', ')
                      : 'Odisha Traditional Handloom & Sculptures'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Patron Member Since:</dt>
                  <dd className="font-medium text-[#6B6A63] mt-0.5">
                    {user.joinedDate}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Primary Delivery Address (Reflecting Exact User Input) */}
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#244C3A]">
                  Primary Delivery Address
                </h3>
                <button
                  onClick={handleOpenEdit}
                  className="text-xs text-[#B85C38] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Change</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] text-xs text-[#252722] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#244C3A]">
                  <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Patron Delivery Residence</span>
                </div>
                <p className="font-medium text-[#252722]">
                  {user.street || 'Address details not set yet'}
                </p>
                <p className="text-[#6B6A63]">
                  {user.city ? `${user.city}, ` : ''}{user.district ? `${user.district} District` : 'Odisha'}
                </p>
                <p className="text-[#6B6A63]">
                  Odisha, India {user.postalCode ? `— PIN ${user.postalCode}` : ''}
                </p>
              </div>

              <div className="p-3 bg-[#244C3A]/5 border border-[#244C3A]/15 rounded-xl text-[11px] text-[#244C3A]">
                <strong>Direct Rural Delivery:</strong> Verified orders are packaged and dispatched directly from the respective artisan district workshop in Odisha.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#244C3A]">{order.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {order.status}
                    </span>
                    <span className="text-xs text-[#6B6A63]">{order.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <img
                          src={item.productImage}
                          alt=""
                          className="w-10 h-10 rounded object-cover border border-[#E5DED3]"
                        />
                        <div>
                          <strong className="text-[#252722] block line-clamp-1">{item.productName}</strong>
                          <span className="text-[11px] text-[#6B6A63]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#E5DED3]">
                  <div>
                    <span className="text-[11px] text-[#6B6A63] block">Order Total:</span>
                    <span className="font-serif font-bold text-lg text-[#244C3A]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#B85C38] text-[#B85C38] px-3.5 py-1.5 rounded-md font-semibold cursor-pointer"
                  >
                    Track Order & Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-12 text-center">
                <Heart className="w-12 h-12 text-[#6B6A63] mx-auto mb-3 stroke-[1.2]" />
                <h3 className="font-serif font-bold text-lg text-[#244C3A] mb-1">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#6B6A63] max-w-sm mx-auto mb-6">
                  Explore authentic Odisha creations in the marketplace and save pieces to follow their artisan provenance.
                </p>
                <Link
                  to="/marketplace"
                  className="bg-[#244C3A] hover:bg-[#1D3D2F] text-white px-5 py-2.5 rounded-xl text-xs font-semibold inline-block transition-colors"
                >
                  Explore Odisha Masterpieces
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E5DED3] rounded-2xl p-4 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#FAF8F5] mb-3 relative group">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 text-red-600 rounded-full shadow-xs transition-colors cursor-pointer"
                          title="Remove from wishlist"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38]">
                          {product.categoryId}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#244C3A] line-clamp-1 mb-1">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#244C3A]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E5DED3] mt-3 flex items-center justify-between gap-2">
                      <Link
                        to={product.id.startsWith('odisha-art-') ? `/marketplace?artifact=${product.id}` : `/products/${product.slug}`}
                        className="text-xs font-semibold text-[#244C3A] hover:text-[#B85C38]"
                      >
                        View Craft Story →
                      </Link>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex items-center gap-1 bg-[#B85C38] hover:bg-[#9E4928] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5DED3] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DED3] mb-5">
              <h3 className="font-serif font-bold text-lg text-[#244C3A] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#B85C38]" />
                <span>Update Your Profile Details</span>
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[#6B6A63] hover:text-[#252722] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252722] mb-1">
                  Delivery Street Address
                </label>
                <input
                  type="text"
                  value={editStreet}
                  onChange={(e) => setEditStreet(e.target.value)}
                  placeholder="Plot/Flat, Street name, Landmark"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] focus:bg-white focus:border-[#244C3A] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    District
                  </label>
                  <select
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full px-2 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] outline-none"
                  >
                    <option value="">Select...</option>
                    {ALL_30_ODISHA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#252722] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={editPostalCode}
                    onChange={(e) => setEditPostalCode(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs text-[#252722] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5DED3]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#E5DED3] rounded-xl text-xs font-semibold text-[#6B6A63] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#244C3A] hover:bg-[#1D3D2F] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5DED3] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DED3] mb-4">
              <h3 className="font-serif font-bold text-base text-[#244C3A]">
                Order Details: {selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#6B6A63] hover:text-[#252722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <p><strong>Tracking Status:</strong> <span className="text-emerald-700 font-bold">{selectedOrder.status}</span></p>
              <p><strong>Order Placed:</strong> {selectedOrder.createdAt}</p>
              <p><strong>Delivery Address:</strong> {user.street || selectedOrder.shippingAddress.street}, {user.city || selectedOrder.shippingAddress.city}, {user.district || selectedOrder.shippingAddress.district}</p>
              <p><strong>Total Value:</strong> ₹{selectedOrder.total.toLocaleString('en-IN')}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E5DED3] text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-[#244C3A] text-white px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
