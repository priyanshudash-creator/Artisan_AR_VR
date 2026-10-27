import {
  Product,
  Artisan,
  CraftCategory,
  OdishaDistrict,
  Order,
  ArtisanApplication,
  AuditLog
} from '../types'

import heroCraftImg from '../assets/hero-craft.jpg'
import pattachitraImg from '../assets/pattachitra.jpg'
import dhokraImg from '../assets/dhokra.jpg'
import silverFiligreeImg from '../assets/silver_filigree.jpg'
import pipiliImg from '../assets/pipili.jpg'
import stoneCarvingImg from '../assets/stone_carving.jpg'
import palmLeafImg from '../assets/palm_leaf.jpg'
import artisan1Img from '../assets/artisan_1.jpg'

import { ALL_30_ODISHA_DISTRICTS } from './odishaArtifactsData'

export const ODISHA_DISTRICTS: OdishaDistrict[] = [...ALL_30_ODISHA_DISTRICTS]


export const CRAFT_CATEGORIES: { id: CraftCategory; name: string; description: string; image: string }[] = [
  {
    id: 'Sambalpuri Handloom',
    name: 'Sambalpuri Handloom',
    description: 'Ancient tie-dye Ikat weaving with mythological motifs and pure mulberry silk/cotton.',
    image: heroCraftImg
  },
  {
    id: 'Pattachitra Painting',
    name: 'Pattachitra Painting',
    description: 'Intricate cloth scroll painting using 100% natural mineral and vegetable dyes.',
    image: pattachitraImg
  },
  {
    id: 'Dhokra Metal Craft',
    name: 'Dhokra Metal Craft',
    description: '4,000-year-old lost-wax tribal bell-metal casting from ancient indigenous communities.',
    image: dhokraImg
  },
  {
    id: 'Pipili Appliqué',
    name: 'Pipili Appliqué',
    description: 'Vibrant royal temple canopy needlework with mirrored embroidery and bright hues.',
    image: pipiliImg
  },
  {
    id: 'Silver Filigree',
    name: 'Silver Filigree (Tarakasi)',
    description: 'Fine spun silver wirecraft crafted by master artisans in historic Cuttack.',
    image: silverFiligreeImg
  },
  {
    id: 'Terracotta',
    name: 'Terracotta & Pottery',
    description: 'Earthy hand-turned pots and sacred sculptures from sacred alluvial clay.',
    image: heroCraftImg
  },
  {
    id: 'Stone Carving',
    name: 'Stone Carving',
    description: 'Monumental Konark and Puri Sun temple architectural soapstone craftsmanship.',
    image: stoneCarvingImg
  },
  {
    id: 'Palm Leaf Engraving',
    name: 'Palm Leaf Engraving (Talapatra)',
    description: 'Ancient iron-stylus etched manuscripts and miniature mythological narratives.',
    image: palmLeafImg
  }
]

