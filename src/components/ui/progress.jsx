import React from 'react'

export const Progress = ({ value = 0, className = '', ...props }) => {
  return (
    <div
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}
      {...props}
    >
      <div
        className="h-full bg-gray-900 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}