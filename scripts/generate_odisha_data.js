import fs from 'fs';
import path from 'path';

const raw = fs.readFileSync('C:/Users/anjal/Downloads/Odisha_Artifacts_Detailed_v3_FULL.txt', 'utf8');

function parseSheet(sheetText) {
  const rowRegex = /ROW\s+(\d+):\s+/g;
  let matches = [];
  let match;
  while ((match = rowRegex.exec(sheetText)) !== null) {
    matches.push({ rowNum: parseInt(match[1]), index: match.index, length: match[0].length });
  }
  const rows = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].length;
    const end = (i + 1 < matches.length) ? matches[i + 1].index : sheetText.length;
    const rowContent = sheetText.slice(start, end).trim();
    const colRegex = /C(\d+):\s+/g;
    let colMatches = [];
    let colMatch;
    while ((colMatch = colRegex.exec(rowContent)) !== null) {
      colMatches.push({ colNum: parseInt(colMatch[1]), index: colMatch.index, length: colMatch[0].length });
    }
    const cols = {};
    for (let c = 0; c < colMatches.length; c++) {
      const cStart = colMatches[c].index + colMatches[c].length;
      const cEnd = (c + 1 < colMatches.length) ? colMatches[c + 1].index : rowContent.length;
      const val = rowContent.slice(cStart, cEnd).trim().replace(/\s+/g, ' ');
      cols['C' + colMatches[c].colNum] = val === '[EMPTY]' ? '' : val;
    }
    rows.push({ rowNum: matches[i].rowNum, cols });
  }
  return rows;
}

const sheetParts = raw.split('SHEET: ');
const catSheet = sheetParts.find(s => s.startsWith('Category Overview'));
const artSheet = sheetParts.find(s => s.startsWith('Artifacts (Full Detail)'));
const artisanSheet = sheetParts.find(s => s.startsWith('Verified Artisans'));
const priceSheet = sheetParts.find(s => s.startsWith('Price Guide'));

const parsedCategories = parseSheet(catSheet).slice(1); // skip header
const parsedArtifacts = parseSheet(artSheet).slice(1);
const parsedArtisans = parseSheet(artisanSheet).slice(1);
const parsedPrices = parseSheet(priceSheet).slice(1);

console.log(`Parsed ${parsedCategories.length} categories, ${parsedArtifacts.length} artifacts, ${parsedArtisans.length} artisans, ${parsedPrices.length} prices`);

// Build image mapping
const categoryImages = {
  'Paintings (Pattachitra & Saura)': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'Sarees & Handloom Textiles': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'Dhokra Metal Art': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  'Jewellery (Silver Filigree, Tribal & Horn)': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  'Appliqué, Embroidery & Textile Decor': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
  'Stone Crafts': 'https://images.unsplash.com/photo-1599818816933-4f995393d256?auto=format&fit=crop&w=800&q=80',
  'Palm-leaf Art & Papier-mâché': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
  'Terracotta & Clay Figurines': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  'Clay Pots & Pottery': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  'Brass & Bell-Metal Decorative Items': 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
  'Utensils (Brass & Bell-Metal)': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  'Baskets, Trays & Storage': 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
  'Bamboo & Cane Furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  'Bamboo & Cane (General Products)': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  'Wood Carvings & Sculptures': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'Straw, Grass & Fibre Crafts': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
  'Lamps & Lighting': 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=800&q=80',
  'Horn, Betel-nut & Solapith Crafts': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'Iron Crafts': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
};

// Also specific artifact image overrides for highest visual fidelity
function getArtifactImage(category, name) {
  const n = name.toLowerCase();
  if (n.includes('pattachitra')) return '/src/assets/pattachitra.jpg';
  if (n.includes('filigree') || n.includes('silver')) return '/src/assets/silver_filigree.jpg';
  if (n.includes('dhokra')) return '/src/assets/dhokra.jpg';
  if (n.includes('saree') || n.includes('ikat') || n.includes('sambalpuri')) return '/src/assets/hero-craft.jpg';
  if (n.includes('appliqué') || n.includes('chandua') || n.includes('chhatri') || n.includes('pipili')) return '/src/assets/pipili.jpg';
  if (n.includes('stone') || n.includes('sculpture') && category.includes('Stone')) return '/src/assets/stone_carving.jpg';
  if (n.includes('palm-leaf') || n.includes('talapatra')) return '/src/assets/palm_leaf.jpg';
  return categoryImages[category] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80';
}

