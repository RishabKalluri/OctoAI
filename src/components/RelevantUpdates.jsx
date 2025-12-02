import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Database,
  Code,
  X,
  ExternalLink,
  Sparkles,
  GitPullRequest,
  MessageSquare,
  CheckSquare,
  Users,
  ChevronRight,
  Bell
} from 'lucide-react'
import Avatar from './Avatar'

const relevantUpdates = [
  {
    id: 1,
    type: 'breaking',
    severity: 'high',
    title: 'Database schema change affecting your work',
    summary: 'The `users` table schema is being modified with new columns that may affect your user-profile feature.',
    icon: Database,
    color: 'rose',
    author: 'David Kim',
    time: '2 hours ago',
    ticket: 'JIRA-501',
    details: {
      what: 'David Kim is migrating the database schema and adding new columns to the `users` table: `subscription_tier`, `billing_cycle`, and `last_payment_date`.',
      why: 'This is part of the subscription billing initiative (JIRA-501). The migration is scheduled for staging on Friday.',
      impact: 'Your current work on the user-profile feature (JIRA-489) queries the `users` table. You may need to update your queries to handle the new columns.',
      notifiedPeople: ['You', 'Sarah Chen', 'Emily Rodriguez'],
      relatedActivity: [
        { type: 'commit', text: 'Migration script for users table', author: 'David Kim', time: '2h ago' },
        { type: 'pr', text: 'PR #241: Database migration scripts', author: 'David Kim', time: '3h ago' },
        { type: 'slack', text: '"Heads up - schema changes incoming"', author: 'David Kim', time: '4h ago' },
      ],
      suggestedAction: 'Review the migration PR #241 and update your user-profile queries before Friday.'
    }
  },
  {
    id: 2,
    type: 'deprecation',
    severity: 'medium',
    title: 'API endpoint you built is being deprecated',
    summary: 'The `/api/v1/analytics/events` endpoint from your work 3 months ago is scheduled for deprecation.',
    icon: Code,
    color: 'amber',
    author: 'Alex Thompson',
    time: '5 hours ago',
    ticket: 'JIRA-445',
    details: {
      what: 'The Analytics API v1 endpoints you built in September are being deprecated as part of the API versioning initiative.',
      why: 'The new v2 API provides better performance and includes breaking changes to the event schema that aren\'t backward compatible.',
      impact: 'You originally built `/api/v1/analytics/events` and `/api/v1/analytics/sessions`. These will be removed in 30 days. 3 internal services still use these endpoints.',
      notifiedPeople: ['You', 'Marcus Johnson', 'Lisa Wang'],
      relatedActivity: [
        { type: 'pr', text: 'PR #232: API v2 migration guide', author: 'Alex Thompson', time: '5h ago' },
        { type: 'jira', text: 'Deprecation notice added to JIRA-445', author: 'Alex Thompson', time: '5h ago' },
        { type: 'slack', text: '"Analytics API v1 sunset timeline"', author: 'Alex Thompson', time: '6h ago' },
      ],
      suggestedAction: 'Help document migration path for v1 → v2. You know the original design decisions best.'
    }
  },
  {
    id: 3,
    type: 'dependency',
    severity: 'low',
    title: 'Your PR is blocking another team',
    summary: 'The Mobile team is waiting on your authentication PR to proceed with their SSO implementation.',
    icon: Users,
    color: 'blue',
    author: 'Lisa Wang',
    time: '1 hour ago',
    ticket: 'JIRA-503',
    details: {
      what: 'Lisa Wang from the Auth team needs your PR #217 (authentication refactor) merged before she can proceed with SSO integration.',
      why: 'The SSO implementation depends on the new token refresh logic in your PR.',
      impact: 'Lisa\'s work is currently blocked. The SSO feature is scheduled for the enterprise release next week.',
      notifiedPeople: ['You', 'Lisa Wang'],
      relatedActivity: [
        { type: 'slack', text: '"Hey, any updates on the auth PR?"', author: 'Lisa Wang', time: '1h ago' },
        { type: 'pr', text: 'PR #240: SSO integration (waiting)', author: 'Lisa Wang', time: '3h ago' },
      ],
      suggestedAction: 'Prioritize getting PR #217 reviewed and merged to unblock Lisa.'
    }
  }
]

const severityStyles = {
  high: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    badge: 'bg-rose-100 text-rose-700',
    icon: 'text-rose-500 bg-rose-100'
  },
  medium: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    icon: 'text-amber-500 bg-amber-100'
  },
  low: {
    bg: 'bg-octo-blue-50',
    border: 'border-octo-blue-200',
    badge: 'bg-octo-blue-100 text-octo-blue-700',
    icon: 'text-octo-blue-500 bg-octo-blue-100'
  }
}

