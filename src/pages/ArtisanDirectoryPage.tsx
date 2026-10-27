import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Users, Filter, X, ChevronRight, Award } from 'lucide-react'
import { MOCK_ARTISANS, ODISHA_DISTRICTS, CRAFT_CATEGORIES } from '../data/mockData'
import { ArtisanCard } from '../components/artisans/ArtisanCard'
import { CraftCategory, OdishaDistrict } from '../types'

export const ArtisanDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const [selectedCraft, setSelectedCraft] = useState<string>('all')

  const filteredArtisans = useMemo(() => {
    return MOCK_ARTISANS.filter((artisan) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = artisan.name.toLowerCase().includes(q)
        const matchesStudio = artisan.studioName?.toLowerCase().includes(q)
        const matchesBio = artisan.biography.toLowerCase().includes(q)
        const matchesLocality = artisan.locality.toLowerCase().includes(q)
        if (!matchesName && !matchesStudio && !matchesBio && !matchesLocality) {
          return false
        }
      }

      // District filter
      if (selectedDistrict !== 'all' && artisan.district !== selectedDistrict) {
        return false
      }

      // Craft filter
      if (selectedCraft !== 'all' && !artisan.craftSpecializations.includes(selectedCraft as any)) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedDistrict, selectedCraft])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDistrict('all')
    setSelectedCraft('all')
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Header Banner */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#6B6A63] mb-3">
            <Link to="/" className="hover:text-[#B85C38]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252722] font-medium">Artisan Directory</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#244C3A]">
            The Master Craftsmen of Odisha
          </h1>
          <p className="text-sm sm:text-base text-[#6B6A63] mt-2 max-w-2xl leading-relaxed">
            Discover the hereditary masters, studio guilds, and rural cooperatives preserving centuries of handloom, metallurgy, and sacred painting.
          </p>
        </div>
      </div>

      {/* Main Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-[#E5DED3] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B6A63]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by artisan name, studio, or village..."
              className="w-full pl-9 pr-8 py-2.5 bg-[#FAF8F5] border border-[#E5DED3] rounded-lg text-sm text-[#252722] placeholder:text-[#6B6A63] focus:outline-hidden focus:border-[#B85C38]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#6B6A63]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* District & Craft Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* District dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E5DED3] text-[#252722] rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-hidden focus:border-[#B85C38]"
            >
              <option value="all">All Odisha Districts</option>
              {ODISHA_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Craft category dropdown */}
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E5DED3] text-[#252722] rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-hidden focus:border-[#B85C38]"
            >
              <option value="all">All Craft Traditions</option>
              {CRAFT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {(selectedDistrict !== 'all' || selectedCraft !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#B85C38] font-semibold hover:underline px-2 py-1"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Results Count & Sample Notice */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-[#6B6A63]">
          <span>
            Found <strong className="text-[#244C3A] font-bold">{filteredArtisans.length}</strong> master artisans
          </span>
          <span className="text-[11px] bg-[#E8DCCB] text-[#244C3A] px-2.5 py-0.5 rounded-full font-medium">
            Verified Sample Demonstration Profiles
          </span>
        </div>

        {/* Artisans Grid */}
        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5DED3] rounded-2xl p-12 text-center max-w-md mx-auto">
            <Users className="w-10 h-10 text-[#6B6A63] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#244C3A] mb-1">No Artisans Found</h3>
            <p className="text-xs text-[#6B6A63] mb-4">Try clearing your district or craft filters.</p>
            <button
              onClick={clearFilters}
              className="bg-[#B85C38] text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </div>
  )
}
