import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckSquare,
  GitPullRequest,
  GitCommit,
  MessageSquare,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  Clock,
  User,
  Tag,
  AlertCircle,
  ChevronRight
} from 'lucide-react'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import AiBadge from '../components/AiBadge'
import StatusPill from '../components/StatusPill'

const pendingUpdates = [
  {
    id: 1,
    ticketId: 'JIRA-456',
    title: 'Implement user authentication flow',
    currentStatus: 'In Progress',
    suggestedStatus: 'In Review',
    assignee: 'Sarah Chen',
    priority: 'High',
    reason: 'Octo detected new commits on branch feature/auth and PR #234 opened for review.',
    confidence: 95,
    relatedActivity: [
      { type: 'pr', text: 'PR #234: Auth flow implementation', time: '2 hours ago' },
      { type: 'commit', text: '5 commits pushed to feature/auth', time: '3 hours ago' },
      { type: 'slack', text: '"Auth implementation done, ready for review" — Sarah', time: '2 hours ago' },
    ]
  },
  {
    id: 2,
    ticketId: 'JIRA-789',
    title: 'Payment gateway integration',
    currentStatus: 'In Progress',
    suggestedStatus: 'In Review',
    assignee: 'Marcus Johnson',
    priority: 'Critical',
    reason: 'PR #235 linked to this ticket has been marked as ready for review.',
    confidence: 92,
    relatedActivity: [
      { type: 'pr', text: 'PR #235: Stripe integration', time: '4 hours ago' },
      { type: 'commit', text: '8 commits pushed to feature/payments', time: '5 hours ago' },
    ]
  },
]

const recentAutoUpdates = [
  {
    ticketId: 'JIRA-123',
    title: 'Update API documentation',
    from: 'To Do',
    to: 'Done',
    time: 'Yesterday at 4:30 PM',
    reason: 'PR #229 merged to main'
  },
  {
    ticketId: 'JIRA-234',
    title: 'Fix login redirect bug',
    from: 'In Progress',
    to: 'Done',
    time: 'Yesterday at 2:15 PM',
    reason: 'All linked PRs merged'
  },
  {
    ticketId: 'JIRA-345',
    title: 'Database optimization',
    from: 'To Do',
    to: 'In Progress',
    time: '2 days ago',
    reason: 'First commit detected on linked branch'
  },
]

function JiraTicketCard({ update, index }) {
  const [status, setStatus] = useState('pending') // pending, approved, rejected
  
  const activityIcons = {
    pr: GitPullRequest,
    commit: GitCommit,
    slack: MessageSquare,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`p-0 overflow-hidden ${status !== 'pending' ? 'opacity-60' : ''}`}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-octo-gray-100 bg-octo-gray-50/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-octo-blue-100 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-octo-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-octo-blue-600">{update.ticketId}</span>
                  <StatusPill status={update.priority === 'Critical' ? 'danger' : 'warning'}>
                    {update.priority}
                  </StatusPill>
                </div>
                <h3 className="mt-0.5 font-medium text-octo-gray-900">{update.title}</h3>
              </div>
            </div>
            <a href="#" className="text-octo-gray-400 hover:text-octo-gray-600">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-octo-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-octo-gray-400" />
              <Avatar name={update.assignee} size="sm" />
              <span>{update.assignee}</span>
            </div>
          </div>

          {/* Status change suggestion */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 border border-octo-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-octo-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-octo-purple-700 uppercase tracking-wide">Smart Suggestion</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-octo-purple-600">
                    {update.confidence}% confidence
                  </span>
                </div>
                <p className="mt-1 text-sm text-octo-gray-700">{update.reason}</p>
                
                {/* Status change visualization */}
                <div className="mt-3 flex items-center gap-2">
                  <StatusPill status="neutral">{update.currentStatus}</StatusPill>
                  <ArrowRight className="w-4 h-4 text-octo-gray-400" />
                  <StatusPill status="purple">{update.suggestedStatus}</StatusPill>
                </div>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-octo-gray-500 uppercase tracking-wide mb-2">Related Activity</h4>
            <div className="space-y-2">
              {update.relatedActivity.map((activity, i) => {
                const Icon = activityIcons[activity.type]
                return (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Icon className="w-4 h-4 text-octo-gray-400" />
                    <span className="flex-1 text-octo-gray-600">{activity.text}</span>
                    <span className="text-xs text-octo-gray-400">{activity.time}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action buttons */}
          {status === 'pending' && (
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => setStatus('approved')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-octo-purple-600 text-white text-sm font-medium hover:bg-octo-purple-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                Approve Update
              </button>
              <button
                onClick={() => setStatus('rejected')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-octo-gray-200 text-octo-gray-700 text-sm font-medium hover:bg-octo-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}

          {status === 'approved' && (
            <div className="mt-5 flex items-center gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
              <Check className="w-4 h-4" />
              Update approved — Jira ticket will be updated
            </div>
          )}

          {status === 'rejected' && (
            <div className="mt-5 flex items-center gap-2 p-3 rounded-lg bg-octo-gray-100 text-octo-gray-600 text-sm">
              <X className="w-4 h-4" />
              Update rejected — No changes made
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default function JiraAutoUpdate() {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-octo-gray-25/80 backdrop-blur-sm border-b border-octo-gray-100">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-octo-gray-900">Jira Auto-Updates</h1>
              <p className="mt-0.5 text-sm text-octo-gray-500">Review and approve Octo's suggested ticket updates</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                2 pending reviews
              </span>
              <AiBadge>Auto-Sync Active</AiBadge>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-4xl">
          {/* Pending Updates */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-octo-gray-900 uppercase tracking-wide">Pending Updates</h2>
            <p className="mt-1 text-sm text-octo-gray-500">Octo has detected changes that may require ticket updates</p>
          </div>

          <div className="space-y-6 mb-12">
            {pendingUpdates.map((update, i) => (
              <JiraTicketCard key={update.id} update={update} index={i} />
            ))}
          </div>

          {/* Recent Auto-Updates */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-octo-gray-900 uppercase tracking-wide">Recently Auto-Updated</h2>
            <p className="mt-1 text-sm text-octo-gray-500">Tickets that were automatically updated by Octo</p>
          </div>

          <Card className="divide-y divide-octo-gray-100" delay={0.3}>
            {recentAutoUpdates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="p-4 flex items-center gap-4 hover:bg-octo-gray-50/50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-octo-blue-600">{update.ticketId}</span>
                    <span className="text-sm text-octo-gray-900 truncate">{update.title}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-octo-gray-500">
                    <StatusPill status="neutral" className="!py-0">{update.from}</StatusPill>
                    <ArrowRight className="w-3 h-3" />
                    <StatusPill status="success" className="!py-0">{update.to}</StatusPill>
                    <span className="text-octo-gray-400">•</span>
                    <span>{update.reason}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-octo-gray-400">{update.time}</span>
                  <ChevronRight className="w-4 h-4 text-octo-gray-300" />
                </div>
              </motion.div>
            ))}
          </Card>

          {/* Info banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 border border-octo-purple-100"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-octo-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-octo-gray-900">How Octo Auto-Updates Work</h4>
                <p className="mt-1 text-sm text-octo-gray-600">
                  Octo monitors your GitHub activity and Slack conversations to detect when ticket statuses should change. 
                  When a PR is opened, merged, or when team members mention progress, Octo suggests the appropriate status update.
                </p>
                <p className="mt-2 text-xs text-octo-gray-500">
                  Context gathered from GitHub, Jira, and Slack • Updates require approval by default
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


