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
    if (result?.me?.nickname) {
      const saved = localStorage.getItem('buddy-revealed-' + result.me.nickname)
      if (saved === 'true') {
        setBuddyRevealed(true)
      } else {
        setBuddyRevealed(false)
      }
    }
  }, [result?.me?.nickname])

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
    if (result?.me?.nickname) {
      localStorage.setItem('buddy-revealed-' + result.me.nickname, 'true')
    }
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
              <div className="card-meta">
                {result.me.group && (
                  <span className="card-group" lang="th">กลุ่มที่ {result.me.group}</span>
                )}
                {result.me.uni && (
                  <span className="card-uni">{result.me.uni}</span>
                )}
              </div>
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
              {!buddyRevealed ? (
                <div className="envelope-wrap">
                  <div className="envelope">
                    <div className="envelope-flap" />
                    <div className="envelope-body">
                      <svg className="envelope-icon" viewBox="0 0 48 48" fill="none">
                        <path d="M24 28l12-8v20H12V20l12 8z" fill="currentColor"/>
                        <path d="M4 10l20 16 20-16v-4H4v4z" fill="currentColor"/>
                        <path d="M4 10v32h40V10l-20 16L4 10z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                      <span className="envelope-text" lang="th">คลิกเพื่อเปิดจดหมาย</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <span className="card-role" lang="th">บัดดี้</span>
                  <div className="card-avatar buddy-avatar">
                    {result.buddy?.nickname.charAt(0)}
                  </div>
                  <span className="card-nick" lang="th">{result.buddy?.nickname}</span>
                  <div className="card-meta">
                    {result.buddy?.group && (
                      <span className="card-group" lang="th">กลุ่มที่ {result.buddy.group}</span>
                    )}
                    {result.buddy?.uni && (
                      <span className="card-uni">{result.buddy.uni}</span>
                    )}
                  </div>
                </>
              )}
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
