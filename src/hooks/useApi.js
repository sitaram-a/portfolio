// src/hooks/useApi.js
// Central place for all API calls

export const API_BASE = process.env.REACT_APP_API_URL || 'https://sitaram-hembrom.lovestoblog.com/api';

// Generic fetch hook
import { useState, useEffect } from 'react';

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`${API_BASE}/${endpoint}`)
      .then(r => r.json())
      .then(r => { if (!cancelled) { setData(r.data); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
}

// Admin API helpers
export const adminApi = {
  token: () => localStorage.getItem('admin_token'),

  headers: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
  }),

  get: (ep) => fetch(`${API_BASE}/${ep}`, { headers: adminApi.headers() }).then(r => r.json()),

  post: (ep, body) => fetch(`${API_BASE}/${ep}`, {
    method: 'POST', headers: adminApi.headers(), body: JSON.stringify(body),
  }).then(r => r.json()),

  put: (ep, body) => fetch(`${API_BASE}/${ep}`, {
    method: 'PUT', headers: adminApi.headers(), body: JSON.stringify(body),
  }).then(r => r.json()),

  delete: (ep) => fetch(`${API_BASE}/${ep}`, {
    method: 'DELETE', headers: adminApi.headers(),
  }).then(r => r.json()),

  login: (username, password) => fetch(`${API_BASE}/auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(r => r.json()),
};