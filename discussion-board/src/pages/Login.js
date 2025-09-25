import React, { useState, useEffect } from 'react';
import { Footer } from '../App';


function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  // ...existing code...
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.token) {
        window.localStorage.setItem('authToken', data.token);
        window.location.href = 'http://localhost:5000'; // Redirect to backend main page
      } else {
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };


  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('loginLikeDislikeCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleLike = () => {
    setCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('loginLikeDislikeCount', newCount);
      return newCount;
    });
  };
  const handleDislike = () => {
    setCount(prev => {
      const newCount = prev - 1;
      localStorage.setItem('loginLikeDislikeCount', newCount);
      return newCount;
    });
  };

  return (
    <>
      <div className="main-bg">
        <div className="main-card" style={{ maxWidth: 420 }}>
          <h2 style={{ color: '#3f51b5', marginBottom: 24, letterSpacing: 1 }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Email:</label>
              <input name="username" type="email" value={form.username} onChange={handleChange} placeholder="Enter your email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Password:</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <button className="main-btn" type="submit">Login</button>
            <button className="main-btn" type="button" style={{ background: '#bbb', color: '#222', marginLeft: 8 }} onClick={() => window.location.href = '/'}>Cancel</button>
          </form>
          {/* Like/Dislike buttons and count */}
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', background: '#f6f8fa', borderRadius: 8, padding: '18px 0 8px 0' }}>
            <button className="main-btn" style={{ background: '#388e3c', minWidth: 80 }} onClick={handleLike} type="button">Like</button>
            <span style={{ fontWeight: 700, minWidth: 32, textAlign: 'center', fontSize: '1.1em', color: '#3f51b5' }}>{count}</span>
            <button className="main-btn" style={{ background: '#e53935', minWidth: 80 }} onClick={handleDislike} type="button">Dislike</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
