import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Groups from './pages/Groups'
import Staff from './pages/Staff'
import VoteWelcome from './pages/vote/VoteWelcome'
import VoteEntry from './pages/vote/VoteEntry'
import VoteConfirm from './pages/vote/VoteConfirm'
import VoteGallery from './pages/vote/VoteGallery'
import VoteDone from './pages/vote/VoteDone'
import VoteResults from './pages/vote/VoteResults'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminResults from './pages/admin/AdminResults'
import { VoteProvider } from './context/VoteContext'
import './App.css'

function TopBanner() {
  return (
    <div className="top-banner" role="banner">
      <span className="top-banner-dot" aria-hidden="true">✦</span>
      <span lang="th">ค่ายสิ้นสุดแล้ว — ขอบคุณทุกคนที่มาร่วมสร้างความทรงจำ</span>
      <span className="top-banner-sep" aria-hidden="true">·</span>
      <span>See you next year.</span>
      <span className="top-banner-dot" aria-hidden="true">✦</span>
    </div>
  )
}

function MainLayout({ children }) {
  return (
    <>
      <TopBanner />
      <div className="layout">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <VoteProvider>
        <Routes>
          {/* Main app with sidebar */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/schedule" element={<MainLayout><Schedule /></MainLayout>} />
          <Route path="/groups" element={<MainLayout><Groups /></MainLayout>} />
          <Route path="/staff" element={<MainLayout><Staff /></MainLayout>} />

          {/* Vote flow — with sidebar */}
          <Route path="/vote" element={<MainLayout><VoteWelcome /></MainLayout>} />
          <Route path="/vote/enter" element={<MainLayout><VoteEntry /></MainLayout>} />
          <Route path="/vote/confirm" element={<MainLayout><VoteConfirm /></MainLayout>} />
          <Route path="/vote/gallery" element={<MainLayout><VoteGallery /></MainLayout>} />
          <Route path="/vote/done" element={<MainLayout><VoteDone /></MainLayout>} />

          {/* Public results — fullscreen, no sidebar */}
          <Route path="/results/:eventId" element={<VoteResults />} />

          {/* Admin — fullscreen, no sidebar */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/results/:eventId" element={<AdminResults />} />
        </Routes>
      </VoteProvider>
    </BrowserRouter>
  )
}
