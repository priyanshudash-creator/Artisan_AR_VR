import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react'
import { useCartWishlist } from '../context/CartWishlistContext'

export const CartPage: React.FC = () => {
  const navigate = useNavigate()
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartShipping,
    cartTotal
  } = useCartWishlist()

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6A63] mb-4">
          <Link to="/" className="hover:text-[#B85C38]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/marketplace" className="hover:text-[#B85C38]">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#252722] font-medium">Shopping Cart</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
              Your Craft Bag
            </h1>
            <p className="text-sm text-[#6B6A63] mt-1">
              Direct from master artisan looms and studios in Odisha.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#B85C38] hover:underline font-semibold self-start sm:self-auto"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white border border-[#E5DED3] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#E5DED3] shrink-0 bg-[#FAF8F5]"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38]">
                        {item.product.categoryId}
                      </span>
                      <Link to={`/products/${item.product.slug}`}>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#244C3A] hover:text-[#B85C38] transition-colors truncate">
                          {item.product.name}
                        </h3>
                      </Link>
                      <span className="text-xs text-[#6B6A63] block mt-0.5">
                        Origin: {item.product.locality}, {item.product.district}
                      </span>
                      <span className="font-serif font-bold text-sm text-[#252722] mt-1 block">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5DED3]">
                    <div className="flex items-center border border-[#E5DED3] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#E5DED3]/60 rounded-l-lg text-[#252722]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#252722]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-[#E5DED3]/60 rounded-r-lg text-[#252722]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-serif font-bold text-base text-[#244C3A]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-[#6B6A63] hover:text-red-700 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between">
                <Link
                  to="/marketplace"
                  className="text-xs font-semibold text-[#244C3A] hover:text-[#B85C38] flex items-center gap-1"
                >
                  ← Continue Shopping for Crafts
                </Link>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-4 bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-5">
              <h3 className="font-serif font-bold text-lg text-[#244C3A] pb-3 border-b border-[#E5DED3]">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B6A63]">Subtotal ({cart.length} unique crafts):</span>
                  <span className="font-semibold text-[#252722]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B6A63]">Rural Insured Transit:</span>
                  <span className="font-semibold text-[#244C3A]">
                    {cartShipping === 0 ? 'FREE (Above ₹1,500)' : `₹${cartShipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B6A63]">Artisan Preservation Cess:</span>
                  <span className="font-semibold text-[#252722]">Included</span>
                </div>

                <div className="pt-3 border-t border-[#E5DED3] flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#244C3A]">Estimated Total:</span>
                  <span className="font-serif font-bold text-2xl text-[#244C3A]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-[11px] text-[#6B6A63] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" />
                <span>
                  All orders are processed with transparent cost reporting and illustrative breakdowns.
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-[#E5DED3] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E5DED3] text-[#244C3A] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#244C3A] mb-2">
              Your Craft Bag is Empty
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6A63] leading-relaxed mb-6">
              Explore our curated collections of authentic Sambalpuri silk, Pattachitra scrolls, and Dhokra metalwork from master rural artisans.
            </p>
            <Link
              to="/marketplace"
              className="inline-block bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explore Craft Marketplace
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
