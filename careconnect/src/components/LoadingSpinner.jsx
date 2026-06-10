import React from 'react';

export default function LoadingSpinner({ size = 'md', color = 'primary' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4'
  };

  const colorClasses = {
    primary: 'border-blue-600 border-t-transparent dark:border-blue-400',
    white: 'border-white border-t-transparent',
    secondary: 'border-emerald-600 border-t-transparent dark:border-emerald-400'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
