import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  GitPullRequest,
  GitCommit,
  CheckSquare,
  MessageSquare,
  Calendar,
  TrendingUp,
  ExternalLink,
  Clock,
  Sparkles,
  Check
} from 'lucide-react'
import Avatar from './Avatar'
import StatusPill from './StatusPill'

const developerData = {
  'Sarah Chen': {
    role: 'Senior Engineer',
    team: 'Platform',
    email: 'sarah.chen@company.com',
    joinedDate: 'Mar 2022',
    stats: {
      prsThisWeek: 5,
      commitsThisWeek: 23,
      ticketsCompleted: 8,
      reviewsGiven: 12
    },
    todaySummary: [
      "Completed payment gateway integration with Stripe webhooks",
      "Fixed edge case in refund flow causing duplicate transactions",
      "Started work on subscription billing module"
    ],
    recentActivity: [
      { type: 'pr_merged', title: 'PR #234 merged: Payment gateway v2', time: '2 hours ago', jira: 'JIRA-456' },
      { type: 'commit', title: '4 commits to feature/subscriptions', time: '3 hours ago' },
      { type: 'jira', title: 'JIRA-456 moved to Done', time: '4 hours ago', auto: true },
      { type: 'pr_opened', title: 'PR #238 opened: Subscription billing', time: '5 hours ago', jira: 'JIRA-501' },
      { type: 'slack', title: 'Check-in: "Wrapping up payment work"', time: '6 hours ago' },
    ]
  },
  'Marcus Johnson': {
    role: 'Full Stack Developer',
    team: 'API',
    email: 'marcus.j@company.com',
    joinedDate: 'Jun 2022',
    stats: {
      prsThisWeek: 3,
      commitsThisWeek: 15,
      ticketsCompleted: 4,
      reviewsGiven: 8
    },
    todaySummary: [
      "Optimizing database queries for user dashboard",
      "Blocked on API rate limiting decision - waiting on architecture review",
      "Reviewed 2 PRs from frontend team"
    ],
    recentActivity: [
      { type: 'commit', title: '6 commits to feature/query-optimization', time: '1 hour ago' },
      { type: 'pr_review', title: 'Reviewed PR #236: Dashboard components', time: '2 hours ago' },
      { type: 'jira', title: 'JIRA-489 marked as Blocked', time: '3 hours ago' },
      { type: 'slack', title: 'Check-in: "Waiting on arch review"', time: '4 hours ago' },
    ]
  },
  'Emily Rodriguez': {
    role: 'Frontend Engineer',
    team: 'Web',
    email: 'emily.r@company.com',
    joinedDate: 'Sep 2022',
    stats: {
      prsThisWeek: 6,
      commitsThisWeek: 31,
      ticketsCompleted: 9,
      reviewsGiven: 5
    },
    todaySummary: [
      "Completed dashboard redesign with new chart components",
      "Fixed accessibility issues flagged in audit",
      "Started mobile responsive improvements"
    ],
    recentActivity: [
      { type: 'pr_merged', title: 'PR #237 merged: Dashboard charts', time: '1 hour ago', jira: 'JIRA-478' },
      { type: 'commit', title: '8 commits to feature/responsive', time: '2 hours ago' },
      { type: 'jira', title: 'JIRA-478 auto-updated to Done', time: '1 hour ago', auto: true },
      { type: 'pr_opened', title: 'PR #239 opened: Mobile responsive', time: '3 hours ago', jira: 'JIRA-492' },
    ]
  },
  'David Kim': {
    role: 'Backend Engineer',
    team: 'Infrastructure',
    email: 'david.k@company.com',
    joinedDate: 'Jan 2023',
    stats: {
      prsThisWeek: 2,
      commitsThisWeek: 9,
      ticketsCompleted: 2,
      reviewsGiven: 3
    },
    todaySummary: [
      "Working on database migration scripts",
      "Blocked: Waiting for staging environment access",
      "Blocked: Need schema approval from DBA team"
    ],
    recentActivity: [
      { type: 'commit', title: '3 commits to feature/db-migration', time: '3 hours ago' },
      { type: 'jira', title: 'JIRA-501 marked as Blocked', time: '4 hours ago' },
      { type: 'slack', title: 'Check-in: "Stuck on env access"', time: '5 hours ago' },
    ]
  },
  'Alex Thompson': {
    role: 'DevOps Engineer',
    team: 'Platform',
    email: 'alex.t@company.com',
    joinedDate: 'Apr 2022',
    stats: {
      prsThisWeek: 4,
      commitsThisWeek: 18,
      ticketsCompleted: 6,
      reviewsGiven: 7
    },
    todaySummary: [
      "Deployed new CI/CD pipeline improvements",
      "Reduced build times by 40%",
      "Setting up monitoring dashboards for new services"
    ],
    recentActivity: [
      { type: 'pr_merged', title: 'PR #232 merged: CI optimizations', time: '2 hours ago', jira: 'JIRA-445' },
      { type: 'commit', title: '5 commits to infra/monitoring', time: '3 hours ago' },
      { type: 'jira', title: 'JIRA-445 auto-updated to Done', time: '2 hours ago', auto: true },
    ]
  },
  'Lisa Wang': {
    role: 'Senior Engineer',
    team: 'Auth',
    email: 'lisa.w@company.com',
    joinedDate: 'Feb 2022',
    stats: {
      prsThisWeek: 7,
      commitsThisWeek: 28,
      ticketsCompleted: 10,
      reviewsGiven: 14
    },
    todaySummary: [
      "Completed JWT token refresh implementation",
      "Fixed security vulnerability in session handling",
      "Started SSO integration for enterprise clients"
    ],
    recentActivity: [
      { type: 'pr_merged', title: 'PR #235 merged: Token refresh', time: '1 hour ago', jira: 'JIRA-467' },
      { type: 'commit', title: '7 commits to feature/sso', time: '2 hours ago' },
      { type: 'pr_opened', title: 'PR #240 opened: SSO integration', time: '3 hours ago', jira: 'JIRA-503' },
      { type: 'jira', title: 'JIRA-467 auto-updated to Done', time: '1 hour ago', auto: true },
    ]
  }
}

