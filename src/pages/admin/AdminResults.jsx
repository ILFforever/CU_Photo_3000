import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResults } from '../../api/client';
import './Admin.css';

const MEDAL = ['🥇', '🥈', '🥉'];

export default function AdminResults() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('admin_token');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!token) { navigate('/admin', { replace: true }); return; }
    try {
      const result = await getResults(token, eventId);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, eventId, navigate]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="admin-page"><p className="admin-loading">Loading results...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => navigate('/admin/dashboard')}>
          ← Back
        </button>
        <h1 className="admin-page-title">Results</h1>
        <button className="admin-btn admin-btn-sm" onClick={load}>Refresh</button>
      </div>

      {error && <p className="admin-error admin-error-banner">{error}</p>}

      {data && (
        <>
          <p className="admin-results-total">Total votes cast: <strong>{data.totalVotes}</strong></p>

          <div className="results-grid">
            {data.photos.map((photo) => (
              <div
                key={photo.id}
                className={`results-card ${photo.isTop3 ? 'results-card-top3' : ''}`}
              >
                {photo.isTop3 && (
                  <div className="results-medal">{MEDAL[photo.rank - 1]}</div>
                )}
                <div className="results-img-wrap">
                  <img src={photo.imageUrl} alt={photo.title} />
                </div>
                <div className="results-info">
                  <p className="results-title">{photo.title}</p>
                  {photo.submittedBy && <p className="results-by">โดย {photo.submittedBy}</p>}
                  <div className="results-votes-row">
                    <span className="results-votes">{photo.voteCount} votes</span>
                    <span className="results-rank">#{photo.rank}</span>
                  </div>
                  <div className="results-bar-wrap">
                    <div
                      className="results-bar"
                      style={{ width: data.totalVotes ? `${(photo.voteCount / data.totalVotes) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
