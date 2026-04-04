import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Sidebar.css'

const navItems = [
  {
    to: '/',
    end: true,
    label: 'หน้าหลัก',
    labelEn: 'Home',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 18v-5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/schedule',
    end: false,
    label: 'กำหนดการ',
    labelEn: 'Schedule',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 2v4M13 2v4M3 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 12h2M7 15h2M11 12h2M11 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/groups',
    end: false,
    label: 'กลุ่ม',
    labelEn: 'Groups',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 16c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 12c1.5 0 4 .8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/staff',
    end: false,
    label: 'สตาฟ',
    labelEn: 'Staff',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/buddy',
    end: false,
    label: 'บัดดี้',
    labelEn: 'Buddy',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 17c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },

  ]
 
export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('sidebar-collapsed') !== 'false'
  )
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function toggleCollapse() {
    setCollapsed((v) => {
      localStorage.setItem('sidebar-collapsed', String(!v))
      return !v
    })
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="topbar">
        <button
          className="hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={open}
        >
          <span className={`ham-line ${open ? 'open' : ''}`} />
          <span className={`ham-line ${open ? 'open' : ''}`} />
          <span className={`ham-line ${open ? 'open' : ''}`} />
        </button>
        <span className="topbar-title" lang="th">Photo สัมพันธ์</span>
        <div style={{ width: 40 }} />
      </div>

      {open && (
        <div className="sidebar-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <nav
        className={`sidebar ${open ? 'sidebar-open' : ''} ${collapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Navigation"
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-text">
            <span className="brand-photo">Photo</span>
            <span className="brand-th" lang="th">สัมพันธ์</span>
          </div>
          {/* Desktop collapse toggle */}
          <button
            className="collapse-btn"
            onClick={toggleCollapse}
            aria-label={collapsed ? 'ขยายเมนู' : 'ย่อเมนู'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            <span className="collapse-bar" />
            <span className="collapse-bar" />
            <span className="collapse-bar" />
          </button>
        </div>

        {/* Nav items */}
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                 <span className="sidebar-icon">{item.icon}</span>
                 <span className="sidebar-label">
                   <span className="label-th" lang="th">{item.label}</span>
                   <span className="label-en">{item.labelEn}</span>
                 </span>
               </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <span className="footer-date" lang="th">4–6 เมษายน 2569</span>
        </div>
      </nav>
    </>
  )
}
