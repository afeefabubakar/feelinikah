'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'outline' | 'outline-dark' | 'blue-gradient' | 'ghost' | 'counter'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
  as?: 'button' | 'label' | 'a'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  htmlFor?: string
  href?: string
  target?: string
  rel?: string
}

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      as: Component = 'button',
      type = 'button',
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'text-3xl max-sm:text-2xl inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-[0.98]'

    const variants = {
      primary:
        'bg-[#fdf8f0] hover:bg-[#f5ede0] text-[#260303] shadow-sm border border-transparent disabled:bg-white/10 disabled:text-white/35 disabled:cursor-not-allowed disabled:active:scale-100',
      outline:
        'border border-white/10 bg-white/25 text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
      'outline-dark':
        'border border-[#6d544a]/30 text-[#6d544a] hover:bg-[#6d544a]/5 hover:border-[#6d544a]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
      'blue-gradient':
        'bg-gradient-to-br from-[#35637a] to-[#1e4a5c] text-white shadow-md hover:from-[#2a4f63] hover:to-[#163845] disabled:from-[#35637a]/50 disabled:to-[#1e4a5c]/50 disabled:text-white/40 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100',
      ghost:
        'text-amber-900/40 hover:text-amber-900/70 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100',
      counter:
        'w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white text-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100',
    }

    const sizes = {
      sm: 'px-4 py-1 rounded-md',
      md: 'px-5 py-1.5 rounded-md',
      lg: 'px-6 py-2 rounded-md',
      icon: 'p-1.5 rounded-full',
    }

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      variant !== 'counter' ? sizes[size] : '',
      fullWidth ? 'w-full' : '',
      className,
    )

    // Build element-specific properties
    const elementProps: any = {
      className: combinedClassName,
      ref,
      ...props,
    }

    if (Component === 'button') {
      elementProps.type = type
      elementProps.disabled = disabled
    } else if (Component === 'label') {
      // Add custom disabled behavior for label styling if needed
      if (disabled) {
        elementProps.className = cn(
          combinedClassName,
          'opacity-50 cursor-not-allowed pointer-events-none',
        )
      }
    } else if (Component === 'a') {
      // Anchor elements don't use the `type` or `disabled` attributes
      if (disabled) {
        elementProps.className = cn(
          combinedClassName,
          'opacity-50 cursor-not-allowed pointer-events-none',
        )
      }
    }

    return <Component {...elementProps} />
  },
)

Button.displayName = 'Button'
