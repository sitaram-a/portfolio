import React, { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-orb loader-orb-1" />
      <div className="loader-orb loader-orb-2" />
      <div className="loader-content">
        <div className="loader-logo">
          <span>SH</span>
        </div>
        <div className="loader-name">Sitaram Hembrom</div>
        <div className="loader-role">Frontend Developer</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="loader-pct">{Math.min(Math.round(progress), 100)}%</div>
      </div>
    </div>
  );
}
