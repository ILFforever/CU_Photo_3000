import { useState, useEffect } from 'react'
import './Schedule.css'

const days = [
  {
    day: 1,
    label: 'Day 1',
    date: 'เสาร์ 4 เมษายน 2569',
    dateShort: 'เสาร์ 4 เม.ย.',
    isoDate: '2026-04-04',
    activities: [
      { start: '07:45', end: '08:15', th: 'ลงทะเบียน ใต้ตึกมหามงกุฎ คณะวิทยาศาสตร์', en: 'Registration' },
      { start: '08:30', end: '10:00', th: 'เดินทางไปยัง ปตท.องค์รักษ์', en: 'Travel to PTT Ong Kharak' },
      { start: '10:00', end: '10:20', th: 'แวะพักที่ ปตท.องค์รักษ์', en: 'Rest stop' },
      { start: '10:20', end: '11:45', th: 'เดินทางไปยังอิงธารรีสอร์ต', en: 'Travel to Ing Tarn Resort' },
      { start: '12:00', end: '14:00', th: 'Ice breaking + ???', en: 'Ice breaking' },
      { start: '14:20', end: '15:45', th: 'เที่ยวชมน้ำตกนางรอง', en: 'Nang Rong Waterfall' },
      { start: '16:05', end: '17:40', th: 'เที่ยวชมเขื่อนขุนด่านปราการชล', en: 'Khun Dan Prakan Chon Dam' },
      { start: '18:00', end: '19:00', th: 'Dinner time', en: 'Dinner' },
      { start: '19:00', end: '19:30', th: 'เก็บของเข้าที่พัก', en: 'Check in' },
      { start: '19:30', end: '20:30', th: 'สปอยกิจกรรมวันถัดไป', en: 'Preview next day' },
      { start: '20:30', end: null,    th: 'พักผ่อนตามอัธยาศัย', en: 'Free time' },
    ],
  },
  {
    day: 2,
    label: 'Day 2',
    date: 'อาทิตย์ 5 เมษายน 2569',
    dateShort: 'อาทิตย์ 5 เม.ย.',
    isoDate: '2026-04-05',
    activities: [
      { start: '06:30', end: '08:20', th: 'Breakfast', en: 'Breakfast' },
      { start: '08:30', end: '11:00', th: 'เดินทางไปยังอุทยานแห่งชาติเขาใหญ่', en: 'Travel to Khao Yai National Park' },
      { start: '11:00', end: '12:20', th: 'Lunch', en: 'Lunch' },
      { start: '12:20', end: '15:00', th: 'เดินศึกษาเส้นทางธรรมชาติ เส้นทางที่ 1', en: 'Nature trail no. 1' },
      { start: '15:10', end: '16:00', th: 'เดินเล่นริมอ่างเก็บน้ำสายศร', en: 'Sai Son Reservoir walk' },
      { start: '16:00', end: '18:00', th: 'เดินทางกลับสู่ที่พัก', en: 'Return to resort' },
      { start: '18:00', end: '19:00', th: 'Dinner', en: 'Dinner' },
      { start: '19:00', end: '20:00', th: 'พักผ่อนตามอัธยาศัย', en: 'Free time' },
      { start: '20:00', end: '21:50', th: 'กิจกรรมถอดบทเรียน', en: 'Reflection activity' },
      { start: '21:50', end: '22:00', th: 'สปอยกิจกรรมวันถัดไป', en: 'Preview next day' },
      { start: '22:00', end: null,    th: 'พักผ่อนตามอัธยาศัย', en: 'Free time' },
    ],
  },
  {
    day: 3,
    label: 'Day 3',
    date: 'จันทร์ 6 เมษายน 2569',
    dateShort: 'จันทร์ 6 เม.ย.',
    isoDate: '2026-04-06',
    activities: [
      { start: '06:30', end: '08:10', th: 'Breakfast', en: 'Breakfast' },
      { start: '08:30', end: '11:30', th: 'กิจกรรมฐาน', en: 'Base activities' },
      { start: '11:30', end: '12:10', th: 'ประกาศ + ปิดงาน', en: 'Announcement & closing ceremony' },
      { start: '12:10', end: '13:30', th: 'Lunch', en: 'Lunch' },
      { start: '13:45', end: '17:30', th: 'เดินทางกลับ', en: 'Travel back to Bangkok' },
      { start: '17:30', end: null,    th: 'กลับถึงจุฬาฯ', en: 'Arrive at Chulalongkorn' },
    ],
  },
]

function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function getCurrentActivity(dayData) {
  const now = new Date()
  const todayISO = now.toISOString().slice(0, 10)
  if (dayData.isoDate !== todayISO) return null

  const currentMins = now.getHours() * 60 + now.getMinutes()

  for (let i = 0; i < dayData.activities.length; i++) {
    const act = dayData.activities[i]
    const start = toMinutes(act.start)
    const end = act.end ? toMinutes(act.end) : toMinutes('23:59')
    if (currentMins >= start && currentMins < end) return i
  }
  return null
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(() => {
    const todayISO = new Date().toISOString().slice(0, 10)
    const match = days.findIndex((d) => d.isoDate === todayISO)
    return match >= 0 ? match : 0
  })
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const currentDay = days[activeDay]
  const liveIndex = getCurrentActivity(currentDay)

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1 className="schedule-title" lang="th">กำหนดการ</h1>

        <div className="day-tabs" role="tablist">
          {days.map((d, i) => (
            <button
              key={d.day}
              role="tab"
              aria-selected={activeDay === i}
              className={`day-tab ${activeDay === i ? 'active' : ''}`}
              onClick={() => setActiveDay(i)}
            >
              <span className="tab-label">{d.label}</span>
              <span className="tab-date">{d.dateShort}</span>
              {getCurrentActivity(d) !== null && <span className="live-dot" aria-label="กำลังเกิดขึ้น" />}
            </button>
          ))}
        </div>
      </div>

      <div className="schedule-body">
        <div className="day-date-full" lang="th">{currentDay.date}</div>

        <ol className="activity-list">
          {currentDay.activities.map((act, i) => {
            const isLive = liveIndex === i
            const isPast = liveIndex !== null && i < liveIndex
            return (
              <li
                key={i}
                className={`activity-item ${isLive ? 'live' : ''} ${isPast ? 'past' : ''}`}
              >
                <div className="act-time-col">
                  <span className="act-start">{act.start}</span>
                  {act.end && <span className="act-end">{act.end}</span>}
                </div>

                <div className="act-line" aria-hidden="true">
                  <div className="act-dot" />
                  {i < currentDay.activities.length - 1 && <div className="act-connector" />}
                </div>

                <div className="act-content">
                  {isLive && (
                    <span className="live-badge" aria-label="กิจกรรมปัจจุบัน">
                      <span className="live-pulse" aria-hidden="true" />
                      ตอนนี้
                    </span>
                  )}
                  <p className="act-th" lang="th">{act.th}</p>
                  <p className="act-en">{act.en}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
