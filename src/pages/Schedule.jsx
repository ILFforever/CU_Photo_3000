import { useState, useEffect } from 'react'
import './Schedule.css'
import days from '../data/scheduleDays'

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
