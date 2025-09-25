import React, { useState } from 'react';
import { Footer } from '../App';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    givenName: '',
    familyName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(form.username)) {
      errs.username = 'Invalid email address';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)) {
      errs.password = 'Password must be 8+ chars, include upper, lower, digit';
    }
    if (!form.givenName) errs.givenName = 'Required';
    if (!form.familyName) errs.familyName = 'Required';
    if (!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(form.phone)) {
      errs.phone = 'Invalid phone number';
    }
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
  const res = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
            givenName: form.givenName,
            familyName: form.familyName,
            phone: form.phone
          })
        });
        const data = await res.json();
        console.log('Registration response:', data);
        if (res.ok && data.success) {
          window.location.href = '/login';
        } else {
          setErrors({
            ...errs,
            form: data.message || 'Registration failed. Please try again.'
          });
        }
      } catch (error) {
        setErrors({
          ...errs,
          form: 'Network error. Please try again.'
        });
      }
    }
  };

  return (
    <>
      <div className="main-bg">
        <div className="main-card" style={{ maxWidth: 420 }}>
          <h2 style={{ color: '#3f51b5', marginBottom: 24, letterSpacing: 1 }}>Register</h2>
          <form onSubmit={handleSubmit}>
            {errors.form && <div style={{ color: 'red', marginBottom: 12 }}>{errors.form}</div>}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Email:</label>
              <input name="username" value={form.username} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
              {errors.username && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.username}</span>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Password:</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
              {errors.password && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.password}</span>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Given Name:</label>
              <input name="givenName" value={form.givenName} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
              {errors.givenName && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.givenName}</span>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Family Name:</label>
              <input name="familyName" value={form.familyName} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
              {errors.familyName && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.familyName}</span>}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>Phone:</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #bbb' }} />
              {errors.phone && <span style={{ color: 'red', fontSize: '0.95em' }}>{errors.phone}</span>}
            </div>
            <button className="main-btn" type="submit">Register</button>
            <button className="main-btn" type="button" style={{ background: '#bbb', color: '#222', marginLeft: 8 }} onClick={() => window.location.href = '/'}>Cancel</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
