# Octo — Agentic Engineering Memory

A modern SaaS dashboard for **Octo**, an agentic engineering memory platform for software teams. Octo automatically collects engineering signals from GitHub, Jira, and Slack, then summarizes progress, updates tickets, and provides real-time visibility for developers, managers, and executives.

![Octo Dashboard](https://via.placeholder.com/800x400/7c3aed/ffffff?text=Octo+Dashboard)

## Features

### 🧑‍💻 Developer Daily View ("My Work Log")
- Timeline showing PRs opened/merged, commits with summaries
- Jira tickets auto-updated with smart badges
- Slack check-ins summarized
- Auto-generated daily summary with key insights

### 👥 Manager Team Dashboard
- Overview grid of developers with activity indicators
- Blocker detection, PRs waiting for review, stale tickets
- AI-generated team summary (daily/weekly status)
- Filters for time range, team selection, sprint/epic

### 📋 Jira Auto-Update Screen
- Smart ticket status suggestions based on detected activity
- Approve/Reject workflow for suggested updates
- Activity feed showing commits, PRs, and Slack context
- Confidence scores for AI suggestions

### 🏢 Org-Level Initiative View
- Strategic initiative cards with progress tracking
- Risk level detection (Low/Medium/High)
- Cross-team dependency insights
- Executive-ready org insights powered by Octo AI

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first CSS framework
- **Framer Motion** — Animations
- **React Router 6** — Client-side routing
- **Lucide React** — Icon library

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx       # Main layout with sidebar navigation
│   ├── AiBadge.jsx      # AI-powered feature indicator
│   ├── Avatar.jsx       # User avatar component
│   ├── Card.jsx         # Reusable card component
│   └── StatusPill.jsx   # Status indicator pill
├── pages/
│   ├── DeveloperView.jsx    # Developer's personal work log
│   ├── ManagerDashboard.jsx # Team management dashboard
│   ├── JiraAutoUpdate.jsx   # Jira ticket auto-update review
│   └── OrgInitiatives.jsx   # Organization-level initiatives
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles and Tailwind config
```

## Design System

### Colors
- **Primary**: Deep purple (`#7c3aed`) to blue (`#3b82f6`) gradients
- **Neutrals**: Soft grays with subtle warmth
- **Status**: Emerald (success), Amber (warning), Rose (danger)

### Typography
- Font family: Inter
- Clean, minimal hierarchy
- Consistent spacing and sizing

### Components
- Rounded corners (xl for cards, lg for buttons)
- Subtle shadows (`shadow-soft`)
- Pill-shaped status indicators
- Glass morphism effects for overlays

## License

MIT License — Feel free to use this as a starting point for your own dashboard.

---

Built with ❤️ for the Octo team
