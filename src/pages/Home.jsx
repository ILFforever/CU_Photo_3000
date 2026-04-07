import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

const polaroids = [
  { src: '/images/hero/dam.JPG', alt: 'เขื่อนขุนด่าน', label: 'เขื่อนขุนด่าน' },
  { src: '/images/hero/group.jpg', alt: 'กิจกรรมร่วม', label: 'Group Photo' },
  { src: '/images/hero/tree.jpg', alt: 'ธรรมชาติ', label: 'Kodak Film' },
]

const collagePhotos = [
  '/images/collage/DSCF0002.JPG','/images/collage/DSCF0008.JPG','/images/collage/DSCF0012.JPG',
  '/images/collage/DSCF0017.JPG','/images/collage/DSCF0019.JPG','/images/collage/DSCF0020.JPG',
  '/images/collage/DSCF0023.JPG','/images/collage/DSCF0025.JPG','/images/collage/DSCF0028.JPG',
  '/images/collage/DSCF0030.JPG','/images/collage/DSCF0032.JPG','/images/collage/DSCF0037.JPG',
  '/images/collage/DSCF0038.JPG','/images/collage/DSCF0041.JPG','/images/collage/DSCF0046.JPG',
  '/images/collage/DSCF0052.JPG','/images/collage/DSCF0053.JPG','/images/collage/DSCF0054.JPG',
  '/images/collage/DSCF0060.JPG','/images/collage/DSCF0063.JPG','/images/collage/DSCF0065.JPG',
  '/images/collage/DSCF0066.JPG','/images/collage/DSCF0069.JPG','/images/collage/DSCF0070.JPG',
  '/images/collage/DSCF0080.JPG','/images/collage/DSCF0082.JPG','/images/collage/DSCF0087.JPG',
  '/images/collage/DSCF0090.JPG','/images/collage/DSCF0095.JPG','/images/collage/DSCF0099.JPG',
  '/images/collage/DSCF0103.JPG','/images/collage/DSCF0105.JPG','/images/collage/DSCF0111.JPG',
  '/images/collage/DSCF0114.JPG','/images/collage/DSCF0118.JPG','/images/collage/DSCF0128.JPG',
  '/images/collage/DSCF0129.JPG','/images/collage/DSCF0131.JPG','/images/collage/DSCF0132.JPG',
  '/images/collage/DSCF0134.JPG','/images/collage/DSCF0141.JPG','/images/collage/DSCF0144.JPG',
  '/images/collage/DSCF0150.JPG','/images/collage/DSCF0166.JPG','/images/collage/DSCF0170.JPG',
  '/images/collage/DSCF0177.JPG','/images/collage/DSCF0182.JPG','/images/collage/DSCF0192.JPG',
  '/images/collage/DSCF0198.JPG','/images/collage/DSCF0204.JPG','/images/collage/DSCF0216.JPG',
  '/images/collage/DSCF0228.JPG','/images/collage/DSCF0231.JPG','/images/collage/DSCF0234.JPG',
  '/images/collage/DSCF0246.JPG','/images/collage/DSCF0253.JPG','/images/collage/DSCF0262.JPG',
  '/images/collage/DSCF0269.JPG','/images/collage/DSCF0271.JPG','/images/collage/DSCF0273.JPG',
  '/images/collage/DSCF0275.JPG','/images/collage/DSCF0278.JPG','/images/collage/DSCF0279.JPG',
  '/images/collage/DSCF0284.JPG','/images/collage/DSCF0288.JPG','/images/collage/DSCF0291.JPG',
  '/images/collage/DSCF0293.JPG','/images/collage/DSCF0294.JPG','/images/collage/DSCF0295.JPG',
  '/images/collage/DSCF0298.JPG','/images/collage/DSCF0303.JPG','/images/collage/DSCF0304.JPG',
  '/images/collage/DSCF0307.JPG','/images/collage/DSCF0312.JPG','/images/collage/DSCF0319.JPG',
  '/images/collage/DSCF0323.JPG','/images/collage/DSCF0324.JPG','/images/collage/DSCF0326.JPG',
  '/images/collage/DSCF0331.JPG','/images/collage/DSCF0334.JPG','/images/collage/DSCF0342.JPG',
  '/images/collage/DSCF0348.JPG','/images/collage/DSCF0351.JPG','/images/collage/DSCF0352.JPG',
  '/images/collage/DSCF0353.JPG','/images/collage/DSCF0356.JPG','/images/collage/DSCF0360.JPG',
  '/images/collage/DSCF0363.JPG','/images/collage/DSCF0364.JPG','/images/collage/DSCF0366.JPG',
  '/images/collage/DSCF0368.JPG','/images/collage/DSCF0370.JPG','/images/collage/DSCF0373.JPG',
  '/images/collage/DSCF0378.JPG','/images/collage/DSCF0387.JPG','/images/collage/DSCF0388.JPG',
  '/images/collage/DSCF0391.JPG','/images/collage/DSCF0392.JPG','/images/collage/DSCF0394.JPG',
  '/images/collage/DSCF0395.JPG','/images/collage/DSCF0402.JPG','/images/collage/DSCF0434.JPG',
  '/images/collage/DSCF0445.JPG','/images/collage/DSCF0497.JPG','/images/collage/DSCF0505.JPG',
  '/images/collage/DSCF0512.JPG','/images/collage/DSCF0514.JPG','/images/collage/DSCF0515.JPG',
  '/images/collage/DSCF0521.JPG','/images/collage/DSCF6050.JPG','/images/collage/DSCF6052.JPG',
  '/images/collage/DSCF6054.JPG','/images/collage/DSCF6057.JPG','/images/collage/DSCF6067.JPG',
  '/images/collage/DSCF6075.JPG','/images/collage/DSCF6087.JPG','/images/collage/DSCF6096.JPG',
  '/images/collage/DSCF6666.JPG','/images/collage/DSCF6667.JPG','/images/collage/DSCF6676.JPG',
  '/images/collage/DSCF6694.JPG','/images/collage/DSCF6714.JPG','/images/collage/DSCF6739.JPG',
  '/images/collage/DSCF6747.JPG','/images/collage/DSCF6790.JPG','/images/collage/DSCF6796.JPG',
  '/images/collage/DSCF6803.JPG','/images/collage/DSCF6808.JPG','/images/collage/DSCF6814.JPG',
  '/images/collage/DSCF6816.JPG','/images/collage/DSCF6827.JPG','/images/collage/DSCF6831.JPG',
  '/images/collage/DSCF6835.JPG','/images/collage/DSCF6841.JPG','/images/collage/DSCF6845.JPG',
  '/images/collage/DSCF6848.JPG','/images/collage/DSCF6860.JPG','/images/collage/DSCF6861.JPG',
  '/images/collage/DSCF6865.JPG','/images/collage/DSCF6866.JPG','/images/collage/DSCF6872.JPG',
  '/images/collage/DSCF9014.JPG','/images/collage/DSCF9043.JPG','/images/collage/DSCF9053.JPG',
  '/images/collage/DSCF9060.JPG','/images/collage/DSCF9062.JPG','/images/collage/DSCF9067.JPG',
  '/images/collage/DSCF9068.JPG','/images/collage/DSCF9079.JPG','/images/collage/DSCF9088.JPG',
  '/images/collage/DSCF9101.JPG',
]

