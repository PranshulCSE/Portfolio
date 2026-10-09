import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Github, Linkedin, Mail, Code2, Download } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import './ConnectToggle.css';

const ConnectToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { portfolio } = usePortfolioData();

    const socials = portfolio?.socials || {
        github: 'https://github.com/PranshulCSE',
        linkedin: 'https://www.linkedin.com/in/pranshul132001',
        leetcode: 'https://leetcode.com/Pranshul_Threja',
        email: 'mailto:threjapranshul@gmail.com',
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.BASE_URL || '/'}Documents/Resume.pdf`;
        link.download = 'Pranshul_Threja_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const links = [
        { href: socials.github, icon: <Github size={20} />, label: 'GitHub', color: '#6e5494' },
        { href: socials.linkedin, icon: <Linkedin size={20} />, label: 'LinkedIn', color: '#0077b5' },
        { href: socials.leetcode, icon: <Code2 size={20} />, label: 'LeetCode', color: '#f59e0b' },
        { href: socials.email, icon: <Mail size={20} />, label: 'Email Me', color: '#06b6d4' },
    ];

    return (
        <div className="connect-toggle-wrapper">
            {/* Slide-out Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="connect-drawer"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {/* Header */}
                        <div className="drawer-header">
                            <div>
                                <h4>Connect With Me</h4>
                                <p>Let's build something awesome!</p>
                            </div>
                            <button className="drawer-close-btn" onClick={() => setIsOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Availability badge */}
                        <div className="availability-badge">
                            <span className="pulse-dot" />
                            Open to Opportunities
                        </div>

                        {/* Social Links */}
                        <div className="drawer-links">
                            {links.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="drawer-link"
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <span className="drawer-link-icon" style={{ color: link.color }}>
                                        {link.icon}
                                    </span>
                                    <span>{link.label}</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Resume Download */}
                        <button className="drawer-resume-btn btn btn-primary btn-pill" onClick={handleDownloadResume}>
                            <Download size={16} />
                            Download Resume
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Toggle Button */}
            <motion.button
                className={`connect-fab ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Connect with me"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={22} />
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageCircle size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ConnectToggle;
