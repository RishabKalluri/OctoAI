import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  GitPullRequest,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Filter,
  Calendar,
  Activity
} from 'lucide-react'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import AiBadge from '../components/AiBadge'
import StatusPill from '../components/StatusPill'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    activityToday: 'high',
    blockers: 0,
    prsWaiting: 1,
    staleTickets: 0,
    lastActive: '15 min ago',
    currentWork: 'Payment integration',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    activityToday: 'medium',
    blockers: 1,
    prsWaiting: 2,
    staleTickets: 1,
    lastActive: '1 hour ago',
    currentWork: 'API optimization',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Frontend Engineer',
    activityToday: 'high',
    blockers: 0,
    prsWaiting: 0,
    staleTickets: 0,
    lastActive: '30 min ago',
    currentWork: 'Dashboard redesign',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Backend Engineer',
    activityToday: 'low',
    blockers: 2,
    prsWaiting: 3,
    staleTickets: 2,
    lastActive: '3 hours ago',
    currentWork: 'Database migration',
  },
  {
    id: 5,
    name: 'Alex Thompson',
    role: 'DevOps Engineer',
    activityToday: 'medium',
    blockers: 0,
    prsWaiting: 1,
    staleTickets: 0,
    lastActive: '45 min ago',
    currentWork: 'CI/CD pipeline',
  },
  {
    id: 6,
    name: 'Lisa Wang',
    role: 'Senior Engineer',
    activityToday: 'high',
    blockers: 0,
    prsWaiting: 0,
    staleTickets: 1,
    lastActive: '10 min ago',
    currentWork: 'Auth refactor',
  },
]

const teamSummary = [
  { icon: CheckCircle, text: 'Sprint velocity at 87%, on track for completion', type: 'success' },
  { icon: AlertTriangle, text: 'David Kim has 2 blockers requiring attention', type: 'warning' },
  { icon: GitPullRequest, text: '7 PRs awaiting review across the team', type: 'info' },
  { icon: TrendingUp, text: 'Code review turnaround improved by 23% this week', type: 'success' },
]

const activityLevels = {
  high: { label: 'High', color: 'bg-emerald-400' },
  medium: { label: 'Medium', color: 'bg-amber-400' },
  low: { label: 'Low', color: 'bg-octo-gray-300' },
}

function TeamMemberCard({ member, index }) {
  const activity = activityLevels[member.activityToday]
  const hasIssues = member.blockers > 0 || member.staleTickets > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover className="p-4">
        <div className="flex items-start gap-3">
          <Avatar name={member.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-octo-gray-900 truncate">{member.name}</h3>
              {hasIssues && (
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </div>
            <p className="text-sm text-octo-gray-500">{member.role}</p>
            <p className="mt-1 text-xs text-octo-gray-400">{member.currentWork}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className={`w-2 h-2 rounded-full ${activity.color}`} />
              <span className="text-xs text-octo-gray-500">Activity</span>
            </div>
            <p className="mt-0.5 text-xs font-medium text-octo-gray-700">{activity.label}</p>
          </div>
          <div className="text-center">
            <span className="text-xs text-octo-gray-500">Blockers</span>
            <p className={`mt-0.5 text-xs font-medium ${member.blockers > 0 ? 'text-rose-600' : 'text-octo-gray-700'}`}>
              {member.blockers}
            </p>
          </div>
          <div className="text-center">
            <span className="text-xs text-octo-gray-500">PRs</span>
            <p className={`mt-0.5 text-xs font-medium ${member.prsWaiting > 0 ? 'text-amber-600' : 'text-octo-gray-700'}`}>
              {member.prsWaiting}
            </p>
          </div>
          <div className="text-center">
            <span className="text-xs text-octo-gray-500">Stale</span>
            <p className={`mt-0.5 text-xs font-medium ${member.staleTickets > 0 ? 'text-amber-600' : 'text-octo-gray-700'}`}>
              {member.staleTickets}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-octo-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-octo-gray-400">Last active {member.lastActive}</span>
          <button className="text-xs text-octo-purple-600 hover:text-octo-purple-700 font-medium">
            View details
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ManagerDashboard() {
  const [timeRange, setTimeRange] = useState('today')
  const [selectedTeam, setSelectedTeam] = useState('engineering')

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-octo-gray-25/80 backdrop-blur-sm border-b border-octo-gray-100">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-octo-gray-900">Team Dashboard</h1>
              <p className="mt-0.5 text-sm text-octo-gray-500">Monitor your team's engineering activity and progress</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Filters */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-octo-gray-200 bg-white text-sm text-octo-gray-700 hover:bg-octo-gray-50">
                  <Calendar className="w-4 h-4 text-octo-gray-400" />
                  Today
                  <ChevronDown className="w-3 h-3 text-octo-gray-400" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-octo-gray-200 bg-white text-sm text-octo-gray-700 hover:bg-octo-gray-50">
                  <Users className="w-4 h-4 text-octo-gray-400" />
                  Engineering
                  <ChevronDown className="w-3 h-3 text-octo-gray-400" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-octo-gray-200 bg-white text-sm text-octo-gray-700 hover:bg-octo-gray-50">
                  <Filter className="w-4 h-4 text-octo-gray-400" />
                  Sprint 23
                  <ChevronDown className="w-3 h-3 text-octo-gray-400" />
                </button>
              </div>
              <AiBadge>Monitoring Active</AiBadge>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Team Members', value: '6', icon: Users, color: 'text-octo-purple-600 bg-octo-purple-50' },
                { label: 'PRs in Review', value: '7', icon: GitPullRequest, color: 'text-octo-blue-600 bg-octo-blue-50' },
                { label: 'Active Blockers', value: '3', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
                { label: 'Sprint Progress', value: '87%', icon: Activity, color: 'text-emerald-600 bg-emerald-50' },
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

            {/* Team Grid */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-octo-gray-900 uppercase tracking-wide">Team Overview</h2>
              <button className="text-xs text-octo-purple-600 hover:text-octo-purple-700 font-medium flex items-center gap-1">
                Export report
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, i) => (
                <TeamMemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>

          {/* Right Panel - Team Summary */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-5 sticky top-28" delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-octo-gray-900">Team Summary</h3>
                  <p className="text-[10px] text-octo-purple-600 font-medium">Auto-Generated by Octo</p>
                </div>
              </div>

              <div className="space-y-3">
                {teamSummary.map((item, i) => {
                  const Icon = item.icon
                  const colors = {
                    success: 'text-emerald-500 bg-emerald-50',
                    warning: 'text-amber-500 bg-amber-50',
                    info: 'text-octo-blue-500 bg-octo-blue-50',
                  }
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-octo-gray-50"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${colors[item.type]}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm text-octo-gray-700">{item.text}</p>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-octo-gray-100">
                <p className="text-[10px] text-octo-gray-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Context gathered from GitHub, Jira, Slack
                </p>
              </div>

              {/* Weekly Trends */}
              <div className="mt-5">
                <h4 className="text-xs font-semibold text-octo-gray-700 uppercase tracking-wide mb-3">Weekly Trends</h4>
                <div className="space-y-2">
                  {[
                    { label: 'PRs Merged', value: 23, prev: 18, positive: true },
                    { label: 'Tickets Closed', value: 31, prev: 28, positive: true },
                    { label: 'Avg Review Time', value: '4h', prev: '6h', positive: true },
                  ].map((trend, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-sm text-octo-gray-600">{trend.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-octo-gray-900">{trend.value}</span>
                        <span className={`text-[10px] ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {trend.positive ? '↑' : '↓'} {Math.abs(trend.value - trend.prev) || '2h'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

