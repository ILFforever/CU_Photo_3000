import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import './Vote.css';

export default function VoteConfirm() {
  const navigate = useNavigate();
  const { session } = useVote();

  useEffect(() => {
    if (!session) navigate('/vote/enter', { replace: true });
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="vote-page">
      <div className="vote-card">
        <div className="vote-header">
          <p className="vote-topic-label">ยืนยันตัวตน</p>
          <h1 className="vote-confirm-name">{session.nickname}</h1>
          <p className="vote-confirm-full">{session.fullName}</p>
          <p className="vote-confirm-sub">กลุ่ม {session.group}</p>
        </div>

        <p className="vote-confirm-desc">
          คุณจะสามารถโหวตได้ <strong>2 ภาพ</strong> จากภาพทั้งหมด<br />
          เลือกภาพที่คุณชื่นชอบได้เลย
        </p>

        {session.votesUsed >= 2 ? (
          <div className="vote-already">
            <p>คุณได้โหวตครบ 2 ภาพแล้ว</p>
            <button className="vote-btn" onClick={() => navigate('/')}>
              กลับสู่หน้าหลัก
            </button>
          </div>
        ) : (
          <button className="vote-btn" onClick={() => navigate('/vote/gallery')}>
            ไปเลือกภาพ →
          </button>
        )}
      </div>
    </div>
  );
}
