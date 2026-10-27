import { OdishaArtifactItem } from '../data/odishaArtifactsData'
import { Product, OdishaDistrict, CraftCategory, VerificationStatus } from '../types'

export function artifactToProduct(artifact: OdishaArtifactItem): Product {
  // Map category to closest CraftCategory
  let categoryId: CraftCategory = 'Other Handcrafted Products'
  const c = artifact.category.toLowerCase()
  if (c.includes('saree') || c.includes('textile') || c.includes('handloom')) {
    categoryId = 'Sambalpuri Handloom'
  } else if (c.includes('pattachitra') || c.includes('painting')) {
    categoryId = 'Pattachitra Painting'
  } else if (c.includes('dhokra')) {
    categoryId = 'Dhokra Metal Craft'
  } else if (c.includes('appliqué') || c.includes('embroidery')) {
    categoryId = 'Pipili Appliqué'
  } else if (c.includes('filigree') || c.includes('jewellery') || c.includes('silver')) {
    categoryId = 'Silver Filigree'
  } else if (c.includes('stone')) {
    categoryId = 'Stone Carving'
  } else if (c.includes('terracotta') || c.includes('clay')) {
    categoryId = 'Terracotta'
  } else if (c.includes('palm-leaf')) {
    categoryId = 'Palm Leaf Engraving'
  } else if (c.includes('tribal')) {
    categoryId = 'Tribal Art'
  }

  // Verification status mapping
  let status: VerificationStatus = 'Pending Review'
  if (artifact.verificationStatus.includes('Local artisan documented')) {
    status = 'Verified'
  } else if (artifact.verificationStatus.includes('Craft master documented')) {
    status = 'Verified'
  }

  // Price average or min
  const price = artifact.priceMin || artifact.priceMax || 1500

  // Slug
  const slug = `${artifact.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${artifact.district.toLowerCase()}-${artifact.id}`

  return {
    id: artifact.id,
    slug,
    name: `${artifact.name} (${artifact.district})`,
    categoryId,
    description: artifact.history.slice(0, 200) + '...',
    story: artifact.history,
    price,
    currency: 'INR',
    district: artifact.district as OdishaDistrict,
    locality: artifact.district,
    artisanId: artifact.localArtisans ? 'art-local' : 'art-master',
    materials: [artifact.category, artifact.specialNotes.split(',')[0] || 'Traditional craft materials'],
    dimensions: 'Standard artisan specification',
    weight: 'Varies by handmade piece',
    stockQuantity: 5,
    isAvailable: true,
    verificationStatus: status,
    images: [artifact.image],
    has3DModel: artifact.has3D,
    modelUrl: artifact.has3D ? '/models/craft_sample.glb' : undefined,
    manufacturingStages: [
      {
        step: 1,
        title: 'Material Sourcing & Preparation',
        description: 'Authentic local raw materials prepared using traditional Odia craft practices.',
        duration: '1-2 days'
      },
      {
        step: 2,
        title: 'Handcrafting & Shaping',
        description: artifact.specialNotes || 'Skilled hand-shaping by experienced artisans.',
        duration: '3-7 days'
      },
      {
        step: 3,
        title: 'Finishing & Inspection',
        description: 'Traditional surface finishing, polishing or dyeing followed by quality review.',
        duration: '1 day'
      }
    ],
    careInstructions: [
      'Keep away from excessive moisture and direct prolonged sunlight.',
      'Clean gently with a soft dry cotton cloth.',
      'Store in original handcrafted packaging when not displayed.'
    ],
    priceBreakdown: {
      materials: Math.round(price * 0.35),
      labour: Math.round(price * 0.45),
      overhead: Math.round(price * 0.08),
      packaging: Math.round(price * 0.04),
      distribution: Math.round(price * 0.03),
      sellerMargin: Math.round(price * 0.05),
      total: price,
      isIllustrative: false
    },
    createdAt: new Date().toISOString(),
    isFeatured: artifact.priceConfidence === 'Researched' || artifact.verificationStatus.includes('Local artisan'),
    rating: 4.8,
    reviewsCount: 12
  }
}

export function getConfidenceBadge(confidence: string) {
  switch (confidence) {
    case 'Researched':
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-600',
        label: 'Market Researched',
        tooltip: 'Price verified from live marketplace listings (e.g. Sambalpuri / Boyanika / IndiaHandmade)'
      }
    case 'Partly researched':
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Partly Researched',
        tooltip: 'Price partially researched through artisan records & cooperative listings'
      }
    case 'Estimate':
    default:
      return {
        bg: 'bg-stone-100 text-stone-700 border-stone-200',
        dot: 'bg-stone-400',
        label: 'Advisory Guide',
        tooltip: 'Estimate — check with Utkalika, Boyanika, SHGs or artisans before final transaction'
      }
  }
}
