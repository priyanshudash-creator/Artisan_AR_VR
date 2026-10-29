export interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  street?: string
  city?: string
  district?: string
  state?: string
  postalCode?: string
  craftAffinity?: string[]
  bio?: string
  joinedDate: string
  isLoggedIn: boolean
}

const STORAGE_KEY = 'shilpa_user_session'

export const getUserSession = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed.isLoggedIn ? parsed : null
  } catch (e) {
    console.error('Failed to parse user session', e)
    return null
  }
}

export const saveUserSession = (profile: Partial<UserProfile>): UserProfile => {
  const existing = getUserSession()
  const updated: UserProfile = {
    id: existing?.id || `user_${Date.now()}`,
    fullName: profile.fullName || existing?.fullName || '',
    email: profile.email || existing?.email || '',
    phone: profile.phone || existing?.phone || '',
    street: profile.street !== undefined ? profile.street : (existing?.street || ''),
    city: profile.city !== undefined ? profile.city : (existing?.city || ''),
    district: profile.district !== undefined ? profile.district : (existing?.district || 'Odisha Heritage Hub'),
    state: profile.state !== undefined ? profile.state : (existing?.state || 'Odisha'),
    postalCode: profile.postalCode !== undefined ? profile.postalCode : (existing?.postalCode || ''),
    craftAffinity: profile.craftAffinity || existing?.craftAffinity || ['Sambalpuri Handloom', 'Cuttack Silver Filigree'],
    bio: profile.bio || existing?.bio || 'Patron of traditional Odisha artisanal craft & indigenous heritage.',
    joinedDate: existing?.joinedDate || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    isLoggedIn: true
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('shilpa_auth_change'))
  return updated
}

export const clearUserSession = (): void => {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('shilpa_auth_change'))
}

export const getInitials = (name: string): string => {
  if (!name.trim()) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
