import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import '../styles/Contact.css'; // Reuse form styles

const AdminLogin = () => {
    const { login, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please enter both username and password');
            return;
        }

        setIsSubmitting(true);
        const result = await login(username, password);
        setIsSubmitting(false);

        if (result.success) {
            toast.success('Successfully logged in!');
            navigate('/admin');
        } else {
            toast.error(result.message || 'Login failed');
        }
    };

    return (
        <section className="contact section section-padding" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '480px' }}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="section-label">SECURE PANEL</p>
                    <h2 className="section-title">Admin Login</h2>
                </motion.div>

                <motion.div
                    className="card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ padding: '2.5rem' }}
                >
                    <form className="contact-form" onSubmit={handleSubmit} style={{ margin: 0, width: '100%' }}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="username" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={16} /> Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter admin username"
                                required
                                disabled={isSubmitting || loading}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label htmlFor="password" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Lock size={16} /> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                disabled={isSubmitting || loading}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-pill"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={isSubmitting || loading}
                        >
                            {isSubmitting || loading ? 'Logging in...' : 'Access Dashboard 🚀'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default AdminLogin;
