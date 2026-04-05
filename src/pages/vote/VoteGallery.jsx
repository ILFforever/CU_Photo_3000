import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPhotos, castVote } from '../../api/client';
import { useVote } from '../../context/VoteContext';
import './Vote.css';

const MAX_VOTES = 2;

const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 3000;

function LazyImage({ src, alt }) {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retries, setRetries] = useState(0);
  const [cacheBust, setCacheBust] = useState('');
  const ref = useRef();
  const retryTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(retryTimer.current), []);

  function handleError() {
    if (retries >= MAX_RETRIES) return;
    retryTimer.current = setTimeout(() => {
      setRetries((r) => r + 1);
      setCacheBust(`?t=${Date.now()}`);
    }, RETRY_DELAY_MS);
  }

  const failed = retries >= MAX_RETRIES;
  const imgSrc = `${src}${cacheBust}`;

  return (
    <div ref={ref} className="gallery-img-inner">
      {visible && !failed && (
        <img
          key={retries}
          src={imgSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={loaded ? 'img-loaded' : 'img-loading'}
        />
      )}
      {(!visible || !loaded) && !failed && <div className="img-placeholder" />}
      {failed && (
        <div className="img-failed">
          <span>โหลดไม่ได้</span>
        </div>
      )}
    </div>
  );
}

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="ปิด">✕</button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.imageUrl} alt={photo.title} />
        {(photo.title || photo.submittedBy) && (
          <div className="lightbox-caption">
            {photo.title && <p className="lightbox-title">{photo.title}</p>}
            {photo.submittedBy && <p className="lightbox-by">โดย {photo.submittedBy}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoteGallery() {
  const navigate = useNavigate();
  const { session, recordVote } = useVote();

  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!session) { navigate('/vote/enter', { replace: true }); return; }
    getPhotos(session.eventId)
      .then(setPhotos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [session, navigate]);

  const votesLeft = MAX_VOTES - (session?.votesUsed ?? 0);

  function toggleSelect(photoId) {
    setSelected((prev) => {
      if (prev.includes(photoId)) return prev.filter((id) => id !== photoId);
      if (prev.length >= votesLeft) return prev;
      return [...prev, photoId];
    });
    setError('');
  }

  async function handleSubmit() {
    if (selected.length === 0) { setError('กรุณาเลือกอย่างน้อย 1 ภาพ'); return; }
    setSubmitting(true);
    setError('');
    try {
      for (const photoId of selected) {
        await castVote(session.eventId, session.phone, session.votingCode, photoId);
        recordVote(photoId);
      }
      navigate('/vote/done');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="vote-page"><div className="vote-loading">กำลังโหลดภาพ...</div></div>;

  return (
    <div className="vote-page vote-page-gallery">
      {lightbox && <Lightbox photo={lightbox} onClose={closeLightbox} />}
      <div className="gallery-header">
        <h1 className="gallery-title">ภาพนี้มองกี่ทีก็คิดถึง</h1>
        <p className="gallery-sub">
          เลือกได้อีก <strong>{votesLeft - selected.length}</strong> ภาพ
          {selected.length > 0 && ` · เลือกแล้ว ${selected.length} ภาพ`}
        </p>
      </div>

      {error && <p className="vote-error vote-error-center">{error}</p>}

      <div className="gallery-grid">
        {photos.map((photo) => {
          const isSelected = selected.includes(photo.id);
          const isAlreadyVoted = session?.votedPhotoIds?.includes(photo.id);
          const isDisabled = !isSelected && selected.length >= votesLeft;

          return (
            <button
              key={photo.id}
              className={`gallery-item ${isSelected ? 'gallery-item-selected' : ''} ${isDisabled ? 'gallery-item-disabled' : ''} ${isAlreadyVoted ? 'gallery-item-voted' : ''}`}
              onClick={() => !isAlreadyVoted && toggleSelect(photo.id)}
              disabled={isAlreadyVoted}
              aria-pressed={isSelected}
            >
              <div className="gallery-img-wrap">
                <LazyImage src={photo.imageUrl} alt={photo.title} />
                {isSelected && (
                  <div className="gallery-check">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" fill="currentColor" />
                      <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <button
                  className="gallery-expand"
                  onClick={(e) => { e.stopPropagation(); setLightbox(photo); }}
                  aria-label="ดูภาพเต็ม"
                >
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M3 8V3h5M17 8V3h-5M3 12v5h5M17 12v5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="gallery-photo-title">{photo.title}</p>
              {photo.submittedBy && <p className="gallery-photo-by">โดย {photo.submittedBy}</p>}
            </button>
          );
        })}
      </div>

      <div className="gallery-footer">
        <button
          className="vote-btn"
          onClick={handleSubmit}
          disabled={submitting || selected.length === 0}
        >
          {submitting ? 'กำลังส่งโหวต...' : `ยืนยันการโหวต (${selected.length}/${votesLeft})`}
        </button>
      </div>
    </div>
  );
}
