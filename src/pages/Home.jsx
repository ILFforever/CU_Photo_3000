import { useEffect, useRef } from 'react'
import './Home.css'

const polaroids = [
  { src: '/images/hero/dam.JPG', alt: 'เขื่อนขุนด่าน', label: 'เขื่อนขุนด่าน' },
  { src: '/images/hero/group.jpg', alt: 'กิจกรรมร่วม', label: 'กิจกรรมร่วม' },
  { src: '/images/hero/tree.jpg', alt: 'ธรรมชาติ', label: 'ธรรมชาติ' },
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

      <section className="hero" aria-label="Photo3000 สัมพันธ์">
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
            <span className="name-en">Photo3000</span>
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

      <footer className="site-footer">
        <span lang="th">Photo3000 สัมพันธ์</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <span>CU × TU × MU</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <span>4–6 เมษายน 2569</span>
      </footer>
    </div>
  )
}