export const MOCK_ARTISANS: Artisan[] = [
  {
    id: 'art-001',
    name: 'Guru Mohan Meher',
    studioName: 'Meher Heritage Handloom Society',
    biography: 'Fifth-generation master weaver preserving the ancient Baandha (Ikat) double-weaving tradition of Sambalpur. Known for intricate Bomkai borders and natural mordant dyeing.',
    story: 'Born to a family of master weavers in the village of Bargarh-Sambalpur, Mohan began apprenticing at the wooden pit-loom at age fourteen. Every saree requires 20 to 45 days of rhythmic hand-tying and shuttling.',
    district: 'Sambalpur',
    locality: 'Barpali Village',
    state: 'Odisha',
    craftSpecializations: ['Sambalpuri Handloom'],
    experienceYears: 38,
    profileImage: artisan1Img,
    coverImage: heroCraftImg,
    verificationStatus: 'Verified',
    productIds: ['prod-001', 'prod-008'],
    awards: ['State Master Craftsman Award (2014)', 'National Handloom Merit Award'],
    workshopLocation: 'Plot 14, Weavers Colony, Barpali, Sambalpur, Odisha',
    contactPhone: '+91 94371 XXXXX',
    contactEmail: 'mohan.meher.craft@sample.artisanar.in',
    isSample: true
  },
  {
    id: 'art-002',
    name: 'Shrimati Priyamvada Mohapatra',
    studioName: 'Chitrakar Heritage Atelier',
    biography: 'Renowned Chitrakar artist from the heritage craft village of Raghurajpur, specializing in classical Jagannath Pattachitra and organic natural stone pigment extraction.',
    story: 'In Raghurajpur, every household is an art school. Priyamvada prepares her canvas using layers of cotton cloth, tamarind seed paste, and soft chalk stone powder, painting with natural squirrel-hair brushes.',
    district: 'Puri',
    locality: 'Raghurajpur Heritage Crafts Village',
    state: 'Odisha',
    craftSpecializations: ['Pattachitra Painting', 'Palm Leaf Engraving'],
    experienceYears: 27,
    profileImage: artisan1Img,
    coverImage: pattachitraImg,
    verificationStatus: 'Verified',
    productIds: ['prod-002', 'prod-007'],
    awards: ['Odisha Lalit Kala Akademi Recognition (2018)'],
    workshopLocation: 'Main Craft Street, Raghurajpur, Puri, Odisha',
    contactPhone: '+91 98610 XXXXX',
    contactEmail: 'priyamvada.art@sample.artisanar.in',
    isSample: true
  },
  {
    id: 'art-003',
    name: 'Rama Gouda & Clan',
    studioName: 'Bastar-Koraput Dhokra Guild',
    biography: 'Indigenous tribal metalsmith keeping alive the ancient lost-wax brass casting technique dating back to the Indus Valley Civilization.',
    story: 'Rama harvests beeswax from indigenous forest hives and local riverbed clay. The wax strings are hand-coiled into elaborate tribal motifs before molten bronze is poured into clay moulds.',
    district: 'Koraput',
    locality: 'Jeypore Tribal Belt',
    state: 'Odisha',
    craftSpecializations: ['Dhokra Metal Craft', 'Tribal Art'],
    experienceYears: 32,
    profileImage: artisan1Img,
    coverImage: dhokraImg,
    verificationStatus: 'Verified',
    productIds: ['prod-003'],
    awards: ['Tribal Craft Preservation Citation'],
    workshopLocation: 'Dhokra Sahi, Near Upper Kolab, Koraput, Odisha',
    contactPhone: '+91 94392 XXXXX',
    contactEmail: 'koraput.dhokra@sample.artisanar.in',
    isSample: true
  },
  {
    id: 'art-004',
    name: 'Pradeep Kumar Sahoo',
    studioName: 'Cuttack Tarakasi Studio',
    biography: 'Master silversmith carrying forward the 500-year-old silver filigree craft of Cuttack. He draws silver wires as thin as hair to weave delicate ornaments.',
    story: 'From the historic alleys of Choudhury Bazar in Cuttack, Pradeep melts pure 92.5 sterling silver ingots and pulls them through gauge plates until gossamer filaments are formed.',
    district: 'Cuttack',
    locality: 'Choudhury Bazar',
    state: 'Odisha',
    craftSpecializations: ['Silver Filigree'],
    experienceYears: 24,
    profileImage: artisan1Img,
    coverImage: silverFiligreeImg,
    verificationStatus: 'Verified',
    productIds: ['prod-004'],
    awards: ['State Handicrafts Award (2019)'],
    workshopLocation: 'Tarakasi Galli, Choudhury Bazar, Cuttack, Odisha',
    contactPhone: '+91 94370 XXXXX',
    contactEmail: 'pradeep.filigree@sample.artisanar.in',
    isSample: true
  },
  {
    id: 'art-005',
    name: 'Subashini Jena',
    studioName: 'Pipili Chandua Craft Society',
    biography: 'Master needlewoman of Pipili whose appliqué canopies decorate the chariots of the sacred Puri Ratha Yatra.',
    story: 'Subashini leads a self-help cooperative of over 30 rural women in Pipili, transforming bright cotton fabrics with mirror work into architectural wall hangings and parasols.',
    district: 'Puri',
    locality: 'Pipili Town',
    state: 'Odisha',
    craftSpecializations: ['Pipili Appliqué'],
    experienceYears: 22,
    profileImage: artisan1Img,
    coverImage: pipiliImg,
    verificationStatus: 'Verified',
    productIds: ['prod-005'],
    awards: ['Women Rural Artisan Excellence Award'],
    workshopLocation: 'Applique Market Road, Pipili, Puri, Odisha',
    contactPhone: '+91 97762 XXXXX',
    contactEmail: 'pipili.subashini@sample.artisanar.in',
    isSample: true
  },
  {
    id: 'art-006',
    name: 'Biswanath Maharana',
    studioName: 'Konark Shilpa Sangha',
    biography: 'Sculptor continuing the temple-building stone craft tradition that created the Sun Temple of Konark and Jagannath Temple.',
    story: 'Using ancient chisels and iron mallets, Biswanath carves locally sourced Khondalite and green chlorite stone according to the ancient Shilpa Shastras.',
    district: 'Puri',
    locality: 'Konark Crafts Enclave',
    state: 'Odisha',
    craftSpecializations: ['Stone Carving'],
    experienceYears: 30,
    profileImage: artisan1Img,
    coverImage: stoneCarvingImg,
    verificationStatus: 'Verified',
    productIds: ['prod-006'],
    awards: ['National Handicraft Award Nominee'],
    workshopLocation: 'Temple Road, Konark, Puri, Odisha',
    contactPhone: '+91 94378 XXXXX',
    contactEmail: 'konark.sculpture@sample.artisanar.in',
    isSample: true
  }
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'sambalpuri-bomkai-silk-saree',
    name: 'Sambalpuri Bomkai Royal Silk Saree',
    categoryId: 'Sambalpuri Handloom',
    description: 'Masterfully handwoven Sambalpuri Bomkai pure mulberry silk saree featuring traditional bandha ikat warp and weft tie-dye patterns in midnight navy, burnt terracotta, and gold thread zari borders.',
    story: 'Woven over 28 continuous days on a traditional four-pedal handloom. The motifs depict the sacred shankha (conch), chakra, and floral creepers native to the Mahanadi river basin.',
    price: 14800,
    currency: 'INR',
    district: 'Sambalpur',
    locality: 'Barpali Village',
    artisanId: 'art-001',
    materials: ['100% Pure Mulberry Silk', 'Natural Vegetable Dyes', 'Fine Zari Weft'],
    dimensions: '6.3 meters (including 80cm blouse piece)',
    weight: '620 grams',
    stockQuantity: 4,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [heroCraftImg, heroCraftImg],
    has3DModel: true,
    modelUrl: '/models/sambalpuri_saree.glb',
    manufacturingStages: [
      { step: 1, title: 'Yarn Degumming & Reeling', description: 'Raw mulberry silk is hand-reeled and boiled in natural alkaline water to remove sericin.', duration: '3 Days' },
      { step: 2, title: 'Bandha (Tie-Dye) Graphing', description: 'Threads are grouped and tightly bound with water-resistant rubber strips according to mathematical graph patterns.', duration: '7 Days' },
      { step: 3, title: 'Multi-Dip Natural Dyeing', description: 'Yarn is immersed in natural madder root (terracotta) and natural indigo vats.', duration: '4 Days' },
      { step: 4, title: 'Loom Setup & Precision Weaving', description: 'Warp threads are painstakingly aligned on the pit loom and woven with fly-shuttle.', duration: '14 Days' }
    ],
    careInstructions: [
      'Dry clean only for the first three washes',
      'Store wrapped in clean white muslin cloth away from direct sunlight',
      'Iron on medium-low reverse setting only'
    ],
    priceBreakdown: {
      materials: 4800,
      labour: 6500,
      overhead: 1100,
      packaging: 400,
      distribution: 800,
      sellerMargin: 1200,
      total: 14800,
      isIllustrative: true
    },
    createdAt: '2026-09-15',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: 'prod-002',
    slug: 'sacred-pattachitra-krishna-leela-scroll',
    name: 'Sacred Pattachitra Krishna Leela Scroll',
    categoryId: 'Pattachitra Painting',
    description: 'Exquisite traditional cloth painting portraying Krishna Leela and Lord Jagannath on handmade canvas prepared from recycled cotton cloth, tamarind seed paste, and chalk powder, hand-painted using 100% organic natural pigments.',
    story: 'Created by Smt. Priyamvada Mohapatra in the heritage village of Raghurajpur. Every stroke of the fine border requires hours of unbroken focus with squirrel-hair brushes.',
    price: 8500,
    currency: 'INR',
    district: 'Puri',
    locality: 'Raghurajpur',
    artisanId: 'art-002',
    materials: ['Handmade Cotton Patta Cloth', 'Tamarind Seed Gum', 'Natural Conch Powder White', 'Lampblack', 'Hingula Mineral Red'],
    dimensions: '24 x 18 inches (framed options available)',
    weight: '350 grams',
    stockQuantity: 6,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [pattachitraImg, pattachitraImg],
    has3DModel: true,
    modelUrl: '/models/pattachitra_scroll.glb',
    manufacturingStages: [
      { step: 1, title: 'Pattabanana (Canvas Preparation)', description: 'Layers of cotton cloth glued with boiled tamarind seed paste, coated with soft clay stone and polished with sea shells.', duration: '4 Days' },
      { step: 2, title: 'Rekha (Outline Drawing)', description: 'Direct freehand sketching of divine figures without pencil using faint yellow pigment.', duration: '2 Days' },
      { step: 3, title: 'Ranga Barnana (Color Filling)', description: 'Organic natural mineral paints filled starting from background to body complexions.', duration: '6 Days' },
      { step: 4, title: 'Motifs & Lacquer Glaze', description: 'Intricate floral borders and natural tree resin lacquer coating for waterproof longevity.', duration: '3 Days' }
    ],
    careInstructions: [
      'Keep away from high humidity and direct rainwater',
      'Dust lightly with a soft camel-hair brush',
      'Frame under museum-grade UV-protective glass'
    ],
    priceBreakdown: {
      materials: 1800,
      labour: 4500,
      overhead: 700,
      packaging: 350,
      distribution: 450,
      sellerMargin: 700,
      total: 8500,
      isIllustrative: true
    },
    createdAt: '2026-09-20',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'prod-003',
    slug: 'dhokra-royal-tribal-elephant-figurine',
    name: 'Dhokra Lost-Wax Royal Tribal Elephant',
    categoryId: 'Dhokra Metal Craft',
    description: 'Authentic lost-wax cast bell-metal figurine of an ornate ceremonial royal elephant adorned with ceremonial canopy, bells, and fine coiled filigree wire motifs crafted by Koraput tribal metalsmiths.',
    story: 'No two Dhokra pieces are identical because each clay-and-wax mould is destroyed during molten metal casting. This craft preserves an uninterrupted metallurgical legacy since Mohenjo-Daro.',
    price: 6200,
    currency: 'INR',
    district: 'Koraput',
    locality: 'Jeypore Tribal Belt',
    artisanId: 'art-003',
    materials: ['Recycled Brass & Bronze Alloy', 'Natural Wild Beeswax', 'Riverbed Alluvial Clay', 'Rice Husk Binder'],
    dimensions: '9.5 x 7 x 4.5 inches',
    weight: '1.85 kilograms',
    stockQuantity: 5,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [dhokraImg, dhokraImg],
    has3DModel: true,
    modelUrl: '/models/dhokra_elephant.glb',
    manufacturingStages: [
      { step: 1, title: 'Clay Core Sculpting', description: 'Inner core shaped using fine river clay mixed with rice husk, dried slowly under shade.', duration: '2 Days' },
      { step: 2, title: 'Wax Filigree Modeling', description: 'Pure forest beeswax hand-rolled into delicate spaghetti-thin wires and coiled over core.', duration: '3 Days' },
      { step: 3, title: 'Outer Mould & Sprues', description: 'Coated in fine clay slip and baked with channels for molten metal drainage.', duration: '2 Days' },
      { step: 4, title: 'Pit Furnace Firing & Patina', description: 'Mould heated to 1100°C, wax burns out, liquid bronze poured in, then polished and patinated.', duration: '2 Days' }
    ],
    careInstructions: [
      'Clean periodically with a dry soft cloth',
      'Avoid harsh chemical abrasives to preserve the antique golden patina',
      'Occasional light mustard oil wipe enhances rustic sheen'
    ],
    priceBreakdown: {
      materials: 1900,
      labour: 2700,
      overhead: 550,
      packaging: 350,
      distribution: 350,
      sellerMargin: 350,
      total: 6200,
      isIllustrative: true
    },
    createdAt: '2026-09-22',
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: 'prod-004',
    slug: 'cuttack-tarakasi-silver-filigree-peacock-box',
    name: 'Cuttack Tarakasi Silver Filigree Peacock Keepsake',
    categoryId: 'Silver Filigree',
    description: 'Masterwork heirloom keepsake box in pure 92.5 sterling silver wire filigree. Features a sculpted dancing peacock lid with gossamer floral filigree lace patterns perfected in historic Cuttack.',
    story: 'Crafted over 80 hours by master silversmith Pradeep Kumar Sahoo. The wires are thinner than 0.2mm, hand-crimped into zigzag ripples and soldered with borax flame torches.',
    price: 18500,
    currency: 'INR',
    district: 'Cuttack',
    locality: 'Choudhury Bazar',
    artisanId: 'art-004',
    materials: ['92.5 Hallmarked Sterling Silver', 'Natural Borax Flux', 'Suede Velvet Lining'],
    dimensions: '4.8 x 3.6 x 3.2 inches',
    weight: '240 grams (Net Silver: 215g)',
    stockQuantity: 3,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [silverFiligreeImg, silverFiligreeImg],
    has3DModel: true,
    modelUrl: '/models/silver_filigree.glb',
    manufacturingStages: [
      { step: 1, title: 'Silver Smelting & Wire Drawing', description: 'Pure 92.5 silver bars melted and repeatedly pulled through carbide drawing plates.', duration: '2 Days' },
      { step: 2, title: 'Charkhi Ribbing & Flattening', description: 'Micro-wires are twisted in opposite directions and flattened on an anvil.', duration: '3 Days' },
      { step: 3, title: 'Sikri Skeleton Assembly', description: 'Sturdy silver frame built to hold the delicate coiled lace filigree petals.', duration: '3 Days' },
      { step: 4, title: 'Precision Soldering & Acid Wash', description: 'Each joint soldered with fine silver-copper dust and cleaned in natural reetha berry wash.', duration: '3 Days' }
    ],
    careInstructions: [
      'Store in the anti-tarnish velvet box provided',
      'Avoid contact with perfumes, chlorine, and hair sprays',
      'Wipe with silver polishing microfibre cloth only'
    ],
    priceBreakdown: {
      materials: 9500,
      labour: 6200,
      overhead: 800,
      packaging: 500,
      distribution: 500,
      sellerMargin: 1000,
      total: 18500,
      isIllustrative: true
    },
    createdAt: '2026-09-25',
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 11
  },
  {
    id: 'prod-005',
    slug: 'pipili-chandua-traditional-applique-canopy',
    name: 'Pipili Chandua Heritage Appliqué Wall Hanging',
    categoryId: 'Pipili Appliqué',
    description: 'Vibrant handcrafted appliqué wall hanging featuring traditional royal canopy motifs of elephants, peacocks, the tree of life, and mirrors with intricate blanket stitching in crimson, gold, and emerald.',
    story: 'Pipili appliqué is historically tied to the temple servitors of Lord Jagannath. Subashini Jena and her cooperative of women artisans hand-stitch each patch with precision embroidery.',
    price: 3800,
    currency: 'INR',
    district: 'Puri',
    locality: 'Pipili',
    artisanId: 'art-005',
    materials: ['High-Grade Cotton Canvas', 'Mirror Glass Inserts', 'Silk Embroidery Threads', 'Handmade Tassels'],
    dimensions: '36 x 36 inches',
    weight: '680 grams',
    stockQuantity: 12,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [pipiliImg, pipiliImg],
    has3DModel: false,
    manufacturingStages: [
      { step: 1, title: 'Base Canvas Cutting', description: 'Sturdy cotton drill fabric washed, measured, and cut into symmetrical geometric squares.', duration: '1 Day' },
      { step: 2, title: 'Motif Template Crafting', description: 'Peacock, lotus, and elephant silhouettes cut by hand from contrasting bright fabrics.', duration: '2 Days' },
      { step: 3, title: 'Needlework & Mirror Setting', description: 'Basting and tight buttonhole embroidery with circular glass mirrors.', duration: '4 Days' },
      { step: 4, title: 'Border Stitching & Tassels', description: 'Triple-border reinforcement and hand-spun yarn tassels affixed at edges.', duration: '1 Day' }
    ],
    careInstructions: [
      'Gentle hand wash in cold water with mild detergent',
      'Do not wring; dry flat in shade',
      'Warm iron on reverse side taking care around mirrors'
    ],
    priceBreakdown: {
      materials: 950,
      labour: 1850,
      overhead: 300,
      packaging: 200,
      distribution: 250,
      sellerMargin: 250,
      total: 3800,
      isIllustrative: true
    },
    createdAt: '2026-09-28',
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 31
  },
  {
    id: 'prod-006',
    slug: 'konark-sandstone-celestial-dancer-sculpture',
    name: 'Konark Sandstone Celestial Dancer Sculpture',
    categoryId: 'Stone Carving',
    description: 'Hand-chiselled classical Odissi celestial dancer (Alasa Kanya) relief sculpture in authentic Odisha sandstone, directly inspired by the 13th-century Sun Temple of Konark.',
    story: 'Biswanath Maharana hand-selected this natural warm sandstone slab for its rich grain. Carved strictly adhering to the classical Silpa Sastra treatise on ancient temple architecture.',
    price: 9400,
    currency: 'INR',
    district: 'Puri',
    locality: 'Konark',
    artisanId: 'art-006',
    materials: ['Natural Odisha Buff Sandstone', 'Natural Mineral Ochre Wash', 'Wooden Pedestal Base'],
    dimensions: '16 x 10 x 4 inches',
    weight: '6.2 kilograms',
    stockQuantity: 4,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [stoneCarvingImg, stoneCarvingImg],
    has3DModel: true,
    modelUrl: '/models/stone_carving.glb',
    manufacturingStages: [
      { step: 1, title: 'Stone Selection & Dressing', description: 'Fine-grained sandstone quarried and squared with heavy masonry chisels.', duration: '3 Days' },
      { step: 2, title: 'Grid Drawing (Angula Scale)', description: 'Divine anatomical proportions outlined using red ochre thread marks.', duration: '1 Day' },
      { step: 3, title: 'Rough Relief Chipping', description: 'Excess stone removed layer by layer using pointed mallets and chisels.', duration: '5 Days' },
      { step: 4, title: 'Micro Detailing & Polishing', description: 'Facial features, jewelry, and lotus filigree carved and smoothed with water stone.', duration: '5 Days' }
    ],
    careInstructions: [
      'Suitable for both interior and shaded outdoor display',
      'Dust with a firm dry bristle brush',
      'Wash gently with water only if needed; avoid acids or bleach'
    ],
    priceBreakdown: {
      materials: 2200,
      labour: 4800,
      overhead: 800,
      packaging: 600,
      distribution: 400,
      sellerMargin: 600,
      total: 9400,
      isIllustrative: true
    },
    createdAt: '2026-10-02',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 14
  },
  {
    id: 'prod-007',
    slug: 'antique-talapatra-palm-leaf-engraving',
    name: 'Antique Talapatra Chitra Palm-Leaf Engraving',
    categoryId: 'Palm Leaf Engraving',
    description: 'Rare traditional Talapatra manuscript panel engraved with fine iron stylus (Lekhani) and rubbed with natural lampblack and bean extract, bound with traditional dyed cord.',
    story: 'Preserving the oldest manuscript tradition of Eastern India. Palm leaves from Borassus flabellifer are cured for months in turmeric and mud before master artisans etch microscopic detail.',
    price: 4900,
    currency: 'INR',
    district: 'Puri',
    locality: 'Raghurajpur',
    artisanId: 'art-002',
    materials: ['Cured Palmyra Palm Leaf Strips', 'Natural Lampblack Kajal', 'Turmeric Infusion', 'Pure Cotton Thread Cord'],
    dimensions: '14 x 4.5 inches (unfolded)',
    weight: '190 grams',
    stockQuantity: 8,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [palmLeafImg, palmLeafImg],
    has3DModel: false,
    manufacturingStages: [
      { step: 1, title: 'Palm Leaf Curing', description: 'Tender palm leaves boiled in turmeric water, seasoned under mud and dried for 3 months.', duration: '90 Days' },
      { step: 2, title: 'Iron Stylus Incision', description: 'Intricate lines etched with sharp iron Lekhani without perforating the leaf.', duration: '4 Days' },
      { step: 3, title: 'Black Pigment Rubbing', description: 'Lampblack soot mixed with bean leaf juice rubbed into grooves and cleaned with cloth.', duration: '1 Day' },
      { step: 4, title: 'Cord Binding & Packaging', description: 'Holes punched at center and stringed with handmade dyed cord and carved beads.', duration: '1 Day' }
    ],
    careInstructions: [
      'Keep away from damp locations and termites',
      'Do not fold or bend against the grain',
      'Gently wipe with dry microfibre cloth'
    ],
    priceBreakdown: {
      materials: 900,
      labour: 2600,
      overhead: 450,
      packaging: 300,
      distribution: 300,
      sellerMargin: 350,
      total: 4900,
      isIllustrative: true
    },
    createdAt: '2026-10-05',
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 9
  },
  {
    id: 'prod-008',
    slug: 'terracotta-sacred-kumbha-water-urn',
    name: 'Terracotta Sacred Heritage Kumbha Urn',
    categoryId: 'Terracotta',
    description: 'Wheel-thrown terracotta ritual urn crafted from alluvial river clay, featuring geometric etching around the neck, fired in wood-fired open kilns for natural warm earthy tone.',
    story: 'Handcrafted by generations of Kumbhar potters using time-honored wheel techniques. Fired with rice husk and dry cowdung cakes which grant its distinctive warm red blush.',
    price: 2400,
    currency: 'INR',
    district: 'Khordha',
    locality: 'Banapur Kumbhar Sahi',
    artisanId: 'art-001',
    materials: ['Alluvial River Clay', 'Natural Red Ochre Slip', 'Wood-fired Ash'],
    dimensions: '12 x 10 inches',
    weight: '2.4 kilograms',
    stockQuantity: 7,
    isAvailable: true,
    verificationStatus: 'Verified',
    images: [heroCraftImg, heroCraftImg],
    has3DModel: true,
    modelUrl: '/models/terracotta_urn.glb',
    manufacturingStages: [
      { step: 1, title: 'Clay Wedging & Kneading', description: 'Local clay soaked, strained of pebbles, and stomped barefoot for uniformity.', duration: '2 Days' },
      { step: 2, title: 'Wheel Throwing', description: 'Shaped by hand on slow wooden potter’s wheel and beaten with wooden paddle (Pindi).', duration: '1 Day' },
      { step: 3, title: 'Carving & Slip Application', description: 'Incised with bamboo stylus and burnished with river pebbles for gloss.', duration: '2 Days' },
      { step: 4, title: 'Kiln Firing', description: 'Fired in traditional straw-covered kiln up to 850°C for natural terracotta hardness.', duration: '2 Days' }
    ],
    careInstructions: [
      'Handle with care; porous clay is fragile against drops',
      'Rinse with plain water only; avoid chemical soaps',
      'Adds natural earth cooling to interior spaces'
    ],
    priceBreakdown: {
      materials: 450,
      labour: 1100,
      overhead: 250,
      packaging: 250,
      distribution: 200,
      sellerMargin: 150,
      total: 2400,
      isIllustrative: true
    },
    createdAt: '2026-10-08',
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 19
  }
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-OD-89241',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98200 12345',
    shippingAddress: {
      street: '402, Lotus Residency, Saheed Nagar',
      city: 'Bhubaneswar',
      district: 'Khordha',
      state: 'Odisha',
      postalCode: '751007'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Sambalpuri Bomkai Royal Silk Saree',
        productImage: heroCraftImg,
        price: 14800,
        quantity: 1,
        artisanName: 'Guru Mohan Meher'
      }
    ],
    subtotal: 14800,
    shippingEstimate: 0,
    total: 14800,
    status: 'Dispatched',
    paymentMethod: 'UPI (Demo)',
    createdAt: '2026-10-24 14:32',
    isDemo: true
  },
  {
    id: 'ORD-OD-89190',
    customerName: 'Meenakshi Sundaram',
    customerEmail: 'meenakshi.s@example.com',
    customerPhone: '+91 94440 98765',
    shippingAddress: {
      street: '12/4, Kalakshetra Colony, Besant Nagar',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600090'
    },
    items: [
      {
        productId: 'prod-002',
        productName: 'Sacred Pattachitra Krishna Leela Scroll',
        productImage: pattachitraImg,
        price: 8500,
        quantity: 1,
        artisanName: 'Shrimati Priyamvada Mohapatra'
      },
      {
        productId: 'prod-005',
        productName: 'Pipili Chandua Heritage Appliqué Wall Hanging',
        productImage: pipiliImg,
        price: 3800,
        quantity: 1,
        artisanName: 'Subashini Jena'
      }
    ],
    subtotal: 12300,
    shippingEstimate: 0,
    total: 12300,
    status: 'Delivered',
    paymentMethod: 'Credit Card (Demo)',
    createdAt: '2026-10-18 10:15',
    isDemo: true
  }
]

