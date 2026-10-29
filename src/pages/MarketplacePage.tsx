import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  Box,
  ShieldCheck,
  Play,
  Sparkles,
  MapPin,
  ChevronLeft,
  Check,
  Info,
  Grid,
  List
} from 'lucide-react'
import {
  ODISHA_ARTIFACTS,
  ALL_30_ODISHA_DISTRICTS,
  CATEGORIES_OVERVIEW,
  OdishaArtifactItem
} from '../data/odishaArtifactsData'
import { ArtifactCard } from '../components/marketplace/ArtifactCard'
import { ArtifactDetailModal } from '../components/marketplace/ArtifactDetailModal'
import { VerifiedArtisansSection } from '../components/marketplace/VerifiedArtisansSection'

const ITEMS_PER_PAGE = 24

// Top famous craft clusters for fast filter chips
const FAMOUS_CLUSTERS = [
  { name: 'All Odisha', district: 'all' },
  { name: 'Puri (Pattachitra & Appliqué)', district: 'Puri' },
  { name: 'Cuttack (Silver Filigree)', district: 'Cuttack' },
  { name: 'Sambalpur (Ikat Textiles)', district: 'Sambalpur' },
  { name: 'Dhenkanal (Dhokra Metal)', district: 'Dhenkanal' },
  { name: 'Bargarh (Sambalpuri Handloom)', district: 'Bargarh' },
  { name: 'Koraput (Kotpad Tribal)', district: 'Koraput' },
  { name: 'Mayurbhanj (Sabai Grass)', district: 'Mayurbhanj' },
  { name: 'Ganjam (Berhampuri Silk)', district: 'Ganjam' },
  { name: 'Khordha (Stone & Pottery)', district: 'Khordha' },
  { name: 'Balasore (Stone & Straw)', district: 'Balasore' }
]

