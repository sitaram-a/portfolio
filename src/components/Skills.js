import React, { useState } from 'react';
import { useFetch } from '../hooks/useApi';
import './Skills.css';

export default function Skills() {
  const { data: raw, loading } = useFetch('skills.php');
  const [hovered, setHovered] = useState(null);

  // Group skills by category
  const grouped = React.useMemo(() => {
    if (!raw) return [];
    const map = {};
    raw.forEach(s => {
      if (!map[s.category]) map[s.category] = { category: s.category, color: s.color, skills: [] };
      map[s.category].skills.push(s);
    });
    return Object.values(map);
  }, [raw]);

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">Skills & <span>Technologies</span></h2>
          <p className="section-subtitle">A curated toolkit built through 4+ years of real-world production development.</p>
        </div>

        {loading ? (
          <div className="skills-loading">
            {[1,2,3,4].map(i => <div key={i} className="skill-group-skeleton" />)}
          </div>
        ) : (
          <div className="skills-grid">
            {grouped.map((group, gi) => (
              <div className="skill-group" key={gi}>
                <div className="skill-group-header" style={{ '--gcolor': group.color }}>
                  <span className="skill-group-dot" />
                  <h3 className="skill-group-title">{group.category}</h3>
                </div>
                <div className="skill-list">
                  {group.skills.map((skill, si) => (
                    <div
                      className={`skill-item ${hovered === `${gi}-${si}` ? 'hovered' : ''}`}
                      key={si}
                      onMouseEnter={() => setHovered(`${gi}-${si}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="skill-row">
                        <div className="skill-name-wrap">
                          <span className="skill-icon">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-pct" style={{ color: group.color }}>{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ '--fill-width': `${skill.level}%`, '--fill-color': group.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}