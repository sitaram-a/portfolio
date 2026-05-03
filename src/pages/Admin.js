import React, { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../hooks/useApi';
import './Admin.css';

// ─── tiny reusable pieces ────────────────────────────────────
function Field({ label, name, value, onChange, type = 'text', rows, placeholder }) {
  return (
    <div className="af-group">
      <label className="af-label">{label}</label>
      {rows ? (
        <textarea className="af-input" name={name} value={value || ''} onChange={onChange} rows={rows} placeholder={placeholder} />
      ) : (
        <input className="af-input" type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { if (msg) { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); } }, [msg, onClose]);
  if (!msg) return null;
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

function Confirm({ msg, onYes, onNo }) {
  if (!msg) return null;
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{msg}</p>
        <div className="confirm-btns">
          <button className="btn-danger-sm" onClick={onYes}>Delete</button>
          <button className="btn-ghost-sm" onClick={onNo}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Login screen ────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true);
    const res = await adminApi.login(form.username, form.password);
    setLoading(false);
    if (res.success) { localStorage.setItem('admin_token', res.data.token); onLogin(); }
    else setErr(res.message || 'Invalid credentials');
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">SH</div>
        <h2 className="login-title">Admin Login</h2>
        <p className="login-sub">Portfolio CMS</p>
        <form onSubmit={submit}>
          <Field label="Username" name="username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="admin" />
          <Field label="Password" name="password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          {err && <div className="login-err">{err}</div>}
          <button className="btn-primary-full" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        <p className="login-hint">Default: admin / Admin@1234</p>
      </div>
    </div>
  );
}

// ─── Profile section ─────────────────────────────────────────
function ProfileSection({ toast }) {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { adminApi.get('profile.php').then(r => setData(r.data)); }, []);
  const change = e => setData({ ...data, [e.target.name]: e.target.value });
  const save = async () => {
    setSaving(true);
    const r = await adminApi.post('profile.php', data);
    setSaving(false);
    toast(r.success ? 'Profile saved!' : r.message, r.success ? 'success' : 'error');
  };
  if (!data) return <div className="sec-loading">Loading…</div>;
  return (
    <div className="admin-section">
      <div className="sec-header"><h3>Profile</h3><button className="btn-save" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button></div>
      <div className="field-grid">
        <Field label="Full Name" name="full_name" value={data.full_name} onChange={change} />
        <Field label="Title / Role" name="title" value={data.title} onChange={change} />
        <Field label="Email" name="email" value={data.email} onChange={change} type="email" />
        <Field label="Phone" name="phone" value={data.phone} onChange={change} />
        <Field label="Location" name="location" value={data.location} onChange={change} />
        <Field label="Availability" name="availability" value={data.availability} onChange={change} />
        <Field label="Languages" name="languages" value={data.languages} onChange={change} />
        <Field label="GitHub URL" name="github_url" value={data.github_url} onChange={change} />
        <Field label="LinkedIn URL" name="linkedin_url" value={data.linkedin_url} onChange={change} />
        <Field label="Photo URL" name="photo_url" value={data.photo_url} onChange={change} placeholder="https://..." />
        <Field label="Resume URL" name="resume_url" value={data.resume_url} onChange={change} />
      </div>
      <Field label="Tagline" name="tagline" value={data.tagline} onChange={change} rows={2} />
      <Field label="About paragraph 1" name="about_1" value={data.about_1} onChange={change} rows={3} />
      <Field label="About paragraph 2" name="about_2" value={data.about_2} onChange={change} rows={3} />
      <Field label="About paragraph 3" name="about_3" value={data.about_3} onChange={change} rows={3} />
      <div className="subsec-title">Stats (shown in Hero)</div>
      <div className="field-grid">
        {[1,2,3,4].map(n => (
          <React.Fragment key={n}>
            <Field label={`Stat ${n} Value`} name={`stat_${n}_value`} value={data[`stat_${n}_value`]} onChange={change} placeholder="40%" />
            <Field label={`Stat ${n} Label`} name={`stat_${n}_label`} value={data[`stat_${n}_label`]} onChange={change} placeholder="Faster Page Loads" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Experience section ───────────────────────────────────────
function ExperienceSection({ toast }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | {item}
  const [confirm, setConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const blank = { role:'', company:'', location:'', period:'', is_current:0, employment_type:'Full-time', description:'', tech_stack:'', sort_order:0, achievements:[''] };

  const load = useCallback(() => adminApi.get('experience.php').then(r => setItems(r.data || [])), []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const payload = { ...editing, achievements: editing.achievements.filter(a => a.trim()) };
    const isNew = !editing.id;
    const r = isNew
      ? await adminApi.post('experience.php', payload)
      : await adminApi.put(`experience.php?id=${editing.id}`, payload);
    setSaving(false);
    if (r.success) { toast('Saved!', 'success'); setEditing(null); load(); }
    else toast(r.message, 'error');
  };

  const del = async (id) => {
    const r = await adminApi.delete(`experience.php?id=${id}`);
    setConfirm(null);
    if (r.success) { toast('Deleted', 'success'); load(); } else toast(r.message, 'error');
  };

  const achChange = (i, val) => {
    const a = [...editing.achievements]; a[i] = val; setEditing({ ...editing, achievements: a });
  };

  return (
    <div className="admin-section">
      <div className="sec-header">
        <h3>Experience</h3>
        <button className="btn-add" onClick={() => setEditing({ ...blank })}>+ Add Job</button>
      </div>
      {editing ? (
        <div className="edit-form">
          <div className="field-grid">
            <Field label="Job Title" name="role" value={editing.role} onChange={e => setEditing({...editing,role:e.target.value})} />
            <Field label="Company" name="company" value={editing.company} onChange={e => setEditing({...editing,company:e.target.value})} />
            <Field label="Location" name="location" value={editing.location} onChange={e => setEditing({...editing,location:e.target.value})} />
            <Field label="Period" name="period" value={editing.period} onChange={e => setEditing({...editing,period:e.target.value})} placeholder="Jan 2022 – Present" />
            <Field label="Sort Order" name="sort_order" value={editing.sort_order} onChange={e => setEditing({...editing,sort_order:e.target.value})} type="number" />
            <div className="af-group">
              <label className="af-label">Currently Working Here?</label>
              <select className="af-input" value={editing.is_current} onChange={e => setEditing({...editing,is_current:+e.target.value})}>
                <option value={0}>No</option><option value={1}>Yes</option>
              </select>
            </div>
          </div>
          <Field label="Description" name="description" value={editing.description} onChange={e => setEditing({...editing,description:e.target.value})} rows={3} />
          <Field label="Tech Stack (comma-separated)" name="tech_stack" value={editing.tech_stack} onChange={e => setEditing({...editing,tech_stack:e.target.value})} placeholder="React,Node.js,MySQL" />
          <div className="subsec-title">Achievements
            <button className="btn-tiny" onClick={() => setEditing({...editing, achievements:[...editing.achievements,'']})}>+ Add</button>
          </div>
          {(editing.achievements || ['']).map((a, i) => (
            <div key={i} className="ach-row">
              <textarea className="af-input ach-input" value={a} rows={2} onChange={e => achChange(i, e.target.value)} placeholder={`Achievement ${i+1}`} />
              {editing.achievements.length > 1 && <button className="btn-remove" onClick={() => { const arr=[...editing.achievements]; arr.splice(i,1); setEditing({...editing,achievements:arr}); }}>✕</button>}
            </div>
          ))}
          <div className="edit-actions">
            <button className="btn-save" onClick={save} disabled={saving}>{saving?'Saving…':'Save'}</button>
            <button className="btn-ghost-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="item-list">
          {items.map(item => (
            <div className="item-card" key={item.id}>
              <div className="item-card-body">
                <div className="item-title">{item.role}</div>
                <div className="item-sub">{item.company} · {item.period}</div>
                <div className="item-tags">{(item.tech || []).map(t => <span key={t} className="mini-tag">{t}</span>)}</div>
              </div>
              <div className="item-actions">
                <button className="btn-edit" onClick={() => setEditing({...item, achievements: item.achievements?.length ? item.achievements : ['']})}>Edit</button>
                <button className="btn-del" onClick={() => setConfirm({ msg:`Delete "${item.role}"?`, id:item.id })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Confirm msg={confirm?.msg} onYes={() => del(confirm.id)} onNo={() => setConfirm(null)} />
    </div>
  );
}

// ─── Skills section ───────────────────────────────────────────
function SkillsSection({ toast }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const blank = { name:'', level:80, category:'Core Languages', icon:'⚡', color:'#6c63ff', sort_order:0 };
  const cats = ['Core Languages','Modern Stack','Frameworks & Tools','Expertise'];

  const load = useCallback(() => adminApi.get('skills.php').then(r => setItems(r.data||[])), []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const r = editing.id ? await adminApi.put(`skills.php?id=${editing.id}`,editing) : await adminApi.post('skills.php',editing);
    setSaving(false);
    if (r.success) { toast('Saved!','success'); setEditing(null); load(); } else toast(r.message,'error');
  };

  const del = async id => {
    const r = await adminApi.delete(`skills.php?id=${id}`);
    setConfirm(null);
    if (r.success) { toast('Deleted','success'); load(); } else toast(r.message,'error');
  };

  const grouped = cats.map(cat => ({ cat, skills: items.filter(s => s.category === cat) }));

  return (
    <div className="admin-section">
      <div className="sec-header"><h3>Skills</h3><button className="btn-add" onClick={() => setEditing({...blank})}>+ Add Skill</button></div>
      {editing && (
        <div className="edit-form">
          <div className="field-grid">
            <Field label="Skill Name" name="name" value={editing.name} onChange={e => setEditing({...editing,name:e.target.value})} />
            <div className="af-group">
              <label className="af-label">Category</label>
              <select className="af-input" value={editing.category} onChange={e => setEditing({...editing,category:e.target.value})}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="af-group">
              <label className="af-label">Level: {editing.level}%</label>
              <input type="range" min={10} max={100} value={editing.level} onChange={e => setEditing({...editing,level:+e.target.value})} className="af-range" />
            </div>
            <Field label="Icon (emoji)" name="icon" value={editing.icon} onChange={e => setEditing({...editing,icon:e.target.value})} />
            <div className="af-group">
              <label className="af-label">Color</label>
              <input type="color" value={editing.color} onChange={e => setEditing({...editing,color:e.target.value})} className="af-color" />
            </div>
            <Field label="Sort Order" name="sort_order" value={editing.sort_order} type="number" onChange={e => setEditing({...editing,sort_order:+e.target.value})} />
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={save} disabled={saving}>{saving?'Saving…':'Save'}</button>
            <button className="btn-ghost-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
      {grouped.map(({ cat, skills }) => skills.length > 0 && (
        <div key={cat} className="skill-group-admin">
          <div className="skill-group-label">{cat}</div>
          {skills.map(s => (
            <div className="item-card" key={s.id}>
              <div className="item-card-body">
                <div className="item-title">{s.icon} {s.name}</div>
                <div className="skill-bar-mini"><div style={{width:`${s.level}%`,background:s.color}} /></div>
                <div className="item-sub">{s.level}%</div>
              </div>
              <div className="item-actions">
                <button className="btn-edit" onClick={() => setEditing({...s})}>Edit</button>
                <button className="btn-del" onClick={() => setConfirm({msg:`Delete "${s.name}"?`,id:s.id})}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Confirm msg={confirm?.msg} onYes={() => del(confirm.id)} onNo={() => setConfirm(null)} />
    </div>
  );
}

// ─── Projects section ─────────────────────────────────────────
function ProjectsSection({ toast }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const blank = { title:'', category:'', description:'', highlights:'', tech_stack:'', url:'', color:'#6c63ff', emoji:'🚀', sort_order:0, is_visible:1 };

  const load = useCallback(() => adminApi.get('projects.php').then(r => setItems(r.data||[])), []);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const r = editing.id ? await adminApi.put(`projects.php?id=${editing.id}`,editing) : await adminApi.post('projects.php',editing);
    setSaving(false);
    if (r.success) { toast('Saved!','success'); setEditing(null); load(); } else toast(r.message,'error');
  };

  const del = async id => {
    const r = await adminApi.delete(`projects.php?id=${id}`);
    setConfirm(null);
    if (r.success) { toast('Deleted','success'); load(); } else toast(r.message,'error');
  };

  return (
    <div className="admin-section">
      <div className="sec-header"><h3>Projects</h3><button className="btn-add" onClick={() => setEditing({...blank})}>+ Add Project</button></div>
      {editing && (
        <div className="edit-form">
          <div className="field-grid">
            <Field label="Title" name="title" value={editing.title} onChange={e => setEditing({...editing,title:e.target.value})} />
            <Field label="Category" name="category" value={editing.category} onChange={e => setEditing({...editing,category:e.target.value})} placeholder="Full-Stack Platform" />
            <Field label="Live URL" name="url" value={editing.url} onChange={e => setEditing({...editing,url:e.target.value})} placeholder="https://..." />
            <Field label="Emoji" name="emoji" value={editing.emoji} onChange={e => setEditing({...editing,emoji:e.target.value})} />
            <div className="af-group">
              <label className="af-label">Color</label>
              <input type="color" value={editing.color} onChange={e => setEditing({...editing,color:e.target.value})} className="af-color" />
            </div>
            <div className="af-group">
              <label className="af-label">Visible on Portfolio</label>
              <select className="af-input" value={editing.is_visible} onChange={e => setEditing({...editing,is_visible:+e.target.value})}>
                <option value={1}>Yes</option><option value={0}>No (Hidden)</option>
              </select>
            </div>
            <Field label="Sort Order" name="sort_order" value={editing.sort_order} type="number" onChange={e => setEditing({...editing,sort_order:+e.target.value})} />
          </div>
          <Field label="Description" name="description" value={editing.description} onChange={e => setEditing({...editing,description:e.target.value})} rows={3} />
          <Field label="Highlights (comma-separated)" name="highlights" value={editing.highlights} onChange={e => setEditing({...editing,highlights:e.target.value})} placeholder="Booking Engine,Admin Dashboard" />
          <Field label="Tech Stack (comma-separated)" name="tech_stack" value={editing.tech_stack} onChange={e => setEditing({...editing,tech_stack:e.target.value})} placeholder="React,Node.js,MySQL" />
          <div className="edit-actions">
            <button className="btn-save" onClick={save} disabled={saving}>{saving?'Saving…':'Save'}</button>
            <button className="btn-ghost-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="item-list">
        {items.map(item => (
          <div className="item-card" key={item.id}>
            <div className="item-card-body">
              <div className="item-title">{item.emoji} {item.title}</div>
              <div className="item-sub">{item.category}</div>
              <a href={item.url} target="_blank" rel="noreferrer" className="item-link">{item.url}</a>
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => setEditing({...item})}>Edit</button>
              <button className="btn-del" onClick={() => setConfirm({msg:`Delete "${item.title}"?`,id:item.id})}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Confirm msg={confirm?.msg} onYes={() => del(confirm.id)} onNo={() => setConfirm(null)} />
    </div>
  );
}

// ─── Education section ────────────────────────────────────────
function EducationSection({ toast }) {
  const [edu, setEdu] = useState([]);
  const [certs, setCerts] = useState([]);
  const [editingEdu, setEditingEdu] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const blankEdu = { degree:'', institution:'', university:'', year:'', sort_order:0 };
  const blankCert = { name:'', year:'', icon:'🏆', sort_order:0 };

  const load = useCallback(() => {
    adminApi.get('education.php').then(r => setEdu(r.data||[]));
    adminApi.get('education.php?resource=certifications').then(r => setCerts(r.data||[]));
  }, []);
  useEffect(() => { load(); }, [load]);

  const saveEdu = async () => {
    setSaving(true);
    const r = editingEdu.id ? await adminApi.put(`education.php?id=${editingEdu.id}`, editingEdu) : await adminApi.post('education.php', editingEdu);
    setSaving(false);
    if (r.success) { toast('Saved!','success'); setEditingEdu(null); load(); } else toast(r.message,'error');
  };

  const saveCert = async () => {
    setSaving(true);
    const r = editingCert.id
      ? await adminApi.put(`education.php?resource=certifications&id=${editingCert.id}`, editingCert)
      : await adminApi.post('education.php?resource=certifications', editingCert);
    setSaving(false);
    if (r.success) { toast('Saved!','success'); setEditingCert(null); load(); } else toast(r.message,'error');
  };

  const del = async ({ resource, id, label }) => {
    const r = await adminApi.delete(`education.php?resource=${resource}&id=${id}`);
    setConfirm(null);
    if (r.success) { toast('Deleted','success'); load(); } else toast(r.message,'error');
  };

  return (
    <div className="admin-section">
      <div className="sec-header"><h3>Education</h3><button className="btn-add" onClick={() => setEditingEdu({...blankEdu})}>+ Add Degree</button></div>
      {editingEdu && (
        <div className="edit-form">
          <div className="field-grid">
            <Field label="Degree" name="degree" value={editingEdu.degree} onChange={e => setEditingEdu({...editingEdu,degree:e.target.value})} />
            <Field label="Institution" name="institution" value={editingEdu.institution} onChange={e => setEditingEdu({...editingEdu,institution:e.target.value})} />
            <Field label="University / Board" name="university" value={editingEdu.university} onChange={e => setEditingEdu({...editingEdu,university:e.target.value})} />
            <Field label="Year" name="year" value={editingEdu.year} onChange={e => setEditingEdu({...editingEdu,year:e.target.value})} />
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={saveEdu} disabled={saving}>{saving?'Saving…':'Save'}</button>
            <button className="btn-ghost-sm" onClick={() => setEditingEdu(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="item-list">
        {edu.map(item => (
          <div className="item-card" key={item.id}>
            <div className="item-card-body">
              <div className="item-title">{item.degree}</div>
              <div className="item-sub">{item.institution} · {item.university} · {item.year}</div>
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => setEditingEdu({...item})}>Edit</button>
              <button className="btn-del" onClick={() => setConfirm({msg:`Delete "${item.degree}"?`,resource:'education',id:item.id})}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="sec-header" style={{marginTop:'32px'}}><h3>Certifications</h3><button className="btn-add" onClick={() => setEditingCert({...blankCert})}>+ Add Cert</button></div>
      {editingCert && (
        <div className="edit-form">
          <div className="field-grid">
            <Field label="Certificate Name" name="name" value={editingCert.name} onChange={e => setEditingCert({...editingCert,name:e.target.value})} />
            <Field label="Year" name="year" value={editingCert.year} onChange={e => setEditingCert({...editingCert,year:e.target.value})} />
            <Field label="Icon (emoji)" name="icon" value={editingCert.icon} onChange={e => setEditingCert({...editingCert,icon:e.target.value})} />
          </div>
          <div className="edit-actions">
            <button className="btn-save" onClick={saveCert} disabled={saving}>{saving?'Saving…':'Save'}</button>
            <button className="btn-ghost-sm" onClick={() => setEditingCert(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="item-list">
        {certs.map(item => (
          <div className="item-card" key={item.id}>
            <div className="item-card-body">
              <div className="item-title">{item.icon} {item.name}</div>
              <div className="item-sub">{item.year}</div>
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => setEditingCert({...item})}>Edit</button>
              <button className="btn-del" onClick={() => setConfirm({msg:`Delete "${item.name}"?`,resource:'certifications',id:item.id})}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Confirm msg={confirm?.msg} onYes={() => del(confirm)} onNo={() => setConfirm(null)} />
    </div>
  );
}

// ─── Messages section ─────────────────────────────────────────
function MessagesSection({ toast }) {
  const [items, setItems] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const load = useCallback(() => adminApi.get('messages.php').then(r => setItems(r.data||[])), []);
  useEffect(() => { load(); }, [load]);

  const markRead = async id => {
    await adminApi.put(`messages.php?id=${id}`, {}); load();
  };
  const del = async id => {
    const r = await adminApi.delete(`messages.php?id=${id}`);
    setConfirm(null);
    if (r.success) { toast('Deleted','success'); load(); } else toast(r.message,'error');
  };
  const unread = items.filter(m => !m.is_read).length;

  return (
    <div className="admin-section">
      <div className="sec-header"><h3>Messages {unread > 0 && <span className="unread-badge">{unread} new</span>}</h3></div>
      {items.length === 0 && <p className="empty-msg">No messages yet.</p>}
      {items.map(m => (
        <div className={`msg-card ${!m.is_read ? 'msg-unread' : ''}`} key={m.id}>
          <div className="msg-top">
            <div>
              <div className="msg-name">{m.name} {!m.is_read && <span className="new-dot" />}</div>
              <div className="msg-email"><a href={`mailto:${m.email}`}>{m.email}</a></div>
            </div>
            <div className="msg-date">{new Date(m.created_at).toLocaleDateString()}</div>
          </div>
          <div className="msg-subject">{m.subject}</div>
          <div className="msg-body">{m.message}</div>
          <div className="item-actions">
            {!m.is_read && <button className="btn-edit" onClick={() => markRead(m.id)}>Mark Read</button>}
            <button className="btn-del" onClick={() => setConfirm({msg:`Delete message from ${m.name}?`,id:m.id})}>Delete</button>
            <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className="btn-reply">Reply</a>
          </div>
        </div>
      ))}
      <Confirm msg={confirm?.msg} onYes={() => del(confirm.id)} onNo={() => setConfirm(null)} />
    </div>
  );
}

// ─── Main Admin App ───────────────────────────────────────────
const SECTIONS = [
  { key:'profile',    label:'👤 Profile'    },
  { key:'experience', label:'💼 Experience' },
  { key:'skills',     label:'⚡ Skills'     },
  { key:'projects',   label:'🚀 Projects'   },
  { key:'education',  label:'🎓 Education'  },
  { key:'messages',   label:'📬 Messages'   },
];

export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('admin_token'));
  const [active, setActive] = useState('profile');
  const [toast, setToastMsg] = useState({ msg: '', type: 'success' });

  const showToast = (msg, type = 'success') => setToastMsg({ msg, type });
  const logout = () => { localStorage.removeItem('admin_token'); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="admin-wrap">
      <Toast msg={toast.msg} type={toast.type} onClose={() => setToastMsg({ msg: '', type: 'success' })} />
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">SH</div>
          <div>
            <div className="sidebar-name">Portfolio CMS</div>
            <div className="sidebar-sub">Admin Panel</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {SECTIONS.map(s => (
            <button key={s.key} className={`sidebar-link ${active === s.key ? 'active' : ''}`} onClick={() => setActive(s.key)}>
              {s.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="sidebar-view">View Portfolio ↗</a>
          <button className="sidebar-logout" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <h2 className="admin-page-title">{SECTIONS.find(s => s.key === active)?.label}</h2>
        </div>
        <div className="admin-content">
          {active === 'profile'    && <ProfileSection toast={showToast} />}
          {active === 'experience' && <ExperienceSection toast={showToast} />}
          {active === 'skills'     && <SkillsSection toast={showToast} />}
          {active === 'projects'   && <ProjectsSection toast={showToast} />}
          {active === 'education'  && <EducationSection toast={showToast} />}
          {active === 'messages'   && <MessagesSection toast={showToast} />}
        </div>
      </main>
    </div>
  );
}