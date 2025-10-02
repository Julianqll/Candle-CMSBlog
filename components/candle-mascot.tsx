import React from 'react'
import { cn } from '@/lib/utils'

interface CandleMascotProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'flame' | 'gentle'
}

export function CandleMascot({ 
  className, 
  size = 'md', 
  variant = 'default' 
}: CandleMascotProps) {
  const sizeClasses = {
    sm: 'w-6 h-8',
    md: 'w-8 h-12',
    lg: 'w-12 h-16'
  }

  const animationClass = variant === 'flame' ? 'candle-flicker' : 'candle-mascot'

  return (
    <div className={cn('candle-mascot inline-block', className)}>
      <svg
        className={cn(sizeClasses[size], animationClass)}
        viewBox="0 0 32 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Candle body */}
        <rect 
          x="12" 
          y="16" 
          width="8" 
          height="24" 
          rx="4" 
          fill="url(#candleGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Candle flame */}
        <ellipse 
          cx="16" 
          cy="12" 
          rx="4" 
          ry="8" 
          fill="url(#flameGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Flame inner glow */}
        <ellipse 
          cx="16" 
          cy="14" 
          rx="2" 
          ry="4" 
          fill="#ffd700"
          opacity="0.8"
        />
        
        {/* Wick */}
        <rect 
          x="15.5" 
          y="8" 
          width="1" 
          height="6" 
          fill="#4a4a4a"
        />
        
        {/* Wax drips */}
        <path 
          d="M14 20 Q16 18 18 20" 
          stroke="#ff9f1c" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.6"
        />
        <path 
          d="M13 28 Q16 26 19 28" 
          stroke="#ff9f1c" 
          strokeWidth="1" 
          fill="none"
          opacity="0.4"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff9f1c" />
            <stop offset="50%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ff7f00" />
          </linearGradient>
          <radialGradient id="flameGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ff9f1c" />
            <stop offset="100%" stopColor="#ff6b35" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export function CandleMascotWithText({ 
  children, 
  className,
  size = 'md',
  variant = 'default'
}: CandleMascotProps & { children: React.ReactNode }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <CandleMascot size={size} variant={variant} />
      <span className="font-medium text-foreground">{children}</span>
    </div>
  )
}
