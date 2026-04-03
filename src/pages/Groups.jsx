import { useState } from 'react'
import './Groups.css'
import STAFF from '../data/staff.js'
import { UNI_META } from '../data/staff.js'

const groups = [
  {
    id: 1,
    label: 'กลุ่มที่ 1',
    composition: 'MU 2 · CU 2 · TU 3',
    members: [
      { name: 'นายเขตต์โสภณ โพธิ์คำ',           nick: 'ก็อต' },
      { name: 'น.ส. ชญานิศ กัปโก',               nick: 'เนย' },
      { name: 'นายคามิน อ่อนทอง',                nick: 'ม่อน' },
      { name: 'นางสาวณัฐสินี อุทัยทวีทิพย์',     nick: 'เฟย์' },
      { name: 'นางสาวนิชา อำพันทอง',             nick: 'นิชา' },
      { name: 'นาย คุณานนท์ ประสาททอง',          nick: 'แฮรี่' },
      { name: 'นางสาวแสนสิริ ภูมิสิทธิ์',        nick: 'ใบพลู' },
    ],
    staff: [
      { nick: 'ไม้',           uni: 'CU' },
      { nick: 'มิกกี้',       uni: 'CU' },
      { nick: 'ไม้โปร',       uni: 'CU' },
      { nick: 'เคท',           uni: 'TU' },
      { nick: 'อุ้ม',          uni: 'MU' },
      { nick: 'เกี๊ยว',        uni: 'MU' },
    ],
  },
  {
    id: 2,
    label: 'กลุ่มที่ 2',
    composition: 'MU 2 · CU 2 · TU 2',
    members: [
      { name: 'น.ส. นภัสนันท์ ค้าเจริญ',         nick: 'เฟิร์น' },
      { name: 'นาย กันติภัช อันชะนะ',            nick: 'บูม' },
      { name: 'นายกฤษณ์ฏิภูมิ สุทธิศีลคุณ',     nick: 'การ์ฟิลด์' },
      { name: 'นางสาวสุทาทิพย์ รอดหลัก',        nick: 'หมิว' },
      { name: 'นายปิยวัฒน์ สุวรรณคำ',           nick: 'อิฐ' },
      { name: 'นางสาวภรณ์ชนก เสริมทรัพย์',      nick: 'ไอติม' },
    ],
    staff: [
      { nick: 'ปอนด์',   uni: 'CU' },
      { nick: 'แพรรี่',  uni: 'CU' },
      { nick: 'ตะวัน',   uni: 'TU' },
      { nick: 'โชกี้',   uni: 'TU' },
      { nick: 'ปอเปิ้ล', uni: 'MU' },
    ],
  },
  {
    id: 3,
    label: 'กลุ่มที่ 3',
    composition: 'MU 2 · CU 2 · TU 2',
    members: [
      { name: 'นางสาวปาณิศา เกียรติ์มนตรี',     nick: 'พริ้นเซส' },
      { name: 'น.ส. บุณณ์ดา พานิชกุล',          nick: 'แน่' },
      { name: 'จักริน ลิ้มป์อุดม',              nick: 'บีม' },
      { name: 'นายวรรธนัย เนตรเกื้อกิจ',        nick: 'เอม' },
      { name: 'นายพัสกร อำพรัตน์',              nick: 'โอม' },
      { name: 'นาย กันตินันท์ ทอธราเมธา',       nick: 'กันต์' },
    ],
    staff: [
      { nick: 'ปิง',       uni: 'CU' },
      { nick: 'น้อบ',      uni: 'CU' },
      { nick: 'ไมน์',      uni: 'TU' },
      { nick: 'คุกกี้',   uni: 'MU' },
    ],
  },
  {
    id: 4,
    label: 'กลุ่มที่ 4',
    composition: 'MU 2 · CU 2 · TU 2',
    members: [
      { name: 'นางสาวชนากานต์ เครือประสิทธิ์',  nick: 'เฟรชชี่' },
      { name: 'นางสาวรุจาภา สันติวสุธา',        nick: 'เพลง' },
      { name: 'นางสาวณัฐชญา ชาวบ้านกร่าง',     nick: 'เกรซ' },
      { name: 'น.ส. ชนกนันท์ มาศจำรัส',         nick: 'ส้มแขก' },
      { name: 'นาย ภคิน เควิน ชาน',             nick: 'เควิน' },
      { name: 'นายพีรพัฒน์ คาวิน',              nick: 'มิก' },
    ],
    staff: [
      { nick: 'แฮมมี่', uni: 'CU' },
      { nick: 'นุ่น',   uni: 'CU' },
      { nick: 'เอก',    uni: 'TU' },
      { nick: 'แบมม',   uni: 'MU' },
    ],
  },
  {
    id: 5,
    label: 'กลุ่มที่ 5',
    composition: 'MU 2 · CU 2 · TU 2',
    members: [
      { name: 'นางสาวดุจมาดา ทนันชัย',          nick: 'มิ้งค์' },
      { name: 'นายนันทพงศ์ ศรีกระสังข์',        nick: 'เวนัส' },
      { name: 'นายจิรวัฒน์ ประเทืองทิพย์',      nick: 'ฟิว' },
      { name: 'น.ส. ญาณิศา วงษ์ท่าเรือ',        nick: 'แพงจัง' },
      { name: 'น.ส. ภาวิดา ผุสดีโสภณ',          nick: 'แพร' },
      { name: 'นางสาวรสสุคนธ์ สุดใจ',           nick: 'ปุ๊บปั๊บ' },
    ],
    staff: [
      { nick: 'อินดี้',  uni: 'CU' },
      { nick: 'พีช',     uni: 'CU' },
      { nick: 'ดีไซน์',  uni: 'TU' },
      { nick: 'เกียร์',  uni: 'MU' },
    ],
  },
  {
    id: 6,
    label: 'กลุ่มที่ 6',
    composition: 'MU 2 · CU 2 · TU 2',
    members: [
      { name: 'นางสาวธัญญ์ภคพร ทีฆวิวรรธน์',   nick: 'มิ้น' },
      { name: 'นาย ภธนน ชื่นอารมย์',            nick: 'โชกุน' },
      { name: 'นายเดชาธร เทพจันอัฒน์',          nick: 'โอเว่น' },
      { name: 'นางสาวพิมพ์ปวีณ์ เพชรเจริญ',    nick: 'หมี่หยก' },
      { name: 'นาย จิรวัฒน์ เจริญวัฒนเมธา',    nick: 'ปลื้ม' },
      { name: 'นางสาวแววดาว เตชะธัญญกุล',      nick: 'แววดาว' },
    ],
    staff: [
      { nick: 'เอิง',  uni: 'CU' },
      { nick: 'วีร์',  uni: 'CU' },
      { nick: 'ตัง',   uni: 'TU' },
      { nick: 'เอิร์น', uni: 'MU' },
      { nick: 'จีจี้', uni: 'MU' },
    ],
  },
]

