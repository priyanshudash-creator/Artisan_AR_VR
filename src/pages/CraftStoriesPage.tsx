import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Clock,
  MapPin,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Heart,
  ChevronRight
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_ARTISANS } from '../data/mockData'
import heroCraftImg from '../assets/hero-craft.jpg'
import pattachitraImg from '../assets/pattachitra.jpg'
import dhokraImg from '../assets/dhokra.jpg'
import silverFiligreeImg from '../assets/silver_filigree.jpg'

export const CraftStoriesPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<'sambalpuri' | 'pattachitra' | 'dhokra' | 'filigree'>('sambalpuri')

  const storiesData = {
    sambalpuri: {
      title: 'The Mathematical Poetry of Sambalpuri Baandha (Ikat)',
      region: 'Sambalpur & Bargarh Districts, Western Odisha',
      heritage: 'Over 800 Years of Double Ikat Weaving',
      artisan: MOCK_ARTISANS[0],
      product: MOCK_PRODUCTS[0],
      image: heroCraftImg,
      summary: 'Before a single thread touches the loom, the design exists as a complex mathematical coordinate in the weaver’s mind. Each warp and weft strand is tied with rubber leaves and dyed up to 12 times to form pixel-sharp motifs.',
      process: [
        { stage: 'Thread Sorting & Reeling', time: '3 Days', note: 'Mulberry silk cocoons hand-reeled on traditional charkhas.' },
        { stage: 'Bandha Tying (Warp & Weft)', time: '7 Days', note: 'Rubber leaf ties resist the dye baths to establish intricate geometric motifs.' },
        { stage: 'Multi-Color Natural Dyeing', time: '5 Days', note: 'Madder roots for terracotta, natural indigo for navy, and turmeric for gold.' },
        { stage: 'Pit-Loom Weaving', time: '14-20 Days', note: 'Millimeter-by-millimeter shuttling where motifs align miraculously.' }
      ],
      materials: ['Pure Mulberry Silk', 'Natural Indigo Dye', 'Madder Root', 'Hardwood Pit Loom']
    },
    pattachitra: {
      title: 'Raghurajpur’s Living Canvas: The Heritage of Pattachitra',
      region: 'Raghurajpur Heritage Craft Village, Puri District',
      heritage: 'Temple Art Dating to the 12th Century CE',
      artisan: MOCK_ARTISANS[1],
      product: MOCK_PRODUCTS[1],
      image: pattachitraImg,
      summary: 'In the sacred village of Raghurajpur, every home is an art studio. Old cotton dhotis are pasted with tamarind seed glue, primed with sea-shell chalk, and burnished with river pebbles until smooth as polished marble.',
      process: [
        { stage: 'Patta Preparation', time: '4 Days', note: 'Layering cotton fabric with tamarind seed gum and river chalk.' },
        { stage: 'Polishing with Sea Shells', time: '2 Days', note: 'Burnishing using cowrie shells gives the canvas its ivory gleam.' },
        { stage: 'Organic Mineral Pigment Extraction', time: '3 Days', note: 'White from conch shells, red from cinnabar stone, yellow from harital stone.' },
        { stage: 'Fine Rekha & Miniature Detailing', time: '10 Days', note: 'Hand-painted with squirrel-hair brushes without initial pencil drafts.' }
      ],
      materials: ['Handmade Cloth Canvas', 'Tamarind Seed Gum', 'Conch Shell Powder', 'Natural Tree Lacquer']
    },
    dhokra: {
      title: 'Whispers of Molten Bronze: 4,000 Years of Koraput Dhokra',
      region: 'Jeypore & Koraput Tribal Belt, Southern Odisha',
      heritage: 'Direct Continuum of Indus Valley Lost-Wax Metallurgy',
      artisan: MOCK_ARTISANS[2],
      product: MOCK_PRODUCTS[2],
      image: dhokraImg,
      summary: 'Dhokra represents one of humanity’s oldest metallurgical methods. Every single piece is unrepeatable because the clay-and-wax mould is broken open to release the cooled bronze sculpture.',
      process: [
        { stage: 'Alluvial Clay Core Modeling', time: '2 Days', note: 'River clay mixed with rice husk dried slowly in the shade.' },
        { stage: 'Wild Beeswax Wire Threading', time: '3 Days', note: 'Beeswax extruded into spaghetti filaments and hand-coiled into motifs.' },
        { stage: 'Channel Moulding & Baking', time: '2 Days', note: 'Outer clay slip jacket applied with pouring sprues.' },
        { stage: 'Pit-Furnace Pouring & Patina', time: '2 Days', note: 'Molten bell metal replaces burned-out wax at 1100°C.' }
      ],
      materials: ['Forest Beeswax', 'Recycled Brass Alloy', 'Termite Hill Clay', 'Mustard Oil']
    },
    filigree: {
      title: 'Silver Webs of Cuttack: The 500-Year Legacy of Tarakasi',
      region: 'Choudhury Bazar, Cuttack District, Odisha',
      heritage: 'Silk Route Maritime Influence since 15th Century',
      artisan: MOCK_ARTISANS[3],
      product: MOCK_PRODUCTS[3],
      image: silverFiligreeImg,
      summary: 'Tarakasi transforms solid silver bars into gossamer lace. Silversmiths pull 92.5 pure silver through consecutive diamond dies until the wire is thinner than a human hair, then crimp and solder each tiny spiral by mouth blowpipe.',
      process: [
        { stage: 'Silver Ingot Smelting', time: '1 Day', note: 'Pure silver alloyed with 7.5% copper for structural tensile strength.' },
        { stage: 'Micro Wire-Drawing', time: '3 Days', note: 'Wire drawn through carbide plates to 0.18mm thickness.' },
        { stage: 'Charkhi Crimping & Bending', time: '4 Days', note: 'Micro-wires folded into delicate zig-zag petals.' },
        { stage: 'Borax Torch Soldering', time: '3 Days', note: 'Fine silver dust fused with precision blowpipe torches.' }
      ],
      materials: ['92.5 Sterling Silver', 'Borax Mineral Flux', 'Natural Reetha Soap', 'Charcoal Forge']
    }
  }

  const currentStory = storiesData[selectedStory]

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Header Banner */}
      <div className="border-b border-[#E5DED3] bg-[#FAF8F5] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B85C38] mb-3">
            HERITAGE & CRAFTSMANSHIP ARCHIVE
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#244C3A]">
            Stories Carved in Loom, Clay, and Fire
          </h1>
          <p className="text-sm sm:text-base text-[#6B6A63] mt-3 leading-relaxed">
            Every handcrafted treasure embodies centuries of community wisdom, indigenous ecological materials, and weeks of patient master dedication.
          </p>
        </div>
      </div>

      {/* Story Selection Tabs */}
      <div className="border-b border-[#E5DED3] bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start md:justify-center overflow-x-auto gap-2 py-3">
          {[
            { id: 'sambalpuri', label: 'Sambalpuri Ikat' },
            { id: 'pattachitra', label: 'Raghurajpur Pattachitra' },
            { id: 'dhokra', label: 'Koraput Dhokra' },
            { id: 'filigree', label: 'Cuttack Silver Filigree' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStory(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStory === tab.id
                  ? 'bg-[#244C3A] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#252722] hover:bg-[#E5DED3]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Story Hero Feature */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B85C38]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentStory.region}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#244C3A] leading-tight">
              {currentStory.title}
            </h2>

            <span className="inline-block px-3 py-1 rounded-full bg-[#E8DCCB] text-[#244C3A] text-xs font-medium">
              {currentStory.heritage}
            </span>

            <p className="text-sm sm:text-base text-[#252722] leading-relaxed">
              {currentStory.summary}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={`/products/${currentStory.product.slug}`}
                className="bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold px-5 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>View Authenticated Works</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={`/artisans/${currentStory.artisan.id}`}
                className="text-xs font-semibold text-[#244C3A] hover:underline"
              >
                Meet {currentStory.artisan.name} →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#E5DED3] shadow-lg bg-white">
              <img
                src={currentStory.image}
                alt={currentStory.title}
                className="w-full h-84 sm:h-96 object-cover"
              />
            </div>
          </div>

        </div>

        {/* Manufacturing Timeline Stages */}
        <div className="mt-16 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
              THE TIMELINE OF CREATION
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#244C3A] mt-1">
              Step-by-Step Production Stages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentStory.process.map((p, idx) => (
              <div key={idx} className="relative p-5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3]">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#244C3A] text-white font-serif font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#B85C38] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {p.time}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#244C3A] mb-1.5">{p.stage}</h4>
                <p className="text-xs text-[#6B6A63] leading-relaxed">{p.note}</p>
              </div>
            ))}
          </div>

          {/* Materials Used in this tradition */}
          <div className="mt-8 pt-6 border-t border-[#E5DED3] flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-[#244C3A]">Constituent Natural Materials:</span>
            {currentStory.materials.map((mat, i) => (
              <span
                key={i}
                className="text-xs bg-[#F8F5EF] border border-[#E5DED3] px-3 py-1 rounded-full text-[#252722]"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Video Recommendation Demonstration Cards */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B85C38]">
                DOCUMENTARY ARCHIVES
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#244C3A] mt-1">
                Visual Field Recordings & Demonstrations
              </h3>
            </div>
            <span className="text-xs text-[#6B6A63] bg-white border border-[#E5DED3] px-3 py-1 rounded-full">
              Demo Educational Links
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'The Rhythms of the Pit-Loom in Barpali',
                time: '8 min documentary',
                cluster: 'Sambalpur',
                image: heroCraftImg
              },
              {
                title: 'Puri Chitrakars: Grinding Conch & Stone Dyes',
                time: '12 min field video',
                cluster: 'Raghurajpur',
                image: pattachitraImg
              },
              {
                title: 'Pouring Molten Bell-Metal in Koraput Hills',
                time: '6 min studio archive',
                cluster: 'Koraput',
                image: dhokraImg
              }
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5DED3] rounded-xl overflow-hidden group shadow-xs hover:border-[#B85C38] transition-all"
              >
                <div className="relative aspect-16/9 bg-black/40 overflow-hidden">
                  <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#B85C38] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                    {v.time}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-[#B85C38]">{v.cluster} Heritage</span>
                  <h4 className="font-serif font-bold text-sm text-[#244C3A] mt-1 group-hover:text-[#B85C38] transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6A63] mt-2">
                    Curated documentary footage illustrating traditional handcrafting without voiceover manipulation.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
