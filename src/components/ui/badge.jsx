import React from 'react'

export const Badge = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-900 text-white',
    secondary: 'bg-gray-100 text-gray-900',
    destructive: 'bg-red-100 text-red-900',
    outline: 'border border-gray-200 text-gray-900',
  }
  
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}