import React from 'react'
import { ShieldCheck, Clock, AlertCircle, ShieldAlert } from 'lucide-react'
import { VerificationStatus } from '../../types'

interface VerificationBadgeProps {
  status: VerificationStatus
  showDescription?: boolean
  size?: 'sm' | 'md'
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  showDescription = false,
  size = 'sm'
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Verified':
        return {
          bg: 'bg-[#244C3A]/10 text-[#244C3A] border-[#244C3A]/25',
          icon: <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />,
          label: 'Verified Master Artisan',
          desc: 'Workshop evidence & craft heritage verified'
        }
      case 'Pending Review':
      case 'Under Review':
        return {
          bg: 'bg-[#B85C38]/10 text-[#B85C38] border-[#B85C38]/30',
          icon: <Clock className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />,
          label: status,
          desc: 'Application submitted for moderation review'
        }
      case 'Additional Information Required':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          icon: <AlertCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />,
          label: 'Info Requested',
          desc: 'Requires additional craft documentation'
        }
      case 'Rejected':
        return {
          bg: 'bg-red-50 text-red-800 border-red-200',
          icon: <ShieldAlert className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />,
          label: 'Not Approved',
          desc: 'Verification application declined'
        }
      default:
        return {
          bg: 'bg-[#E5DED3]/60 text-[#6B6A63] border-[#E5DED3]',
          icon: <AlertCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />,
          label: 'Unverified',
          desc: 'Pending verification submission'
        }
    }
  }

  const { bg, icon, label, desc } = getBadgeConfig()

  return (
    <div className="inline-flex flex-col">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-medium ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        } ${bg}`}
      >
        {icon}
        <span>{label}</span>
      </span>
      {showDescription && (
        <span className="text-[11px] text-[#6B6A63] mt-0.5 ml-1">{desc}</span>
      )}
    </div>
  )
}
