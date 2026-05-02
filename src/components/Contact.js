import React, { useState } from 'react';
import './Contact.css';

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'sitaram.hembrom123@gmail.com',
    href: 'mailto:sitaram.hembrom123@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+91 070 0494 1312',
    href: 'tel:+917004941312',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Bhubaneswar, Odisha, India',
    href: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/sitaram-hembrom',
    href: 'https://linkedin.com/in/sitaram-hembrom',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      // ===== INFINITYFREE PHP API ENDPOINT =====
      // Replace this URL with your InfinityFree hosted PHP endpoint
      // Create contact.php on your InfinityFree host:
      // See /api/contact.php in the project for the PHP script
      const API_URL = process.env.REACT_APP_API_URL || 'https://yourdomain.infinityfreeapp.com/api/contact.php';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not connect. Please email me directly.');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="orb contact-orb" />
      <div className="container">
        <div className="section-tag">Get in Touch</div>
        <h2 className="section-title">Let's Work <span>Together</span></h2>
        <p className="section-subtitle">
          Open to frontend roles, full-stack projects, and freelance work. Let's build something great.
        </p>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info">
            <div className="contact-cta-text">
              <h3>Ready to collaborate?</h3>
              <p>
                Whether you're looking for a skilled frontend developer to join your team, need a high-performance
                website built from scratch, or want to modernize a legacy codebase — I'm your person.
              </p>
            </div>

            <div className="contact-items">
              {contactInfo.map((item, i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact-item-value link">
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact-item-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="availability-card">
              <div className="avail-dot" />
              <div>
                <div className="avail-title">Available Now</div>
                <div className="avail-desc">Open to full-time, part-time & freelance</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out, I'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text" id="name" name="name"
                      value={form.name} onChange={handleChange}
                      placeholder="John Smith" required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email" id="email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="john@company.com" required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    placeholder="Frontend Developer Role / Project Inquiry" required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or role..." required rows={5}
                  />
                </div>
                {status === 'error' && (
                  <div className="form-error">{errorMsg}</div>
                )}
                <button
                  type="submit"
                  className={`btn-primary form-submit ${status === 'loading' ? 'loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
