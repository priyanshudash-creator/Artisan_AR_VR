# SHILPA SETU
### *Experience the Craft, Understand the Value*
### **“Ask SHILPA. Discover the Story Behind Every Craft.”**

[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq API](https://img.shields.io/badge/AI%20Assistant-Groq%20API-f55036?logo=groq&logoColor=white)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Odisha Craft Heritage](https://img.shields.io/badge/Heritage-Odisha%2C%20India-244C3A)](https://odisha.gov.in/)

> **SHILPA SETU** (formerly *ArtisanAR/VR — Gaon to Growth*) is an authentic digital craft discovery, provenance, and fair-value platform dedicated to the traditional crafts of **Odisha, India**. The platform connects rural artisan clusters directly with conscious global patrons through our context-aware AI assistant (**SHILPA**), interactive 3D virtual showrooms, transparent digital craft passports, and public-record authenticated master craftspersons.

---

## 🏛️ Project Vision & Symbolism

- **The Vision**: Traditional artisans often receive only a small fraction of retail value while their centuries-old lineage remains invisible. *SHILPA SETU* transforms craft discovery by pairing physical creations with context-aware AI guidance, rich cultural storytelling, 3D immersion, transparent price breakdowns, and verifiable artisan provenance.
- **The Emblem (Konark Chakra)**: The platform and assistant logo is inspired by the iconic stone wheels of the **Konark Sun Temple**, symbolizing timeless craftsmanship, cultural geometry, and the perpetual cycle of growth.
- **Visual Identity**: Warm ivory (`#FAF7F2` / `#F8F5EF`), deep forest green (`#244C3A`), terracotta (`#B85C38`), and warm sandstone (`#E8DCCB`) paired with classical serif typography and minimal, responsive interface elements.

---

## 🤖 Feature Spotlight: SHILPA (AI Craft Guide)

**SHILPA** is an AI craft assistant powered by the **Groq API** (`llama-3.3-70b-versatile`) designed to help users understand, appreciate, and discover the living traditions behind every Odisha craft.

### 🎯 Key AI Assistant Capabilities

1. **Automatic Artifact Context Awareness**:
   - When opened from a product detail page (`/products/:slug`) or marketplace craft story modal, SHILPA automatically inspects the specific metadata of that piece (materials, technique, artisan details, price data).
   - Users can seamlessly switch crafts using the integrated craft picker or ask general questions about Odisha’s craft ecosystem.

2. **Clean & Natural Conversational Answers**:
   - Formats responses in clean, engaging conversational prose without raw code artifacts, pipe tables, or awkward formatting symbols.
   - Provides clear, authoritative answers focused on the craft's authentic heritage.

3. **Domain-Specific Cultural Knowledge**:
   - **Documented Materials**: Identifies exact natural materials (e.g., hand-treated patta cloth, tamarind seed gum, wild beeswax, alluvial clay, 92.5 sterling silver wire).
   - **Traditional Production Process**: Details multi-stage artisanal techniques (*Pattabanana*, *Bandha Ikat*, lost-wax casting, *Lekhani* etching).
   - **Cultural & Historical Significance**: Explains temple origins, ritual folklore, and centuries of artistic lineage.
   - **Artisan Provenance**: Highlights verified master craftspersons, awards, active generations, and regional clusters.

4. **Zero-Hallucination Price Integrity**:
   - **Audited Cost Breakdown**: Explains itemized costs (raw materials, skilled labor, workshop overhead, packaging, logistics, and fair artisan margin) when documented.
   - **Indicative Price Disclosure**: When an item only has an indicative range, SHILPA transparently states:
     > *“The available dataset lists an indicative price range of ₹X–₹Y per piece. A detailed breakdown of materials, labor, finishing, and other costs is not available in the current records.”*
   - Strictly refuses to invent profit margins or production hours.

5. **Multi-Modal Interaction**:
   - **Voice Input (STT)**: Voice dictation using the Web Speech API.
   - **Audio Narration (TTS)**: Listen to SHILPA narrate craft stories aloud.
   - **Dynamic Suggestion Chips**: Contextual questions tailored to the selected craft.
   - **Multiple Entry Points**: Accessible from the global navbar, persistent floating Konark Wheel button, product pages, and marketplace modal.

---

## 🌟 Complete Platform Features

### 1. Odisha Craft Marketplace (`/marketplace`)
*Powered by the curated **Odisha Artifacts Dataset**.*
- **300 Curated Artifact Listings** across all **30 districts** of Odisha.
- **19 Craft Traditions**: Sambalpuri Handloom Ikat, Pattachitra Painting, Dhokra Lost-Wax Casting, Pipili Appliqué, Cuttack Silver Filigree (Tarakasi), Stone Carving, Terracotta, Talapatra Chitra (Palm-leaf engraving), and more.
- **33 Public-Record Master Craftspersons**: Showcasing real awardees with Odia script names (`ଓଡ଼ିଆ`), districts, and recognized honors.
- **Pixel-Perfect Alignment**: Strict horizontal and vertical grid alignment across cards, titles, descriptions, and action buttons.
- **Interactive Craft Story Modal**: Fullscreen quick-view with historical background, special craft notes, process video searches, and direct **Ask SHILPA** entry points.

### 2. 3D Virtual Showroom (`/showroom`)
- **Blender 3D Interactive Viewer**: Orbit, pan, zoom, and inspect intricate artisanal surface textures.
- **Lighting & Material Presets**: Toggle studio lighting, shadow maps, and wireframe geometry modes.
- **Dimension & Scale Inspection**: Real-world proportions to visualize home and interior fit.

### 3. Digital Craft Passport (`/passport/:id`)
- **Verifiable Provenance**: Digital identity card for authentic Odisha artifacts.
- **Fair-Price Transparency Breakdown**: Audited allocations for *Raw Materials*, *Skilled Labour*, *Studio Overhead*, *Packaging*, *Logistics*, and *Artisan Fair Margin*.
- **Stage-by-Stage Manufacturing Timeline**: Step-by-step documentation from raw material preparation to final inspection.
- **Geographic Indication (GI)**: Heritage notes linking each piece to its ancestral cluster.

### 4. Patron Account & Login (`/login`, `/signup`, `/account`)
- **User-Driven Registration**: Clean, empty forms allowing patrons to input their own name, email, phone, delivery address, and craft interests.
- **Dynamic Profile Generation**: The `/account` dashboard automatically displays the user's entered name, custom initials avatar, email, phone, and delivery address.
- **Profile Updates & Sign Out**: Full in-place editing capabilities with live session synchronization.

### 5. Artisan Studio Portal (`/artisan/login`, `/artisan/dashboard`)
- **Dedicated Artisan Authentication**: Independent login with mobile number/registry ID, secret PIN, and cluster district selection.
- **Permanent Left-Side Navigation**: Responsive left-hand sidebar for studio overview, product cataloging, order tracking, and fair pricing tools.
- **Workshop Inventory Management**: Add handcrafted works, set stock levels, and configure pricing breakdowns.

### 6. Admin Moderation Suite (`/admin/login`, `/admin/dashboard`)
- **State Directorate Portal**: Secure authentication for craft evaluators and provenance auditors.
- **Verification Queue**: Review incoming artisan registrations, inspect evidence, and approve listings.

---

## 🛠️ Technology Stack & Architecture

```
SHILPA SETU Architecture
├── Client (React 19 + TypeScript + Vite + Tailwind CSS v4)
│   ├── ShilpaProvider (Global Assistant Context & Drawer State)
│   ├── ShilpaChatDrawer (Interactive Slide-over Assistant)
│   ├── ShilpaFloatingButton (Konark Wheel trigger)
│   ├── ShilpaMessageBubble (Conversational markdown, audio TTS, sources)
│   ├── shilpaApi.ts (Client API service connecting to backend / Groq)
│   ├── UserLoginPage.tsx (Patron login & registration)
│   ├── AccountPage.tsx (Dynamic patron profile & orders)
│   ├── ArtisanLoginPage.tsx (Dedicated Artisan Studio login)
│   ├── ArtisanDashboardPage.tsx (Left-rail artisan management suite)
│   └── BlenderShowroomViewer.tsx (Interactive 3D model viewer)
│
├── Server-Side Engine (Node.js + Express.js + Groq SDK)
│   ├── /api/shilpa/chat (Context-aware chat endpoint with Groq API)
│   ├── /api/shilpa/status (API health & model status check)
│   ├── /api/shilpa/artifacts (Dataset index endpoint for assistant switcher)
│   ├── artifactKnowledge.js (Server-side resolver for 300+ Odisha craft records)
│   ├── systemPrompt.js (Strict zero-hallucination guardrails & anti-invention rules)
│   ├── faqRetrieval.js (Deterministic intent & knowledge retrieval fallback)
│   └── groqClient.js (Groq SDK client, model resolution, token limits)
│
└── Data & Assets
    ├── odishaArtifactsData.ts (300 authenticated crafts across 30 Odisha districts)
    └── mockData.ts (Artisan profiles, digital passports, orders)
```

---

## ⚙️ Environment Variables & Security

The Groq API key is stored securely on the server side and is **never** exposed to browser storage, public environment variables, or client bundles.

1. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

2. Configure your `.env` variables:
```env
# Groq API Key (Obtain from https://console.groq.com/keys)
GROQ_API_KEY=gsk_your_groq_api_key_here

# Configurable Groq Chat Model
# Recommended options:
# - llama-3.3-70b-versatile (Default: High accuracy, nuanced craft reasoning)
# - llama-3.1-8b-instant (Fast, lightweight inference)
# - mixtral-8x7b-32768 (Strong multilingual & balanced performance)
GROQ_MODEL=llama-3.3-70b-versatile

# Standalone Express Server Port (Optional, default 3001)
PORT=3001
```

> [!NOTE]
> If `GROQ_API_KEY` is not provided or is set to a placeholder, SHILPA automatically runs in **Deterministic Knowledge Engine** mode, answering accurately using verified dataset records and notifying the operator to configure Groq for live LLM inference.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js >= 20.0 (Node 24 recommended)
- npm >= 9.0

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Test Suite
Verify that artifact resolution, price breakdown rules, system prompt guardrails, and deterministic retrieval all pass:
```bash
npm test
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The SHILPA API middleware is mounted automatically on Vite!

### 4. (Optional) Run Standalone Express Server
To run the dedicated backend server on port 3001:
```bash
npm run server
```

### 5. Build for Production
```bash
npm run build
```

---

## 🧪 Automated Testing Suite (`npm test`)

The repository includes a dedicated test runner verifying core behavioral criteria:

| Test Case | Verification Target |
| :--- | :--- |
| **Artifact Resolution (Curated)** | Resolves `prod-002` (Pattachitra) by ID and slug. |
| **Artifact Resolution (300 Dataset)** | Resolves `odisha-art-1` (Terracotta) across 30 districts. |
| **Unknown Artifact Handling** | Returns clean safe fallback without throwing exceptions. |
| **Detailed Price Breakdown** | Explains audited cost components (Materials: ₹1,800, Labour: ₹4,500). |
| **Indicative Price Limitation** | Strictly outputs mandatory limitation notice for unitemized listings. |
| **Question Intent Matcher** | Accurately routes materials, process, price, artisan, and district queries. |
| **Material Grounding** | Validates organic pigments (Patta cloth, Tamarind gum, Conch powder). |
| **System Prompt Integrity** | Confirms presence of zero-hallucination and price non-invention rules. |
| **Dataset Completeness** | Validates 308 listings spanning all 30 districts of Odisha. |

---

## 🔐 Platform Portals & Access Routes

| Portal | URL Route | Description |
| :--- | :--- | :--- |
| **Craft Marketplace** | `/marketplace` | 300 authenticated crafts with filters, search, and Ask SHILPA |
| **AI Assistant (SHILPA)** | Global Drawer / Button | Context-aware AI assistant answering craft, material, and price questions |
| **3D Virtual Showroom** | `/showroom` | Blender 3D interactive model inspection |
| **Patron Login & Sign Up** | `/login` or `/signup` | User authentication with clean inputs and dynamic profile |
| **Patron Profile** | `/account` | Displays user-entered name, initials, address, and craft affinities |
| **Artisan Studio Portal** | `/artisan/login` | Dedicated artisan login with left-rail studio dashboard |
| **Artisan Onboarding** | `/become-an-artisan` | 5-step registration for new Odisha craftspeople |
| **Admin Moderation** | `/admin/login` | Directorate portal for verification and provenance auditing |

---

## 📜 License & Acknowledgements

- **License**: Distributed under the MIT License. See `LICENSE` for details.
- **Data Acknowledgement**: Compiled from public records of the **Directorate of Handicrafts & Cottage Industries (Government of Odisha)**, **Padma Awardee Archives**, and **Development Commissioner (Handicrafts), Ministry of Textiles, Government of India**.
- **Cultural Dedication**: Dedicated to the master craftspersons, weavers, and rural artisans of Odisha who preserve these sacred traditions.

---

<p align="center">
  <strong>SHILPA SETU</strong> • Built with ❤️ for Odisha's Living Craft Heritage
</p>
