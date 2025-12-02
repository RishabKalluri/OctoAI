import { Sparkles } from 'lucide-react'

export default function AiBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 text-octo-purple-700 border border-octo-purple-100 ${className}`}>
      <Sparkles className="w-3 h-3" />
      {children}
    </span>
  )
}

