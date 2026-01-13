import React, { useState } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from './emailjs.config';

function App() {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          message: form.comment,
          to_email: "micael.staeubli@gmail.com"
        },
        EMAILJS_USER_ID
      );
      setSuccess(true);
    } catch (err) {
      alert('There was a problem submitting your form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <span className="logo-text">OrbitalDisk</span>
      </div>
      <h1>Join the <span className="highlight">Waitlist</span></h1>
      <div className="desc">Be the first to experience <span className="highlight">OrbitalDisk</span> – the professional standard to plan your year, month, or quarter in perfect circles. Sign up below to get notified at launch!</div>
      {!success ? (
        <form className="waitlist-form" onSubmit={handleSubmit} autoComplete="on">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="you@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="comment">Comment <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span></label>
            <textarea id="comment" name="comment" rows={2} placeholder="Anything you'd like to share?" value={form.comment} onChange={handleChange}></textarea>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Join Waitlist'}</button>
        </form>
      ) : (
        <div className="success">Thank you for joining the waitlist!<br/>We'll keep you posted.</div>
      )}
      <div className="footer">&copy; 2026 OrbitalDisk. All rights reserved.</div>
    </div>
  );
}

export default App;
