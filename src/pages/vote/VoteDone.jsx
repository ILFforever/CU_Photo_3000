import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import './Vote.css';

export default function VoteDone() {
  const navigate = useNavigate();
  const { session, clearSession } = useVote();

  useEffect(() => {
    if (!session) navigate('/vote/enter', { replace: true });
  }, [session, navigate]);

  function handleDone() {
    clearSession();
    navigate('/vote');
  }

  if (!session) return null;

  return (
    <div className="vote-page">
      <div className="vote-card vote-card-done">
        <div className="done-icon">
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="var(--teal)" strokeWidth="2.5" />
            <path d="M20 32l9 9 15-15" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="done-title">โหวตสำเร็จแล้ว!</h1>
        <p className="done-sub">ขอบคุณที่ร่วมโหวต {session.nickname} 🎉</p>
        <p className="done-desc">ผลการโหวตจะประกาศโดยสตาฟในภายหลัง</p>

        <button className="vote-btn vote-btn-outline" onClick={handleDone}>
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}