export const MOCK_APPLICATIONS: ArtisanApplication[] = [
  {
    id: 'APP-2026-771',
    personalDetails: {
      fullName: 'Bikram Keshari Bindhani',
      studioName: 'Mayurbhanj Tribal Brass Guild',
      mobileNumber: '+91 94371 88291',
      email: 'bikram.bindhani@sample.artisanar.in',
      preferredLanguage: 'Odia'
    },
    craftAndLocation: {
      primaryCraft: 'Dhokra Metal Craft',
      specializations: ['Dhokra Metal Craft', 'Tribal Art'],
      state: 'Odisha',
      district: 'Mayurbhanj',
      locality: 'Kuliana Village',
      craftDescription: 'Practicing hereditary lost-wax bell metal casting for three generations. We make ceremonial tribal trumpets, animal figures, and temple bells.',
      experienceYears: 19
    },
    verification: {
      evidenceType: 'State Artisan Identity Card (Odisha Directorate of Handicrafts)',
      documentNames: ['artisan_card_odisha_bikram.pdf', 'pan_card_masked.pdf'],
      workshopPhotoNames: ['workshop_pit_furnace.jpg', 'crafting_wax_motifs.jpg'],
      practiceExplanation: 'All products are cast manually using natural clay and pure beeswax harvested from local forests.',
      consentGiven: true
    },
    firstProduct: {
      name: 'Mayurbhanj Dhokra Deer Family',
      description: 'Lost-wax bell metal figurine of spotted deer grazing in Similipal forest.',
      category: 'Dhokra Metal Craft',
      materials: 'Bell Metal, Brass, Beeswax',
      dimensions: '8 x 6 x 3 inches',
      price: 4500,
      stock: 4
    },
    pricing: {
      materialsCost: 1400,
      labourCost: 2100,
      overheadCost: 350,
      packagingCost: 200,
      distributionCost: 200,
      sellerMargin: 250
    },
    status: 'Pending Review',
    submissionDate: '2026-10-25',
    isDemo: true
  },
  {
    id: 'APP-2026-642',
    personalDetails: {
      fullName: 'Rashmita Barik',
      studioName: 'Raghurajpur Ganjifa & Patta',
      mobileNumber: '+91 98612 44109',
      email: 'rashmita.barik@sample.artisanar.in',
      preferredLanguage: 'Odia'
    },
    craftAndLocation: {
      primaryCraft: 'Palm Leaf Engraving',
      specializations: ['Palm Leaf Engraving', 'Pattachitra Painting'],
      state: 'Odisha',
      district: 'Puri',
      locality: 'Raghurajpur',
      craftDescription: 'Specialist in 108-card circular Ganjifa playing cards and miniature etched palm-leaf bookmarks.',
      experienceYears: 14
    },
    verification: {
      evidenceType: 'Puri District Crafts Council Certificate',
      documentNames: ['craft_council_cert.pdf'],
      workshopPhotoNames: ['rashmita_engraving_studio.jpg'],
      practiceExplanation: 'Authentic palm leaves cured over 3 months using natural organic substances.',
      consentGiven: true
    },
    firstProduct: {
      name: 'Ganjifa Dashavatara Palm Leaf Set',
      description: 'Circular palm-leaf hand-etched playing card set depicting the ten avatars.',
      category: 'Palm Leaf Engraving',
      materials: 'Cured Palm Leaf, Natural Soot, Shellac',
      dimensions: '2.5 inch diameter cards (set of 120)',
      price: 5200,
      stock: 2
    },
    pricing: {
      materialsCost: 900,
      labourCost: 3100,
      overheadCost: 400,
      packagingCost: 300,
      distributionCost: 250,
      sellerMargin: 250
    },
    status: 'Under Review',
    submissionDate: '2026-10-22',
    isDemo: true
  }
]

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-26 18:22:10',
    actor: 'Admin Moderator (Priyanshu D.)',
    action: 'Verified Approval',
    target: 'Artisan Application APP-2026-642',
    details: 'Reviewed evidence documents and verified workshop photographic proof.'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-26 15:45:04',
    actor: 'Artisan (Guru Mohan Meher)',
    action: 'Product Stock Update',
    target: 'Sambalpuri Bomkai Royal Silk Saree',
    details: 'Updated inventory from 2 to 4 units after fresh loom harvest.'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-26 11:10:32',
    actor: 'System Integrity Check',
    action: 'Price Breakdown Consistency Validation',
    target: '8 Products Audited',
    details: 'All illustrative price components match selling prices within 0.0% variance.'
  },
  {
    id: 'log-004',
    timestamp: '2026-10-25 09:30:18',
    actor: 'Admin Reviewer',
    action: 'Category Updated',
    target: 'Silver Filigree (Tarakasi)',
    details: 'Added origin provenance tags for Cuttack heritage cluster.'
  }
]