export const MarketplacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Query parameter initializers
  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''
  const initialDistrict = searchParams.get('district') || 'all'

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict)
  const [districtSearch, setDistrictSearch] = useState('')
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all')
  const [selectedArtisanStatus, setSelectedArtisanStatus] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000])
  const [has3DOnly, setHas3DOnly] = useState(false)
  const [hasVideoOnly, setHasVideoOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'district' | 'name'>('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Quick View Modal
  const [selectedArtifact, setSelectedArtifact] = useState<OdishaArtifactItem | null>(null)

  // Keep search params in sync if URL changes
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory)
    if (initialSearch) setSearchQuery(initialSearch)
    if (initialDistrict) setSelectedDistrict(initialDistrict)
  }, [initialCategory, initialSearch, initialDistrict])

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchQuery,
    selectedCategory,
    selectedDistrict,
    selectedConfidence,
    selectedArtisanStatus,
    priceRange,
    has3DOnly,
    hasVideoOnly,
    sortBy
  ])

  // Filter districts list based on districtSearch
  const filteredDistricts = useMemo(() => {
    if (!districtSearch.trim()) return ALL_30_ODISHA_DISTRICTS
    return ALL_30_ODISHA_DISTRICTS.filter((d) =>
      d.toLowerCase().includes(districtSearch.toLowerCase())
    )
  }, [districtSearch])

  // Combined Filtering Logic across all 300 artifacts
  const filteredArtifacts = useMemo(() => {
    return ODISHA_ARTIFACTS.filter((artifact) => {
      // 1. Search Query (name, district, category, localArtisans, localArtisansOdia, masterArtisans, specialNotes, history)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = artifact.name.toLowerCase().includes(q)
        const matchesDistrict = artifact.district.toLowerCase().includes(q)
        const matchesCat = artifact.category.toLowerCase().includes(q)
        const matchesLocal = artifact.localArtisans.toLowerCase().includes(q)
        const matchesLocalOdia = artifact.localArtisansOdia.includes(searchQuery.trim())
        const matchesMaster = artifact.masterArtisans.toLowerCase().includes(q)
        const matchesMasterOdia = artifact.masterArtisansOdia.includes(searchQuery.trim())
        const matchesNotes = artifact.specialNotes.toLowerCase().includes(q)
        const matchesHistory = artifact.history.toLowerCase().includes(q)

        if (
          !matchesName &&
          !matchesDistrict &&
          !matchesCat &&
          !matchesLocal &&
          !matchesLocalOdia &&
          !matchesMaster &&
          !matchesMasterOdia &&
          !matchesNotes &&
          !matchesHistory
        ) {
          return false
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all') {
        const normSelected = selectedCategory.toLowerCase()
        const normCat = artifact.category.toLowerCase()
        if (!normCat.includes(normSelected) && !normSelected.includes(normCat)) {
          return false
        }
      }

      // 3. District filter
      if (selectedDistrict !== 'all' && artifact.district !== selectedDistrict) {
        return false
      }

      // 4. Price Confidence filter
      if (selectedConfidence !== 'all' && artifact.priceConfidence !== selectedConfidence) {
        return false
      }

      // 5. Artisan Verification Status filter
      if (selectedArtisanStatus !== 'all') {
        if (selectedArtisanStatus === 'local' && !artifact.localArtisans) {
          return false
        }
        if (selectedArtisanStatus === 'master' && (!artifact.masterArtisans || artifact.localArtisans)) {
          return false
        }
        if (selectedArtisanStatus === 'field' && (artifact.localArtisans || artifact.masterArtisans)) {
          return false
        }
      }

      // 6. Price Range filter
      if (artifact.priceMin > priceRange[1] || artifact.priceMax < priceRange[0]) {
        return false
      }

      // 7. 3D Preview Available Only
      if (has3DOnly && !artifact.has3D) {
        return false
      }

      // 8. Video Available Only
      if (hasVideoOnly && !artifact.processVideoUrl) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceMin - b.priceMin
      if (sortBy === 'price-high') return b.priceMax - a.priceMax
      if (sortBy === 'district') return a.district.localeCompare(b.district)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      // Default: featured (local documented first, then researched prices)
      const aScore = (a.localArtisans ? 3 : a.masterArtisans ? 2 : 1) + (a.priceConfidence === 'Researched' ? 2 : 0)
      const bScore = (b.localArtisans ? 3 : b.masterArtisans ? 2 : 1) + (b.priceConfidence === 'Researched' ? 2 : 0)
      return bScore - aScore
    })
  }, [
    searchQuery,
    selectedCategory,
    selectedDistrict,
    selectedConfidence,
    selectedArtisanStatus,
    priceRange,
    has3DOnly,
    hasVideoOnly,
    sortBy
  ])

  // Paginated Artifacts
  const totalPages = Math.ceil(filteredArtifacts.length / ITEMS_PER_PAGE)
  const paginatedArtifacts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredArtifacts.slice(0, start + ITEMS_PER_PAGE)
  }, [filteredArtifacts, currentPage])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedDistrict('all')
    setDistrictSearch('')
    setSelectedConfidence('all')
    setSelectedArtisanStatus('all')
    setPriceRange([0, 150000])
    setHas3DOnly(false)
    setHasVideoOnly(false)
    setSortBy('featured')
    setCurrentPage(1)
    setSearchParams({})
  }

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedDistrict !== 'all' ? 1 : 0) +
    (selectedConfidence !== 'all' ? 1 : 0) +
    (selectedArtisanStatus !== 'all' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0) +
    (has3DOnly ? 1 : 0) +
    (hasVideoOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 150000 ? 1 : 0)

  // Next / Prev handler for modal
  const currentIndex = selectedArtifact 
    ? filteredArtifacts.findIndex(a => a.id === selectedArtifact.id)
    : -1

  const handlePrevArtifact = currentIndex > 0
    ? () => setSelectedArtifact(filteredArtifacts[currentIndex - 1])
    : undefined

  const handleNextArtifact = currentIndex >= 0 && currentIndex < filteredArtifacts.length - 1
    ? () => setSelectedArtifact(filteredArtifacts[currentIndex + 1])
    : undefined

  // Filter Drawer & Sidebar Component
  const FilterContent = () => (
    <div className="space-y-6">
      
      {/* Category Tradition Filter (19 Categories) */}
      <div className="pb-6 border-b border-[#E5DED3]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif font-bold text-sm text-[#244C3A]">
            Craft Tradition ({CATEGORIES_OVERVIEW.length})
          </h4>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[11px] text-[#B85C38] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-[#244C3A] text-white'
                : 'text-[#252722] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>All Traditions</span>
            <span className="text-[11px] opacity-75">{ODISHA_ARTIFACTS.length}</span>
          </button>

          {CATEGORIES_OVERVIEW.map((cat) => {
            const count = ODISHA_ARTIFACTS.filter((a) => a.category === cat.category).length
            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === cat.category
                    ? 'bg-[#244C3A] text-white'
                    : 'text-[#252722] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="truncate pr-2">{cat.category}</span>
                <span className="text-[11px] opacity-75 shrink-0">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Odisha District Filter (Searchable all 30 districts) */}
      <div className="pb-6 border-b border-[#E5DED3]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-serif font-bold text-sm text-[#244C3A]">
            Odisha District ({ALL_30_ODISHA_DISTRICTS.length})
          </h4>
          {selectedDistrict !== 'all' && (
            <button
              onClick={() => setSelectedDistrict('all')}
              className="text-[11px] text-[#B85C38] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#6B6A63]" />
          <input
            type="text"
            value={districtSearch}
            onChange={(e) => setDistrictSearch(e.target.value)}
            placeholder="Search all 30 districts..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-md text-xs text-[#252722] placeholder:text-[#6B6A63] focus:outline-hidden focus:border-[#B85C38]"
          />
        </div>

        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedDistrict('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              selectedDistrict === 'all'
                ? 'bg-[#244C3A] text-white'
                : 'text-[#252722] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>All 30 Districts</span>
            <span className="text-[11px] opacity-75">{ODISHA_ARTIFACTS.length}</span>
          </button>

          {filteredDistricts.map((district) => {
            const count = ODISHA_ARTIFACTS.filter((a) => a.district === district).length
            return (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedDistrict === district
                    ? 'bg-[#244C3A] text-white'
                    : 'text-[#252722] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{district}</span>
                <span className="text-[11px] opacity-75">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Artisan Verification Status */}
      <div className="pb-6 border-b border-[#E5DED3]">
        <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-2.5 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#244C3A]" />
          Artisan Verification
        </h4>
        <div className="space-y-1 text-xs">
          {[
            { id: 'all', label: 'All Listings (300)' },
            { id: 'local', label: 'Verified Local Masters (30)' },
            { id: 'master', label: 'Statewide Master Documented (195)' },
            { id: 'field', label: 'Field Collection in Progress (75)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedArtisanStatus(item.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                selectedArtisanStatus === item.id
                  ? 'bg-[#244C3A] text-white font-semibold'
                  : 'text-[#252722] hover:bg-[#FAF8F5]'
              }`}
            >
              <span>{item.label}</span>
              {selectedArtisanStatus === item.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Confidence Tier (Per Dataset README) */}
      <div className="pb-6 border-b border-[#E5DED3]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-serif font-bold text-sm text-[#244C3A] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#B85C38]" />
            Price Confidence
          </h4>
          {selectedConfidence !== 'all' && (
            <button
              onClick={() => setSelectedConfidence('all')}
              className="text-[11px] text-[#B85C38] hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedConfidence('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
              selectedConfidence === 'all'
                ? 'bg-[#244C3A] text-white font-semibold'
                : 'text-[#252722] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>All Confidence Levels</span>
            <span className="text-[11px] opacity-75">{ODISHA_ARTIFACTS.length}</span>
          </button>
          <button
            onClick={() => setSelectedConfidence('Researched')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
              selectedConfidence === 'Researched'
                ? 'bg-emerald-800 text-white font-semibold'
                : 'text-emerald-900 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Market Researched (Green)
            </span>
            <span className="text-[11px] opacity-75">
              {ODISHA_ARTIFACTS.filter(a => a.priceConfidence === 'Researched').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedConfidence('Partly researched')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
              selectedConfidence === 'Partly researched'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-amber-900 hover:bg-amber-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Partly Researched (Yellow)
            </span>
            <span className="text-[11px] opacity-75">
              {ODISHA_ARTIFACTS.filter(a => a.priceConfidence === 'Partly researched').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedConfidence('Estimate')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
              selectedConfidence === 'Estimate'
                ? 'bg-stone-700 text-white font-semibold'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              Advisory Estimate (Grey)
            </span>
            <span className="text-[11px] opacity-75">
              {ODISHA_ARTIFACTS.filter(a => a.priceConfidence === 'Estimate').length}
            </span>
          </button>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pb-6 border-b border-[#E5DED3]">
        <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-3">
          Price Range (INR)
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#252722]">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="150000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-[#B85C38] cursor-pointer"
          />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setPriceRange([0, 1000])}
              className="py-1 px-2 border border-[#E5DED3] rounded-lg hover:border-[#B85C38] text-[11px] bg-white"
            >
              Under ₹1,000
            </button>
            <button
              onClick={() => setPriceRange([1000, 5000])}
              className="py-1 px-2 border border-[#E5DED3] rounded-lg hover:border-[#B85C38] text-[11px] bg-white"
            >
              ₹1k – ₹5k
            </button>
            <button
              onClick={() => setPriceRange([5000, 20000])}
              className="py-1 px-2 border border-[#E5DED3] rounded-lg hover:border-[#B85C38] text-[11px] bg-white"
            >
              ₹5k – ₹20k
            </button>
            <button
              onClick={() => setPriceRange([20000, 150000])}
              className="py-1 px-2 border border-[#E5DED3] rounded-lg hover:border-[#B85C38] text-[11px] bg-white font-medium text-[#244C3A]"
            >
              Masterpiece (₹20k+)
            </button>
          </div>
        </div>
      </div>

      {/* Special Feature Checkboxes */}
      <div className="space-y-3">
        <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-2">
          Interactive Features
        </h4>

        <label className="flex items-center gap-2.5 text-xs text-[#252722] cursor-pointer">
          <input
            type="checkbox"
            checked={has3DOnly}
            onChange={(e) => setHas3DOnly(e.target.checked)}
            className="rounded border-[#E5DED3] text-[#B85C38] focus:ring-0 cursor-pointer w-4 h-4"
          />
          <span className="flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-[#B85C38]" /> 3D Showroom Available
          </span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-[#252722] cursor-pointer">
          <input
            type="checkbox"
            checked={hasVideoOnly}
            onChange={(e) => setHasVideoOnly(e.target.checked)}
            className="rounded border-[#E5DED3] text-[#B85C38] focus:ring-0 cursor-pointer w-4 h-4"
          />
          <span className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-[#244C3A]" /> Has Craft Process Video
          </span>
        </label>
      </div>

      {/* Clear All Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#B85C38] text-[#B85C38] rounded-xl text-xs font-semibold hover:bg-[#B85C38] hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters ({activeFilterCount})</span>
        </button>
      )}

    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Hero Header & Statistics Banner */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-[#6B6A63] mb-3">
            <Link to="/" className="hover:text-[#B85C38]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252722] font-semibold">Odisha Craft Marketplace</span>
            {selectedDistrict !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#B85C38] font-semibold">{selectedDistrict} District</span>
              </>
            )}
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#244C3A] font-semibold">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#244C3A]/10 text-[#244C3A] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
                <span>Gaon to Growth • Direct Artisan Discovery</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#244C3A] tracking-tight">
                Odisha Craft Marketplace
              </h1>
              <p className="text-sm sm:text-base text-[#6B6A63] mt-2 max-w-3xl leading-relaxed">
                Discover 300 authentic handcrafted listings across all 30 districts of Odisha with public-record documented master craftspersons, transparent pricing guidelines, and direct craft discovery.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-[#E5DED3] shadow-xs shrink-0 text-center">
              <div className="px-3 py-1">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#244C3A]">300</span>
                <span className="text-[10px] text-[#78816A] uppercase font-semibold">Artifacts</span>
              </div>
              <div className="px-3 py-1 border-l border-[#E5DED3]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#B85C38]">30</span>
                <span className="text-[10px] text-[#78816A] uppercase font-semibold">Districts</span>
              </div>
              <div className="px-3 py-1 border-l border-[#E5DED3]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#244C3A]">19</span>
                <span className="text-[10px] text-[#78816A] uppercase font-semibold">Traditions</span>
              </div>
              <div className="px-3 py-1 border-l border-[#E5DED3]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-emerald-800">33</span>
                <span className="text-[10px] text-[#78816A] uppercase font-semibold">Masters</span>
              </div>
            </div>
          </div>

          {/* Quick Hub Filter Bar */}
          <div className="mt-8 pt-6 border-t border-[#E5DED3]">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-[#244C3A] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B85C38]" /> Top Hubs:
              </span>
              {FAMOUS_CLUSTERS.map((hub) => (
                <button
                  key={hub.district}
                  onClick={() => setSelectedDistrict(hub.district)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDistrict === hub.district
                      ? 'bg-[#B85C38] text-white shadow-xs'
                      : 'bg-white text-[#252722] border border-[#E5DED3] hover:border-[#B85C38]'
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar with Independent Smooth Scroll & Sticky Pinning */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white border border-[#E5DED3] rounded-3xl p-5 shadow-xs sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain scrollbar-thin">
            <div className="sticky -top-5 -mt-5 -mx-5 px-5 pt-5 pb-3 bg-white/95 backdrop-blur-xs z-10 flex items-center justify-between border-b border-[#E5DED3] mb-4 rounded-t-3xl">
              <span className="font-serif text-base font-bold text-[#244C3A] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#B85C38]" /> Filters
              </span>
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] text-[#B85C38] hover:underline font-semibold"
                  >
                    Reset
                  </button>
                  <span className="text-xs bg-[#B85C38] text-white px-2 py-0.5 rounded-full font-medium">
                    {activeFilterCount}
                  </span>
                </div>
              )}
            </div>
            <FilterContent />
          </aside>

          {/* Artifact Listings Main Area */}
          <main className="flex-1 w-full min-w-0">
            
            {/* Search, Sort, and Mobile Filter Header */}
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Live Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B6A63]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by craft, district, Odia master name (English / ଓଡ଼ିଆ)..."
                  className="w-full pl-9 pr-8 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-sm text-[#252722] placeholder:text-[#6B6A63] focus:outline-hidden focus:border-[#B85C38]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-[#6B6A63] hover:text-[#252722]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sorting and Mobile Filter Trigger */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs font-semibold text-[#252722]"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#B85C38]" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#B85C38] text-white text-[10px] flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sorting Select */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#6B6A63] hidden md:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-[#FAF8F5] border border-[#E5DED3] text-[#252722] rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#B85C38]"
                  >
                    <option value="featured">Featured Masterpieces</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="district">District (A-Z)</option>
                    <option value="name">Artifact Name (A-Z)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Active Filters Pills & Result Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="text-xs text-[#6B6A63] font-medium">
                Showing <strong className="text-[#244C3A] font-bold">{filteredArtifacts.length}</strong> authenticated craft listings across Odisha
              </span>

              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  {selectedDistrict !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      District: {selectedDistrict}
                      <button onClick={() => setSelectedDistrict('all')}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  {selectedConfidence !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      Confidence: {selectedConfidence}
                      <button onClick={() => setSelectedConfidence('all')}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  {selectedArtisanStatus !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      Artisan: {selectedArtisanStatus}
                      <button onClick={() => setSelectedArtisanStatus('all')}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  {has3DOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      3D Showroom Only
                      <button onClick={() => setHas3DOnly(false)}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  {hasVideoOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E5DED3] text-xs font-medium text-[#244C3A]">
                      Has Video
                      <button onClick={() => setHasVideoOnly(false)}>
                        <X className="w-3 h-3 text-[#6B6A63] hover:text-[#B85C38]" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#B85C38] font-bold hover:underline ml-1"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>

            {/* Artifacts Grid */}
            {filteredArtifacts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedArtifacts.map((artifact) => (
                    <ArtifactCard
                      key={artifact.id}
                      artifact={artifact}
                      onSelect={(art) => setSelectedArtifact(art)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {filteredArtifacts.length > ITEMS_PER_PAGE && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E5DED3]">
                    <span className="text-xs text-[#6B6A63]">
                      Showing {paginatedArtifacts.length} of {filteredArtifacts.length} listings
                    </span>

                    <div className="flex items-center gap-2">
                      {paginatedArtifacts.length < filteredArtifacts.length && (
                        <button
                          onClick={() => setCurrentPage(prev => prev + 1)}
                          className="px-5 py-2.5 bg-[#B85C38] hover:bg-[#9E4928] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                        >
                          Load More Artifacts ({filteredArtifacts.length - paginatedArtifacts.length} remaining)
                        </button>
                      )}
                      
                      <div className="flex items-center gap-1 ml-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#244C3A] text-white'
                                : 'bg-white border border-[#E5DED3] text-[#252722] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                        {totalPages > 5 && (
                          <span className="text-xs text-[#6B6A63] px-1">... {totalPages}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white border border-[#E5DED3] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E5DED3] text-[#B85C38] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#244C3A] mb-2">
                  No Handcrafted Artifacts Found
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6A63] leading-relaxed mb-6">
                  We couldn't find any crafts matching your current combination of filters. Try clearing some filters or searching for popular crafts like Sambalpuri, Dhokra, Pattachitra, or Silver Filigree.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Verified Master Artisans Section */}
            <VerifiedArtisansSection
              onSelectCraft={(craftName) => {
                setSearchQuery(craftName)
                window.scrollTo({ top: 300, behavior: 'smooth' })
              }}
            />

          </main>

        </div>
      </div>

      {/* Responsive Filter Drawer for Mobile */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E5DED3] mb-6">
                  <h3 className="font-serif text-lg font-bold text-[#244C3A] flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#B85C38]" /> Filters
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1.5 text-[#6B6A63] hover:text-[#252722]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
              </div>

              <div className="pt-6 border-t border-[#E5DED3] mt-6">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[#B85C38] text-white py-3 rounded-xl text-sm font-semibold shadow-xs"
                >
                  Show {filteredArtifacts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quick View / Story Modal */}
      <ArtifactDetailModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onPrev={handlePrevArtifact}
        onNext={handleNextArtifact}
      />

    </div>
  )
}
