import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Product, CartItem } from '../types'
import { MOCK_PRODUCTS } from '../data/mockData'
import { getUserSession, UserProfile } from '../utils/userAuth'

interface CartWishlistContextType {
  cart: CartItem[]
  wishlist: string[]
  compareList: string[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  addToCompare: (productId: string) => boolean
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  cartSubtotal: number
  cartShipping: number
  cartTotal: number
  cartCount: number
  wishlistCount: number
  compareCount: number
  toastMessage: string | null
  showToast: (msg: string) => void
  currentUser: UserProfile | null
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined)

const getSafeUserKey = (prefix: string, user: UserProfile | null) => {
  if (user && user.email) {
    const safe = user.email.toLowerCase().replace(/[^a-z0-9]/g, '_')
    return `${prefix}_user_${safe}`
  }
  return `${prefix}_guest`
}

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getUserSession())
  const activeUserRef = useRef<UserProfile | null>(currentUser)
  activeUserRef.current = currentUser

  // Initial cart loader
  const [cart, setCart] = useState<CartItem[]>(() => {
    const user = getUserSession()
    if (!user || !user.isLoggedIn) return []
    const userKey = getSafeUserKey('artisan_cart', user)
    try {
      const savedUser = localStorage.getItem(userKey)
      if (savedUser) return JSON.parse(savedUser)
      // fallback to legacy if user just signed in
      const legacy = localStorage.getItem('artisan_cart')
      if (legacy) return JSON.parse(legacy)
    } catch {
      // fallback
    }
    return []
  })

  // Initial wishlist loader
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const user = getUserSession()
    if (!user || !user.isLoggedIn) return []
    const userKey = getSafeUserKey('artisan_wishlist', user)
    try {
      const savedUser = localStorage.getItem(userKey)
      if (savedUser) return JSON.parse(savedUser)
      // fallback to legacy if user just signed in
      const legacy = localStorage.getItem('artisan_wishlist')
      if (legacy) return JSON.parse(legacy)
    } catch {
      // fallback
    }
    return []
  })

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_compare')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return ['prod-001', 'prod-003']
  })

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Listen to auth changes (Sign In / Sign Out / Switch user)
  useEffect(() => {
    const handleAuthChange = () => {
      const newUser = getUserSession()
      setCurrentUser(newUser)

      if (newUser && newUser.isLoggedIn) {
        // Load this specific user's cart and wishlist
        const cartKey = getSafeUserKey('artisan_cart', newUser)
        const wishlistKey = getSafeUserKey('artisan_wishlist', newUser)

        let loadedCart: CartItem[] = []
        let loadedWishlist: string[] = []

        try {
          const savedCart = localStorage.getItem(cartKey) || localStorage.getItem('artisan_cart')
          if (savedCart) loadedCart = JSON.parse(savedCart)

          const savedWishlist = localStorage.getItem(wishlistKey) || localStorage.getItem('artisan_wishlist')
          if (savedWishlist) loadedWishlist = JSON.parse(savedWishlist)
        } catch (e) {
          console.error('Failed to load user cart/wishlist', e)
        }

        setCart(loadedCart)
        setWishlist(loadedWishlist)
      } else {
        // User signed out -> reset counts to 0
        setCart([])
        setWishlist([])
      }
    }

    window.addEventListener('shilpa_auth_change', handleAuthChange)
    return () => window.removeEventListener('shilpa_auth_change', handleAuthChange)
  }, [])

  // Persist cart
  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      const key = getSafeUserKey('artisan_cart', currentUser)
      try {
        localStorage.setItem(key, JSON.stringify(cart))
        localStorage.setItem('artisan_cart', JSON.stringify(cart))
      } catch {
        // ignore
      }
    }
  }, [cart, currentUser])

  // Persist wishlist
  useEffect(() => {
    if (currentUser && currentUser.isLoggedIn) {
      const key = getSafeUserKey('artisan_wishlist', currentUser)
      try {
        localStorage.setItem(key, JSON.stringify(wishlist))
        localStorage.setItem('artisan_wishlist', JSON.stringify(wishlist))
      } catch {
        // ignore
      }
    }
  }, [wishlist, currentUser])

  // Persist compare
  useEffect(() => {
    try {
      localStorage.setItem('artisan_compare', JSON.stringify(compareList))
    } catch {
      // ignore
    }
  }, [compareList])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const addToCart = (product: Product, quantity = 1) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      showToast('Please sign in to your patron account to add items to your cart.')
      return
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    showToast(`Added "${product.name}" to your cart.`)
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    showToast('Item removed from cart.')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    if (currentUser && currentUser.isLoggedIn) {
      const key = getSafeUserKey('artisan_cart', currentUser)
      localStorage.removeItem(key)
    }
  }

  const toggleWishlist = (productId: string) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      showToast('Please sign in to your patron account to save items to your wishlist.')
      return
    }

    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      showToast(exists ? 'Removed from your wishlist' : 'Saved to your wishlist')
      return next
    })
  }

  const isWishlisted = (productId: string) => wishlist.includes(productId)

  const addToCompare = (productId: string): boolean => {
    if (compareList.includes(productId)) {
      showToast('Product is already in comparison.')
      return true
    }
    if (compareList.length >= 3) {
      showToast('You can compare up to 3 products at a time.')
      return false
    }
    setCompareList((prev) => [...prev, productId])
    showToast('Added to comparison matrix.')
    return true
  }

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId))
    showToast('Removed from comparison.')
  }

  const clearCompare = () => {
    setCompareList([])
  }

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const cartShipping = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 150
  const cartTotal = cartSubtotal + cartShipping

  // Strictly user-specific counts: 0 when not signed in as a patron
  const isPatron = Boolean(currentUser && currentUser.isLoggedIn)
  const cartCount = isPatron ? cart.reduce((count, item) => count + item.quantity, 0) : 0
  const wishlistCount = isPatron ? wishlist.length : 0
  const compareCount = compareList.length

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        addToCompare,
        removeFromCompare,
        clearCompare,
        cartSubtotal,
        cartShipping,
        cartTotal,
        cartCount,
        wishlistCount,
        compareCount,
        toastMessage,
        showToast,
        currentUser
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#244C3A] text-white px-5 py-3.5 rounded-lg shadow-xl border border-[#78816A] animate-slide-up transition-all">
          <span className="w-2 h-2 rounded-full bg-[#B85C38]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </CartWishlistContext.Provider>
  )
}

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext)
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider')
  }
  return context
}
