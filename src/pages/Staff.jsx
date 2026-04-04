import { useState } from 'react'
import './Staff.css'
import STAFF, { UNI_META } from '../data/staff.js'

function StaffCard({ s, onClick }) {
  const isNurse = s.role === 'พยาบาล'
  return (
    <article className={`sc sc--${s.uni.toLowerCase()}`} onClick={() => onClick(s)} style={{ cursor: 'pointer' }}>
      <div className="sc-top">
        <span className="sc-nick" lang="th">{s.nickname}</span>
        <div className="sc-badges">
          {isNurse && <span className="sc-nurse-badge" lang="th">พยาบาล</span>}
          <span className={`sc-uni ${s.uni.toLowerCase()}`}>{s.uni}</span>
        </div>
      </div>
      <p className="sc-name" lang="th">{s.fullName}</p>
      <a className="sc-phone" href={`tel:${s.phone}`} onClick={(e) => e.stopPropagation()}>{s.phone}</a>
    </article>
  )
}

function StaffModal({ staff, onClose }) {
  if (!staff) return null
  const isNurse = staff.role === 'พยาบาล'
  
  return (
    <div className="staff-modal-overlay" onClick={onClose}>
      <div className="staff-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="ปิด">×</button>
        
        <div className="modal-header">
          <div className={`modal-avatar modal-avatar--${staff.uni.toLowerCase()}`}>
            {staff.nickname.charAt(0)}
          </div>
          <h2 className="modal-name" lang="th">{staff.fullName}</h2>
          <p className="modal-nick" lang="th">{staff.nickname}</p>
          <div className="modal-badges">
            {isNurse && <span className="sc-nurse-badge" lang="th">พยาบาล</span>}
            <span className={`modal-uni ${staff.uni.toLowerCase()}`}>
              {UNI_META[staff.uni].label} ({staff.uni})
            </span>
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-detail-item">
            <span className="detail-label" lang="th">บทบาท</span>
            <span className="detail-value" lang="th">{staff.role === '-' ? '-' : staff.role}</span>
          </div>
          
          <div className="modal-detail-item">
            <span className="detail-label" lang="th">เบอร์โทรศัพท์</span>
            <a className="detail-value detail-link" href={`tel:${staff.phone}`}>
              {staff.phone}
            </a>
          </div>

          {staff.group && (
            <div className="modal-detail-item">
              <span className="detail-label" lang="th">กลุ่มที่ดูแล</span>
              <span className="detail-value" lang="th">กลุ่มที่ {staff.group}</span>
            </div>
          )}

          {!staff.group && (
            <div className="modal-detail-item">
              <span className="detail-label" lang="th">กลุ่มที่ดูแล</span>
              <span className="detail-value" lang="th">ไม่ได้อยู่ในกลุ่ม</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Section(props) {
  const { label, sublabel, items, onStaffClick } = props
  
  return (
    <section className="st-section">
      <div className="st-section-header">
        <span className="st-section-label">{label}</span>
        {sublabel && <span className="st-section-sub" lang="th">{sublabel}</span>}
        <span className="st-section-count">{items.length}</span>
      </div>
      <div className="st-grid">
        {items.map(s => <StaffCard key={s.id} s={s} onClick={onStaffClick} />)}
      </div>
    </section>
  )
}

export default function Staff() {
  const [sort, setSort] = useState('uni')
  const [selectedStaff, setSelectedStaff] = useState(null)

  const sections = sort === 'uni'
    ? ['MU', 'CU', 'TU'].map(uni => ({
        key: uni,
        label: uni,
        sublabel: UNI_META[uni].th,
        items: STAFF.filter(s => s.uni === uni),
      }))
    : [1, 2, 3, 4, 5, 6].map(g => ({
        key: `g${g}`,
        label: `กลุ่มที่ ${g}`,
        sublabel: null,
        items: STAFF.filter(s => s.group === g),
      })).concat(
        STAFF.some(s => s.group === null)
          ? [{ key: 'none', label: 'ไม่ได้อยู่ในกลุ่ม', sublabel: null, items: STAFF.filter(s => s.group === null) }]
          : []
      )

  return (
    <div className="staff-page">
      <header className="staff-header">
        <div className="staff-header-text">
          <h1 className="staff-title" lang="th">รายชื่อสตาฟ</h1>
          <p className="staff-subtitle">{STAFF.length} คน · CU × TU × MU</p>
        </div>
        <div className="st-sort-group" role="group" aria-label="เรียงตาม">
          <button
            className={`st-sort-btn${sort === 'uni' ? ' active' : ''}`}
            onClick={() => setSort('uni')}
            lang="th"
          >มหาวิทยาลัย</button>
          <button
            className={`st-sort-btn${sort === 'group' ? ' active' : ''}`}
            onClick={() => setSort('group')}
            lang="th"
          >กลุ่ม</button>
        </div>
      </header>

      <main className="staff-body">
        {sections.map(sec => (
          <Section 
            key={sec.key} 
            label={sec.label} 
            sublabel={sec.sublabel} 
            items={sec.items} 
            onStaffClick={setSelectedStaff}
          />
        ))}
      </main>

      {selectedStaff && (
        <StaffModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />
      )}
    </div>
   )
}
