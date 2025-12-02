import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DeveloperView from './pages/DeveloperView'
import ManagerDashboard from './pages/ManagerDashboard'
import JiraAutoUpdate from './pages/JiraAutoUpdate'
import OrgInitiatives from './pages/OrgInitiatives'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/my-work" replace />} />
          <Route path="my-work" element={<DeveloperView />} />
          <Route path="team" element={<ManagerDashboard />} />
          <Route path="jira" element={<JiraAutoUpdate />} />
          <Route path="org" element={<OrgInitiatives />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
