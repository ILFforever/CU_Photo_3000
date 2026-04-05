import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/client';
import './Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await adminLogin(form.username, form.password);
      sessionStorage.setItem('admin_token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-card">
        <h1 className="admin-card-title">Admin Login</h1>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Username</label>
            <input name="username" type="text" value={form.username} onChange={handleChange} required autoComplete="username" />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required autoComplete="current-password" />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
