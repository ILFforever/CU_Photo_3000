import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Groups from './pages/Groups'
import Staff from './pages/Staff'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/staff" element={<Staff />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
