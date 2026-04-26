import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { portfolioData } from '../constants/data';
import '../styles/Footer.css';

const Footer = () => {
    const { personal, socials } = portfolioData;
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'];
    const socialLinks = [
        { icon: Github, href: socials.github, label: 'GitHub' },
        { icon: Linkedin, href: socials.linkedin, label: 'LinkedIn' },
        { icon: Code2, href: socials.leetcode, label: 'LeetCode' },
        { icon: Mail, href: socials.email, label: 'Email' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <motion.div
                    className="footer-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Logo & Tagline */}
                    <div className="footer-brand">
                        <h3 className="footer-logo">{personal.name}</h3>
                        <p className="footer-tagline">"{personal.tagline}"</p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <div className="links-grid">
                            {navLinks.map((link) => (
                                <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="footer-socials">
                        <h4>Follow Me</h4>
                        <div className="socials-icons">
                            {socialLinks.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                        title={social.label}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <motion.div
                        className="footer-credits"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>
                            ⚡ Built with <span className="highlight">MERN Stack</span> + React Three Fiber
                        </p>
                        <p>
                            © {new Date().getFullYear()} {personal.name}. All rights reserved.
                        </p>
                    </motion.div>

                    {/* Scroll to Top */}
                    {showScrollTop && (
                        <motion.button
                            className="scroll-to-top"
                            onClick={scrollToTop}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUp size={24} />
                        </motion.button>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
