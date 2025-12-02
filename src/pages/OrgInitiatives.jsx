import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Target,
  Layers,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Shield,
  Zap,
  Clock
} from 'lucide-react'
import Card from '../components/Card'
import AiBadge from '../components/AiBadge'
import StatusPill from '../components/StatusPill'

const initiatives = [
  {
    id: 1,
    name: 'Platform Modernization',
    description: 'Migrate legacy systems to modern cloud infrastructure',
    progress: 72,
    teams: ['Platform', 'Backend', 'DevOps'],
    risk: 'Low',
    blockers: 0,
    dueDate: 'Q1 2024',
    trend: 'up',
    keyMetrics: { velocity: '+12%', tickets: 45, completed: 32 }
  },
  {
    id: 2,
    name: 'Payment System Overhaul',
    description: 'Complete rewrite of payment processing infrastructure',
    progress: 45,
    teams: ['Payments', 'Backend', 'Security'],
    risk: 'Medium',
    blockers: 2,
    dueDate: 'Q2 2024',
    trend: 'stable',
    keyMetrics: { velocity: '+3%', tickets: 38, completed: 17 }
  },
  {
    id: 3,
    name: 'Mobile App v3',
    description: 'Next generation mobile experience with offline support',
    progress: 28,
    teams: ['Mobile', 'API', 'Design'],
    risk: 'High',
    blockers: 4,
    dueDate: 'Q2 2024',
    trend: 'down',
    keyMetrics: { velocity: '-8%', tickets: 62, completed: 17 }
  },
  {
    id: 4,
    name: 'Security Compliance',
    description: 'SOC2 Type II certification and security improvements',
    progress: 89,
    teams: ['Security', 'Platform', 'Legal'],
    risk: 'Low',
    blockers: 0,
    dueDate: 'Q4 2023',
    trend: 'up',
    keyMetrics: { velocity: '+18%', tickets: 23, completed: 20 }
  },
]

const orgInsights = [
  { type: 'warning', text: 'Mobile team blocked by API team on authentication endpoints' },
  { type: 'success', text: 'Backend throughput improved 23% after recent optimizations' },
  { type: 'info', text: 'Security initiative on track for early completion' },
  { type: 'warning', text: 'Payment team velocity declining — recommend resource review' },
  { type: 'success', text: '14 cross-team dependencies resolved this week' },
]

const riskColors = {
  Low: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  High: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
}

