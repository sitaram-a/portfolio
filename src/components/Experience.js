import React, { useState } from 'react';
import { useFetch } from '../hooks/useApi';
import './Experience.css';

export default function Experience() {
  const { data: experiences, loading } = useFetch('experience.php');
  const { data: eduData } = useFetch('education.php');
  const { data: certData } = useFetch('education.php?resource=certifications');
  const [active, setActive] = useState(0);

  const exp = experiences?.[active];

  return (
    <section className="section experience-section" id="experience">
      <div className="orb exp-orb" />
      <div className="container">
        <div className="section-tag">Career</div>
        <h2 className="section-title">Work <span>Experience</span></h2>
        <p className="section-subtitle">4+ years building real products, solving real problems, delivering measurable results.</p>

        {loading ? (
          <div className="exp-loading">Loading experience…</div>
        ) : (
          <div className="exp-layout">
            <div className="exp-tabs">
              {(experiences || []).map((e, i) => (
                <button key={i} className={`exp-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
                  <div className="exp-tab-company">{e.company}</div>
                  <div className="exp-tab-period">{e.period}</div>
                  {!!e.is_current && <span className="exp-tab-badge">Current</span>}
                </button>
              ))}

              {(eduData || []).length > 0 && (
                <div className="exp-edu-card">
                  <div className="exp-edu-title">Education</div>
                  {eduData.map(e => (
                    <div className="exp-edu-item" key={e.id}>
                      <div className="edu-degree">{e.degree}</div>
                      <div className="edu-school">{e.institution}</div>
                      <div className="edu-year">{e.university} · {e.year}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {exp && (
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
                    <div className={`exp-status ${exp.is_current ? 'current' : ''}`} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {exp.description && <p className="exp-description">{exp.description}</p>}

                {exp.achievements?.length > 0 && (
                  <div className="exp-achievements">
                    <div className="exp-achievements-title">Key Achievements</div>
                    {exp.achievements.map((a, i) => (
                      <div className="exp-achievement" key={i}>
                        <div className="exp-achievement-dot" />
                        <p>{a}</p>
                      </div>
                    ))}
                  </div>
                )}

                {exp.tech?.length > 0 && (
                  <div className="exp-tech-wrap">
                    <div className="exp-tech-label">Tech Used</div>
                    <div className="exp-tech-tags">
                      {exp.tech.map((t, i) => <span key={i} className="exp-tech-tag">{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {(certData || []).length > 0 && (
          <div className="certs-section">
            <div className="certs-title">Certifications</div>
            <div className="certs-grid">
              {certData.map(c => (
                <div className="cert-card" key={c.id}>
                  <div className="cert-icon">{c.icon}</div>
                  <div>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-year">{c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}