import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  ShieldCheck
} from 'lucide-react'
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../data/mockData'
import { useCartWishlist } from '../context/CartWishlistContext'
import { Order } from '../types'

export const AccountPage: React.FC = () => {
  const location = useLocation()
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist()

  // Determine active tab from URL path
  const getInitialTab = () => {
    if (location.pathname.includes('/orders')) return 'orders'
    if (location.pathname.includes('/wishlist')) return 'wishlist'
    return 'profile'
  }

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>(getInitialTab())
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const wishlistedProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id))

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#244C3A] text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#244C3A]">
                  Aarav Sharma
                </h1>
                <span className="text-[10px] bg-[#E8DCCB] text-[#244C3A] px-2 py-0.5 rounded-full font-bold">
                  Demo Patron
                </span>
              </div>
              <p className="text-xs text-[#6B6A63] mt-0.5">
                aarav.sharma@example.com • Patron of Odisha Craft Heritage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/marketplace"
              className="bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#244C3A] text-[#244C3A] px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DED3] mb-8 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
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
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
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
            className={`pb-3 transition-colors flex items-center gap-2 border-b-2 -mb-px ${
              activeTab === 'wishlist'
                ? 'border-[#B85C38] text-[#B85C38]'
                : 'border-transparent text-[#6B6A63] hover:text-[#252722]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </button>
        </div>

        {/* Tab 1: Profile & Addresses */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#244C3A]">
                Personal Profile
              </h3>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-[#6B6A63]">Full Name:</dt>
                  <dd className="font-medium text-[#252722] mt-0.5">Aarav Sharma</dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Email:</dt>
                  <dd className="font-medium text-[#252722] mt-0.5">aarav.sharma@example.com</dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Phone:</dt>
                  <dd className="font-medium text-[#252722] mt-0.5">+91 98200 12345</dd>
                </div>
                <div>
                  <dt className="text-[#6B6A63]">Craft Affinity:</dt>
                  <dd className="font-medium text-[#244C3A] mt-0.5">Sambalpuri Silk, Cuttack Tarakasi, Dhokra Metal</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#244C3A]">
                Primary Delivery Address
              </h3>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] text-xs text-[#252722] space-y-1">
                <span className="font-semibold block text-[#244C3A]">Home Residence</span>
                <p>Plot 402, Lotus Residency, Saheed Nagar</p>
                <p>Near Durga Mandap, Bhubaneswar</p>
                <p>Khordha District, Odisha — 751007</p>
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
                    className="text-xs bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#B85C38] text-[#B85C38] px-3.5 py-1.5 rounded-md font-semibold"
                  >
                    Track Order & Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Wishlist Grid */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-xs p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-4/3 rounded-xl overflow-hidden mb-3 bg-[#FAF8F5]">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38]">
                        {product.categoryId}
                      </span>
                      <Link to={`/products/${product.slug}`}>
                        <h4 className="font-serif font-bold text-base text-[#244C3A] hover:text-[#B85C38] line-clamp-1 mt-0.5">
                          {product.name}
                        </h4>
                      </Link>
                      <span className="font-serif font-bold text-base text-[#252722] block mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E5DED3]">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 bg-[#B85C38] hover:bg-[#9E4928] text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 border border-[#E5DED3] rounded-lg text-[#6B6A63] hover:text-red-600"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-12 text-center max-w-md mx-auto">
                <Heart className="w-10 h-10 text-[#6B6A63] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#244C3A] mb-1">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#6B6A63] mb-4">Save your favourite handcrafted works while exploring.</p>
                <Link to="/marketplace" className="inline-block bg-[#B85C38] text-white px-5 py-2.5 rounded-lg text-xs font-semibold">
                  Browse Crafts
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5DED3] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DED3]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Order Details ({selectedOrder.id})
                </h3>
                <span className="text-xs text-[#6B6A63]">Placed on {selectedOrder.createdAt}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs text-[#6B6A63] hover:text-[#252722] font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#244C3A] block">Live Tracking Timeline:</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Authenticated with Master Loom</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Eco-Craft Packaging & Quality Audit Completed</span>
                </div>
                <div className="flex items-center gap-2 text-[#B85C38] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Dispatched via Rural Insured Transit (In Transit)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] text-xs space-y-1">
              <span className="text-[#6B6A63] block text-[11px]">Shipping Destination:</span>
              <p className="font-medium text-[#252722]">
                {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.district} - {selectedOrder.shippingAddress.postalCode}
              </p>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-[#244C3A] text-white py-2.5 rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
