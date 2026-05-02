import React, { useState } from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Frontend Developer / Web Designer',
    company: 'Orisys Infotech Pvt. Ltd.',
    location: 'Bhubaneswar',
    period: 'Mar 2023 – Present',
    type: 'Full-time',
    current: true,
    description: 'Leading frontend architecture and full-stack modernization for a travel booking platform. Driving measurable performance improvements and building reusable component systems.',
    achievements: [
      'Rebuilt DB query architecture & asset pipeline — delivered 40% faster page loads and 25% Core Web Vitals improvement, directly reducing bounce rate',
      'Integrated live flight & hotel booking APIs across 5+ travel sites, cutting checkout friction and measurably lifting booking completion rates',
      'Engineered a modular HTML/CSS/JS/PHP component library adopted across all new client projects — slashed UI dev time by ~35% and cut QA cycles',
      'Shipped 6 live production sites (car rentals, e-commerce, healthcare) on schedule — zero post-launch critical defects',
      'Eliminated 2 manual support escalation steps by streamlining booking UX to align with airline & tour-operator workflows',
      'Currently migrating legacy PHP/MySQL to React + Node.js — re-architecting frontend as component-driven SPA with decoupled REST APIs',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'React.js', 'Node.js', 'REST APIs', 'Bootstrap'],
  },
  {
    role: 'Web Designer',
    company: 'Paultech Software Services',
    location: 'Jamshedpur',
    period: 'Jan 2022 – Mar 2023',
    type: 'Full-time',
    current: false,
    description: 'Sole designer-developer responsible for full website redesigns and pixel-perfect client deliverables. Achieved 100% on-schedule completion rate across all projects.',
    achievements: [
      'Executed full website redesign as sole designer-developer — achieved 30% uplift in user engagement and 20% improvement in conversion rate within 90 days',
      'Delivered pixel-perfect, cross-browser interfaces for every client brief with 100% on-schedule completion rate — zero missed deadlines',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Photoshop', 'Bootstrap', 'Responsive Design'],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section className="section experience-section" id="experience">
      <div className="orb exp-orb" />
      <div className="container">
        <div className="section-tag">Career</div>
        <h2 className="section-title">Work <span>Experience</span></h2>
        <p className="section-subtitle">
          4+ years of building real products, solving real problems, and delivering measurable results.
        </p>

        <div className="exp-layout">
          {/* Tabs */}
          <div className="exp-tabs">
            {experiences.map((e, i) => (
              <button
                key={i}
                className={`exp-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="exp-tab-company">{e.company}</div>
                <div className="exp-tab-period">{e.period}</div>
                {e.current && <span className="exp-tab-badge">Current</span>}
              </button>
            ))}

            {/* Education */}
            <div className="exp-edu-card">
              <div className="exp-edu-title">Education</div>
              <div className="exp-edu-item">
                <div className="edu-degree">BCA / IT</div>
                <div className="edu-school">Mrs. KMPM Vocational College</div>
                <div className="edu-year">Kolhan University · 2019</div>
              </div>
              <div className="exp-edu-item">
                <div className="edu-degree">Intermediate</div>
                <div className="edu-school">Baharagora College</div>
                <div className="edu-year">JAC · 2014</div>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="exp-detail" key={active}>
            <div className="exp-detail-header">
              <div>
                <div className="exp-detail-role">{exp.role}</div>
                <div className="exp-detail-meta">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-dot">·</span>
                  <span className="exp-location">{exp.location}</span>
                </div>
              </div>
              <div className="exp-period-badge">
                <div className={`exp-status ${exp.current ? 'current' : ''}`} />
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="exp-description">{exp.description}</p>

            <div className="exp-achievements">
              <div className="exp-achievements-title">Key Achievements</div>
              {exp.achievements.map((a, i) => (
                <div className="exp-achievement" key={i}>
                  <div className="exp-achievement-dot" />
                  <p>{a}</p>
                </div>
              ))}
            </div>

            <div className="exp-tech-wrap">
              <div className="exp-tech-label">Tech Used</div>
              <div className="exp-tech-tags">
                {exp.tech.map((t, i) => (
                  <span key={i} className="exp-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="certs-section">
          <div className="certs-title">Certifications</div>
          <div className="certs-grid">
            <div className="cert-card">
              <div className="cert-icon">🎨</div>
              <div className="cert-name">Web Design with Photoshop</div>
              <div className="cert-year">2017–18</div>
            </div>
            <div className="cert-card">
              <div className="cert-icon">☕</div>
              <div className="cert-name">Core Java Programming</div>
              <div className="cert-year">2015</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
