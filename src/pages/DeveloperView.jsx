import { motion } from 'framer-motion'
import { 
  GitPullRequest, 
  GitCommit, 
  CheckSquare, 
  MessageSquare,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Check
} from 'lucide-react'
import Card from '../components/Card'
import AiBadge from '../components/AiBadge'
import StatusPill from '../components/StatusPill'

const todaySummary = [
  "Completed 3 PRs including the auth refactor for JIRA-456",
  "Blockers cleared on payment integration — ready for review",
  "Sprint velocity on track at 85% completion"
]

const timelineItems = [
  {
    id: 1,
    type: 'pr_merged',
    icon: GitPullRequest,
    title: 'PR #234 merged: Auth refactor',
    description: 'Refactored authentication flow to use JWT tokens',
    time: '2 hours ago',
    jiraLink: 'JIRA-456',
    status: 'success',
    aiGenerated: true,
  },
  {
    id: 2,
    type: 'commit',
    icon: GitCommit,
    title: '3 commits pushed to feature/payments',
    description: 'Added Stripe webhook handlers and error recovery logic',
    time: '3 hours ago',
    branch: 'feature/payments',
  },
  {
    id: 3,
    type: 'jira_updated',
    icon: CheckSquare,
    title: 'JIRA-789 auto-updated to "In Review"',
    description: 'Octo detected PR #235 linked to this ticket',
    time: '4 hours ago',
    jiraLink: 'JIRA-789',
    aiGenerated: true,
    autoUpdated: true,
  },
  {
    id: 4,
    type: 'slack',
    icon: MessageSquare,
    title: 'Daily check-in summarized',
    description: '"Working on payment edge cases, should be done by EOD"',
    time: '5 hours ago',
    aiGenerated: true,
  },
  {
    id: 5,
    type: 'pr_opened',
    icon: GitPullRequest,
    title: 'PR #235 opened: Payment flow',
    description: 'Implements end-to-end payment processing with Stripe',
    time: '6 hours ago',
    jiraLink: 'JIRA-789',
    status: 'warning',
  },
  {
    id: 6,
    type: 'commit',
    icon: GitCommit,
    title: '5 commits pushed to main',
    description: 'Merged auth changes and updated documentation',
    time: 'Yesterday',
    branch: 'main',
  },
]

const statusColors = {
  success: 'bg-emerald-100 text-emerald-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-octo-blue-100 text-octo-blue-600',
  default: 'bg-octo-gray-100 text-octo-gray-600',
}

function TimelineItem({ item, index }) {
  const Icon = item.icon
  const iconBg = item.status ? statusColors[item.status] : statusColors.default
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-5 top-10 bottom-0 w-px bg-octo-gray-150 last:hidden" />
      
      {/* Icon */}
      <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${iconBg}`}>
        <Icon className="w-4 h-4" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-medium text-octo-gray-900">{item.title}</h4>
              {item.autoUpdated && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-octo-purple-100 text-octo-purple-700">
                  <Sparkles className="w-2.5 h-2.5" />
                  Auto-updated
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-octo-gray-500">{item.description}</p>
            
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              {item.jiraLink && (
                <a href="#" className="inline-flex items-center gap-1 text-xs font-medium text-octo-purple-600 hover:text-octo-purple-700">
                  <CheckSquare className="w-3 h-3" />
                  {item.jiraLink}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              )}
              {item.branch && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-octo-gray-100 text-xs font-mono text-octo-gray-600">
                  {item.branch}
                </span>
              )}
              {item.aiGenerated && (
                <span className="text-[10px] text-octo-gray-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Context gathered by Octo
                </span>
              )}
            </div>
          </div>
          
          <span className="text-xs text-octo-gray-400 whitespace-nowrap">{item.time}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function DeveloperView() {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-octo-gray-25/80 backdrop-blur-sm border-b border-octo-gray-100">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-octo-gray-900">My Work Log</h1>
              <p className="mt-0.5 text-sm text-octo-gray-500">Track your engineering activity across all tools</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-octo-gray-500">
                <Clock className="w-4 h-4" />
                Today
              </span>
              <AiBadge>Live Sync</AiBadge>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-4xl">
          {/* Today's Summary */}
          <Card className="p-5 mb-8" delay={0}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-octo-gray-900">Today's Summary</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-octo-purple-50 text-octo-purple-600 font-medium">
                    Auto-Generated by Octo
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {todaySummary.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-octo-gray-600"
                    >
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'PRs Merged', value: '3', change: '+2 from last week', positive: true },
              { label: 'Commits', value: '18', change: 'Across 4 branches', positive: true },
              { label: 'Tickets Updated', value: '5', change: '2 auto-updated', positive: true },
              { label: 'Active PRs', value: '2', change: '1 waiting review', positive: false },
            ].map((stat, i) => (
              <Card key={i} className="p-4" delay={0.1 + i * 0.05}>
                <p className="text-xs font-medium text-octo-gray-500 uppercase tracking-wide">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-octo-gray-900">{stat.value}</p>
                <p className={`mt-1 text-xs flex items-center gap-1 ${stat.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stat.positive ? <TrendingUp className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {stat.change}
                </p>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-octo-gray-900 uppercase tracking-wide">Activity Timeline</h2>
            <button className="text-xs text-octo-purple-600 hover:text-octo-purple-700 font-medium flex items-center gap-1">
              View all activity
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <Card className="p-6" delay={0.2}>
            <div className="space-y-0">
              {timelineItems.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

