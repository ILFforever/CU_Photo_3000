import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getEvents, createEvent, updateEvent, syncPhotos,
  getAdmins, createAdmin, deleteAdmin,
} from '../../api/client';
import PARTICIPANTS from '../../data/participants';
import './Admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('admin_token');

  const [events, setEvents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New event form
  const [newEvent, setNewEvent] = useState({ name: '', votingCode: '' });
  const [creating, setCreating] = useState(false);

  // Sync sheet
  const [sheetUrls, setSheetUrls] = useState({});
  const [syncing, setSyncing] = useState({});

  // New admin form
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  const loadData = useCallback(async () => {
    if (!token) { navigate('/admin', { replace: true }); return; }
    try {
      const [evs, adms] = await Promise.all([getEvents(token), getAdmins(token)]);
      setEvents(evs);
      setAdmins(adms);
    } catch (err) {
      if (err.message.includes('expired') || err.message.includes('Invalid')) {
        sessionStorage.removeItem('admin_token');
        navigate('/admin', { replace: true });
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleCreateEvent(e) {
    e.preventDefault();
    setCreating(true);
    try {
      await createEvent(token, { ...newEvent, participants: PARTICIPANTS });
      setNewEvent({ name: '', votingCode: '' });
      await loadData();
    } catch (err) { setError(err.message); }
    finally { setCreating(false); }
  }

  async function handleToggleOpen(event) {
    try {
      await updateEvent(token, event.id, { isOpen: !event.isOpen });
      await loadData();
    } catch (err) { setError(err.message); }
  }

  async function handleUpdateCode(eventId, votingCode) {
    try {
      await updateEvent(token, eventId, { votingCode });
      await loadData();
    } catch (err) { setError(err.message); }
  }

  async function handleSync(eventId) {
    const url = sheetUrls[eventId];
    if (!url) return;
    setSyncing((s) => ({ ...s, [eventId]: true }));
    try {
      const { synced } = await syncPhotos(token, eventId, url);
      alert(`Synced ${synced} photos`);
      setSheetUrls((s) => ({ ...s, [eventId]: '' }));
    } catch (err) { setError(err.message); }
    finally { setSyncing((s) => ({ ...s, [eventId]: false })); }
  }

  async function handleCreateAdmin(e) {
    e.preventDefault();
    setCreatingAdmin(true);
    try {
      await createAdmin(token, newAdmin.username, newAdmin.password);
      setNewAdmin({ username: '', password: '' });
      await loadData();
    } catch (err) { setError(err.message); }
    finally { setCreatingAdmin(false); }
  }

  async function handleDeleteAdmin(username) {
    if (!confirm(`Delete admin "${username}"?`)) return;
    try {
      await deleteAdmin(token, username);
      await loadData();
    } catch (err) { setError(err.message); }
  }

  if (loading) return <div className="admin-page"><p className="admin-loading">Loading...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <h1 className="admin-page-title">Admin Dashboard</h1>
        <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => { sessionStorage.removeItem('admin_token'); navigate('/admin'); }}>
          Logout
        </button>
      </div>

      {error && <p className="admin-error admin-error-banner">{error}</p>}

      {/* ── Events ── */}
      <section className="admin-section">
        <h2 className="admin-section-title">Events</h2>

        <form className="admin-form admin-form-inline" onSubmit={handleCreateEvent}>
          <input
            className="admin-input"
            placeholder="Event name (Thai)"
            value={newEvent.name}
            onChange={(e) => setNewEvent((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="admin-input admin-input-sm"
            placeholder="Voting code"
            value={newEvent.votingCode}
            onChange={(e) => setNewEvent((f) => ({ ...f, votingCode: e.target.value }))}
            required
          />
          <button className="admin-btn admin-btn-sm" type="submit" disabled={creating}>
            {creating ? 'Creating...' : '+ Create Event'}
          </button>
        </form>

        <div className="admin-event-list">
          {events.map((ev) => (
            <div key={ev.id} className="admin-event-card">
              <div className="admin-event-header">
                <div>
                  <p className="admin-event-name">{ev.name}</p>
                  <p className="admin-event-id">ID: {ev.id}</p>
                </div>
                <div className="admin-event-actions">
                  <button
                    className={`admin-btn admin-btn-sm ${ev.isOpen ? 'admin-btn-danger' : 'admin-btn-success'}`}
                    onClick={() => handleToggleOpen(ev)}
                  >
                    {ev.isOpen ? 'Close Voting' : 'Open Voting'}
                  </button>
                  <button
                    className="admin-btn admin-btn-sm admin-btn-ghost"
                    onClick={() => navigate(`/admin/results/${ev.id}`)}
                  >
                    Results
                  </button>
                </div>
              </div>

              <div className="admin-event-body">
                <div className="admin-event-row">
                  <span className="admin-label">Voting Code</span>
                  <VotingCodeEditor
                    current={ev.votingCode}
                    onSave={(code) => handleUpdateCode(ev.id, code)}
                  />
                </div>

                <div className="admin-event-row">
                  <span className="admin-label">Sync Photos</span>
                  <div className="admin-sync-row">
                    <input
                      className="admin-input"
                      placeholder="Google Sheet URL"
                      value={sheetUrls[ev.id] || ''}
                      onChange={(e) => setSheetUrls((s) => ({ ...s, [ev.id]: e.target.value }))}
                    />
                    <button
                      className="admin-btn admin-btn-sm"
                      onClick={() => handleSync(ev.id)}
                      disabled={syncing[ev.id] || !sheetUrls[ev.id]}
                    >
                      {syncing[ev.id] ? 'Syncing...' : 'Sync'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && <p className="admin-empty">No events yet.</p>}
        </div>
      </section>

      {/* ── Admin Management ── */}
      <section className="admin-section">
        <h2 className="admin-section-title">Admins</h2>

        <form className="admin-form admin-form-inline" onSubmit={handleCreateAdmin}>
          <input
            className="admin-input admin-input-sm"
            placeholder="Username"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin((f) => ({ ...f, username: e.target.value }))}
            required
          />
          <input
            className="admin-input admin-input-sm"
            type="password"
            placeholder="Password (min 8 chars)"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin((f) => ({ ...f, password: e.target.value }))}
            required
            minLength={8}
          />
          <button className="admin-btn admin-btn-sm" type="submit" disabled={creatingAdmin}>
            {creatingAdmin ? 'Creating...' : '+ Add Admin'}
          </button>
        </form>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Username</th><th>Created</th><th></th></tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.username}>
                  <td>{a.username}</td>
                  <td className="admin-muted">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <button
                      className="admin-btn admin-btn-xs admin-btn-danger"
                      onClick={() => handleDeleteAdmin(a.username)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function VotingCodeEditor({ current, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(current);

  function save() {
    if (value && value !== current) onSave(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="admin-sync-row">
        <input className="admin-input admin-input-sm" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
        <button className="admin-btn admin-btn-sm" onClick={save}>Save</button>
        <button className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="admin-sync-row">
      <code className="admin-code">{current}</code>
      <button className="admin-btn admin-btn-xs admin-btn-ghost" onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
}
