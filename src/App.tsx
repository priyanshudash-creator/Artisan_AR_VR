import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartWishlistProvider } from './context/CartWishlistContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { DemoNotice } from './components/common/DemoNotice'

// Public Pages
import { HomePage } from './pages/HomePage'
import { MarketplacePage } from './pages/MarketplacePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ShowroomPage } from './pages/ShowroomPage'
import { CraftStoriesPage } from './pages/CraftStoriesPage'
import { ArtisanDirectoryPage } from './pages/ArtisanDirectoryPage'
import { ArtisanProfilePage } from './pages/ArtisanProfilePage'
import { ProductComparePage } from './pages/ProductComparePage'
import { ProductPassportPage } from './pages/ProductPassportPage'
import { AboutPage } from './pages/AboutPage'
import { BecomeArtisanPage } from './pages/BecomeArtisanPage'
import { ApplicationSubmittedPage } from './pages/ApplicationSubmittedPage'

// Customer Pages
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { AccountPage } from './pages/AccountPage'

// Artisan Dashboard
import { ArtisanDashboardPage } from './pages/artisan/ArtisanDashboardPage'

// Admin Dashboard & Auth
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'

// 404
import { NotFoundPage } from './pages/NotFoundPage'

// ScrollToTop component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <CartWishlistProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#252722]">
          <DemoNotice />
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/craft-stories" element={<CraftStoriesPage />} />
              <Route path="/artisans" element={<ArtisanDirectoryPage />} />
              <Route path="/artisans/:id" element={<ArtisanProfilePage />} />
              <Route path="/compare" element={<ProductComparePage />} />
              <Route path="/passport/:id" element={<ProductPassportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/become-an-artisan" element={<BecomeArtisanPage />} />
              <Route path="/artisan/application-submitted" element={<ApplicationSubmittedPage />} />

              {/* Customer Routes */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<AccountPage />} />
              <Route path="/account/wishlist" element={<AccountPage />} />

              {/* Artisan Dashboard Routes */}
              <Route path="/artisan/dashboard" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/profile" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/verification" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/products" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/products/new" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/products/:id/edit" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/pricing" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/orders" element={<ArtisanDashboardPage />} />
              <Route path="/artisan/settings" element={<ArtisanDashboardPage />} />

              {/* Admin Moderation Portal & Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/artisans" element={<AdminDashboardPage />} />
              <Route path="/admin/artisans/:id" element={<AdminDashboardPage />} />
              <Route path="/admin/products" element={<AdminDashboardPage />} />
              <Route path="/admin/categories" element={<AdminDashboardPage />} />
              <Route path="/admin/pricing-reviews" element={<AdminDashboardPage />} />
              <Route path="/admin/orders" element={<AdminDashboardPage />} />
              <Route path="/admin/audit-logs" element={<AdminDashboardPage />} />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </CartWishlistProvider>
    </Router>
  )
}

export default App