const uniClass = { CU: 'cu', TU: 'tu', MU: 'mu' }

function Highlight({ text, q }) {
  if (!q) return <>{text}</>
  const lower = text.toLowerCase()
  const lowerQ = q.toLowerCase()
  const idx = lower.indexOf(lowerQ)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="hl">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
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

export default function Groups() {
  const [expanded, setExpanded] = useState(null)
  const [query, setQuery] = useState('')
  const [selectedStaff, setSelectedStaff] = useState(null)

  const q = query.trim()
  const filtered = q
    ? groups.filter(g =>
        g.label.includes(q) ||
        g.members.some(m =>
          m.nick.toLowerCase().includes(q.toLowerCase()) ||
          m.name.includes(q)
        ) ||
        g.staff.some(s => s.nick.includes(q))
      )
    : groups

  return (
    <div className="groups-page">
      <div className="groups-header">
        <div className="groups-header-text">
          <h1 className="groups-title" lang="th">กลุ่ม</h1>
          <p className="groups-subtitle">6 กลุ่ม · CU × TU × MU</p>
        </div>

        <div className="groups-search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="groups-search"
            placeholder="ค้นหาชื่อหรือนิกเนม"
            lang="th"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {q && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="ล้างการค้นหา"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="groups-body">
        {filtered.length === 0 && (
          <p className="groups-empty" lang="th">ไม่พบ "{q}"</p>
        )}

        <div className="group-grid">
          {filtered.map(g => {
            const isOpen = expanded === g.id
            return (
              <div key={g.id} className={`group-card gc-${g.id}${isOpen ? ' open' : ''}`}>
                {/* Card header / toggle */}
                <button
                  className="gc-toggle"
                  onClick={() => setExpanded(isOpen ? null : g.id)}
                  aria-expanded={isOpen}
                >
                  <div className="gc-header-content">
                    <div className="gc-top-row">
                      <span className="gc-num">0{g.id}</span>
                      <span className="gc-member-count" lang="th">{g.members.length} คน</span>
                      <svg className="gc-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    <p className="gc-name" lang="th">{g.label}</p>
                    <p className="gc-comp">{g.composition}</p>

                    {/* Nick preview — visible without expanding */}
                    <div className="gc-nick-row" lang="th">
                      {g.members.map((m, i) => (
                        <span key={i} className="gc-nick-pill">
                          <Highlight text={m.nick} q={q} />
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                {/* Expandable body */}
                <div className="gc-body">
                  <div className="gc-body-inner">
                    <div className="gc-section">
                      <p className="gc-section-label" lang="th">สมาชิก</p>
                      <ul className="gc-member-list">
                        {g.members.map((m, i) => (
                          <li key={i} className="gc-member-row">
                            <div className="gc-avatar" lang="th">{m.nick.charAt(0)}</div>
                            <div className="gc-member-info">
                              <span className="gc-member-nick" lang="th">
                                <Highlight text={m.nick} q={q} />
                              </span>
                              <span className="gc-member-name" lang="th">
                                <Highlight text={m.name} q={q} />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="gc-section gc-section--staff">
                      <p className="gc-section-label" lang="th">สตาฟ</p>
                      <div className="gc-staff-list">
                        {g.staff.map((s, i) => {
                          const staffMember = STAFF.find(staff => staff.nickname === s.nick)
                          return (
                            <div 
                              key={i} 
                              className="gc-staff-chip clickable"
                              onClick={() => staffMember && setSelectedStaff(staffMember)}
                            >
                              <span className={`gc-staff-uni ${uniClass[s.uni]}`}>{s.uni}</span>
                              <span className="gc-staff-nick" lang="th">
                                <Highlight text={s.nick} q={q} />
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
           })}
        </div>
      </div>

      {selectedStaff && (
        <StaffModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />
      )}
    </div>
   )
}
