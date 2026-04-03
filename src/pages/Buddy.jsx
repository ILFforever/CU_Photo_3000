import { useState, useEffect } from 'react'
import './Buddy.css'
import PARTICIPANTS from '../data/participants.js'
import STAFF from '../data/staff.js'
import BUDDY_MATCHINGS from '../data/buddyMatchings.js'

export default function Buddy() {
  const [nickname, setNickname] = useState('')
  const [pin, setPin] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [wrongPin, setWrongPin] = useState(false)
  const [buddyRevealed, setBuddyRevealed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('buddy-revealed')
    if (saved === 'true') {
      setBuddyRevealed(true)
    }
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const nick = nickname.trim()
    const pinInput = pin.trim().toUpperCase()
    
    if (!nick || !pinInput) return
    
    const me = PARTICIPANTS.find(p => p.nickname === nick) || STAFF.find(s => s.nickname === nick)
    
    if (me) {
      if (me.pin === pinInput) {
        const buddy = BUDDY_MATCHINGS[me.nickname]
        setResult({ me, buddy })
        setNotFound(false)
        setWrongPin(false)
        setBuddyRevealed(false)
      } else {
        setResult(null)
        setNotFound(false)
        setWrongPin(true)
      }
    } else {
      setResult(null)
      setNotFound(true)
      setWrongPin(false)
    }
  }

  function handleChangeNick(e) {
    setNickname(e.target.value)
    setResult(null)
    setNotFound(false)
    setWrongPin(false)
  }

  function handleChangePin(e) {
    setPin(e.target.value.toUpperCase())
    setResult(null)
    setNotFound(false)
    setWrongPin(false)
  }

  function revealBuddy() {
    setBuddyRevealed(true)
    localStorage.setItem('buddy-revealed', 'true')
  }

  return (
    <div className="buddy-page">
      <div className="buddy-header">
        <h1 className="buddy-title" lang="th">บัดดี้</h1>
        <p className="buddy-subtitle">Buddy Matching · ค้นหาบัดดี้ของคุณ</p>
      </div>

      <div className="buddy-body">
        <div className="buddy-notice" lang="th">
          <span className="notice-icon" aria-hidden="true">🔐</span>
          พิมพ์ชื่อเล่นและ PIN ของคุณ — PIN สามารถดูได้จากหน้ากลุ่ม
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-inputs">
            <div className="input-group">
              <label className="input-label" lang="th">ชื่อเล่น</label>
              <input
                className="search-input"
                type="text"
                value={nickname}
                onChange={handleChangeNick}
                placeholder="เช่น ก็อต"
                lang="th"
                autoComplete="off"
                autoCapitalize="none"
              />
            </div>
            <div className="input-group">
              <label className="input-label" lang="th">PIN (4 ตัว)</label>
              <input
                className="search-input pin-input"
                type="text"
                value={pin}
                onChange={handleChangePin}
                placeholder="XXXX"
                maxLength={4}
                autoComplete="off"
                autoCapitalize="characters"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>
          <button type="submit" className="search-btn" lang="th">ค้นหา</button>
        </form>

        {wrongPin && (
          <p className="error-msg" lang="th">PIN ไม่ถูกต้อง ลองใหม่อีกครั้ง</p>
        )}

        {notFound && (
          <p className="error-msg" lang="th">ไม่พบชื่อนี้ในระบบ ลองใหม่อีกครั้ง</p>
        )}

        {result && (
          <div className="buddy-result">
            <div className="result-card me-card">
              <span className="card-role" lang="th">คุณ</span>
              <div className="card-avatar">{result.me.nickname.charAt(0)}</div>
              <span className="card-nick" lang="th">{result.me.nickname}</span>
              <span className="card-group" lang="th">
                {result.me.group ? `กลุ่มที่ ${result.me.group}` : result.me.uni}
              </span>
            </div>

            <div className="result-connector" aria-hidden="true">
              <svg viewBox="0 0 48 20" fill="none">
                <path d="M4 10h40M34 4l10 6-10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span lang="th">บัดดี้</span>
            </div>

            <div 
              className={`result-card buddy-card ${buddyRevealed ? 'revealed' : 'hidden'}`}
              onClick={!buddyRevealed ? revealBuddy : undefined}
            >
              <span className="card-role" lang="th">
                {buddyRevealed ? 'บัดดี้' : '??'}
              </span>
              <div className="card-avatar buddy-avatar">
                {buddyRevealed ? result.buddy?.nickname.charAt(0) : '?'}
              </div>
              <span className="card-nick" lang="th">
                {buddyRevealed ? result.buddy?.nickname : 'คลิกเพื่อเปิดเผย'}
              </span>
              <span className="card-group" lang="th">
                {buddyRevealed ? (
                  result.buddy?.group ? `กลุ่มที่ ${result.buddy.group}` : result.buddy?.uni
                ) : '?'}
              </span>
            </div>
          </div>
        )}

        {!result && !notFound && !wrongPin && (
          <div className="suggestions">
            <span className="suggestions-label" lang="th">ตัวอย่างชื่อเล่น</span>
            <div className="chip-list">
              {['ก็อต', 'เฟิร์น', 'พริ้นเซส', 'เฟรชชี่', 'มิ้งค์', 'มิ้น'].map((nick) => (
                <button
                  key={nick}
                  className="chip"
                  onClick={() => { setNickname(nick); setResult(null); setNotFound(false); setWrongPin(false); setPin('') }}
                  lang="th"
                >
                  {nick}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
