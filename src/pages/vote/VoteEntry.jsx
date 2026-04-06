import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyVoter } from '../../api/client';
import { useVote } from '../../context/VoteContext';
import PARTICIPANTS from '../../data/participants';
import './Vote.css';

const SORTED = [...PARTICIPANTS].sort((a, b) => a.nickname.localeCompare(b.nickname, 'th'));

export default function VoteEntry() {
  const navigate = useNavigate();
  const { startSession } = useVote();

  const [form, setForm] = useState({ nickname: '', phone: '', votingCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await verifyVoter(form.phone, form.nickname, form.votingCode);
      startSession({
        eventId: data.eventId,
        phone: form.phone,
        fullName: data.fullName,
        nickname: data.nickname,
        group: data.group,
        votingCode: form.votingCode,
        votesUsed: data.votesUsed,
      });
      navigate('/vote/confirm');
    } catch (err) {
      setError(
        err.message === 'VOTING_CLOSED'
          ? 'การโหวตสำหรับ Event นี้ปิดแล้ว กรุณาติดต่อสตาฟ'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vote-page">
      <div className="vote-card">
        <div className="vote-header">
          <p className="vote-topic-label">หัวข้อการโหวต</p>
          <h1 className="vote-topic">ภาพนี้มองกี่ทีก็คิดถึง</h1>
        </div>

        <form className="vote-form" onSubmit={handleSubmit}>
          <div className="vote-field">
            <label htmlFor="votingCode">รหัสอีเว้นท์</label>
            <input
              id="votingCode"
              name="votingCode"
              type="text"
              placeholder="รหัสที่ได้รับจากสตาฟ"
              value={form.votingCode}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="vote-field">
            <label htmlFor="nickname">ชื่อเล่น</label>
            <select
              id="nickname"
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              required
              className="vote-select"
            >
              <option value="" disabled>เลือกชื่อเล่นของคุณ</option>
              {SORTED.map((p) => (
                <option key={p.phone} value={p.nickname}>
                  {p.nickname} ({p.fullName})
                </option>
              ))}
            </select>
          </div>

          <div className="vote-field">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0xx-xxx-xxxx"
              value={form.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>

          {error && <p className="vote-error">{error}</p>}

          <button className="vote-btn" type="submit" disabled={loading}>
            {loading ? 'กำลังตรวจสอบ...' : 'ยืนยัน'}
          </button>
        </form>
      </div>
    </div>
  );
}
