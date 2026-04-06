const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const { headers: extraHeaders, ...restOptions } = options;
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    ...restOptions,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ── Vote ──────────────────────────────────────────────────────────────────────

export const getActiveEvent = () => request('/events/active');

export const verifyVoter = (phone, fullName, votingCode) =>
  request('/events/verify', {
    method: 'POST',
    body: JSON.stringify({ phone, fullName, votingCode }),
  });

export const getPhotos = (eventId) =>
  request(`/events/${eventId}/photos`);

export const castVote = (eventId, phone, votingCode, photoId) =>
  request(`/events/${eventId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ phone, votingCode, photoId }),
  });

// ── Admin ─────────────────────────────────────────────────────────────────────

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export const adminLogin = (username, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const getEvents = (token) =>
  request('/admin/events', { headers: authHeaders(token) });

export const createEvent = (token, payload) =>
  request('/admin/events', { method: 'POST', body: JSON.stringify(payload), headers: authHeaders(token) });

export const updateEvent = (token, eventId, payload) =>
  request(`/admin/events/${eventId}`, { method: 'PATCH', body: JSON.stringify(payload), headers: authHeaders(token) });

export const deleteEvent = (token, eventId) =>
  request(`/admin/events/${eventId}`, { method: 'DELETE', headers: authHeaders(token) });

export const syncPhotos = (token, eventId, sheetUrl) =>
  request(`/admin/events/${eventId}/sync-photos`, { method: 'POST', body: JSON.stringify({ sheetUrl }), headers: authHeaders(token) });

export const getResults = (token, eventId) =>
  request(`/admin/events/${eventId}/results`, { headers: authHeaders(token) });

export const getAdmins = (token) =>
  request('/admin/admins', { headers: authHeaders(token) });

export const createAdmin = (token, username, password) =>
  request('/admin/admins', { method: 'POST', body: JSON.stringify({ username, password }), headers: authHeaders(token) });

export const deleteAdmin = (token, username) =>
  request(`/admin/admins/${username}`, { method: 'DELETE', headers: authHeaders(token) });
