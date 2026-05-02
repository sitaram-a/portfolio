import React from 'react';
import './Footer.css';

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-gradient" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>SH</span>
          </div>
          <div>
            <div className="footer-name">Sitaram Hembrom</div>
            <div className="footer-role">Senior Frontend Developer</div>
          </div>
        </div>

        <nav className="footer-nav">
          {navLinks.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className="footer-link">{l}</button>
          ))}
        </nav>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Sitaram Hembrom. Built with React & ♥
          </div>
          <div className="footer-location">
            📍 Bhubaneswar, India
          </div>
        </div>
      </div>
    </footer>
  );
}
