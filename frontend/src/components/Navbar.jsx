import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        'Home',
        'About',
        'Experience',
        'Skills',
        'Projects',
        'Achievements',
        'Contact'
    ];

    useEffect(() => {
        let animationFrameId = 0;

        const handleScroll = () => {
            if (animationFrameId) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(() => {
                animationFrameId = 0;
                setIsScrolled(window.scrollY > 80);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.BASE_URL}Documents/Resume.pdf`;
        link.download = 'Pranshul_Threja_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <span className="logo-text">PT</span>
                </div>

                {/* Desktop Navigation */}
                <div className="nav-links-desktop">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="nav-link"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Resume Download Button */}
                <button
                    className="btn btn-primary btn-pill resume-btn"
                    onClick={handleDownloadResume}
                >
                    <Download size={18} />
                    Resume
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="mobile-nav-link"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link}
                            </motion.a>
                        ))}
                        <motion.button
                            className="btn btn-primary btn-pill mobile-resume-btn"
                            onClick={handleDownloadResume}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                        >
                            <Download size={18} />
                            Download Resume
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
