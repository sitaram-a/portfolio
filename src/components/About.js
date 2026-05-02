import React from 'react';
import './About.css';

const highlights = [
  { icon: '⚡', title: 'Performance First', desc: 'Delivered 40% faster page loads through DB query optimization and asset pipeline restructuring.' },
  { icon: '🎯', title: 'Result Driven', desc: '30% engagement lift, 35% dev time reduction, and zero post-launch critical defects across 6 sites.' },
  { icon: '🚀', title: 'Modernization Expert', desc: 'Currently migrating legacy PHP/MySQL platform to React + Node.js with API-first architecture.' },
  { icon: '🔗', title: 'API Integration', desc: 'Integrated 5+ live booking APIs for flights, hotels, and car rentals across multiple platforms.' },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="orb about-orb" />
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag">About Me</div>
            <h2 className="section-title">
              Crafting <span>performant</span> web experiences
            </h2>
            <p className="about-text">
              I'm a Bhubaneswar-based Senior Frontend Developer with 4+ years of experience delivering measurable outcomes
              on high-traffic, revenue-critical web products. My expertise spans the full HTML/CSS/JS/PHP/React stack,
              and I'm equally comfortable shipping features and modernizing infrastructure.
            </p>
            <p className="about-text">
              Currently at <strong>Orisys Infotech Pvt. Ltd.</strong>, I lead frontend architecture and full-stack
              modernization — re-architecting a legacy PHP platform into a component-driven React SPA backed by
              decoupled Node.js REST APIs.
            </p>
            <p className="about-text">
              I believe great code solves real problems: faster load times reduce bounce rates, cleaner UX increases
              conversions, and modular systems save engineering hours. Every decision I make is tied to outcomes.
            </p>
            <div className="about-info-grid">
              <div className="about-info-item">
                <span className="info-label">Location</span>
                <span className="info-value">Bhubaneswar, India</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Experience</span>
                <span className="info-value">4+ Years</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Availability</span>
                <span className="info-value available">Open to Work</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">Email</span>
                <a href="mailto:sitaram.hembrom123@gmail.com" className="info-value info-link">
                  sitaram.hembrom123@gmail.com
                </a>
              </div>
              <div className="about-info-item">
                <span className="info-label">Phone</span>
                <a href="tel:+917004941312" className="info-value info-link">+91 070 0494 1312</a>
              </div>
              <div className="about-info-item">
                <span className="info-label">Languages</span>
                <span className="info-value">Hindi · English · Bangali</span>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                <div className="avatar-initials">SH</div>
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
                <div className="highlight-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
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
