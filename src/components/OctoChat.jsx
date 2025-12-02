import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  GitPullRequest,
  CheckSquare,
  FileText,
  ToggleLeft,
  ToggleRight,
  MessageCircle
} from 'lucide-react'

const conversations = [
  {
    id: 1,
    messages: [
      {
        from: 'octo',
        text: "I noticed progress on JIRA-482. What changed in your approach today?",
        time: '2 min ago'
      },
      {
        from: 'user',
        text: "Switched to using Redis for caching instead of in-memory. Much better performance.",
        time: '1 min ago'
      },
      {
        from: 'octo',
        text: "Got it. I've added this to your work log and updated the ticket description with the caching approach change.",
        time: 'Just now',
        actions: true
      }
    ]
  },
  {
    id: 2,
    messages: [
      {
        from: 'octo',
        text: "Is PR #217 ready for review? I noticed you pushed 3 commits today.",
        time: '5 min ago'
      },
      {
        from: 'user',
        text: "Yes, it's ready. Just need someone from the backend team to review the API changes.",
        time: '4 min ago'
      },
      {
        from: 'octo',
        text: "Perfect. I've marked the PR as ready for review and notified Marcus from the backend team.",
        time: '3 min ago',
        actions: true
      }
    ]
  }
]

const suggestedActions = [
  { icon: CheckSquare, text: 'Update Jira status → In Review', done: true },
  { icon: FileText, text: 'Add caching notes to PR description', done: false },
  { icon: GitPullRequest, text: 'Request review from @marcus', done: true },
]

function OctoAvatar({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }
  
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 flex items-center justify-center shadow-lg`}>
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h1v2a1 1 0 001 1h2a1 1 0 001-1v-2h1a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 14H9v-1h1v1zm4 0h-1v-1h1v1zm1.5-5.59l-.5.34V12a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.25l-.5-.34A4.98 4.98 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.94-1.12 3.63-2.5 4.41z"/>
        <circle cx="9.5" cy="9" r="1.5"/>
        <circle cx="14.5" cy="9" r="1.5"/>
      </svg>
    </div>
  )
}

export default function OctoChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [message, setMessage] = useState('')
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  
  const currentConversation = conversations[0]

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
      setShowSummary(true)
    }
  }

  return (
    <>
      {/* Floating Octo Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true)
              setHasNotification(false)
            }}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
              
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-octo-purple-500 to-octo-blue-500 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h1v2a1 1 0 001 1h2a1 1 0 001-1v-2h1a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 14H9v-1h1v1zm4 0h-1v-1h1v1zm1.5-5.59l-.5.34V12a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.25l-.5-.34A4.98 4.98 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.94-1.12 3.63-2.5 4.41z"/>
                  <circle cx="9.5" cy="9" r="1.5"/>
                  <circle cx="14.5" cy="9" r="1.5"/>
                </svg>
              </div>
              
              {/* Notification badge */}
              {hasNotification && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold shadow-lg"
                >
                  1
                </motion.div>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-octo-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <OctoAvatar size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-octo-gray-900">Octo</h3>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-octo-purple-100 text-octo-purple-700">
                        AI Agent
                      </span>
                    </div>
                    <p className="text-xs text-octo-gray-500">Engineering Memory Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-octo-gray-100 text-octo-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-5 space-y-4">
                {currentConversation.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${msg.from === 'user' ? 'order-1' : ''}`}>
                      {msg.from === 'octo' && (
                        <div className="flex items-center gap-2 mb-1.5">
                          <OctoAvatar size="sm" />
                          <span className="text-xs font-medium text-octo-gray-700">Octo</span>
                          <span className="text-[10px] text-octo-gray-400">{msg.time}</span>
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.from === 'user'
                            ? 'bg-gradient-to-r from-octo-purple-500 to-octo-blue-500 text-white rounded-br-md'
                            : 'bg-octo-gray-100 text-octo-gray-800 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.from === 'user' && (
                        <p className="text-[10px] text-octo-gray-400 text-right mt-1">{msg.time}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Work Log Update Card */}
                {showSummary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    {/* Work Log Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-octo-purple-50 to-octo-blue-50 border border-octo-purple-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center">
                          <FileText className="w-3.5 h-3.5 text-octo-purple-600" />
                        </div>
                        <span className="text-xs font-semibold text-octo-purple-700 uppercase tracking-wide">
                          Work Log Update
                        </span>
                        <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />
                      </div>
                      <p className="text-sm text-octo-gray-700">
                        "Switched caching strategy from in-memory to Redis for better performance and scalability"
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white text-octo-blue-600">
                          JIRA-482
                        </span>
                        <span className="text-[10px] text-octo-gray-500">
                          Added to work log • 2:34 PM
                        </span>
                      </div>
                    </div>

                    {/* Suggested Actions */}
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-octo-gray-700 uppercase tracking-wide mb-2">
                        Suggested Actions
                      </h4>
                      <div className="space-y-2">
                        {suggestedActions.map((action, i) => {
                          const Icon = action.icon
                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${
                                action.done
                                  ? 'bg-emerald-50 border-emerald-100'
                                  : 'bg-white border-octo-gray-150 hover:border-octo-purple-200 cursor-pointer'
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${action.done ? 'text-emerald-500' : 'text-octo-gray-400'}`} />
                              <span className={`text-sm flex-1 ${action.done ? 'text-emerald-700' : 'text-octo-gray-700'}`}>
                                {action.text}
                              </span>
                              {action.done ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <ArrowRight className="w-4 h-4 text-octo-gray-400" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Auto-update toggle */}
                    <div className="mt-4 p-3 rounded-lg bg-octo-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-octo-gray-700">Auto-update next time</p>
                        <p className="text-xs text-octo-gray-500">Let Octo update tickets automatically</p>
                      </div>
                      <button
                        onClick={() => setAutoUpdate(!autoUpdate)}
                        className="text-octo-purple-600"
                      >
                        {autoUpdate ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-octo-gray-400" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-octo-gray-100">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Reply to Octo..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-octo-gray-100 text-sm placeholder-octo-gray-400 focus:outline-none focus:ring-2 focus:ring-octo-purple-500/20 focus:bg-white border border-transparent focus:border-octo-purple-200"
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-octo-purple-500 to-octo-blue-500 flex items-center justify-center text-white hover:shadow-lg transition-shadow"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-octo-gray-400 text-center">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Octo learns from your responses to improve suggestions
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


