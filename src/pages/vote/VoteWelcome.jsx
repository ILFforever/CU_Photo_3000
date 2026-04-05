import { NavLink } from 'react-router-dom'
import './VoteWelcome.css'

export default function VoteWelcome() {
  return (
    <div className="vw">
      <div className="vw-inner">
        <h1 className="vw-title">ภาพนี้มองกี่ทีก็คิดถึง</h1>

        <p className="vw-desc">
          เลือกภาพที่ประทับใจคุณมากที่สุด · โหวตได้ 2 ภาพ<br />
          ผลการโหวตจะประกาศโดยสตาฟในภายหลัง
        </p>

        <div className="vw-rules">
          <div className="vw-rule">
            <span className="vw-rule-num">01</span>
            <span className="vw-rule-text">กรอก Event ID ที่ได้รับจากสตาฟ</span>
          </div>
          <div className="vw-rule">
            <span className="vw-rule-num">02</span>
            <span className="vw-rule-text">เลือกชื่อเล่นและยืนยันเบอร์โทรศัพท์</span>
          </div>
          <div className="vw-rule">
            <span className="vw-rule-num">03</span>
            <span className="vw-rule-text">กรอกรหัสโหวต แล้วเลือก 2 ภาพที่ชื่นชอบ</span>
          </div>
        </div>

        <NavLink to="/vote/enter" className="vw-btn">
          เริ่มโหวตเลย →
        </NavLink>
      </div>
    </div>
  )
}
