import React, { useState } from 'react';
import { useFetch } from '../hooks/useApi';
import './Projects.css';

export default function Projects() {
  const { data: projects, loading } = useFetch('projects.php');
  const [active, setActive] = useState(null);

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">Live <span>Projects</span></h2>
        <p className="section-subtitle">6 production sites shipped — zero post-launch critical defects. Real products, real users, real outcomes.</p>

        {loading ? (
          <div className="projects-loading">
            {[1,2,3,4,5,6].map(i => <div key={i} className="project-skeleton" />)}
          </div>
        ) : (
          <div className="projects-grid">
            {(projects || []).map((p, i) => (
              <div
                className={`project-card ${active === i ? 'active' : ''}`}
                key={p.id || i}
                style={{ '--pcolor': p.color }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="project-card-top">
                  <div className="project-emoji">{p.emoji}</div>
                  <span className="project-category">{p.category}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                {p.highlights_arr?.length > 0 && (
                  <div className="project-highlights">
                    {p.highlights_arr.map((h, j) => <span key={j} className="project-highlight">{h}</span>)}
                  </div>
                )}
                <div className="project-footer">
                  <div className="project-tech">
                    {(p.tech_arr || []).map((t, j) => <span key={j} className="project-tech-tag">{t}</span>)}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                      <span>Visit Site</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    </a>
                  )}
                </div>
                <div className="project-glow" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}