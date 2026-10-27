import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Lock,
  ChevronRight,
  ArrowLeft
} from 'lucide-react'
import { useCartWishlist } from '../context/CartWishlistContext'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { cart, cartSubtotal, cartShipping, cartTotal, clearCart } = useCartWishlist()

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98200 12345',
    street: 'Plot 402, Saheed Nagar, Near Durga Mandap',
    city: 'Bhubaneswar',
    district: 'Khordha',
    state: 'Odisha',
    postalCode: '751007',
    paymentMethod: 'upi-demo'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required'
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required'
    if (!formData.phone.trim()) errs.phone = 'Phone number is required'
    if (!formData.street.trim()) errs.street = 'Street address is required'
    if (!formData.city.trim()) errs.city = 'City / Town is required'
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      // Generate demo order ID
      const demoOrderId = `ORD-OD-${Math.floor(10000 + Math.random() * 90000)}`
      clearCart()
      setIsSubmitting(false)
      navigate(`/order-confirmation/${demoOrderId}`)
    }, 800)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E5DED3]">
          <h2 className="font-serif text-xl font-bold text-[#244C3A] mb-2">No Items in Cart</h2>
          <p className="text-xs text-[#6B6A63] mb-4">Please add a handcrafted work before proceeding to checkout.</p>
          <Link to="/marketplace" className="inline-block bg-[#B85C38] text-white px-5 py-2.5 rounded-lg text-xs font-semibold">
            Explore Marketplace
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6A63] mb-4">
          <Link to="/cart" className="hover:text-[#B85C38] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#252722] font-medium">Demo Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#244C3A] mb-2">
          Secure Direct Artisan Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6A63] mb-8">
          Complete your purchase with guaranteed artisan compensation and transparent pricing.
        </p>

        {/* Secure Guarantee Banner */}
        <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
          <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">Encrypted & Direct Artisan Settlement:</strong>
            100% of fair artisan labour and material earnings are directly allocated to verified Odisha craft societies without intermediaries.
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 cols: Form Inputs */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer Contact */}
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif font-bold text-base text-[#244C3A] mb-4">
                  1. Customer Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 bg-[#FAF8F5] border rounded-lg text-xs text-[#252722] focus:outline-hidden focus:border-[#B85C38] ${
                        errors.fullName ? 'border-red-500' : 'border-[#E5DED3]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Email Address (for Demo Receipt) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 bg-[#FAF8F5] border rounded-lg text-xs text-[#252722] focus:outline-hidden focus:border-[#B85C38] ${
                        errors.email ? 'border-red-500' : 'border-[#E5DED3]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Mobile Number (for Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 bg-[#FAF8F5] border rounded-lg text-xs text-[#252722] focus:outline-hidden focus:border-[#B85C38] ${
                        errors.phone ? 'border-red-500' : 'border-[#E5DED3]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif font-bold text-base text-[#244C3A] mb-4">
                  2. Shipping Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`w-full p-2.5 bg-[#FAF8F5] border rounded-lg text-xs text-[#252722] focus:outline-hidden focus:border-[#B85C38] ${
                        errors.street ? 'border-red-500' : 'border-[#E5DED3]'
                      }`}
                    />
                    {errors.street && <p className="text-[11px] text-red-600 mt-1">{errors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs text-[#252722]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs text-[#252722]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs text-[#252722]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252722] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs text-[#252722]"
                    />
                  </div>
                </div>
              </div>

              {/* Demo Payment Method Selection */}
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs">
                <h3 className="font-serif font-bold text-base text-[#244C3A] mb-4">
                  3. Select Demo Payment Method
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      id: 'upi-demo',
                      title: 'UPI Instant Pay (GPay / PhonePe / BHIM)',
                      desc: 'Instant direct confirmation with secure bank UPI.'
                    },
                    {
                      id: 'cod-demo',
                      title: 'Cash on Delivery (COD)',
                      desc: 'Pay upon doorstep arrival from rural courier.'
                    },
                    {
                      id: 'card-demo',
                      title: 'Credit / Debit Card (Visa, MasterCard, RuPay)',
                      desc: '256-bit encrypted card authorization.'
                    }
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        formData.paymentMethod === pm.id
                          ? 'border-[#B85C38] bg-[#FAF8F5]'
                          : 'border-[#E5DED3] hover:border-[#78816A]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={formData.paymentMethod === pm.id}
                        onChange={handleInputChange}
                        className="mt-1 text-[#B85C38] focus:ring-0"
                      />
                      <div>
                        <strong className="text-xs font-bold text-[#244C3A] block">{pm.title}</strong>
                        <span className="text-[11px] text-[#6B6A63]">{pm.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 cols: Order Summary & Place Button */}
            <div className="lg:col-span-4 bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-5 sticky top-28">
              <h3 className="font-serif font-bold text-base text-[#244C3A] pb-3 border-b border-[#E5DED3]">
                Order Summary
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border border-[#E5DED3]"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-[#252722] truncate">{item.product.name}</h5>
                      <span className="text-[11px] text-[#6B6A63]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-[#244C3A]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E5DED3] space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6A63]">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#252722]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B6A63]">
                  <span>Rural Insured Delivery:</span>
                  <span className="font-semibold text-[#244C3A]">
                    {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E5DED3] flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#244C3A]">Total to Pay:</span>
                  <span className="font-serif font-bold text-2xl text-[#244C3A]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <span>Place Demo Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                )}
              </button>

              <div className="text-[11px] text-[#6B6A63] text-center pt-1">
                Transparent Pricing • 100% Direct Artisan Remuneration
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}
