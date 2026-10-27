import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product, CartItem } from '../types'
import { MOCK_PRODUCTS } from '../data/mockData'

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
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined)

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_cart')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    // Initial demo cart item
    return [
      { product: MOCK_PRODUCTS[0], quantity: 1 }
    ]
  })

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_wishlist')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return ['prod-002', 'prod-004']
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

  useEffect(() => {
    try {
      localStorage.setItem('artisan_cart', JSON.stringify(cart))
    } catch {
      // ignore
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('artisan_wishlist', JSON.stringify(wishlist))
    } catch {
      // ignore
    }
  }, [wishlist])

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
  }

  const toggleWishlist = (productId: string) => {
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
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)
  const wishlistCount = wishlist.length
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
        showToast
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