const activityIcons = {
  commit: { icon: Database, color: 'text-octo-gray-500' },
  pr: { icon: GitPullRequest, color: 'text-octo-purple-500' },
  slack: { icon: MessageSquare, color: 'text-octo-blue-500' },
  jira: { icon: CheckSquare, color: 'text-emerald-500' },
}

function UpdateDetailPanel({ update, onClose }) {
  if (!update) return null
  
  const styles = severityStyles[update.severity]
  const Icon = update.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`px-6 py-5 ${styles.bg} border-b ${styles.border}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-octo-gray-900">{update.title}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                      {update.severity === 'high' ? 'High Priority' : update.severity === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar name={update.author} size="sm" />
                    <span className="text-sm text-octo-gray-600">{update.author}</span>
                    <span className="text-octo-gray-300">•</span>
                    <span className="text-sm text-octo-gray-500">{update.time}</span>
                    {update.ticket && (
                      <>
                        <span className="text-octo-gray-300">•</span>
                        <a href="#" className="text-sm text-octo-blue-600 hover:underline">{update.ticket}</a>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/50 text-octo-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto px-6 py-5 space-y-5">
            {/* What happened */}
            <div>
              <h3 className="text-sm font-semibold text-octo-gray-900 mb-2">What's happening</h3>
              <p className="text-sm text-octo-gray-600 leading-relaxed">{update.details.what}</p>
            </div>

            {/* Why */}
            <div>
              <h3 className="text-sm font-semibold text-octo-gray-900 mb-2">Why</h3>
              <p className="text-sm text-octo-gray-600 leading-relaxed">{update.details.why}</p>
            </div>

            {/* Impact on you */}
            <div className="p-4 rounded-xl bg-octo-purple-50 border border-octo-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-octo-purple-500" />
                <h3 className="text-sm font-semibold text-octo-purple-900">Impact on your work</h3>
              </div>
              <p className="text-sm text-octo-purple-800 leading-relaxed">{update.details.impact}</p>
            </div>

            {/* Who was notified */}
            <div>
              <h3 className="text-sm font-semibold text-octo-gray-900 mb-2">Who was notified</h3>
              <div className="flex items-center gap-2">
                {update.details.notifiedPeople.map((person, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-octo-gray-100">
                    {person !== 'You' && <Avatar name={person} size="sm" />}
                    <span className="text-xs font-medium text-octo-gray-700">
                      {person === 'You' ? '👤 You' : person}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related activity */}
            <div>
              <h3 className="text-sm font-semibold text-octo-gray-900 mb-2">Related activity</h3>
              <div className="space-y-2">
                {update.details.relatedActivity.map((activity, i) => {
                  const actType = activityIcons[activity.type]
                  const ActivityIcon = actType.icon
                  return (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-octo-gray-50">
                      <ActivityIcon className={`w-4 h-4 ${actType.color}`} />
                      <span className="flex-1 text-sm text-octo-gray-700">{activity.text}</span>
                      <span className="text-xs text-octo-gray-400">{activity.author}</span>
                      <span className="text-xs text-octo-gray-400">{activity.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Suggested action */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 border border-octo-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-octo-purple-500" />
                <h3 className="text-sm font-semibold text-octo-purple-900">Suggested Action</h3>
              </div>
              <p className="text-sm text-octo-gray-700">{update.details.suggestedAction}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-octo-gray-100 flex items-center justify-between">
            <p className="text-[10px] text-octo-gray-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Octo detected this update is relevant to your work
            </p>
            <button className="px-4 py-2 rounded-lg bg-octo-purple-600 text-white text-sm font-medium hover:bg-octo-purple-700">
              Mark as Read
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function RelevantUpdates() {
  const [selectedUpdate, setSelectedUpdate] = useState(null)

  return (
    <>
      <div className="space-y-3">
        {relevantUpdates.map((update, i) => {
          const styles = severityStyles[update.severity]
          const Icon = update.icon
          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedUpdate(update)}
              className={`p-4 rounded-xl ${styles.bg} border ${styles.border} cursor-pointer hover:shadow-md transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-octo-gray-900 text-sm">{update.title}</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${styles.badge}`}>
                      {update.severity === 'high' ? 'Action needed' : update.severity === 'medium' ? 'FYI' : 'Low priority'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-octo-gray-600 line-clamp-1">{update.summary}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar name={update.author} size="sm" />
                    <span className="text-xs text-octo-gray-500">{update.author}</span>
                    <span className="text-octo-gray-300">•</span>
                    <span className="text-xs text-octo-gray-400">{update.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-octo-gray-400" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Panel */}
      {selectedUpdate && (
        <UpdateDetailPanel
          update={selectedUpdate}
          onClose={() => setSelectedUpdate(null)}
        />
      )}
    </>
  )
}


