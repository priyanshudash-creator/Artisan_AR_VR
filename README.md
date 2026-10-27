# ArtisanAR/VR — Gaon to Growth
### *Experience the Craft, Understand the Value*

[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Odisha Craft Heritage](https://img.shields.io/badge/Heritage-Odisha%2C%20India-244C3A)](https://odisha.gov.in/)

> **ArtisanAR/VR — Gaon to Growth** is a modern digital craft discovery, digital provenance, and fair-value e-commerce platform dedicated to traditional crafts from **Odisha, India**. The platform connects rural artisan clusters (*Gaon*) directly with national and global markets (*Growth*) through interactive 3D virtual showrooms, transparent digital craft passports, and public-record authenticated master craftspersons.

---

## 🏛️ Project Vision & Symbolism

- **The Vision**: Traditional artisans often receive only a small fraction of retail value while their centuries-old lineage remains invisible. *ArtisanAR/VR* transforms craft e-commerce by pairing physical creations with rich cultural storytelling, 3D immersion, transparent price breakdowns, and verifiable artisan provenance.
- **The Emblem (Konark Chakra)**: The platform logo is inspired by the iconic stone wheels of the **Konark Sun Temple**, symbolizing timeless craftsmanship, cultural geometry, and the perpetual cycle of growth.
- **Visual Identity**: Tailored after modern earthy aesthetics featuring warm ivory (`#F8F5EF`), deep forest green (`#244C3A`), terracotta (`#B85C38`), and warm sandstone (`#E8DCCB`) paired with classical serif headings and clean UI typography.

---

## 🌟 Key Platform Features

### 1. Odisha Craft Marketplace (`/marketplace`)
*A comprehensive digital catalog powered by the official **Odisha Artifacts Dataset v3**.*
- **300 Curated Artifact Listings** spanning all **30 districts** of Odisha.
- **19 Craft Traditions**: Sambalpuri Handloom Ikat, Pattachitra Cloth Scrolls, Dhokra Lost-Wax Metal Art, Pipili Appliqué, Cuttack Silver Filigree (Tarakasi), Stone Sculptures, Terracotta, Talapatra Chitra (Palm-leaf engraving), Sabai Grass, Golden Grass, and more.
- **33 Public-Record Documented Master Craftspersons**: Showcasing real awardees with Odia script names (`ଓଡ଼ିଆ`), districts, and recognized honors (Padma Shri, Shilp Guru, State Handicraft Awards).
- **Multi-Faceted Search & Filters**:
  - Real-time search across artifact names, districts, craft categories, and artisan names in both English and Odia.
  - Quick-filter chips for top craft clusters (*Puri, Cuttack, Sambalpur, Dhenkanal, Bargarh, Koraput, Mayurbhanj, Ganjam*).
  - Searchable 30-district filter with dynamic artifact counts.
  - Price range slider (₹50 to ₹1,50,000) with quick presets (*Under ₹1,000*, *₹1k–₹5k*, *₹5k–₹20k*, *Masterpiece ₹20k+*).
- **Honest Price Transparency Tiers**:
  - 🟢 **Market Researched**: Verified from retrieved retail/cooperative listings (Sambalpuri, Kotpad, etc.).
  - 🟡 **Partly Researched**: Documented through artisan surveys & field records.
  - ⚪ **Advisory Guide**: Clear guidance to confirm with Utkalika, Boyanika, or SHGs before transacting.
- **Interactive Craft Story Modal**: Fullscreen quick-view showing deep folklore history, what makes each piece unique, awards, process videos, and 3D preview links.

### 2. 3D & Augmented Reality Virtual Showroom (`/showroom`)
- **Real-Time 3D Inspection**: Rotate, pan, zoom, inspect surface textures, and toggle between studio, natural, and warm lighting presets.
- **Wireframe & Dimension Modes**: Inspect structural geometric complexity and spatial scale.
- **AR Placement Preview**: View crafts in real room environments to visualize home décor fit.

### 3. Digital Craft Passport (`/passport/:id`)
- **Cryptographic Provenance**: Verifiable digital identity card for every authentic artifact.
- **Cost Transparency Matrix**: Detailed breakdown into *Raw Materials*, *Skilled Labour*, *Studio Overhead*, *Packaging*, *Logistics*, and *Artisan Fair Margin*.
- **Stage-by-Stage Manufacturing Timeline**: Step-by-step documentation from raw material preparation to final polishing.
- **Cultural Geographic Indication (GI)**: Coordinates and heritage notes linking each piece to its ancestral cluster.

### 4. Artisan Onboarding Portal (`/become-an-artisan`)
*A seamless 5-step progressive application workflow:*
1. **Personal & Studio Details**: Full name, studio name, mobile, email, preferred language (Odia / Hindi / English).
2. **Craft Tradition & Geographical Origin**: Primary craft specialization and district selection from all 30 Odisha districts.
3. **Verification & Workshop Evidence**: Identity proof, workshop photographs, and traditional practice documentation.
4. **First Product Cataloging**: Product details, dimensions, materials, and a **multi-image dropzone** with preview and cover photo assignment.
5. **Fair-Price Cost Breakdown & Submission**: Transparent pricing inputs leading to immediate audit logging and moderator review.

### 5. Artisan Dashboard (`/artisan/dashboard`)
- Real-time order dispatch tracking, revenue analytics, and stock monitoring.
- Product catalog manager (`/artisan/products`) with multi-image uploads and cover photo designation (`/artisan/products/new`).
- Verification badge status tracker and studio settings.

### 6. Admin Moderation & Verification Portal (`/admin/login` & `/admin/dashboard`)
- **Secure Authentication**: Dedicated login screen with role credentials quick-fill (Moderator, Curator, Super Admin), 2FA token authentication, and protected routes.
- **Application Review Queue**: Approve, reject, or request additional information with automated audit trail logging.
- **Catalog Governance**: Quality review of product listings and pricing transparency checks.

### 7. Complete Customer Commerce Suite
- **Persistent Cart & Wishlist** (`/cart`, `/account/wishlist`): LocalStorage-synced bag and wishlist management.
- **Side-by-Side Craft Compare Engine** (`/compare`): Matrix comparison of materials, artisan heritage, dimensions, price breakdown, and care instructions.
- **Multi-Step Checkout** (`/checkout`): Full shipping address validation, dynamic shipping estimation, and order confirmation (`/order-confirmation/:id`).
- **Craft Stories Journal** (`/craft-stories`): Editorial photo-essays celebrating Odia craft masters and indigenous techniques.

---

## 📊 Dataset Specifications

The platform is powered by the **Odisha Artifacts Dataset (v3)** parsed from official public records and field surveys:

| Metric | Count | Details |
| :--- | :--- | :--- |
| **Artifact Listings** | **300** | Full district + artifact records with pricing, history, and video links |
| **Districts Covered** | **30 of 30** | 100% geographical coverage across all Odisha districts |
| **Unique Artifacts** | **112** | Distinct craft pieces with verified dimensions and materials |
| **Craft Categories** | **19** | From handloom textiles to lost-wax casting and stone carvings |
| **Documented Masters** | **33** | Public-record master craftspersons with Odia script names and award citations |
| **Price Range** | **₹50 – ₹1,50,000** | Functional clay pots to monumental hand-carved stone sculptures |

### The 19 Craft Categories
1. Paintings (Pattachitra & Saura)
2. Sarees & Handloom Textiles
3. Dhokra Metal Art
4. Jewellery (Silver Filigree Tarakasi, Tribal & Horn)
5. Appliqué, Embroidery & Textile Decor
6. Stone Crafts & Sculptures
7. Palm-leaf Art & Papier-mâché (Talapatra Chitra)
8. Terracotta & Clay Figurines
9. Clay Pots & Functional Pottery
10. Brass & Bell-Metal Decorative Items
11. Utensils (Kansa & Bell-Metal)
12. Baskets, Trays & Storage
13. Bamboo & Cane Furniture
14. Bamboo & Cane General Products
15. Wood Carvings & Sculptures
16. Straw, Grass & Fibre Crafts (Sabai & Golden Grass)
17. Lamps & Traditional Lighting
18. Horn, Betel-nut & Solapith Crafts
19. Traditional Iron Crafts

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** (`19.3.1`) | Component architecture with modern hooks and fast rendering |
| **Language** | **TypeScript** (`~6.0.3`) | Strict end-to-end type safety for all artifacts, users, and orders |
| **Build Tool & Bundler** | **Vite 8** (`8.3.4`) | Instant HMR development server and optimized production bundles |
| **Routing** | **React Router v7** (`7.18.4`) | Client-side routing with smooth scroll-to-top and URL parameter sync |
| **Styling** | **Tailwind CSS v4** (`4.3.3`) | Utility-first styling with `@tailwindcss/vite` integration |
| **Icons** | **Lucide React** (`1.61.0`) | Accessible, consistent iconography |
| **Linter** | **Oxlint** (`1.88.0`) | High-performance Rust-based JavaScript/TypeScript linting |
| **Storage** | **HTML5 LocalStorage** | State persistence for cart, wishlist, compare matrix, and admin sessions |

---

## 📁 Repository Directory Structure

```text
Artisan_AR_VR/
├── public/
│   ├── favicon.svg             # Vector Konark Sun Temple Wheel icon
│   ├── favicon.jpg             # High-res master logo asset
│   └── models/                 # 3D assets (GLTF/GLB models for showroom)
├── src/
│   ├── assets/                 # Curated photography (Pattachitra, Dhokra, Filigree, etc.)
│   ├── components/
│   │   ├── common/             # Badges, demo notices, status chips
│   │   ├── layout/             # Navbar with Konark Wheel logo, Footer, Mobile Navigation
│   │   ├── marketplace/        # ArtifactCard, ArtifactDetailModal, VerifiedArtisansSection
│   │   ├── products/           # ProductCard, PriceBreakdownCard, 3DViewerCanvas
│   │   └── showroom/           # AR/VR controls, Lighting selectors, Wireframe toggles
│   ├── context/
│   │   └── CartWishlistContext.tsx # Global shopping cart, wishlist, compare, and toast state
│   ├── data/
│   │   ├── odishaArtifactsData.ts # Complete 300-row parsed dataset, categories, and artisans
│   │   └── mockData.ts         # User profiles, featured products, initial reviews, audit logs
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage.tsx # Verification queues, audit log, metrics
│   │   │   └── AdminLoginPage.tsx     # Role-based login with 2FA token
│   │   ├── artisan/
│   │   │   └── ArtisanDashboardPage.tsx # Multi-image product creation, orders, settings
│   │   ├── AboutPage.tsx
│   │   ├── AccountPage.tsx
│   │   ├── ApplicationSubmittedPage.tsx
│   │   ├── ArtisanDirectoryPage.tsx
│   │   ├── ArtisanProfilePage.tsx
│   │   ├── BecomeArtisanPage.tsx # 5-step progressive artisan application
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── CraftStoriesPage.tsx
│   │   ├── HomePage.tsx          # Lovable UI aesthetic with hero, clusters, and featured crafts
│   │   ├── MarketplacePage.tsx   # Comprehensive Odisha craft discovery catalog
│   │   ├── NotFoundPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── ProductComparePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductPassportPage.tsx
│   │   └── ShowroomPage.tsx      # 3D interactive virtual showroom
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for products, artisans, orders, districts
│   ├── utils/
│   │   └── artifactAdapter.ts    # Adapter connecting dataset artifacts to cart/compare system
│   ├── App.tsx                   # Master router and route configuration
│   ├── index.css                 # Custom design tokens, scrollbar styling, fonts
│   └── main.tsx                  # React DOM root entry point
├── scripts/
│   └── generate_odisha_data.js   # Automated parser script for Excel dataset export
├── index.html                    # HTML entry point with metadata, SEO, and favicon links
├── package.json                  # Scripts and dependencies
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/priyanshudash-creator/Artisan_AR_VR.git
   cd Artisan_AR_VR
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production bundle**:
   ```bash
   npm run preview
   ```

6. **Run linter**:
   ```bash
   npm run lint
   ```

### ⚡ Deploy to Vercel

The project includes [`vercel.json`](./vercel.json) pre-configured with SPA route rewrites and Vite framework settings.

#### Option A: Deploy via GitHub (Recommended)
1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete craft marketplace and vercel config"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your **`Artisan_AR_VR`** repository.
4. Vercel automatically detects the **Vite** framework, sets **Build Command** to `npm run build`, and **Output Directory** to `dist`.
5. Click **"Deploy"**. Your live platform will be ready in ~1 minute with automatic continuous deployments on every git push!

#### Option B: Deploy via Vercel CLI
```bash
# Run using npx (no global install required)
npx vercel
```
Follow the interactive prompts to link your Vercel account and deploy.

---


## 🔐 Portals & Quick-Access Credentials

The application provides multiple role-based experiences accessible from the navigation:

| Portal | URL Path | Role / Purpose | Quick Credentials |
| :--- | :--- | :--- | :--- |
| **Craft Marketplace** | `/marketplace` | Public craft discovery, search, and filters | None required |
| **3D Virtual Showroom** | `/showroom` | 3D inspection and AR room placement | None required |
| **Artisan Onboarding** | `/become-an-artisan` | 5-step registration for new craftspeople | None required |
| **Artisan Studio** | `/artisan/dashboard` | Product uploads, order dispatch, earnings | Auto-logged in as Master Artisan |
| **Admin Moderation** | `/admin/login` | Application approval, audit logs, catalog | Click **"Fill Demo Credentials"** |

### Admin Login Quick-Fills
- **Curator & Verifier**: `moderator@artisanarvr.gov.in` | Password: `Password@123` | Token: `849201`
- **Senior Curator**: `curator@artisanarvr.org` | Password: `Password@123` | Token: `849201`
- **Super Administrator**: `admin@artisanarvr.org` | Password: `Password@123` | Token: `849201`

---

## 🎨 Design System Tokens

The user interface follows an earthy, culturally grounded design system inspired by the natural landscape and temple architecture of Odisha:

| Token Name | Hex Code | Visual Swatch | Role in UI |
| :--- | :--- | :--- | :--- |
| **Warm Ivory** | `#F8F5EF` | ![#F8F5EF](https://via.placeholder.com/15/F8F5EF/000000?text=+) | Primary application background |
| **Forest Green** | `#244C3A` | ![#244C3A](https://via.placeholder.com/15/244C3A/000000?text=+) | Primary brand color, headings, active states |
| **Terracotta** | `#B85C38` | ![#B85C38](https://via.placeholder.com/15/B85C38/000000?text=+) | Accent color, action buttons, highlight tags |
| **Sandstone** | `#E8DCCB` | ![#E8DCCB](https://via.placeholder.com/15/E8DCCB/000000?text=+) | Soft surface fills, border highlights |
| **Border Tone** | `#E5DED3` | ![#E5DED3](https://via.placeholder.com/15/E5DED3/000000?text=+) | Subtle card borders, dividers |
| **Deep Charcoal** | `#252722` | ![#252722](https://via.placeholder.com/15/252722/000000?text=+) | Primary readable body copy |

---

## ⚖️ Ethical Data & Provenance Principles

1. **No Fictitious Artisans**: As per project rules, only craft masters documented in verified public records (Odisha Directorate of Handicrafts, Padma / Shilp Guru awards) are shown as verified. For remaining field entries, the platform displays *"Artisan profile coming soon (Field survey in progress)"* rather than inventing personas.
2. **Odia Cultural Grounding**: Master craftspersons and craft traditions feature authentic **Odia script (`ଓଡ଼ିଆ`)** names alongside English transliterations to honor their native heritage.
3. **Price Integrity**: Prices marked as *Estimate* are clearly tagged with advisory notices recommending verification with apex state cooperatives (**Utkalika**, **Boyanika**, or certified SHGs) before official commercial transactions.
4. **Fair Trade Margins**: Every product passport surfaces direct artisan labor and material percentages to promote fair remuneration for rural creators.

---

## 🤝 Contributing

Contributions celebrating and digitizing indigenous crafts are warmly welcomed!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License & Acknowledgements

- **License**: Distributed under the MIT License. See `LICENSE` for more information.
- **Data Acknowledgement**: Odisha Artifacts Dataset compiled from public archives of the **Directorate of Handicrafts & Cottage Industries (Government of Odisha)**, **Padma Awardee Archives**, **Shilp Guru Registers**, and **Development Commissioner (Handicrafts), Ministry of Textiles, Government of India**.
- **Cultural Dedication**: Dedicated to the master craftspersons, weavers, and rural artisans of Odisha who have preserved these living traditions across generations.

---

<p align="center">
  <strong>ArtisanAR/VR — Gaon to Growth</strong> • Built with ❤️ for Odisha's Living Heritage
</p>
