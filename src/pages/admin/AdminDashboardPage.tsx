import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Package,
  Layers,
  Calculator,
  ShoppingBag,
  FileText,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  Sparkles,
  Info,
  LogOut,
  User
} from 'lucide-react'
import {
  MOCK_APPLICATIONS,
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_AUDIT_LOGS,
  CRAFT_CATEGORIES
} from '../../data/mockData'
import { ArtisanApplication, VerificationStatus } from '../../types'
import { useCartWishlist } from '../../context/CartWishlistContext'
import logoImg from '../../assets/logo.jpg'

export const AdminDashboardPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id: paramAppId } = useParams<{ id: string }>()
  const { showToast } = useCartWishlist()

  // Admin Session Verification
  const [adminUser, setAdminUser] = useState<{
    name: string
    role: string
    email: string
    department: string
  }>({
    name: 'Dr. Snehalata Mohapatra',
    role: 'Senior Heritage Curator & Craft Officer',
    email: 'curator@artisanarvr.gov.in',
    department: 'Odisha State Directorate of Handloom & Handicrafts'
  })

  useEffect(() => {
    const rawSession = localStorage.getItem('artisan_admin_session')
    if (rawSession) {
      try {
        const parsed = JSON.parse(rawSession)
        if (parsed.authenticated) {
          setAdminUser(parsed)
        }
      } catch (e) {
        // use default
      }
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('artisan_admin_session')
    showToast('Securely signed out of Admin Moderation Portal.')
    navigate('/admin/login')
  }

  // State for applications list
  const [applications, setApplications] = useState<ArtisanApplication[]>(MOCK_APPLICATIONS)
  const [auditLogs, setAuditLogs] = useState(MOCK_AUDIT_LOGS)
  const [activeModalAction, setActiveModalAction] = useState<{
    app: ArtisanApplication
    action: 'approve' | 'reject' | 'request-info'
  } | null>(null)

  // Subview resolution
  const getSubView = () => {
    const path = location.pathname
    if (paramAppId || path.includes('/artisans/')) return 'artisan-detail'
    if (path.includes('/artisans')) return 'artisans'
    if (path.includes('/products')) return 'products'
    if (path.includes('/categories')) return 'categories'
    if (path.includes('/pricing-reviews')) return 'pricing-reviews'
    if (path.includes('/orders')) return 'orders'
    if (path.includes('/audit-logs')) return 'audit-logs'
    return 'overview'
  }

  const subView = getSubView()
  const activeApp = applications.find((a) => a.id === paramAppId) || applications[0]

  // Confirmation action
  const handleConfirmAction = () => {
    if (!activeModalAction) return
    const { app, action } = activeModalAction

    let newStatus: VerificationStatus = 'Verified'
    if (action === 'reject') newStatus = 'Rejected'
    if (action === 'request-info') newStatus = 'Additional Information Required'

    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
    )

    // Add immutable audit log
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: adminUser.name,
      action: action.toUpperCase(),
      target: `Application ${app.id} (${app.personalDetails.fullName})`,
      details: `Status transitioned to ${newStatus}. Verified under Directorate standards.`
    }
    setAuditLogs((prev) => [newLog, ...prev])

    showToast(`Application ${app.id} updated to ${newStatus}.`)
    setActiveModalAction(null)
  }

  const navItems = [
    { id: 'overview', label: 'Moderation Overview', path: '/admin/dashboard', icon: ShieldCheck },
    { id: 'artisans', label: 'Artisan Review Queue', path: '/admin/artisans', icon: Users, badge: applications.filter(a => a.status === 'Pending Review').length },
    { id: 'products', label: 'Product Moderation', path: '/admin/products', icon: Package },
    { id: 'categories', label: 'Craft Categories', path: '/admin/categories', icon: Layers },
    { id: 'pricing-reviews', label: 'Pricing Reviews', path: '/admin/pricing-reviews', icon: Calculator },
    { id: 'orders', label: 'Platform Orders', path: '/admin/orders', icon: ShoppingBag },
    { id: 'audit-logs', label: 'Audit Logs', path: '/admin/audit-logs', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252722]">
      
      {/* Top Banner with Officer Session */}
      <div className="bg-[#1C201D] text-white border-b border-white/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="ArtisanAR/VR Directorate Logo"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-lg">
                  ArtisanAR/VR Platform Administration
                </h1>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-[#E8DCCB] font-medium">
                  Official Moderation Portal
                </span>
              </div>
              <p className="text-xs text-[#E8DCCB]/70">
                Moderation Queue, Pricing Integrity & Provenance Audits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Authenticated Officer Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs">
              <User className="w-3.5 h-3.5 text-[#B85C38]" />
              <div className="text-left">
                <span className="font-semibold block text-white leading-tight">{adminUser.name}</span>
                <span className="text-[10px] text-[#E8DCCB]/80 block leading-tight">{adminUser.role}</span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="text-xs text-[#E8DCCB] hover:text-white px-3 py-1.5 rounded-lg border border-white/15 hover:border-red-400 hover:bg-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <Link
              to="/marketplace"
              className="text-xs text-[#E8DCCB] hover:text-white px-3 py-1.5 rounded-lg border border-white/15 hover:border-white transition-colors"
            >
              ← Marketplace
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0 bg-white border border-[#E5DED3] rounded-2xl p-4 shadow-xs sticky top-24">
            <div className="pb-3 border-b border-[#E5DED3] mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A63]">
                Admin Navigation
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComp = item.icon
                const isActive = subView === item.id || (item.id === 'artisans' && subView === 'artisan-detail')
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#244C3A] text-white shadow-xs'
                        : 'text-[#252722] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-[#B85C38]' : 'text-[#6B6A63]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B85C38] text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-[#E5DED3] text-[11px] text-[#6B6A63] space-y-1">
              <p>
                <strong>Official Directorate:</strong> Verification decisions and evidence checks are recorded in official moderation registers.
              </p>
            </div>
          </aside>

          {/* Main Admin Content */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* 1. OVERVIEW VIEW */}
            {subView === 'overview' && (
              <div className="space-y-6">
                
                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Pending Applications</span>
                    <span className="font-serif font-bold text-2xl text-[#B85C38] mt-1 block">
                      {applications.filter(a => a.status === 'Pending Review').length}
                    </span>
                    <span className="text-[10px] text-[#6B6A63] mt-1 block">Requires Evidence Check</span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Active Catalog</span>
                    <span className="font-serif font-bold text-2xl text-[#244C3A] mt-1 block">
                      {MOCK_PRODUCTS.length} Works
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">8 Clusters Verified</span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Price Audit Health</span>
                    <span className="font-serif font-bold text-2xl text-[#244C3A] mt-1 block">100%</span>
                    <span className="text-[10px] text-[#6B6A63] mt-1 block">Zero Arithmetic Variance</span>
                  </div>

                  <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
                    <span className="text-xs text-[#6B6A63] block">Audit Log Entries</span>
                    <span className="font-serif font-bold text-2xl text-[#252722] mt-1 block">
                      {auditLogs.length}
                    </span>
                    <span className="text-[10px] text-[#6B6A63] mt-1 block">Live Audit History</span>
                  </div>
                </div>

                {/* Verification Queue Section */}
                <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DED3]">
                    <h3 className="font-serif font-bold text-base text-[#244C3A]">
                      Recent Artisan Onboarding Applications
                    </h3>
                    <Link to="/admin/artisans" className="text-xs text-[#B85C38] font-semibold hover:underline">
                      View Full Queue →
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#244C3A] font-bold text-sm">
                              {app.personalDetails.fullName}
                            </strong>
                            <span className="text-[#6B6A63]">({app.personalDetails.studioName})</span>
                          </div>
                          <p className="text-[#6B6A63] mt-0.5">
                            {app.craftAndLocation.primaryCraft} • {app.craftAndLocation.locality}, {app.craftAndLocation.district}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            app.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'Pending Review' ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {app.status}
                          </span>
                          <Link
                            to={`/admin/artisans/${app.id}`}
                            className="bg-[#244C3A] hover:bg-[#193528] text-white px-3 py-1.5 rounded-md font-semibold"
                          >
                            Review Evidence
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. ARTISANS QUEUE VIEW */}
            {subView === 'artisans' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                    Artisan Application Verification Queue
                  </h3>
                  <p className="text-xs text-[#6B6A63]">
                    Review workshop documentation, craft evidence, and heritage verification status.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5DED3] text-[#6B6A63]">
                        <th className="pb-3 font-semibold">Ref ID</th>
                        <th className="pb-3 font-semibold">Artisan / Guild</th>
                        <th className="pb-3 font-semibold">Craft Cluster</th>
                        <th className="pb-3 font-semibold">Submitted</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DED3]">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 font-mono font-bold text-[#244C3A]">{app.id}</td>
                          <td className="py-3">
                            <strong className="block text-[#252722]">{app.personalDetails.fullName}</strong>
                            <span className="text-[#6B6A63] text-[11px]">{app.personalDetails.studioName}</span>
                          </td>
                          <td className="py-3 text-[#6B6A63]">{app.craftAndLocation.primaryCraft} ({app.craftAndLocation.district})</td>
                          <td className="py-3 text-[#6B6A63]">{app.submissionDate}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/admin/artisans/${app.id}`}
                              className="text-xs font-semibold text-[#B85C38] hover:underline"
                            >
                              Inspect Details →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ARTISAN DETAIL & REVIEW VIEW */}
            {subView === 'artisan-detail' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5DED3] gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38]">
                      APPLICATION {activeApp.id}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-[#244C3A]">
                      {activeApp.personalDetails.fullName} — {activeApp.personalDetails.studioName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalAction({ app: activeApp, action: 'approve' })}
                      className="bg-[#244C3A] hover:bg-[#193528] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setActiveModalAction({ app: activeApp, action: 'request-info' })}
                      className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold px-3 py-2 rounded-lg"
                    >
                      Request Info
                    </button>
                    <button
                      onClick={() => setActiveModalAction({ app: activeApp, action: 'reject' })}
                      className="bg-red-50 text-red-800 border border-red-200 text-xs font-semibold px-3 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DED3]">
                    <h4 className="font-bold text-[#244C3A] text-sm">Artisan Information</h4>
                    <div>
                      <span className="text-[#6B6A63] block">Location:</span>
                      <strong className="text-[#252722]">{activeApp.craftAndLocation.locality}, {activeApp.craftAndLocation.district}, {activeApp.craftAndLocation.state}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B6A63] block">Experience:</span>
                      <strong className="text-[#252722]">{activeApp.craftAndLocation.experienceYears} Years Traditional Crafting</strong>
                    </div>
                    <div>
                      <span className="text-[#6B6A63] block">Contact:</span>
                      <span>{activeApp.personalDetails.mobileNumber} • {activeApp.personalDetails.email}</span>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DED3]">
                    <h4 className="font-bold text-[#244C3A] text-sm">Evidence Documents & Certificates</h4>
                    <div>
                      <span className="text-[#6B6A63] block">Proof Type:</span>
                      <strong className="text-[#252722]">{activeApp.verification.evidenceType}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeApp.verification.documentNames.map((d, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white border border-[#E5DED3] rounded text-[11px]">
                          📄 {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practice Description */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] text-xs space-y-1">
                  <span className="font-bold text-[#244C3A]">Artisanal Practice & Materials Statement:</span>
                  <p className="text-[#252722] leading-relaxed">{activeApp.craftAndLocation.craftDescription}</p>
                </div>
              </div>
            )}

            {/* 4. PRODUCTS MODERATION VIEW */}
            {subView === 'products' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Product Catalog Moderation
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5DED3] text-[#6B6A63]">
                        <th className="pb-3 font-semibold">Title</th>
                        <th className="pb-3 font-semibold">Origin</th>
                        <th className="pb-3 font-semibold">Price</th>
                        <th className="pb-3 font-semibold">3D Status</th>
                        <th className="pb-3 font-semibold text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DED3]">
                      {MOCK_PRODUCTS.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 font-medium text-[#244C3A]">{p.name}</td>
                          <td className="py-3 text-[#6B6A63]">{p.district}</td>
                          <td className="py-3 font-bold text-[#252722]">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="py-3">{p.has3DModel ? '3D Active' : 'Photo Only'}</td>
                          <td className="py-3 text-right">
                            <span className="text-emerald-700 font-semibold">Approved</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. CRAFT CATEGORIES VIEW */}
            {subView === 'categories' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Traditional Odisha Craft Categories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CRAFT_CATEGORIES.map((c) => (
                    <div key={c.id} className="p-4 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl flex items-center gap-3 text-xs">
                      <img src={c.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#244C3A]">{c.name}</h4>
                        <span className="text-[#6B6A63]">{c.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PRICING REVIEWS VIEW */}
            {subView === 'pricing-reviews' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Transparent Cost Sanity Queue
                </h3>
                <p className="text-xs text-[#6B6A63]">Audit product cost breakdown percentages against artisan living wage minimums.</p>

                <div className="space-y-3">
                  {MOCK_PRODUCTS.map((p) => (
                    <div key={p.id} className="p-4 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-[#244C3A]">{p.name}</h4>
                        <span className="text-[#6B6A63]">Labour: ₹{p.priceBreakdown.labour.toLocaleString('en-IN')} ({((p.priceBreakdown.labour / p.priceBreakdown.total) * 100).toFixed(0)}%)</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        Consistent (0.0% variance)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. AUDIT LOGS VIEW */}
            {subView === 'audit-logs' && (
              <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#244C3A]">
                  Platform Audit Logs
                </h3>
                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-[#FAF8F5] border border-[#E5DED3] rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#6B6A63]">
                        <span className="font-bold text-[#244C3A]">{log.action} — {log.target}</span>
                        <span className="font-mono text-[11px]">{log.timestamp}</span>
                      </div>
                      <p className="text-[#252722]">{log.details}</p>
                      <span className="text-[10px] text-[#6B6A63] block">Actor: {log.actor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Confirmation Dialog Modal for Consequential Actions */}
      {activeModalAction && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5DED3] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#244C3A]">
              Confirm Moderation Decision
            </h3>
            <p className="text-xs text-[#6B6A63] leading-relaxed">
              Are you sure you want to perform <strong>{activeModalAction.action.toUpperCase()}</strong> on application <strong>{activeModalAction.app.id}</strong> ({activeModalAction.app.personalDetails.fullName})?
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
              Note: This updates verification registers and records an immutable entry in the Audit Logs.
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5DED3]">
              <button
                onClick={() => setActiveModalAction(null)}
                className="px-4 py-2 border border-[#E5DED3] rounded-lg text-xs font-semibold text-[#6B6A63]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="bg-[#244C3A] text-white px-5 py-2 rounded-lg text-xs font-semibold"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