function InitiativeCard({ initiative, index }) {
  const risk = riskColors[initiative.risk]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card hover className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-octo-gray-900">{initiative.name}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.text} border ${risk.border}`}>
                {initiative.risk} Risk
              </span>
            </div>
            <p className="mt-1 text-sm text-octo-gray-500">{initiative.description}</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-octo-gray-500">
            <Clock className="w-4 h-4" />
            {initiative.dueDate}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-octo-gray-700">{initiative.progress}% Complete</span>
            <div className="flex items-center gap-1">
              {initiative.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
              {initiative.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
              {initiative.trend === 'stable' && <span className="w-4 h-4 flex items-center justify-center text-octo-gray-400">—</span>}
              <span className={`text-xs font-medium ${
                initiative.trend === 'up' ? 'text-emerald-600' : 
                initiative.trend === 'down' ? 'text-rose-600' : 'text-octo-gray-500'
              }`}>
                {initiative.keyMetrics.velocity}
              </span>
            </div>
          </div>
          <div className="h-2 bg-octo-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${initiative.progress}%` }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
              className={`h-full rounded-full ${
                initiative.risk === 'High' ? 'bg-gradient-to-r from-rose-400 to-rose-500' :
                initiative.risk === 'Medium' ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                'bg-gradient-to-r from-octo-purple-500 to-octo-blue-500'
              }`}
            />
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-octo-gray-400" />
          <div className="flex items-center gap-1.5">
            {initiative.teams.map((team, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium bg-octo-gray-100 text-octo-gray-700">
                {team}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-octo-gray-100">
          <div>
            <p className="text-xs text-octo-gray-500">Total Tickets</p>
            <p className="text-lg font-semibold text-octo-gray-900">{initiative.keyMetrics.tickets}</p>
          </div>
          <div>
            <p className="text-xs text-octo-gray-500">Completed</p>
            <p className="text-lg font-semibold text-emerald-600">{initiative.keyMetrics.completed}</p>
          </div>
          <div>
            <p className="text-xs text-octo-gray-500">Blockers</p>
            <p className={`text-lg font-semibold ${initiative.blockers > 0 ? 'text-rose-600' : 'text-octo-gray-900'}`}>
              {initiative.blockers}
            </p>
          </div>
        </div>

        {/* Blocker warning */}
        {initiative.blockers > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span className="text-sm text-rose-700">
              {initiative.blockers} active blocker{initiative.blockers > 1 ? 's' : ''} detected by Octo
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

export default function OrgInitiatives() {
  const [activeTab, setActiveTab] = useState('initiatives')

  const tabs = [
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'epics', label: 'Epics', icon: Layers },
    { id: 'initiatives', label: 'Initiatives', icon: Target },
  ]

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-octo-gray-25/80 backdrop-blur-sm border-b border-octo-gray-100">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-octo-gray-900">Organization Overview</h1>
              <p className="mt-0.5 text-sm text-octo-gray-500">Track strategic initiatives and cross-team progress</p>
            </div>
            <div className="flex items-center gap-3">
              <AiBadge>AI Insights Active</AiBadge>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-octo-purple-50 text-octo-purple-700'
                      : 'text-octo-gray-600 hover:bg-octo-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-octo-purple-600' : 'text-octo-gray-400'}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Active Initiatives', value: '4', icon: Target, color: 'text-octo-purple-600 bg-octo-purple-50' },
                { label: 'Teams Involved', value: '8', icon: Users, color: 'text-octo-blue-600 bg-octo-blue-50' },
                { label: 'On Track', value: '75%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Total Blockers', value: '6', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
              ].map((stat, i) => (
                <Card key={i} className="p-4" delay={i * 0.05}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-octo-gray-500 uppercase tracking-wide">{stat.label}</p>
                      <p className="mt-1 text-2xl font-semibold text-octo-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Initiatives Grid */}
            <div className="grid grid-cols-2 gap-5">
              {initiatives.map((initiative, i) => (
                <InitiativeCard key={initiative.id} initiative={initiative} index={i} />
              ))}
            </div>
          </div>

          {/* Right Panel - Org Insights */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-5 sticky top-28" delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-octo-gray-900">Org Insights</h3>
                  <p className="text-[10px] text-octo-purple-600 font-medium">Powered by Octo AI</p>
                </div>
              </div>

              <div className="space-y-3">
                {orgInsights.map((insight, i) => {
                  const colors = {
                    success: 'bg-emerald-50 border-emerald-100',
                    warning: 'bg-amber-50 border-amber-100',
                    info: 'bg-octo-blue-50 border-octo-blue-100',
                  }
                  const iconColors = {
                    success: 'text-emerald-500',
                    warning: 'text-amber-500',
                    info: 'text-octo-blue-500',
                  }
                  const icons = {
                    success: TrendingUp,
                    warning: AlertTriangle,
                    info: Zap,
                  }
                  const Icon = icons[insight.type]
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`p-3 rounded-lg border ${colors[insight.type]}`}
                    >
                      <div className="flex items-start gap-2">
                        <Icon className={`w-4 h-4 mt-0.5 ${iconColors[insight.type]}`} />
                        <p className="text-sm text-octo-gray-700">{insight.text}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-octo-gray-100">
                <p className="text-[10px] text-octo-gray-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Analysis based on GitHub, Jira, and Slack data
                </p>
              </div>

              {/* Risk Overview */}
              <div className="mt-5">
                <h4 className="text-xs font-semibold text-octo-gray-700 uppercase tracking-wide mb-3">Risk Distribution</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Low Risk', count: 2, color: 'bg-emerald-400' },
                    { label: 'Medium Risk', count: 1, color: 'bg-amber-400' },
                    { label: 'High Risk', count: 1, color: 'bg-rose-400' },
                  ].map((risk, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${risk.color}`} />
                        <span className="text-sm text-octo-gray-600">{risk.label}</span>
                      </div>
                      <span className="text-sm font-medium text-octo-gray-900">{risk.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-5 pt-4 border-t border-octo-gray-100">
                <h4 className="text-xs font-semibold text-octo-gray-700 uppercase tracking-wide mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Generate Executive Report', icon: ArrowUpRight },
                    { label: 'View All Blockers', icon: AlertTriangle },
                    { label: 'Team Dependencies', icon: Users },
                  ].map((action, i) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={i}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-octo-gray-700 hover:bg-octo-gray-50 transition-colors"
                      >
                        <span>{action.label}</span>
                        <Icon className="w-4 h-4 text-octo-gray-400" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