function has3DPreview(category, name) {
  const n = name.toLowerCase();
  return (
    category === 'Dhokra Metal Art' ||
    category === 'Stone Crafts' ||
    category === 'Wood Carvings & Sculptures' ||
    n.includes('filigree') ||
    n.includes('figurines') ||
    n.includes('chandua') ||
    n.includes('terracotta')
  );
}

// Convert parsed artifacts into clean JS objects
const artifacts = parsedArtifacts.map((row, idx) => {
  const c = row.cols;
  const priceMin = parseInt(c.C4.replace(/[^0-9]/g, '')) || 0;
  const priceMax = parseInt(c.C5.replace(/[^0-9]/g, '')) || priceMin;
  const category = c.C2;
  const name = c.C3;
  
  return {
    id: `odisha-art-${idx + 1}`,
    rowNum: idx + 2,
    district: c.C1,
    category: category,
    name: name,
    priceMin: priceMin,
    priceMax: priceMax,
    priceUnit: c.C6 || 'per piece',
    priceConfidence: c.C7 || 'Estimate',
    localArtisans: c.C8,
    localArtisansOdia: c.C9,
    recognition: c.C10,
    masterArtisans: c.C11,
    masterArtisansOdia: c.C12,
    verificationStatus: c.C13,
    history: c.C14,
    processVideoUrl: c.C15,
    specialNotes: c.C16,
    image: getArtifactImage(category, name),
    has3D: has3DPreview(category, name),
  };
});

// Categories overview
const categoriesOverview = parsedCategories.filter(r => r.cols.C1 && r.cols.C1 !== 'TOTAL').map(r => ({
  category: r.cols.C1,
  uniqueArtifacts: parseInt(r.cols.C2) || 0,
  totalListings: parseInt(r.cols.C3) || 0,
  documentedLocalArtisans: parseInt(r.cols.C4) || 0,
  typicalPriceRange: r.cols.C5 || '',
  image: categoryImages[r.cols.C1] || '/src/assets/hero-craft.jpg'
}));

// Verified Artisans
const verifiedArtisans = parsedArtisans.map(r => ({
  id: r.cols.C1,
  name: r.cols.C2,
  nameOdia: r.cols.C3,
  craft: r.cols.C4,
  district: r.cols.C5,
  village: r.cols.C6,
  recognition: r.cols.C7,
  awardYear: r.cols.C8,
  minYearsActive: r.cols.C9,
  notes: r.cols.C10,
  sourceUrl: r.cols.C11,
  status: r.cols.C12
}));

// Unique districts
const allDistricts = [...new Set(artifacts.map(a => a.district))].sort();

// Create TS code
const tsContent = `// ODISHA ARTIFACTS DATASET (v3)
// 300 authentic artifact listings across all 30 districts of Odisha, India
// 19 categories, 33 public-record documented master craftspersons

export interface OdishaArtifactItem {
  id: string;
  rowNum: number;
  district: string;
  category: string;
  name: string;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  priceConfidence: 'Researched' | 'Partly researched' | 'Estimate' | string;
  localArtisans: string;
  localArtisansOdia: string;
  recognition: string;
  masterArtisans: string;
  masterArtisansOdia: string;
  verificationStatus: string;
  history: string;
  processVideoUrl: string;
  specialNotes: string;
  image: string;
  has3D: boolean;
}

export interface CategoryOverviewData {
  category: string;
  uniqueArtifacts: number;
  totalListings: number;
  documentedLocalArtisans: number;
  typicalPriceRange: string;
  image: string;
}

export interface VerifiedMasterArtisan {
  id: string;
  name: string;
  nameOdia: string;
  craft: string;
  district: string;
  village: string;
  recognition: string;
  awardYear: string;
  minYearsActive: string;
  notes: string;
  sourceUrl: string;
  status: string;
}

export const ALL_30_ODISHA_DISTRICTS = ${JSON.stringify(allDistricts, null, 2)} as const;

export const CATEGORIES_OVERVIEW: CategoryOverviewData[] = ${JSON.stringify(categoriesOverview, null, 2)};

export const VERIFIED_MASTER_ARTISANS: VerifiedMasterArtisan[] = ${JSON.stringify(verifiedArtisans, null, 2)};

export const ODISHA_ARTIFACTS: OdishaArtifactItem[] = ${JSON.stringify(artifacts, null, 2)};
`;

fs.writeFileSync('src/data/odishaArtifactsData.ts', tsContent);
console.log('Successfully written src/data/odishaArtifactsData.ts with length: ' + tsContent.length);
