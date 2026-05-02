import React, { useState } from 'react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Core Languages',
    color: '#6c63ff',
    skills: [
      { name: 'HTML5', level: 98, icon: '🌐' },
      { name: 'CSS3', level: 95, icon: '🎨' },
      { name: 'JavaScript ES6+', level: 90, icon: '⚡' },
      { name: 'PHP', level: 85, icon: '🐘' },
    ]
  },
  {
    category: 'Modern Stack',
    color: '#00d4ff',
    skills: [
      { name: 'React.js', level: 80, icon: '⚛️' },
      { name: 'Node.js', level: 72, icon: '🟢' },
      { name: 'REST APIs', level: 88, icon: '🔌' },
      { name: 'MySQL', level: 85, icon: '🗄️' },
    ]
  },
  {
    category: 'Frameworks & Tools',
    color: '#f59e0b',
    skills: [
      { name: 'Bootstrap', level: 92, icon: '🅱️' },
      { name: 'Git', level: 85, icon: '🌿' },
      { name: 'phpMyAdmin', level: 88, icon: '🖥️' },
      { name: 'Figma / Photoshop', level: 80, icon: '🎭' },
    ]
  },
  {
    category: 'Expertise',
    color: '#10b981',
    skills: [
      { name: 'Performance Optimization', level: 92, icon: '🚀' },
      { name: 'Responsive UI Design', level: 95, icon: '📱' },
      { name: 'Cross-browser Testing', level: 90, icon: '🧪' },
      { name: 'API Integration', level: 88, icon: '🔗' },
    ]
  }
];

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">Skills & <span>Technologies</span></h2>
          <p className="section-subtitle">
            A curated toolkit built through 4+ years of real-world production development.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
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
                      <div
                        className="skill-bar-fill"
                        style={{
                          '--fill-width': `${skill.level}%`,
                          '--fill-color': group.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-tags-wrap">
          <div className="skills-tags-title">Also worked with</div>
          <div className="skills-tags">
            {['SEO Optimization','Core Web Vitals','Performance Audit','Component Architecture','API-First Design','Modular CSS','Cross-device Testing','phpMyAdmin','Hostinger','cPanel Deployment','Email Automation','Print Preview UX'].map((tag,i) => (
              <span key={i} className="skill-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
