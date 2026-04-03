import { useState } from 'react'
import './Staff.css'
import STAFF, { UNI_META } from '../data/staff.js'

function StaffCard({ s }) {
  const isNurse = s.role === 'พยาบาล'
  return (
    <article className={`sc sc--${s.uni.toLowerCase()}`}>
      <div className="sc-top">
        <span className="sc-nick" lang="th">{s.nickname}</span>
        <div className="sc-badges">
          {isNurse && <span className="sc-nurse-badge" lang="th">พยาบาล</span>}
          <span className={`sc-uni ${s.uni.toLowerCase()}`}>{s.uni}</span>
        </div>
      </div>
      <p className="sc-name" lang="th">{s.fullName}</p>
      <a className="sc-phone" href={`tel:${s.phone}`}>{s.phone}</a>
    </article>
  )
}

function Section({ label, sublabel, items }) {
  return (
    <section className="st-section">
      <div className="st-section-header">
        <span className="st-section-label">{label}</span>
        {sublabel && <span className="st-section-sub" lang="th">{sublabel}</span>}
        <span className="st-section-count">{items.length}</span>
      </div>
      <div className="st-grid">
        {items.map(s => <StaffCard key={s.id} s={s} />)}
      </div>
    </section>
  )
}

export default function Staff() {
  const [sort, setSort] = useState('uni') // 'uni' | 'group'

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
          <Section key={sec.key} label={sec.label} sublabel={sec.sublabel} items={sec.items} />
        ))}
      </main>
    </div>
  )
}
