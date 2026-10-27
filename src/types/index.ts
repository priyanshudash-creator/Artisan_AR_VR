export type OdishaDistrict =
  | 'Angul'
  | 'Balangir'
  | 'Balasore'
  | 'Bargarh'
  | 'Bhadrak'
  | 'Boudh'
  | 'Cuttack'
  | 'Deogarh'
  | 'Dhenkanal'
  | 'Gajapati'
  | 'Ganjam'
  | 'Jagatsinghpur'
  | 'Jajpur'
  | 'Jharsuguda'
  | 'Kalahandi'
  | 'Kandhamal'
  | 'Kendrapara'
  | 'Kendujhar (Keonjhar)'
  | 'Khordha'
  | 'Koraput'
  | 'Malkangiri'
  | 'Mayurbhanj'
  | 'Nabarangpur'
  | 'Nayagarh'
  | 'Nuapada'
  | 'Puri'
  | 'Rayagada'
  | 'Sambalpur'
  | 'Subarnapur (Sonepur)'
  | 'Sundargarh'


export type CraftCategory =
  | 'Sambalpuri Handloom'
  | 'Pattachitra Painting'
  | 'Dhokra Metal Craft'
  | 'Pipili Appliqué'
  | 'Silver Filigree'
  | 'Stone Carving'
  | 'Terracotta'
  | 'Tribal Art'
  | 'Palm Leaf Engraving'
  | 'Other Handcrafted Products'

export type VerificationStatus =
  | 'Not Submitted'
  | 'Pending Review'
  | 'Under Review'
  | 'Additional Information Required'
  | 'Verified'
  | 'Rejected'

export interface PriceBreakdownItem {
  materials: number
  labour: number
  overhead: number
  packaging: number
  distribution: number
  sellerMargin: number
  total: number
  isIllustrative: boolean
}

export interface ManufacturingStage {
  step: number
  title: string
  description: string
  duration: string
  iconName?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  categoryId: CraftCategory
  description: string
  story?: string
  price: number
  currency: string
  district: OdishaDistrict
  locality: string
  artisanId: string
  materials: string[]
  dimensions?: string
  weight?: string
  stockQuantity: number
  isAvailable: boolean
  verificationStatus: VerificationStatus
  images: string[]
  has3DModel: boolean
  modelUrl?: string
  manufacturingStages: ManufacturingStage[]
  careInstructions: string[]
  priceBreakdown: PriceBreakdownItem
  createdAt: string
  isFeatured?: boolean
  rating?: number
  reviewsCount?: number
}

export interface Artisan {
  id: string
  name: string
  studioName?: string
  biography: string
  story: string
  district: OdishaDistrict
  locality: string
  state: string
  craftSpecializations: CraftCategory[]
  experienceYears: number
  profileImage: string
  coverImage?: string
  verificationStatus: VerificationStatus
  productIds: string[]
  awards?: string[]
  workshopLocation?: string
  contactPhone?: string
  contactEmail?: string
  isSample: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  artisanName: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    district: string
    postalCode: string
  }
  items: OrderItem[]
  subtotal: number
  shippingEstimate: number
  total: number
  status: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled'
  paymentMethod: string
  createdAt: string
  isDemo: boolean
}

export interface ArtisanApplication {
  id: string
  personalDetails: {
    fullName: string
    studioName: string
    mobileNumber: string
    email: string
    preferredLanguage: 'Odia' | 'Hindi' | 'English'
  }
  craftAndLocation: {
    primaryCraft: CraftCategory
    specializations: CraftCategory[]
    state: string
    district: OdishaDistrict
    locality: string
    craftDescription: string
    experienceYears: number
  }
  verification: {
    evidenceType: string
    documentNames: string[]
    workshopPhotoNames: string[]
    practiceExplanation: string
    consentGiven: boolean
  }
  firstProduct?: {
    name: string
    description: string
    category: CraftCategory
    materials: string
    dimensions: string
    price: number
    stock: number
  }
  pricing: {
    materialsCost: number
    labourCost: number
    overheadCost: number
    packagingCost: number
    distributionCost: number
    sellerMargin: number
  }
  status: VerificationStatus
  submissionDate: string
  isDemo: boolean
}

export interface AuditLog {
  id: string
  timestamp: string
  actor: string
  action: string
  target: string
  details: string
}

export type {
  OdishaArtifactItem,
  CategoryOverviewData,
  VerifiedMasterArtisan
} from '../data/odishaArtifactsData'

