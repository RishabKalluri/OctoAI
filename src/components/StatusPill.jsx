const statusStyles = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  info: 'bg-octo-blue-50 text-octo-blue-600 border-octo-blue-200',
  purple: 'bg-octo-purple-50 text-octo-purple-700 border-octo-purple-200',
  neutral: 'bg-octo-gray-100 text-octo-gray-700 border-octo-gray-200',
}

export default function StatusPill({ children, status = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status]} ${className}`}
    >
      {children}
    </span>
  )
}