const destinations = [
  {
    num: '01',
    thai: 'น้ำตกนางรอง',
    english: 'Nang Rong Waterfall',
    note: 'เสาร์ 4 เมษา · อิงธารรีสอร์ต',
    img: '/images/NangRong.jpg',
    imgAlt: 'น้ำตกนางรอง',
  },
  {
    num: '02',
    thai: 'เขื่อนขุนด่านฯ',
    english: 'Khun Dan Prakan Chon Dam',
    note: 'เสาร์ 4 เมษา · เขื่อนขุนด่านปราการชล',
    img: '/images/Dam.JPG',
    imgAlt: 'เขื่อนขุนด่านปราการชล',
  },
  {
    num: '03',
    thai: 'เขาใหญ่',
    english: 'Khao Yai National Park',
    note: 'อาทิตย์ 5 เมษา · เส้นทางธรรมชาติ · อ่างเก็บน้ำสายศร',
    img: '/images/Khaoyai.jpg',
    imgAlt: 'อุทยานแห่งชาติเขาใหญ่',
  },
]

export default function Home() {
  const destRef = useRef(null)

  useEffect(() => {
    const entries = destRef.current?.querySelectorAll('.dest-entry')
    if (!entries) return
    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    entries.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home">

      <div className="mist" aria-hidden="true">
        <div className="mist-layer mist-a" />
        <div className="mist-layer mist-b" />
        <div className="mist-layer mist-c" />
      </div>

      <section className="hero" aria-label="Photo สัมพันธ์">
        <div className="polaroid-stack" aria-hidden="true">
          {polaroids.map((p, i) => (
            <div key={i} className={`polaroid polaroid-${i}`}>
              <div className="polaroid-img-wrap">
                <img src={p.src} alt={p.alt} draggable="false" />
              </div>
              <span className="polaroid-label" lang="th">{p.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-content">
          <p className="eyebrow" aria-label="Chulalongkorn, Thammasat, and Mahidol universities">
            <span className="uni-tag cu">CU</span>
            <span className="eyebrow-x" aria-hidden="true">×</span>
            <span className="uni-tag tu">TU</span>
            <span className="eyebrow-x" aria-hidden="true">×</span>
            <span className="uni-tag mu">MU</span>
          </p>

          <h1 className="event-name">
            <span className="name-en">Photo</span>
            <span className="name-th" lang="th">สัมพันธ์</span>
          </h1>

          <p className="tagline" lang="th">
            ถ่ายภาพ · ผูกสัมพันธ์ · สู่ธรรมชาติ
          </p>

          <div className="uni-row" role="list">
            <div className="uni-entry cu-entry" role="listitem">
              <span className="ua">CU</span>
              <span className="uf">Chulalongkorn</span>
            </div>
            <div className="uni-divider" aria-hidden="true" />
            <div className="uni-entry tu-entry" role="listitem">
              <span className="ua">TU</span>
              <span className="uf">Thammasat</span>
            </div>
            <div className="uni-divider" aria-hidden="true" />
            <div className="uni-entry mu-entry" role="listitem">
              <span className="ua">MU</span>
              <span className="uf">Mahidol</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Ended + Collage ─────────────────────────────────────── */}
      <section className="ended-section" aria-label="Event ended">
        <div className="ended-card">
          <p className="ended-eyebrow">Photo สัมพันธ์ · 4–6 เมษายน 2569</p>
          <h2 className="ended-title" lang="th">ค่ายสิ้นสุดแล้ว</h2>
          <p className="ended-sub" lang="th">
            ขอบคุณทุกคนที่มาร่วมสร้างความทรงจำสวยงามด้วยกัน<br />
            แล้วพบกันใหม่ปีหน้า 🤍
          </p>
          <p className="ended-see-you">See you next year.</p>
        </div>
      </section>

      <div className="collage-stage" aria-hidden="true">
        {[0, 1, 2].map((row) => {
          const chunk = Math.ceil(collagePhotos.length / 3)
          const slice = collagePhotos.slice(row * chunk, (row + 1) * chunk)
          const strip = [...slice, ...slice]
          return (
            <div key={row} className={`collage-row collage-row-${row}`}>
              <div className={`collage-track ${row % 2 === 1 ? 'collage-track-rev' : ''}`}>
                {strip.map((src, i) => (
                  <div key={i} className="collage-cell">
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="wave-sep" aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C160,58 320,14 480,36 C640,58 800,14 960,36 C1120,58 1280,14 1440,36 L1440,72 L0,72 Z" fill="var(--surface-1)"/>
          <path d="M0,44 C200,64 440,24 680,44 C920,64 1160,24 1440,44 L1440,72 L0,72 Z" fill="oklch(12% 0.028 208)" opacity="0.55"/>
        </svg>
      </div>

      <section className="destinations" aria-label="Trip destinations">
        <div className="dest-inner" ref={destRef}>
          <header className="dest-header">
            <span className="dest-eyebrow" lang="th">จุดหมายปลายทาง</span>
            <span className="dest-eyebrow-en">Destinations</span>
          </header>

          <div className="dest-grid">
            {destinations.map((d, i) => (
              <article key={d.num} className="dest-entry" style={{ '--i': i }}>
                <div className="dest-img-wrap">
                  <img src={d.img} alt={d.imgAlt} className="dest-img" loading="lazy" />
                </div>
                <div className="dest-body">
                  <span className="dest-num">{d.num}</span>
                  <h2 className="dest-thai" lang="th">{d.thai}</h2>
                  <p className="dest-english">{d.english}</p>
                  <p className="dest-note" lang="th">{d.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="explore" aria-label="Explore pages">
        <div className="explore-inner">
          <header className="dest-header">
            <span className="dest-eyebrow" lang="th">สำรวจ</span>
            <span className="dest-eyebrow-en">Explore</span>
          </header>

          <div className="explore-grid">
            <NavLink to="/schedule" className="explore-card explore-card--cu">
              <span className="explore-num">01</span>
              <h2 className="explore-thai" lang="th">กำหนดการ</h2>
              <p className="explore-en">Schedule</p>
              <p className="explore-desc" lang="th">ตารางกิจกรรมตลอดทริป 4–6 เมษายน</p>
              <span className="explore-arrow" aria-hidden="true">→</span>
            </NavLink>

            <NavLink to="/groups" className="explore-card explore-card--tu">
              <span className="explore-num">02</span>
              <h2 className="explore-thai" lang="th">กลุ่ม</h2>
              <p className="explore-en">Groups</p>
              <p className="explore-desc" lang="th">รายชื่อกลุ่มและสมาชิกทั้งหมด</p>
              <span className="explore-arrow" aria-hidden="true">→</span>
            </NavLink>

            <NavLink to="/vote" className="explore-card explore-card--mu">
              <span className="explore-num">03</span>
              <h2 className="explore-thai" lang="th">โหวต</h2>
              <p className="explore-en">Vote</p>
              <p className="explore-desc" lang="th">ร่วมโหวตภาพที่ชื่นชอบ</p>
              <span className="explore-arrow" aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>

       <footer className="site-footer">
        <span lang="th">Photo สัมพันธ์</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <span>CU × TU × MU</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <span>4–6 เมษายน 2569</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <a
          className="footer-dev"
          href="https://github.com/ILFforever/CU_Photo_3000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by ILFforever
        </a>
      </footer>
    </div>
  )
}
