import React from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  X,
  Plus,
  Box,
  ShoppingCart,
  Check,
  ChevronRight,
  ShieldCheck,
  MapPin
} from 'lucide-react'
import { useCartWishlist } from '../context/CartWishlistContext'
import { MOCK_PRODUCTS } from '../data/mockData'
import { VerificationBadge } from '../components/common/VerificationBadge'

export const ProductComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCompare, addToCart } = useCartWishlist()

  const comparedProducts = MOCK_PRODUCTS.filter((p) => compareList.includes(p.id))

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Header Banner */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#6B6A63] mb-3">
            <Link to="/" className="hover:text-[#B85C38]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/marketplace" className="hover:text-[#B85C38]">Marketplace</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252722] font-medium">Product Comparison</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A]">
                Craft Comparison Matrix
              </h1>
              <p className="text-sm text-[#6B6A63] mt-1">
                Compare materials, master techniques, indicative price breakdowns, and origins side-by-side.
              </p>
            </div>

            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-[#B85C38] hover:underline font-semibold self-start sm:self-auto"
              >
                Clear All Comparisons
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table / Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {comparedProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[640px] bg-white border border-[#E5DED3] rounded-2xl shadow-xs overflow-hidden">
              
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {/* Row: Product Header & Image */}
                  <tr className="border-b border-[#E5DED3] bg-[#FAF8F5]">
                    <td className="p-4 sm:p-5 w-48 font-serif font-bold text-sm text-[#244C3A] align-top">
                      Craft Artifact
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 w-64 align-top border-l border-[#E5DED3]">
                        <div className="relative group">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-[#B85C38] transition-colors z-10"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="aspect-4/3 rounded-xl overflow-hidden bg-white border border-[#E5DED3] mb-3">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38] block">
                            {p.categoryId}
                          </span>
                          <Link to={`/products/${p.slug}`}>
                            <h4 className="font-serif font-bold text-base text-[#244C3A] hover:text-[#B85C38] transition-colors mt-0.5 line-clamp-1">
                              {p.name}
                            </h4>
                          </Link>
                          <span className="font-serif font-bold text-lg text-[#252722] block mt-1">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="mt-3 w-full bg-[#B85C38] hover:bg-[#9E4928] text-white py-2 px-3 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && (
                      <td className="p-4 sm:p-5 w-64 align-middle border-l border-[#E5DED3] text-center bg-[#FAF8F5]/50">
                        <div className="p-6 border-2 border-dashed border-[#E5DED3] rounded-xl flex flex-col items-center justify-center text-[#6B6A63]">
                          <Plus className="w-6 h-6 text-[#B85C38] mb-2" />
                          <span className="text-xs font-semibold">Compare Another Craft</span>
                          <span className="text-[11px] mt-1">Add up to 3 products</span>
                          <Link
                            to="/marketplace"
                            className="mt-3 text-xs bg-white border border-[#E5DED3] text-[#244C3A] hover:border-[#B85C38] px-3 py-1.5 rounded-md font-medium"
                          >
                            Browse Marketplace
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>

                  {/* Row: Geographic Origin */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Geographic Origin
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3] font-medium text-[#252722]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B85C38]" />
                          {p.locality}, {p.district} District
                        </span>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: Verification Status */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Artisan Verification
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3]">
                        <VerificationBadge status={p.verificationStatus} size="sm" />
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: 3D Digital Model */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      3D Interactive Model
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3]">
                        {p.has3DModel ? (
                          <span className="inline-flex items-center gap-1.5 text-[#244C3A] font-semibold">
                            <Box className="w-3.5 h-3.5 text-[#B85C38]" /> Available in 3D
                          </span>
                        ) : (
                          <span className="text-[#6B6A63]">In Digitization</span>
                        )}
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: Key Materials */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Constituent Materials
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3]">
                        <ul className="space-y-1">
                          {p.materials.map((m, i) => (
                            <li key={i} className="text-[#252722]">• {m}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: Dimensions & Weight */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Dimensions / Weight
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3] text-[#252722]">
                        <p>{p.dimensions || 'Custom Traditional Sizing'}</p>
                        {p.weight && <p className="text-[#6B6A63] mt-0.5">{p.weight}</p>}
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: Price Breakdown Summary */}
                  <tr className="border-b border-[#E5DED3]">
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Indicative Cost Share
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3] text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-[#6B6A63]">Materials:</span>
                            <span className="font-semibold text-[#244C3A]">₹{p.priceBreakdown.materials.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6B6A63]">Artisan Labour:</span>
                            <span className="font-semibold text-[#244C3A]">₹{p.priceBreakdown.labour.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6B6A63]">Total Cost:</span>
                            <span className="font-bold text-[#B85C38]">₹{p.priceBreakdown.total.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                  {/* Row: Stock & Availability */}
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#6B6A63] bg-[#FAF8F5]/60">
                      Inventory Availability
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 sm:p-5 border-l border-[#E5DED3] font-medium text-[#244C3A]">
                        {p.stockQuantity > 0 ? `Ready to Dispatch (${p.stockQuantity} in stock)` : 'Made to Order'}
                      </td>
                    ))}
                    {comparedProducts.length < 3 && <td className="border-l border-[#E5DED3]" />}
                  </tr>

                </tbody>
              </table>

            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E5DED3] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E5DED3] text-[#244C3A] flex items-center justify-center mx-auto mb-4">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#244C3A] mb-2">
              No Crafts in Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6A63] leading-relaxed mb-6">
              Select up to 3 handcrafted works from our marketplace to compare their materials, origins, and transparent pricing side-by-side.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/marketplace"
                className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Browse Marketplace
              </Link>
              <button
                onClick={() => {
                  addToCompare('prod-001')
                  addToCompare('prod-003')
                }}
                className="bg-[#FAF8F5] border border-[#E5DED3] text-[#244C3A] text-xs font-semibold px-4 py-2.5 rounded-lg"
              >
                Load Sample Comparison
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
