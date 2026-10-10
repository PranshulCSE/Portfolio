import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Code2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';
import OptimizedImage from '../components/OptimizedImage';
import Loader from '../components/Loader';
import '../styles/Hero.css';

const Home = () => {
    const { portfolio } = usePortfolioData();
    const assetBase = import.meta.env.BASE_URL || '/';

    const personal = portfolio?.personal || {
        name: 'Pranshul Threja',
        title: 'Aspiring SDE | MERN Stack Developer | MCA Student',
        tagline: 'Building Scalable Software, One Commit at a Time.',
    };

    const socials = portfolio?.socials || {
        github: 'https://github.com/PranshulCSE',
        linkedin: 'https://www.linkedin.com/in/pranshul132001',
        leetcode: 'https://leetcode.com/Pranshul_Threja',
        email: 'mailto:threjapranshul@gmail.com',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section className="hero HomeHero">
            <div className="hero-background-effects">
                <div className="grid-overlay" />
                <div className="gradient-blob blob-1" />
                <div className="gradient-blob blob-2" />
                <div className="mesh-gradient-network" />
            </div>

            <div className="hero-container">
                {/* Left Column */}
                <motion.div
                    className="hero-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-badge" variants={itemVariants}>
                        <span className="badge-dot"></span>
                        Available for Opportunities
                    </motion.div>

                    <motion.h1 className="hero-title" variants={itemVariants}>
                        Hi, I'm <span className="gradient-text">{personal.name.split(' ')[0]}</span>
                    </motion.h1>

                    <motion.div className="hero-subtitle" variants={itemVariants}>
                        <TypeAnimation
                            sequence={[
                                'I develop Full Stack Web Applications, using MERN Stack',
                                2000,
                                'Aspiring Software Development Engineer',
                                2000,
                                'Data Structures & Algorithms Problem Solver',
                                2000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{ fontSize: '1.4rem', fontWeight: 600, display: 'inline-block' }}
                        />
                    </motion.div>

                    <motion.p className="hero-bio" variants={itemVariants}>
                        {personal.tagline || 'Building Scalable Software, One Commit at a Time.'}
                    </motion.p>

                    <motion.div className="hero-cta" variants={itemVariants}>
                        <Link to="/projects" className="btn btn-primary btn-pill">
                            Explore Projects
                            <ArrowRight size={16} />
                        </Link>
                        <Link to="/contact" className="btn btn-secondary btn-pill">
                            Get In Touch
                        </Link>
                    </motion.div>

                    <motion.div className="hero-socials" variants={itemVariants}>
                        {[
                            { href: socials.github, icon: <Github size={22} />, label: 'GitHub' },
                            { href: socials.linkedin, icon: <Linkedin size={22} />, label: 'LinkedIn' },
                            { href: socials.leetcode, icon: <Code2 size={22} />, label: 'LeetCode' },
                            { href: socials.email, icon: <Mail size={22} />, label: 'Email' }
                        ].map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Column - Custom Mockup Layout with Organic Glow Border */}
                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="organic-image-wrapper">
                        <div className="organic-glow-bg" />
                        <div className="organic-border-shape">
                            <OptimizedImage
                                src={`${assetBase}assets/Images/Profile2.png`}
                                alt={personal.name}
                                className="organic-profile-img"
                                loading="eager"
                                fetchPriority="high"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                className="scroll-down-mouse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="mouse-frame">
                    <motion.div 
                        className="mouse-wheel"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Home;
