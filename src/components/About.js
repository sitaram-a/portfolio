import React from 'react';
import { useFetch } from '../hooks/useApi';
import './About.css';

const highlights = [
  { icon: '⚡', title: 'Performance First', desc: '40% faster page loads through DB query optimization and asset pipeline restructuring.' },
  { icon: '🎯', title: 'Result Driven', desc: '30% engagement lift, 35% dev time reduction, zero post-launch defects across 6 sites.' },
  { icon: '🚀', title: 'Modernization Expert', desc: 'Migrating legacy PHP/MySQL to React + Node.js with API-first architecture.' },
  { icon: '🔗', title: 'API Integration', desc: 'Integrated 5+ live booking APIs across flights, hotels, and car rentals.' },
];

export default function About() {
  const { data: p, loading } = useFetch('profile.php');

  return (
    <section className="section about-section" id="about">
      <div className="orb about-orb" />
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag">About Me</div>
            <h2 className="section-title">Crafting <span>performant</span> web experiences</h2>
            {loading ? (
              <div className="about-skeleton" />
            ) : (
              <>
                {p?.about_1 && <p className="about-text">{p.about_1}</p>}
                {p?.about_2 && <p className="about-text">{p.about_2}</p>}
                {p?.about_3 && <p className="about-text">{p.about_3}</p>}
              </>
            )}
            <div className="about-info-grid">
              <div className="about-info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{p?.location || 'Bhubaneswar, India'}</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Experience</span>
                <span className="info-value">4+ Years</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Availability</span>
                <span className="info-value available">{p?.availability || 'Open to Work'}</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Email</span>
                <a href={`mailto:${p?.email}`} className="info-value info-link">{p?.email}</a>
              </div>
              <div className="about-info-item">
                <span className="info-label">Phone</span>
                <a href={`tel:${p?.phone}`} className="info-value info-link">{p?.phone}</a>
              </div>
              <div className="about-info-item">
                <span className="info-label">Languages</span>
                <span className="info-value">{p?.languages || 'Hindi · English · Bangali'}</span>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                {p?.photo_url ? (
                  <img src={p.photo_url} alt={p.full_name} className="avatar-photo" />
                ) : (
                  <div className="avatar-initials">
                    {(p?.full_name || 'SH').split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                )}
                <div className="avatar-ring" />
                <div className="avatar-ring-2" />
              </div>
              <div className="avatar-badge">
                <span>🏆</span>
                <div>
                  <div className="badge-num">4+</div>
                  <div className="badge-text">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="highlights-grid">
              {highlights.map((h, i) => (
                <div className="highlight-card" key={i}>
                  <div className="highlight-icon">{h.icon}</div>
                  <div>
                    <div className="highlight-title">{h.title}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}