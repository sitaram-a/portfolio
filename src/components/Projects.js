import React, { useState } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'MayjoCarhire.com',
    category: 'Full-Stack Platform',
    desc: 'End-to-end full-stack car hire platform with booking engine, dynamic rate chart, automated customer emails, print-preview receipts, and a full admin dashboard.',
    highlights: ['Booking Engine', 'Admin Dashboard', 'Email Automation', 'Print Preview Receipts', 'Dynamic Pricing'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'CSS3'],
    url: 'https://mayjocarhire.com',
    color: '#6c63ff',
    emoji: '🚗',
  },
  {
    title: 'SNZCarRental.com',
    category: 'Car Rental Platform',
    desc: 'Full-stack car rental platform built on PHP + MySQL backend with responsive booking UI. Handles real-time availability and booking management.',
    highlights: ['Responsive Booking UI', 'Real-time Availability', 'PHP + MySQL Backend', 'SEO Optimized'],
    tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    url: 'https://snzcarrental.com',
    color: '#00d4ff',
    emoji: '🏎️',
  },
  {
    title: 'Cyprus-Carrentals.com',
    category: 'International Platform',
    desc: 'International car rental site targeting the Cyprus market. Features multi-currency UI and localised UX to serve international travelers seamlessly.',
    highlights: ['Multi-currency UI', 'Localised UX', 'International SEO', 'Cross-device Compatible'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'Bootstrap'],
    url: 'https://cyprus-carrentals.com',
    color: '#f59e0b',
    emoji: '✈️',
  },
  {
    title: 'RehareRehab.com',
    category: 'Healthcare Platform',
    desc: 'Healthcare service site with SEO-optimised landing pages driving measurable organic traffic growth. Clean, trust-inspiring design for a rehab service provider.',
    highlights: ['SEO-optimized', 'Organic Traffic Growth', 'Healthcare UX', 'Conversion-focused'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SEO'],
    url: 'https://rehearrehab.com',
    color: '#10b981',
    emoji: '🏥',
  },
  {
    title: 'MCARentals.com.mt',
    category: 'Malta Market',
    desc: 'Malta-market booking platform with fully responsive UI and cross-device compatibility. Built for the European rental market with localized content.',
    highlights: ['Malta Market', 'Fully Responsive', 'Cross-device UI', 'Booking System'],
    tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS3'],
    url: 'https://mcarrentals.com.mt',
    color: '#ec4899',
    emoji: '🌍',
  },
  {
    title: 'DownWestRentals.com',
    category: 'Rental Portal',
    desc: 'Rental portal featuring real-time availability integration and dynamic inventory display. Seamless booking flow reducing customer friction to zero.',
    highlights: ['Real-time Availability', 'Dynamic Inventory', 'Booking Portal', 'Smooth UX'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'API Integration'],
    url: 'https://downwestrentals.com',
    color: '#8b5cf6',
    emoji: '📍',
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">Live <span>Projects</span></h2>
        <p className="section-subtitle">
          6 production sites shipped — zero post-launch critical defects. Real products, real users, real outcomes.
        </p>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              className={`project-card ${active === i ? 'active' : ''}`}
              key={i}
              style={{ '--pcolor': p.color }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="project-card-top">
                <div className="project-emoji">{p.emoji}</div>
                <span className="project-category">{p.category}</span>
              </div>

              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>

              <div className="project-highlights">
                {p.highlights.map((h, j) => (
                  <span key={j} className="project-highlight">{h}</span>
                ))}
              </div>

              <div className="project-footer">
                <div className="project-tech">
                  {p.tech.map((t, j) => (
                    <span key={j} className="project-tech-tag">{t}</span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                  <span>Visit Site</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>

              <div className="project-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
