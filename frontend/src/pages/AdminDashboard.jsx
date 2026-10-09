import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useAdmin } from '../hooks/useAdmin';
import { fetchLogsApi, fetchContactsApi } from '../api/adminApi';
import Loader from '../components/Loader';
import { 
    LayoutDashboard, User, Briefcase, GraduationCap, 
    Code2, FileCode, Award, ShieldAlert, MailOpen, LogOut, Plus, Trash2, Edit3, Eye, CheckCircle, Circle
} from 'lucide-react';
import toast from 'react-hot-toast';
import '../../src/styles/Contact.css'; // For form inputs reuse

const AdminDashboard = () => {
    const { logout, isAuthenticated, loading: authLoading } = useAuth();
    const { portfolio, loading: dataLoading, refreshData } = usePortfolioData();
    const admin = useAdmin();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [logs, setLogs] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [contactsLoading, setContactsLoading] = useState(false);

    // Form editing states
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [editType, setEditType] = useState(''); // 'project', 'experience', 'education', 'achievement', 'certification'

    // Form inputs states
    const [aboutForm, setAboutForm] = useState({
        name: '', title: '', email: '', phone: '', location: '', tagline: '', bio: '', philosophy: ''
    });

    const [projectForm, setProjectForm] = useState({
        title: '', description: '', image: '', tags: '', github: '', live: '', category: 'Full Stack', featured: false
    });

    const [experienceForm, setExperienceForm] = useState({
        company: '', position: '', duration: '', location: '', achievements: '', technologies: ''
    });

    const [educationForm, setEducationForm] = useState({
        degree: '', school: '', duration: '', gpa: 0, highlights: '', description: ''
    });

    const [achievementForm, setAchievementForm] = useState({
        title: '', description: '', category: 'Technical', date: '', image: ''
    });

    const [certificationForm, setCertificationForm] = useState({
        title: '', issuer: '', date: '', link: ''
    });

    const [skillsForm, setSkillsForm] = useState({ category: 'languages', items: '' });

    const fetchLogs = useCallback(async () => {
        setLogsLoading(true);
        try {
            const res = await fetchLogsApi();
            if (res.success) setLogs(res.data);
        } catch (err) {
            console.error('Error fetching logs', err);
        } finally {
            setLogsLoading(false);
        }
    }, []);

    const fetchContacts = useCallback(async () => {
        setContactsLoading(true);
        try {
            const res = await fetchContactsApi();
            if (res.success) setContacts(res.data);
        } catch (err) {
            console.error('Error fetching contact messages', err);
        } finally {
            setContactsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, authLoading, navigate]);

    useEffect(() => {
        if (portfolio) {
            setAboutForm({
                name: portfolio.personal?.name || '',
                title: portfolio.personal?.title || '',
                email: portfolio.personal?.email || '',
                phone: portfolio.personal?.phone || '',
                location: portfolio.personal?.location || '',
                tagline: portfolio.personal?.tagline || '',
                bio: portfolio.about?.bio || '',
                philosophy: portfolio.about?.philosophy || '',
            });
        }
    }, [portfolio]);

    useEffect(() => {
        if (activeTab === 'dashboard' || activeTab === 'logs') {
            fetchLogs();
        }
        if (activeTab === 'dashboard' || activeTab === 'contacts') {
            fetchContacts();
        }
    }, [activeTab, fetchLogs, fetchContacts]);

    if (authLoading || dataLoading) {
        return <Loader onComplete={() => {}} />;
    }

    const handleAboutSubmit = async (e) => {
        e.preventDefault();
        const data = {
            personal: {
                name: aboutForm.name,
                title: aboutForm.title,
                email: aboutForm.email,
                phone: aboutForm.phone,
                location: aboutForm.location,
                tagline: aboutForm.tagline,
            },
            bio: aboutForm.bio,
            philosophy: aboutForm.philosophy,
        };
        const res = await admin.updateAbout(data);
        if (res.success) refreshData();
    };

    // Generic Add/Edit trigger helper
    const openCreate = (type) => {
        setEditType(type);
        setCurrentEditId(null);
        setIsEditing(true);

        // Reset forms
        if (type === 'project') setProjectForm({ title: '', description: '', image: '', tags: '', github: '', live: '', category: 'Full Stack', featured: false });
        if (type === 'experience') setExperienceForm({ company: '', position: '', duration: '', location: '', achievements: '', technologies: '' });
        if (type === 'education') setEducationForm({ degree: '', school: '', duration: '', gpa: 0, highlights: '', description: '' });
        if (type === 'achievement') setAchievementForm({ title: '', description: '', category: 'Technical', date: '', image: '' });
        if (type === 'certification') setCertificationForm({ title: '', issuer: '', date: '', link: '' });
    };

    const openEdit = (type, item) => {
        setEditType(type);
        setCurrentEditId(item._id);
        setIsEditing(true);

        if (type === 'project') {
            setProjectForm({
                title: item.title,
                description: item.description,
                image: item.image,
                tags: item.tags.join(', '),
                github: item.github || '',
                live: item.live || '',
                category: item.category || 'Full Stack',
                featured: item.featured || false
            });
        }
        if (type === 'experience') {
            setExperienceForm({
                company: item.company,
                position: item.position,
                duration: item.duration,
                location: item.location,
                achievements: item.achievements.join('\n'),
                technologies: item.technologies.join(', ')
            });
        }
        if (type === 'education') {
            setEducationForm({
                degree: item.degree,
                school: item.school,
                duration: item.duration,
                gpa: item.gpa,
                highlights: item.highlights.join('\n'),
                description: item.description || ''
            });
        }
        if (type === 'achievement') {
            setAchievementForm({
                title: item.title,
                description: item.description,
                category: item.category,
                date: item.date,
                image: item.image || ''
            });
        }
        if (type === 'certification') {
            setCertificationForm({
                title: item.title,
                issuer: item.issuer,
                date: item.date,
                link: item.link || ''
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let res = { success: false };

        if (editType === 'project') {
            const formatted = {
                ...projectForm,
                tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean)
            };
            if (currentEditId) res = await admin.updateProject(currentEditId, formatted);
            else res = await admin.createProject(formatted);
        }

        if (editType === 'experience') {
            const formatted = {
                ...experienceForm,
                achievements: experienceForm.achievements.split('\n').map(a => a.trim()).filter(Boolean),
                technologies: experienceForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
            };
            if (currentEditId) res = await admin.updateExperience(currentEditId, formatted);
            else res = await admin.createExperience(formatted);
        }

        if (editType === 'education') {
            const formatted = {
                ...educationForm,
                highlights: educationForm.highlights.split('\n').map(h => h.trim()).filter(Boolean)
            };
            if (currentEditId) res = await admin.updateEducation(currentEditId, formatted);
            else res = await admin.createEducation(formatted);
        }

        if (editType === 'achievement') {
            if (currentEditId) res = await admin.updateAchievement(currentEditId, achievementForm);
            else res = await admin.createAchievement(achievementForm);
        }

        if (editType === 'certification') {
            if (currentEditId) res = await admin.updateCertification(currentEditId, certificationForm);
            else res = await admin.createCertification(certificationForm);
        }

        if (res.success) {
            setIsEditing(false);
            refreshData();
        }
    };

    const handleSkillsSubmit = async (e) => {
        e.preventDefault();
        const itemsArray = skillsForm.items.split(',').map(i => i.trim()).filter(Boolean);
        const res = await admin.updateSkills(skillsForm.category, itemsArray);
        if (res.success) refreshData();
    };

    const loadSkillCategory = (category) => {
        const items = portfolio.skills[category] || [];
        setSkillsForm({
            category,
            items: items.join(', ')
        });
    };

    return (
        <div className="admin-dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div className="sidebar-logo">
                    <span className="logo-badge">ROOT</span> Console
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>
                        <User size={18} /> Personal Info
                    </button>
                    <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => { setActiveTab('experience'); setIsEditing(false); }}>
                        <Briefcase size={18} /> Experience
                    </button>
                    <button className={activeTab === 'education' ? 'active' : ''} onClick={() => { setActiveTab('education'); setIsEditing(false); }}>
                        <GraduationCap size={18} /> Education
                    </button>
                    <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => { setActiveTab('skills'); loadSkillCategory('languages'); }}>
                        <Code2 size={18} /> Tech Stack
                    </button>
                    <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => { setActiveTab('projects'); setIsEditing(false); }}>
                        <FileCode size={18} /> Projects
                    </button>
                    <button className={activeTab === 'achievements' ? 'active' : ''} onClick={() => { setActiveTab('achievements'); setIsEditing(false); }}>
                        <Award size={18} /> Achievements
                    </button>
                    <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>
                        <MailOpen size={18} /> Inbox ({contacts.filter(c => !c.readStatus).length})
                    </button>
                    <button className={activeTab === 'logs' ? 'active' : ''} onClick={() => setActiveTab('logs')}>
                        <ShieldAlert size={18} /> System Logs
                    </button>
                </nav>
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Area */}
            <main className="admin-main-content">
                {/* Header */}
                <header className="admin-header">
                    <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager</h2>
                    <div className="admin-badge">Secure MERN Instance</div>
                </header>

                <div className="admin-panel-body">
                    {/* TAB: DASHBOARD */}
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-summary">
                            <div className="stats-row">
                                <div className="stat-card card">
                                    <h3>Total Projects</h3>
                                    <p className="big-num">{portfolio?.projects?.length || 0}</p>
                                </div>
                                <div className="stat-card card">
                                    <h3>Unread Messages</h3>
                                    <p className="big-num">{contacts.filter(c => !c.readStatus).length}</p>
                                </div>
                                <div className="stat-card card">
                                    <h3>Total Certifications</h3>
                                    <p className="big-num">{portfolio?.certifications?.length || 0}</p>
                                </div>
                            </div>

                            <div className="dashboard-grids" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                                <div className="card">
                                    <h4>Recent Messages</h4>
                                    {contactsLoading ? <p>Loading...</p> : (
                                        <div className="recent-list">
                                            {contacts.slice(0, 5).map(c => (
                                                <div key={c._id} className="list-item" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 600, color: c.readStatus ? 'var(--text-secondary)' : 'var(--cyan)' }}>{c.name}</span>
                                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.subject}</p>
                                                    </div>
                                                    <span style={{ fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="card">
                                    <h4>Recent Activity Logs</h4>
                                    {logsLoading ? <p>Loading...</p> : (
                                        <div className="recent-list">
                                            {logs.slice(0, 5).map(l => (
                                                <div key={l._id} className="list-item" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--card-border)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--violet)' }}>{l.action}</span>
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(l.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{l.details}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: ABOUT */}
                    {activeTab === 'about' && (
                        <form className="contact-form card" onSubmit={handleAboutSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={aboutForm.name} onChange={e => setAboutForm({...aboutForm, name: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" value={aboutForm.title} onChange={e => setAboutForm({...aboutForm, title: e.target.value})} required />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={aboutForm.email} onChange={e => setAboutForm({...aboutForm, email: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={aboutForm.phone} onChange={e => setAboutForm({...aboutForm, phone: e.target.value})} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" value={aboutForm.location} onChange={e => setAboutForm({...aboutForm, location: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Tagline</label>
                                <input type="text" value={aboutForm.tagline} onChange={e => setAboutForm({...aboutForm, tagline: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Bio Paragraph</label>
                                <textarea rows="6" value={aboutForm.bio} onChange={e => setAboutForm({...aboutForm, bio: e.target.value})} required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Philosophy Quote</label>
                                <input type="text" value={aboutForm.philosophy} onChange={e => setAboutForm({...aboutForm, philosophy: e.target.value})} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-pill" disabled={admin.actionLoading}>
                                Save Changes
                            </button>
                        </form>
                    )}

                    {/* TAB: SKILLS */}
                    {activeTab === 'skills' && (
                        <div className="skills-manager card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div className="skills-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                {['languages', 'frontend', 'backend', 'database', 'dsaCS', 'tools', 'learning'].map(cat => (
                                    <button 
                                        key={cat} 
                                        className={`btn ${skillsForm.category === cat ? 'btn-primary' : 'btn-secondary'} btn-pill`} 
                                        onClick={() => loadSkillCategory(cat)}
                                        style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <form className="contact-form" onSubmit={handleSkillsSubmit}>
                                <div className="form-group">
                                    <label>Skills List (comma-separated for category: <strong>{skillsForm.category}</strong>)</label>
                                    <textarea 
                                        rows="5" 
                                        value={skillsForm.items} 
                                        onChange={e => setSkillsForm({...skillsForm, items: e.target.value})}
                                        placeholder="e.g. React.js, Tailwind, HTML5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-pill" disabled={admin.actionLoading}>
                                    Save Skills
                                </button>
                            </form>
                        </div>
                    )}

                    {/* TAB: EXPERIENCE */}
                    {activeTab === 'experience' && (
                        <div>
                            {!isEditing ? (
                                <div>
                                    <button className="btn btn-primary btn-pill" onClick={() => openCreate('experience')} style={{ marginBottom: '1.5rem' }}>
                                        <Plus size={16} /> Add Experience
                                    </button>
                                    <div className="admin-items-grid" style={{ display: 'grid', gap: '1rem' }}>
                                        {portfolio?.experience?.map(exp => (
                                            <div key={exp._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ color: 'var(--cyan)' }}>{exp.position}</h4>
                                                    <p>{exp.company} — {exp.duration}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-secondary" onClick={() => openEdit('experience', exp)} style={{ padding: '0.5rem' }}><Edit3 size={16} /></button>
                                                    <button className="btn btn-secondary" onClick={() => admin.deleteExperience(exp._id)} style={{ padding: '0.5rem', color: 'var(--coral)', borderColor: 'var(--coral)' }}><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <form className="contact-form card" onSubmit={handleFormSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <h3>{currentEditId ? 'Edit' : 'Add'} Experience</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Company</label>
                                            <input type="text" value={experienceForm.company} onChange={e => setExperienceForm({...experienceForm, company: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Position</label>
                                            <input type="text" value={experienceForm.position} onChange={e => setExperienceForm({...experienceForm, position: e.target.value})} required />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Duration</label>
                                            <input type="text" value={experienceForm.duration} onChange={e => setExperienceForm({...experienceForm, duration: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input type="text" value={experienceForm.location} onChange={e => setExperienceForm({...experienceForm, location: e.target.value})} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Achievements (One per line)</label>
                                        <textarea rows="5" value={experienceForm.achievements} onChange={e => setExperienceForm({...experienceForm, achievements: e.target.value})} required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Technologies Used (comma-separated)</label>
                                        <input type="text" value={experienceForm.technologies} onChange={e => setExperienceForm({...experienceForm, technologies: e.target.value})} placeholder="e.g. Node.js, Express, MongoDB" />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="btn btn-primary btn-pill" disabled={admin.actionLoading}>Save</button>
                                        <button type="button" className="btn btn-secondary btn-pill" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* TAB: EDUCATION */}
                    {activeTab === 'education' && (
                        <div>
                            {!isEditing ? (
                                <div>
                                    <button className="btn btn-primary btn-pill" onClick={() => openCreate('education')} style={{ marginBottom: '1.5rem' }}>
                                        <Plus size={16} /> Add Education
                                    </button>
                                    <div className="admin-items-grid" style={{ display: 'grid', gap: '1rem' }}>
                                        {portfolio?.education?.map(edu => (
                                            <div key={edu._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ color: 'var(--violet)' }}>{edu.degree}</h4>
                                                    <p>{edu.school} — {edu.duration}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-secondary" onClick={() => openEdit('education', edu)} style={{ padding: '0.5rem' }}><Edit3 size={16} /></button>
                                                    <button className="btn btn-secondary" onClick={() => admin.deleteEducation(edu._id)} style={{ padding: '0.5rem', color: 'var(--coral)', borderColor: 'var(--coral)' }}><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <form className="contact-form card" onSubmit={handleFormSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <h3>{currentEditId ? 'Edit' : 'Add'} Education</h3>
                                    <div className="form-group">
                                        <label>Degree</label>
                                        <input type="text" value={educationForm.degree} onChange={e => setEducationForm({...educationForm, degree: e.target.value})} required />
                                    </div>
                                    <div className="form-group">
                                        <label>School / University</label>
                                        <input type="text" value={educationForm.school} onChange={e => setEducationForm({...educationForm, school: e.target.value})} required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Duration</label>
                                            <input type="text" value={educationForm.duration} onChange={e => setEducationForm({...educationForm, duration: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>GPA / SGPA</label>
                                            <input type="number" step="0.01" value={educationForm.gpa} onChange={e => setEducationForm({...educationForm, gpa: parseFloat(e.target.value)})} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Highlights (One per line)</label>
                                        <textarea rows="4" value={educationForm.highlights} onChange={e => setEducationForm({...educationForm, highlights: e.target.value})}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" value={educationForm.description} onChange={e => setEducationForm({...educationForm, description: e.target.value})} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="btn btn-primary btn-pill" disabled={admin.actionLoading}>Save</button>
                                        <button type="button" className="btn btn-secondary btn-pill" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* TAB: PROJECTS */}
                    {activeTab === 'projects' && (
                        <div>
                            {!isEditing ? (
                                <div>
                                    <button className="btn btn-primary btn-pill" onClick={() => openCreate('project')} style={{ marginBottom: '1.5rem' }}>
                                        <Plus size={16} /> Add Project
                                    </button>
                                    <div className="admin-items-grid" style={{ display: 'grid', gap: '1rem' }}>
                                        {portfolio?.projects?.map(proj => (
                                            <div key={proj._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ color: 'var(--cyan)' }}>{proj.title}</h4>
                                                    <p>{proj.category} {proj.featured ? '(⭐ Featured)' : ''}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-secondary" onClick={() => openEdit('project', proj)} style={{ padding: '0.5rem' }}><Edit3 size={16} /></button>
                                                    <button className="btn btn-secondary" onClick={() => admin.deleteProject(proj._id)} style={{ padding: '0.5rem', color: 'var(--coral)', borderColor: 'var(--coral)' }}><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <form className="contact-form card" onSubmit={handleFormSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <h3>{currentEditId ? 'Edit' : 'Add'} Project</h3>
                                    <div className="form-group">
                                        <label>Project Title</label>
                                        <input type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea rows="4" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Image Path / URL</label>
                                        <input type="text" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="e.g. assets/Projects/MyImage.png or https://image.com" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Tags (comma-separated)</label>
                                        <input type="text" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} placeholder="e.g. React, MongoDB, CSS" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>GitHub Repository URL</label>
                                            <input type="text" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <label>Live Demo URL</label>
                                            <input type="text" value={projectForm.live} onChange={e => setProjectForm({...projectForm, live: e.target.value})} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} style={{ background: '#0a0f1c', border: '1px solid var(--card-border)', color: 'white', padding: '0.8rem', borderRadius: '0.5rem', width: '100%' }}>
                                                <option value="Full Stack">Full Stack</option>
                                                <option value="Frontend">Frontend</option>
                                                <option value="Backend">Backend</option>
                                            </select>
                                        </div>
                                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                                            <input type="checkbox" id="featured" checked={projectForm.featured} onChange={e => setProjectForm({...projectForm, featured: e.target.checked})} style={{ width: 'auto' }} />
                                            <label htmlFor="featured">Featured Project (highlighted)</label>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button type="submit" className="btn btn-primary btn-pill" disabled={admin.actionLoading}>Save</button>
                                        <button type="button" className="btn btn-secondary btn-pill" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* TAB: ACHIEVEMENTS */}
                    {activeTab === 'achievements' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Achievements column */}
                            <div className="ach-col">
                                <h3>Accomplishments</h3>
                                {!isEditing || editType !== 'achievement' ? (
                                    <div>
                                        <button className="btn btn-primary btn-pill" onClick={() => openCreate('achievement')} style={{ marginBottom: '1.5rem' }}>
                                            <Plus size={16} /> Add Achievement
                                        </button>
                                        <div className="admin-items-grid" style={{ display: 'grid', gap: '1rem' }}>
                                            {portfolio?.achievements?.map(ach => (
                                                <div key={ach._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h5 style={{ color: 'var(--cyan)' }}>{ach.title}</h5>
                                                        <p style={{ fontSize: '0.85rem' }}>{ach.category} — {ach.date}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                        <button className="btn btn-secondary" onClick={() => openEdit('achievement', ach)} style={{ padding: '0.4rem' }}><Edit3 size={14} /></button>
                                                        <button className="btn btn-secondary" onClick={() => admin.deleteAchievement(ach._id)} style={{ padding: '0.4rem', color: 'var(--coral)', borderColor: 'var(--coral)' }}><Trash2 size={14} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <form className="contact-form card" onSubmit={handleFormSubmit}>
                                        <h4>{currentEditId ? 'Edit' : 'Add'} Achievement</h4>
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea rows="3" value={achievementForm.description} onChange={e => setAchievementForm({...achievementForm, description: e.target.value})} required></textarea>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <input type="text" value={achievementForm.category} onChange={e => setAchievementForm({...achievementForm, category: e.target.value})} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Date/Year</label>
                                                <input type="text" value={achievementForm.date} onChange={e => setAchievementForm({...achievementForm, date: e.target.value})} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Image URL</label>
                                            <input type="text" value={achievementForm.image} onChange={e => setAchievementForm({...achievementForm, image: e.target.value})} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button type="submit" className="btn btn-primary btn-pill">Save</button>
                                            <button type="button" className="btn btn-secondary btn-pill" onClick={() => setIsEditing(false)}>Cancel</button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Certifications column */}
                            <div className="cert-col">
                                <h3>Certifications</h3>
                                {!isEditing || editType !== 'certification' ? (
                                    <div>
                                        <button className="btn btn-primary btn-pill" onClick={() => openCreate('certification')} style={{ marginBottom: '1.5rem' }}>
                                            <Plus size={16} /> Add Certificate
                                        </button>
                                        <div className="admin-items-grid" style={{ display: 'grid', gap: '1rem' }}>
                                            {portfolio?.certifications?.map(cert => (
                                                <div key={cert._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h5 style={{ color: 'var(--violet)' }}>{cert.title}</h5>
                                                        <p style={{ fontSize: '0.85rem' }}>{cert.issuer} ({cert.date})</p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                        <button className="btn btn-secondary" onClick={() => openEdit('certification', cert)} style={{ padding: '0.4rem' }}><Edit3 size={14} /></button>
                                                        <button className="btn btn-secondary" onClick={() => admin.deleteCertification(cert._id)} style={{ padding: '0.4rem', color: 'var(--coral)', borderColor: 'var(--coral)' }}><Trash2 size={14} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <form className="contact-form card" onSubmit={handleFormSubmit}>
                                        <h4>{currentEditId ? 'Edit' : 'Add'} Certification</h4>
                                        <div className="form-group">
                                            <label>Certificate Title</label>
                                            <input type="text" value={certificationForm.title} onChange={e => setCertificationForm({...certificationForm, title: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Issuer</label>
                                            <input type="text" value={certificationForm.issuer} onChange={e => setCertificationForm({...certificationForm, issuer: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type="text" value={certificationForm.date} onChange={e => setCertificationForm({...certificationForm, date: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Link / Path</label>
                                            <input type="text" value={certificationForm.link} onChange={e => setCertificationForm({...certificationForm, link: e.target.value})} placeholder="e.g. assets/Images/Certificate.pdf" />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button type="submit" className="btn btn-primary btn-pill">Save</button>
                                            <button type="button" className="btn btn-secondary btn-pill" onClick={() => setIsEditing(false)}>Cancel</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB: CONTACT INBOX */}
                    {activeTab === 'contacts' && (
                        <div className="contacts-inbox">
                            {contactsLoading ? <p>Loading messages...</p> : (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {contacts.length === 0 ? <p>Inbox is empty.</p> : contacts.map(c => (
                                        <div key={c._id} className="card" style={{ borderLeft: c.readStatus ? '4px solid var(--text-muted)' : '4px solid var(--cyan)', background: c.readStatus ? 'rgba(255,255,255,0.01)' : 'rgba(6, 182, 212, 0.03)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{c.name}</h4>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.email}</span>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: '0.5rem 0' }}>Subject: {c.subject}</p>
                                            <blockquote style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--card-border)' }}>
                                                {c.message}
                                            </blockquote>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                                                <button className="btn btn-secondary" onClick={() => admin.toggleContactRead(c._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                                                    {c.readStatus ? <Circle size={14} /> : <CheckCircle size={14} />}
                                                    Mark as {c.readStatus ? 'Unread' : 'Read'}
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => admin.deleteContact(c._id)} style={{ borderColor: 'var(--coral)', color: 'var(--coral)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: LOGS */}
                    {activeTab === 'logs' && (
                        <div className="card" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            {logsLoading ? <p>Loading audit logs...</p> : (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--card-border)', color: 'var(--cyan)' }}>
                                            <th style={{ padding: '0.8rem' }}>Timestamp</th>
                                            <th style={{ padding: '0.8rem' }}>Action</th>
                                            <th style={{ padding: '0.8rem' }}>Details</th>
                                            <th style={{ padding: '0.8rem' }}>IP Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map(l => (
                                            <tr key={l._id} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.9rem' }}>
                                                <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{new Date(l.timestamp).toLocaleString()}</td>
                                                <td style={{ padding: '0.8rem', fontWeight: 600, color: 'var(--violet)' }}>{l.action}</td>
                                                <td style={{ padding: '0.8rem' }}>{l.details}</td>
                                                <td style={{ padding: '0.8rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{l.ipAddress || 'Internal'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
