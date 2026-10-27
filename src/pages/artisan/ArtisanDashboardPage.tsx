import React, { useState, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  Package,
  PlusCircle,
  Calculator,
  ShoppingBag,
  Settings,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Save,
  Upload,
  Image as ImageIcon,
  Star,
  X,
  Sparkles
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_ARTISANS, MOCK_ORDERS, CRAFT_CATEGORIES } from '../../data/mockData'
import { Product, VerificationStatus, CraftCategory } from '../../types'
import { VerificationBadge } from '../../components/common/VerificationBadge'
import { useCartWishlist } from '../../context/CartWishlistContext'

import heroCraftImg from '../../assets/hero-craft.jpg'
import pattachitraImg from '../../assets/pattachitra.jpg'
import dhokraImg from '../../assets/dhokra.jpg'
import silverFiligreeImg from '../../assets/silver_filigree.jpg'
import logoImg from '../../assets/logo.jpg'

export const ArtisanDashboardPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id: editProductId } = useParams<{ id: string }>()
  const { showToast } = useCartWishlist()

  // Master Artisan identity
  const currentArtisan = MOCK_ARTISANS[0] // Guru Mohan Meher
  const [artisanProducts, setArtisanProducts] = useState<Product[]>(
    MOCK_PRODUCTS.filter((p) => p.artisanId === currentArtisan.id)
  )

  // Uploaded product images state
  const [productImages, setProductImages] = useState<string[]>([heroCraftImg])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Determine subview
  const getSubView = () => {
    const path = location.pathname
    if (path.includes('/products/new')) return 'products-new'
    if (path.includes('/edit')) return 'products-edit'
    if (path.includes('/products')) return 'products'
    if (path.includes('/profile')) return 'profile'
    if (path.includes('/verification')) return 'verification'
    if (path.includes('/pricing')) return 'pricing'
    if (path.includes('/orders')) return 'orders'
    if (path.includes('/settings')) return 'settings'
    return 'overview'
  }

  const subView = getSubView()

  // Form state for Add/Edit product
  const [productForm, setProductForm] = useState({
    name: 'Sambalpuri Natural Dye Silk Dupatta',
    category: 'Sambalpuri Handloom' as CraftCategory,
    price: 6800,
    stock: 5,
    description: 'Traditional Bandha tie-dye silk dupatta featuring sacred floral motifs.',
    materials: 'Pure Mulberry Silk, Madder Root, Natural Indigo',
    dimensions: '2.5 meters x 36 inches',
    materialsCost: 2200,
    labourCost: 3100,
    overheadCost: 500,
    packagingCost: 300,
    distributionCost: 350,
    sellerMargin: 350
  })

  // Image Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file.')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProductImages((prev) => [...prev, event.target!.result as string])
          showToast(`Uploaded ${file.name}`)
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setProductImages((prev) => prev.filter((_, idx) => idx !== indexToRemove))
    showToast('Image removed.')
  }

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    setProductImages((prev) => {
      const selected = prev[indexToPrimary]
      const remaining = prev.filter((_, idx) => idx !== indexToPrimary)
      return [selected, ...remaining]
    })
    showToast('Set as primary cover image.')
  }

  const handleAddSampleImage = (imgSrc: string, name: string) => {
    setProductImages((prev) => [...prev, imgSrc])
    showToast(`Added sample ${name} photo.`)
  }

  // Stock toggle / action
  const handleToggleStock = (prodId: string) => {
    setArtisanProducts((prev) =>
      prev.map((p) =>
        p.id === prodId ? { ...p, isAvailable: !p.isAvailable } : p
      )
    )
    showToast('Product availability toggled.')
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (productImages.length === 0) {
      showToast('Please upload at least one product photograph.')
      return
    }

    const calculatedCost =
      productForm.materialsCost +
      productForm.labourCost +
      productForm.overheadCost +
      productForm.packagingCost +
      productForm.distributionCost +
      productForm.sellerMargin

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: productForm.name,
      categoryId: productForm.category,
      description: productForm.description,
      story: `Handcrafted in ${currentArtisan.locality} using centuries-old master traditions.`,
      price: productForm.price,
      currency: 'INR',
      district: currentArtisan.district,
      locality: currentArtisan.locality,
      artisanId: currentArtisan.id,
      materials: productForm.materials.split(',').map((m) => m.trim()),
      dimensions: productForm.dimensions,
      weight: '550 grams',
      stockQuantity: productForm.stock,
      isAvailable: true,
      verificationStatus: 'Verified',
      images: productImages,
      has3DModel: true,
      manufacturingStages: [
        { step: 1, title: 'Raw Material Preparation', description: 'Hand-selected silk and natural vegetable dyes.', duration: '3 Days' },
        { step: 2, title: 'Loom Weaving & Precision Bandha', description: 'Traditional fly-shuttle pit-loom execution.', duration: '14 Days' },
        { step: 3, title: 'Quality & Craft Verification', description: 'Studio quality inspection and edge finishing.', duration: '2 Days' }
      ],
      careInstructions: [
        'Dry clean or gentle hand wash with natural soap',
        'Dry in shade on reverse side'
      ],
      priceBreakdown: {
        materials: productForm.materialsCost,
        labour: productForm.labourCost,
        overhead: productForm.overheadCost,
        packaging: productForm.packagingCost,
        distribution: productForm.distributionCost,
        sellerMargin: productForm.sellerMargin,
        total: calculatedCost,
        isIllustrative: true
      },
      createdAt: new Date().toISOString().slice(0, 10),
      isFeatured: true
    }

    setArtisanProducts((prev) => [newProduct, ...prev])
    showToast(`"${productForm.name}" published to catalog with ${productImages.length} images!`)
    navigate('/artisan/products')
  }

  const navItems = [
    { id: 'overview', label: 'Studio Overview', path: '/artisan/dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Artisan Profile', path: '/artisan/profile', icon: User },
    { id: 'verification', label: 'Verification Status', path: '/artisan/verification', icon: ShieldCheck },
    { id: 'products', label: 'My Products', path: '/artisan/products', icon: Package },
    { id: 'products-new', label: 'Add New Product', path: '/artisan/products/new', icon: PlusCircle },
    { id: 'pricing', label: 'Pricing Calculator', path: '/artisan/pricing', icon: Calculator },
    { id: 'orders', label: 'Studio Orders', path: '/artisan/orders', icon: ShoppingBag },
    { id: 'settings', label: 'Workshop Settings', path: '/artisan/settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Dashboard Top Header */}
      <div className="bg-[#244C3A] text-white border-b border-[#78816A]/40 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Artisan Guild Seal"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-lg">
                  {currentArtisan.studioName}
                </h1>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-[#E8DCCB]">
                  Artisan Studio Portal
                </span>
              </div>
              <p className="text-xs text-[#E8DCCB]/80">
                {currentArtisan.name} • {currentArtisan.locality}, {currentArtisan.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              to={`/artisans/${currentArtisan.id}`}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E8DCCB] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Profile</span>
            </Link>
            <Link
              to="/marketplace"
              className="px-3 py-1.5 rounded-lg bg-[#B85C38] hover:bg-[#9E4928] text-white font-medium transition-colors"
            >
              Public Marketplace
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white border border-[#E5DED3] rounded-2xl p-4 shadow-xs sticky top-28">
            <div className="pb-3 border-b border-[#E5DED3] mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A63]">
                Artisan Studio Navigation
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComp = item.icon
                const isActive = subView === item.id || (item.id === 'products' && subView === 'products-edit')
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#244C3A] text-white shadow-xs'
                        : 'text-[#252722] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-[#B85C38]' : 'text-[#6B6A63]'}`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-[#E5DED3] text-[11px] text-[#6B6A63] space-y-1">
              <p><strong>Live Studio:</strong> All catalog updates reflect immediately across marketplace listings.</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* 1. OVERVIEW VIEW */}
            {subView === 'overview' && (
              <div className="space-y-6">
                
                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Profile Readiness</span>
                    <span className="font-serif font-bold text-2xl text-[#244C3A] mt-1 block">95%</span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" /> Workshop Verified
                    </span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Active Works</span>
                    <span className="font-serif font-bold text-2xl text-[#244C3A] mt-1 block">
                      {artisanProducts.length}
                    </span>
                    <span className="text-[10px] text-[#6B6A63] mt-1 block">1 Draft Pending</span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Studio Orders</span>
                    <span className="font-serif font-bold text-2xl text-[#B85C38] mt-1 block">12</span>
                    <span className="text-[10px] text-[#244C3A] font-semibold mt-1 block">₹1,74,600 Total Value</span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Direct Return</span>
                    <span className="font-serif font-bold text-2xl text-[#244C3A] mt-1 block">94.2%</span>
                    <span className="text-[10px] text-[#6B6A63] mt-1 block">Fair Rural Remuneration</span>
                  </div>
                </div>

                {/* Studio Products Snapshot */}
                <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5DED3] mb-4">
                    <h3 className="font-serif font-bold text-base text-[#244C3A]">
                      Published Handcrafted Works
                    </h3>
                    <Link
                      to="/artisan/products/new"
                      className="text-xs bg-[#B85C38] text-white px-3 py-1.5 rounded-md font-semibold hover:bg-[#9E4928]"
                    >
                      + Add New Work
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {artisanProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-[#E5DED3]"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#244C3A]">{p.name}</h4>
                            <span className="text-xs text-[#6B6A63]">{p.categoryId} • Stock: {p.stockQuantity} units</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-sm text-[#252722]">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleToggleStock(p.id)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              p.isAvailable
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {p.isAvailable ? 'In Stock' : 'Paused'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. PRODUCTS VIEW */}
            {subView === 'products' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5DED3]">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                      Catalog Management
                    </h3>
                    <p className="text-xs text-[#6B6A63]">Update inventory, pricing, and 3D preview statuses.</p>
                  </div>
                  <Link
                    to="/artisan/products/new"
                    className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    + Add Product
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5DED3] text-[#6B6A63]">
                        <th className="pb-3 font-semibold">Product</th>
                        <th className="pb-3 font-semibold">Category</th>
                        <th className="pb-3 font-semibold">Selling Price</th>
                        <th className="pb-3 font-semibold">Stock</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DED3]">
                      {artisanProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 pr-2 flex items-center gap-2.5">
                            <img src={p.images[0]} alt="" className="w-9 h-9 rounded object-cover" />
                            <span className="font-medium text-[#244C3A] truncate max-w-[160px]">{p.name}</span>
                          </td>
                          <td className="py-3 text-[#6B6A63]">{p.categoryId}</td>
                          <td className="py-3 font-bold text-[#252722]">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="py-3 font-medium">{p.stockQuantity}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              Published
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-2">
                            <button
                              onClick={() => handleToggleStock(p.id)}
                              className="text-xs text-[#B85C38] hover:underline"
                            >
                              {p.isAvailable ? 'Pause' : 'Activate'}
                            </button>
                            <Link to={`/products/${p.slug}`} className="text-xs text-[#244C3A] hover:underline">
                              Preview
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ADD / EDIT PRODUCT VIEW */}
            {(subView === 'products-new' || subView === 'products-edit') && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs">
                <h3 className="font-serif font-bold text-lg text-[#244C3A] mb-1">
                  {subView === 'products-new' ? 'Add New Handcrafted Work' : 'Edit Craft Details'}
                </h3>
                <p className="text-xs text-[#6B6A63] mb-6">
                  Fill in authentic craft specifications, materials, and cost breakdown.
                </p>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                  {/* Image Uploading Section */}
                  <div className="bg-[#FAF8F5] border border-[#E5DED3] rounded-xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-bold text-[#244C3A] uppercase tracking-wider">
                          Product Photographs & Showcase Gallery *
                        </label>
                        <p className="text-[11px] text-[#6B6A63]">
                          Upload clear, high-resolution photographs of your craft from multiple angles. First image acts as the primary cover photo.
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#244C3A]/10 text-[#244C3A] self-start sm:self-auto">
                        {productImages.length} {productImages.length === 1 ? 'Photo' : 'Photos'} Selected
                      </span>
                    </div>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="artisan-product-file-input"
                    />

                    {/* Upload Dropzone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#B85C38]/40 hover:border-[#B85C38] bg-white hover:bg-[#FBF9F5] transition-all duration-200 rounded-xl p-6 text-center cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#B85C38]/10 group-hover:bg-[#B85C38]/20 text-[#B85C38] flex items-center justify-center mb-3 transition-colors">
                        <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs font-bold text-[#252722] mb-1">
                        Click here to browse photos or drag and drop
                      </p>
                      <p className="text-[11px] text-[#6B6A63] mb-3">
                        Supports PNG, JPG, JPEG, WEBP (multiple files supported)
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Choose Images From Computer</span>
                      </button>
                    </div>

                    {/* Sample Craft Photos for Quick Demo */}
                    <div className="pt-2 border-t border-[#E5DED3]/60">
                      <p className="text-[11px] font-semibold text-[#6B6A63] mb-2 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
                        <span>Quick-add sample craft imagery for testing:</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddSampleImage(heroCraftImg, 'Sambalpuri Ikat')}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-[#E8DCCB]/40 border border-[#E5DED3] rounded-md text-[#244C3A] font-medium transition-colors"
                        >
                          + Sambalpuri Ikat
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSampleImage(pattachitraImg, 'Pattachitra Painting')}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-[#E8DCCB]/40 border border-[#E5DED3] rounded-md text-[#244C3A] font-medium transition-colors"
                        >
                          + Pattachitra
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSampleImage(dhokraImg, 'Dhokra Metal Craft')}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-[#E8DCCB]/40 border border-[#E5DED3] rounded-md text-[#244C3A] font-medium transition-colors"
                        >
                          + Dhokra Metal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSampleImage(silverFiligreeImg, 'Silver Filigree')}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-[#E8DCCB]/40 border border-[#E5DED3] rounded-md text-[#244C3A] font-medium transition-colors"
                        >
                          + Silver Filigree
                        </button>
                      </div>
                    </div>

                    {/* Image Previews Gallery */}
                    {productImages.length > 0 ? (
                      <div>
                        <p className="text-[11px] font-semibold text-[#244C3A] mb-2.5">
                          Selected Product Photographs ({productImages.length}):
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {productImages.map((imgSrc, idx) => (
                            <div
                              key={idx}
                              className={`relative group rounded-xl overflow-hidden border-2 bg-white shadow-xs transition-all ${
                                idx === 0 ? 'border-[#B85C38] ring-2 ring-[#B85C38]/20' : 'border-[#E5DED3]'
                              }`}
                            >
                              <div className="aspect-square w-full overflow-hidden bg-stone-100">
                                <img
                                  src={imgSrc}
                                  alt={`Product preview ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Primary Cover Badge */}
                              {idx === 0 ? (
                                <div className="absolute top-1.5 left-1.5 bg-[#B85C38] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  <span>Cover Photo</span>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryImage(idx)}
                                  className="absolute top-1.5 left-1.5 bg-black/70 hover:bg-[#B85C38] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                                  title="Make this the primary cover photo"
                                >
                                  Make Cover
                                </button>
                              )}

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                                title="Remove photograph"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              {/* Index indicator */}
                              <div className="p-1.5 bg-white text-center border-t border-[#E5DED3]">
                                <span className="text-[10px] text-[#6B6A63] font-medium">
                                  Photo #{idx + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Please add at least one product photo to showcase your craft to buyers.</span>
                      </div>
                    )}
                  </div>

                  {/* Basic Product Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Product Title *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        required
                        placeholder="e.g. Sambalpuri Natural Dye Silk Dupatta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Craft Category *</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CraftCategory })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        required
                      >
                        {CRAFT_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Selling Price (INR ₹) *</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs font-bold text-[#244C3A] focus:ring-1 focus:ring-[#244C3A] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Available Stock Units</label>
                      <input
                        type="number"
                        min="1"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#252722]">Craft Description *</label>
                    <textarea
                      rows={3}
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                      required
                      placeholder="Describe the craft, cultural significance, motifs, and unique handmade attributes..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Materials Used</label>
                      <input
                        type="text"
                        value={productForm.materials}
                        onChange={(e) => setProductForm({ ...productForm, materials: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        placeholder="e.g. Pure Mulberry Silk, Natural Indigo, Brass"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#252722]">Dimensions / Specifications</label>
                      <input
                        type="text"
                        value={productForm.dimensions}
                        onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        placeholder="e.g. 2.5 meters x 36 inches"
                      />
                    </div>
                  </div>

                  {/* Transparent Cost Breakdown */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#244C3A] mb-1">
                      Transparent Cost Breakdown (Fair Price Guarantee)
                    </label>
                    <p className="text-[11px] text-[#6B6A63] mb-3">
                      This breakdown appears on the product page so conscious buyers understand authentic master artisan value.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#6B6A63]">Raw Materials Cost (₹)</label>
                        <input
                          type="number"
                          value={productForm.materialsCost}
                          onChange={(e) => setProductForm({ ...productForm, materialsCost: Number(e.target.value) })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#6B6A63]">Artisan Labour (₹)</label>
                        <input
                          type="number"
                          value={productForm.labourCost}
                          onChange={(e) => setProductForm({ ...productForm, labourCost: Number(e.target.value) })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#6B6A63]">Studio Overhead (₹)</label>
                        <input
                          type="number"
                          value={productForm.overheadCost}
                          onChange={(e) => setProductForm({ ...productForm, overheadCost: Number(e.target.value) })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-xs focus:ring-1 focus:ring-[#244C3A] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Submission Actions */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5DED3]">
                    <Link
                      to="/artisan/products"
                      className="px-4 py-2 border border-[#E5DED3] rounded-lg text-xs font-semibold text-[#6B6A63] hover:bg-stone-50 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="bg-[#244C3A] hover:bg-[#193528] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Work to Catalog</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 4. VERIFICATION STATUS VIEW */}
            {subView === 'verification' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                    Artisan Heritage Verification Status
                  </h3>
                  <p className="text-xs text-[#6B6A63]">
                    Artisan verification audits authentic handcrafting practice and fair wage adherence.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-sm">Verified Master Artisan Guild (Sample)</strong>
                    <span>Your studio has passed verified evaluation for Sambalpuri handloom weaving with authentic pit-loom documentation.</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-[#244C3A]">Archived Supporting Evidence:</h4>
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DED3] flex items-center justify-between">
                    <span>Odisha Directorate of Handicrafts Master Artisan Card</span>
                    <span className="text-emerald-700 font-semibold">Verified</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DED3] flex items-center justify-between">
                    <span>Pit-Loom Natural Dye Workshop Inspection</span>
                    <span className="text-emerald-700 font-semibold">Verified</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. PRICING CALCULATOR TOOL */}
            {subView === 'pricing' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                    Transparent Cost & Fair Wage Calculator
                  </h3>
                  <p className="text-xs text-[#6B6A63]">
                    Calculate mathematically consistent prices for your handmade creations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Estimated Raw Materials (₹)</label>
                    <input
                      type="number"
                      defaultValue={4800}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Artisan Days x Daily Fair Wage (₹)</label>
                    <input
                      type="number"
                      defaultValue={6500}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] text-xs">
                  <span className="font-serif font-bold text-sm text-[#244C3A] block mb-1">
                    Guideline Note:
                  </span>
                  <p className="text-[#6B6A63] leading-relaxed">
                    Under the Gaon to Growth standard, artisan labour should represent at least 40% of the product cost to guarantee a dignified living wage for traditional master creators.
                  </p>
                </div>
              </div>
            )}

            {/* 6. ORDERS VIEW */}
            {subView === 'orders' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Incoming Studio Orders
                </h3>
                <p className="text-xs text-[#6B6A63]">Orders dispatched directly from Barpali village studio.</p>

                <div className="space-y-3">
                  {MOCK_ORDERS.map((o) => (
                    <div
                      key={o.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#244C3A] block">{o.id}</span>
                        <span className="text-[#6B6A63]">Customer: {o.customerName} • {o.shippingAddress.city}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-sm text-[#252722] block">₹{o.total.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROFILE & SETTINGS VIEWS */}
            {(subView === 'profile' || subView === 'settings') && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Workshop & Studio Settings
                </h3>
                <p className="text-xs text-[#6B6A63]">Manage studio public details and contact information.</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Studio Display Name</label>
                    <input
                      type="text"
                      defaultValue={currentArtisan.studioName}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Village Workshop Location</label>
                    <input
                      type="text"
                      defaultValue={currentArtisan.workshopLocation}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => showToast('Studio settings saved.')}
                    className="bg-[#244C3A] text-white px-5 py-2.5 rounded-lg text-xs font-semibold"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  )
}