const activityIcons = {
  pr_merged: { icon: GitPullRequest, color: 'bg-emerald-100 text-emerald-600' },
  pr_opened: { icon: GitPullRequest, color: 'bg-amber-100 text-amber-600' },
  pr_review: { icon: GitPullRequest, color: 'bg-octo-blue-100 text-octo-blue-600' },
  commit: { icon: GitCommit, color: 'bg-octo-gray-100 text-octo-gray-600' },
  jira: { icon: CheckSquare, color: 'bg-octo-purple-100 text-octo-purple-600' },
  slack: { icon: MessageSquare, color: 'bg-octo-blue-100 text-octo-blue-600' },
}

export default function DeveloperProfile({ developer, isOpen, onClose }) {
  if (!developer) return null
  
  const data = developerData[developer.name] || developerData['Sarah Chen']

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-octo-gray-100 bg-gradient-to-r from-octo-purple-50 to-octo-blue-50">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/50 text-octo-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4">
                <Avatar name={developer.name} size="lg" />
                <div>
                  <h2 className="text-lg font-semibold text-octo-gray-900">{developer.name}</h2>
                  <p className="text-sm text-octo-gray-600">{data.role} · {data.team}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-octo-gray-500">{data.email}</span>
                    <span className="text-octo-gray-300">•</span>
                    <span className="text-xs text-octo-gray-500">Joined {data.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {/* Stats */}
              <div className="px-6 py-4 border-b border-octo-gray-100">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'PRs', value: data.stats.prsThisWeek },
                    { label: 'Commits', value: data.stats.commitsThisWeek },
                    { label: 'Tickets', value: data.stats.ticketsCompleted },
                    { label: 'Reviews', value: data.stats.reviewsGiven },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 rounded-lg bg-octo-gray-50">
                      <p className="text-xl font-semibold text-octo-gray-900">{stat.value}</p>
                      <p className="text-[10px] text-octo-gray-500 uppercase tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-octo-gray-400 text-center mt-2">This week's activity</p>
              </div>

              {/* Today's Summary */}
              <div className="px-6 py-4 border-b border-octo-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-octo-purple-500" />
                  <h3 className="text-sm font-semibold text-octo-gray-900">Today's Summary</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-octo-purple-100 text-octo-purple-700">
                    Auto-Generated
                  </span>
                </div>
                <ul className="space-y-2">
                  {data.todaySummary.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-octo-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activity Timeline */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-octo-gray-900">Recent Activity</h3>
                  <button className="text-xs text-octo-purple-600 hover:text-octo-purple-700 font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {data.recentActivity.map((activity, i) => {
                    const activityType = activityIcons[activity.type]
                    const Icon = activityType.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-octo-gray-50 transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activityType.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-octo-gray-800">{activity.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {activity.jira && (
                              <a href="#" className="text-xs text-octo-blue-600 hover:underline">
                                {activity.jira}
                              </a>
                            )}
                            {activity.auto && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-octo-purple-600">
                                <Sparkles className="w-2.5 h-2.5" />
                                Auto-updated
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-octo-gray-400 whitespace-nowrap">{activity.time}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-octo-gray-100 bg-octo-gray-50">
              <p className="text-[10px] text-octo-gray-400 text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Data gathered from GitHub, Jira, and Slack by Octo
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


