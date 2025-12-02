import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings,
  Sparkles,
  CheckSquare
} from 'lucide-react'

const navigation = [
  { name: 'My Work', href: '/my-work', icon: LayoutDashboard },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Jira Updates', href: '/jira', icon: CheckSquare },
  { name: 'Org', href: '/org', icon: Building2 },
]

function OctoLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-octo-purple-600 to-octo-blue-500 flex items-center justify-center shadow-glow">
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 text-white"
          fill="currentColor"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h1v2a1 1 0 001 1h2a1 1 0 001-1v-2h1a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 14H9v-1h1v1zm4 0h-1v-1h1v1zm1.5-5.59l-.5.34V12a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.25l-.5-.34A4.98 4.98 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.94-1.12 3.63-2.5 4.41z"/>
          <circle cx="9.5" cy="9" r="1.5"/>
          <circle cx="14.5" cy="9" r="1.5"/>
        </svg>
      </div>
      <span className="font-semibold text-lg text-octo-gray-900">Octo</span>
    </div>
  )
}

function NavItem({ item }) {
  const Icon = item.icon
  
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-octo-purple-50 text-octo-purple-700'
            : 'text-octo-gray-600 hover:bg-octo-gray-100 hover:text-octo-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-octo-purple-600' : 'text-octo-gray-400'}`} />
          {item.name}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="ml-auto w-1.5 h-1.5 rounded-full bg-octo-purple-600"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-octo-gray-25">
      {/* Sidebar */}
      <aside className="w-60 border-r border-octo-gray-150 bg-white flex flex-col">
        <div className="p-5 border-b border-octo-gray-100">
          <OctoLogo />
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
        
        {/* Bottom section */}
        <div className="p-3 border-t border-octo-gray-100">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-octo-gray-600 hover:bg-octo-gray-100 hover:text-octo-gray-900 transition-all duration-200"
          >
            <Settings className="w-[18px] h-[18px] text-octo-gray-400" />
            Settings
          </NavLink>
          
          {/* AI Status */}
          <div className="mt-3 px-3 py-3 rounded-lg bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 border border-octo-purple-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-octo-purple-500" />
              <span className="text-xs font-medium text-octo-purple-700">Octo AI Active</span>
            </div>
            <p className="mt-1 text-[11px] text-octo-gray-500">
              Monitoring 3 repos, 12 tickets
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

