import React, { useState } from 'react'
import { Info, HelpCircle } from 'lucide-react'
import { PriceBreakdownItem } from '../../types'

interface PriceBreakdownProps {
  data: PriceBreakdownItem
  sellingPrice: number
  productName?: string
  compact?: boolean
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  data,
  sellingPrice,
  productName,
  compact = false
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const items = [
    {
      key: 'materials',
      label: 'Raw Materials & Dyes',
      amount: data.materials,
      color: '#B85C38',
      desc: 'Pure mulberry silk, natural indigo/madder, recycled bronze alloy, fine silver ingots, or natural clay.'
    },
    {
      key: 'labour',
      label: 'Artisan Labour & Crafting',
      amount: data.labour,
      color: '#244C3A',
      desc: 'Fair artisan remuneration for master craftsmanship, manual handloom weaving, painting, or hand-chiselling.'
    },
    {
      key: 'overhead',
      label: 'Workshop & Loom Overhead',
      amount: data.overhead,
      color: '#78816A',
      desc: 'Loom maintenance, pit furnace firewood, clay seasoning, studio space, and traditional tool upkeep.'
    },
    {
      key: 'packaging',
      label: 'Eco-Craft Packaging',
      amount: data.packaging,
      color: '#D4A373',
      desc: 'Handmade paper boxes, muslin fabric covers, anti-tarnish velvet linings, and protective straw padding.'
    },
    {
      key: 'distribution',
      label: 'Safe Rural Logistics',
      amount: data.distribution,
      color: '#A98467',
      desc: 'Insured transit from remote Odisha villages (Barpali, Raghurajpur, Koraput) to national hubs.'
    },
    {
      key: 'sellerMargin',
      label: 'Fair Community Margin',
      amount: data.sellerMargin,
      color: '#4A5759',
      desc: 'Reinvestment in artisan cooperative training, community health funds, and digital tooling.'
    }
  ]

  const totalCalculated = items.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className={`bg-white border border-[#E5DED3] rounded-xl p-5 md:p-6 shadow-sm ${compact ? 'text-sm' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5DED3]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg md:text-xl font-bold text-[#244C3A]">
              Transparent Price Breakdown
            </h3>
            <span className="text-xs bg-[#E8DCCB] text-[#244C3A] px-2 py-0.5 rounded font-medium">
              Gaon to Growth
            </span>
          </div>
          <p className="text-xs text-[#6B6A63] mt-1">
            {productName ? `Indicative cost components for ${productName}` : 'Understand the fair economic value of genuine craftsmanship'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#6B6A63] block">Calculated Fair Cost</span>
          <span className="font-serif text-xl font-bold text-[#244C3A]">₹{totalCalculated.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Stacked Visual Bar */}
      <div className="my-5">
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-[#E5DED3]">
          {items.map((item) => {
            const percentage = ((item.amount / totalCalculated) * 100).toFixed(1)
            return (
              <div
                key={item.key}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color
                }}
                className="h-full transition-all hover:opacity-90 relative cursor-pointer"
                title={`${item.label}: ₹${item.amount.toLocaleString('en-IN')} (${percentage}%)`}
                onClick={() => setActiveTooltip(activeTooltip === item.key ? null : item.key)}
              />
            )
          })}
        </div>
      </div>

      {/* Grid of Components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
        {items.map((item) => {
          const percentage = ((item.amount / totalCalculated) * 100).toFixed(1)
          const isSelected = activeTooltip === item.key

          return (
            <div
              key={item.key}
              onClick={() => setActiveTooltip(isSelected ? null : item.key)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#B85C38] bg-[#F8F5EF]'
                  : 'border-[#E5DED3]/80 hover:border-[#78816A] bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-xs md:text-sm text-[#252722]">
                    {item.label}
                  </span>
                  <HelpCircle className="w-3.5 h-3.5 text-[#6B6A63] opacity-60" />
                </div>
                <div className="text-right">
                  <span className="font-semibold text-xs md:text-sm text-[#244C3A]">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#6B6A63] ml-1.5">
                    ({percentage}%)
                  </span>
                </div>
              </div>
              {isSelected && (
                <p className="mt-2 text-xs text-[#6B6A63] bg-white p-2 rounded border border-[#E5DED3] animate-fadeIn">
                  {item.desc}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Selling Price vs Cost Note */}
      <div className="mt-4 pt-3 border-t border-[#E5DED3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6A63]">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#252722]">
              Illustrative price estimate — not an audited cost.
            </p>
            <p className="text-[11px] text-[#6B6A63]">
              Based on artisan self-reporting and regional handloom cooperative benchmarks across Odisha. Actual selling price (₹{sellingPrice.toLocaleString('en-IN')}) is determined directly by the artisan guild.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
