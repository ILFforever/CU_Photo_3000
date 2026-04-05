import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './VoteResults.css';

const RANK_LABEL = { 1: 'อันดับ 1', 2: 'อันดับ 2', 3: 'อันดับ 3' };
const RANK_CLASS = { 1: 'rank-gold', 2: 'rank-silver', 3: 'rank-bronze' };
const RANK_INTRO = {
  1: '🥇 และผู้ชนะอันดับ 1 คือ...',
  2: '🥈 อันดับ 2 คือ...',
  3: '🥉 อันดับ 3 คือ...',
};
const REVEAL_ORDER = [3, 2, 1];

const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 3000;

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [retries, setRetries] = useState(0);
  const [cacheBust, setCacheBust] = useState('');
  const retryTimer = useRef(null);

  useEffect(() => () => clearTimeout(retryTimer.current), []);

  function handleError() {
    if (retries >= MAX_RETRIES) return;
    retryTimer.current = setTimeout(() => {
      setRetries((r) => r + 1);
      setCacheBust(`?t=${Date.now()}`);
    }, RETRY_DELAY_MS);
  }

  const failed = retries >= MAX_RETRIES;

  return (
    <div className="vr-img-wrap">
      {!loaded && !failed && <div className="vr-img-shimmer" />}
      {!failed && (
        <img
          key={retries}
          src={`${src}${cacheBust}`}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
      {failed && <div className="vr-img-failed">โหลดภาพไม่ได้</div>}
    </div>
  );
}

// Countdown overlay: shows intro text then counts 3-2-1 then fires onDone
function Countdown({ rank, onDone }) {
  const [phase, setPhase] = useState('intro'); // intro → 3 → 2 → 1 → done
  const PHASES = ['intro', '3', '2', '1'];

  useEffect(() => {
    const durations = { intro: 1800, '3': 800, '2': 800, '1': 800 };
    let idx = 0;
    function next() {
      idx++;
      if (idx >= PHASES.length) { onDone(); return; }
      setPhase(PHASES[idx]);
      setTimeout(next, durations[PHASES[idx]]);
    }
    const t = setTimeout(next, durations['intro']);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="vr-countdown-overlay">
      <div className={`vr-countdown-content ${phase === 'intro' ? 'vr-countdown-intro' : 'vr-countdown-num'}`}>
        {phase === 'intro' ? RANK_INTRO[rank] : phase}
      </div>
    </div>
  );
}

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="vr-lightbox" onClick={onClose}>
      <button className="vr-lightbox-close" onClick={onClose}>✕</button>
      <img
        src={photo.imageUrl}
        alt={photo.title}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function VoteResults() {
  const { eventId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentRank, setCurrentRank] = useState(null); // only the latest revealed rank shown
  const [revealIdx, setRevealIdx] = useState(0);
  const [countingDown, setCountingDown] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/events/${eventId}/results`
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'โหลดผลไม่ได้');
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [eventId]);

  // Group by rank, only photos with votes > 0, only top 3 distinct ranks
  const byRank = {};
  if (data) {
    for (const photo of data.photos) {
      if (photo.rank <= 3 && photo.voteCount > 0) {
        if (!byRank[photo.rank]) byRank[photo.rank] = [];
        byRank[photo.rank].push(photo);
      }
    }
  }

  const revealQueue = REVEAL_ORDER.filter((r) => byRank[r]);
  const allRevealed = revealIdx >= revealQueue.length;
  const nextRank = revealQueue[revealIdx];

  function handleRevealClick() {
    setCountingDown(true);
  }

  function fireConfetti(rank) {
    if (rank === 1) {
      // Gold — big cannon burst from both sides
      const burst = (origin) => confetti({
        particleCount: 120,
        spread: 70,
        origin,
        colors: ['#FFD700', '#FFA500', '#FFFACD', '#ffffff'],
        startVelocity: 55,
        gravity: 0.9,
      });
      burst({ x: 0.1, y: 0.6 });
      burst({ x: 0.9, y: 0.6 });
      setTimeout(() => burst({ x: 0.5, y: 0.4 }), 300);
    } else if (rank === 2) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#C0C0C0', '#E8E8E8', '#ffffff'],
        startVelocity: 40,
      });
    } else {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#CD7F32', '#E8A96A', '#ffffff'],
        startVelocity: 30,
      });
    }
  }

  function handleCountdownDone() {
    setCountingDown(false);
    setCurrentRank(nextRank);
    setRevealIdx((i) => i + 1);
    setTimeout(() => fireConfetti(nextRank), 400);
  }

  if (loading) return (
    <div className="vr-page"><p className="vr-loading">กำลังโหลดผล...</p></div>
  );

  if (error) return (
    <div className="vr-page"><p className="vr-error">{error}</p></div>
  );

  const hasResults = Object.keys(byRank).length > 0;

  return (
    <div className="vr-page">
      {lightboxPhoto && (
        <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      )}

      {countingDown && (
        <Countdown rank={nextRank} onDone={handleCountdownDone} />
      )}

      <div className="vr-header">
        <p className="vr-eyebrow">ผลการโหวต</p>
        <h1 className="vr-title">ภาพนี้มองกี่ทีก็คิดถึง</h1>
        <p className="vr-subtitle">ขอบคุณทุกคนที่ร่วมโหวต</p>
      </div>

      {!hasResults && (
        <p className="vr-loading">ยังไม่มีผลการโหวต</p>
      )}

      <div className="vr-sections">
        {revealQueue.map((rank) => {
          const photos = byRank[rank];
          if (!photos) return null;
          const isRevealed = currentRank === rank;
          return (
            <div key={rank} className={`vr-rank-section ${RANK_CLASS[rank]} ${isRevealed ? 'vr-revealed' : 'vr-hidden'}`}>
              <div className="vr-rank-heading">{RANK_LABEL[rank]}</div>
              <div className="vr-cards-row">
                {photos.map((photo) => (
                  <div key={photo.id} className="vr-card" onClick={() => setLightboxPhoto(photo)} style={{ cursor: 'pointer' }}>
                    <LazyImage src={photo.imageUrl} alt={photo.title} />
                    <div className="vr-info">
                      <p className="vr-photo-title">{photo.title}</p>
                      {photo.submittedBy && <p className="vr-submitted-by">โดย {photo.submittedBy}</p>}
                      <p className="vr-votes">{photo.voteCount} คะแนน</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {hasResults && !allRevealed && !countingDown && (
        <div className="vr-reveal-wrap">
          <button className="vr-reveal-btn" onClick={handleRevealClick}>
            {revealIdx === 0 ? 'เริ่มประกาศผล' : `ประกาศ ${RANK_LABEL[nextRank]}`}
          </button>
        </div>
      )}

      {allRevealed && hasResults && (
        <p className="vr-congrats">ขอแสดงความยินดีกับผู้ชนะทุกท่าน 🎉</p>
      )}
    </div>
  );
}
