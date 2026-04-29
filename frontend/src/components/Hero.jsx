import { motion } from 'framer-motion';
import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Download, Github, Linkedin, Mail, Code2, Cpu, Database, Globe, Layers, Zap } from 'lucide-react';
import { portfolioData } from '../constants/data';
import OptimizedImage from './OptimizedImage';
import '../styles/Hero.css';

const floatingIcons = [
    { icon: <Cpu size={24} />, className: 'float-icon-1', delay: 0 },
    { icon: <Database size={20} />, className: 'float-icon-2', delay: 0.5 },
    { icon: <Globe size={22} />, className: 'float-icon-3', delay: 1 },
    { icon: <Layers size={18} />, className: 'float-icon-4', delay: 1.5 },
    { icon: <Zap size={20} />, className: 'float-icon-5', delay: 2 },
];

const floatingTags = [
    { text: '<Code />', className: 'tag-1', delay: 0.2 },
    { text: 'MERN', className: 'tag-2', delay: 0.7 },
    { text: 'SDE', className: 'tag-3', delay: 1.2 },
    { text: '{ JSON }', className: 'tag-4', delay: 1.7 },
];

const floatingShapes = [
    { className: 'shape-1', delay: 0 },
    { className: 'shape-2', delay: 1 },
    { className: 'shape-3', delay: 2 },
];

const Hero = () => {
    const { personal, socials } = portfolioData;
    const heroImageRef = useRef(null);
    const rippleTimerRef = useRef(null);

    const triggerImageRipple = (event) => {
        const wrapper = heroImageRef.current;
        if (!wrapper) return;

        const bounds = wrapper.getBoundingClientRect();
        const rippleX = event.clientX - bounds.left;
        const rippleY = event.clientY - bounds.top;

        wrapper.style.setProperty('--ripple-x', `${rippleX}px`);
        wrapper.style.setProperty('--ripple-y', `${rippleY}px`);
        wrapper.classList.remove('hero-image-active');
        void wrapper.offsetWidth;
        wrapper.classList.add('hero-image-active');

        if (rippleTimerRef.current) {
            window.clearTimeout(rippleTimerRef.current);
        }

        rippleTimerRef.current = window.setTimeout(() => {
            wrapper.classList.remove('hero-image-active');
        }, 420);
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

    const assetBase = import.meta.env.BASE_URL;

    return (
        <section id="home" className="hero">
            <div className="hero-background-effects">
                <div className="grid-overlay" />
                <div className="gradient-blob blob-1" />
                <div className="gradient-blob blob-2" />
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
                        Available for Work
                    </motion.div>

                    <motion.h1 className="hero-title" variants={itemVariants}>
                        Hi, I'm{' '}
                        <span className="gradient-text">{personal.name}</span>
                    </motion.h1>

                    <motion.div className="hero-subtitle" variants={itemVariants}>
                        <TypeAnimation
                            sequence={[
                                'Aspiring Software Engineer',
                                2000,
                                'MERN Stack Developer',
                                2000,
                                'Full Stack Web Developer',
                                2000,
                                'Problem Solver 🧠',
                                2000,
                                'Consistent Learner 📚',
                                2000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{ fontSize: '1.5rem', fontWeight: 600 }}
                        />
                    </motion.div>

                    <motion.p className="hero-bio" variants={itemVariants}>
                        Motivated MCA student building scalable web applications and efficient
                        backend systems. Passionate about MERN Stack, DSA, and writing clean,
                        production-ready code.
                    </motion.p>

                    <motion.div className="hero-cta" variants={itemVariants}>
                        <a href="#projects" className="btn btn-primary">
                            View My Work
                            <span className="btn-icon">→</span>
                        </a>
                        <a href="/Documents/Resume.pdf" download className="btn btn-secondary">
                            <Download size={18} />
                            Resume
                        </a>
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

                {/* Right Column - Conference Image */}
                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, x: 50, rotateY: 20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="hero-image-wrapper">
                        {/* Floating Tech Icons */}
                        {floatingIcons.map((item, index) => (
                            <motion.div
                                key={`icon-${index}`}
                                className={`floating-element ${item.className}`}
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 3 + index,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: item.delay,
                                }}
                            >
                                {item.icon}
                            </motion.div>
                        ))}

                        {/* Floating Tags */}
                        {floatingTags.map((item, index) => (
                            <motion.div
                                key={`tag-${index}`}
                                className={`floating-tag ${item.className}`}
                                animate={{
                                    x: [0, 10, 0],
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 4 + index,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: item.delay,
                                }}
                            >
                                {item.text}
                            </motion.div>
                        ))}

                        {/* Abstract Shapes */}
                        {floatingShapes.map((item, index) => (
                            <motion.div
                                key={`shape-${index}`}
                                className={`abstract-shape ${item.className}`}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 5 + index,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: item.delay,
                                }}
                            />
                        ))}

                        <motion.div
                            className="hero-image-glow"
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <motion.div
                            className="image-container-3d"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            ref={heroImageRef}
                            onPointerDown={triggerImageRipple}
                        >
                            <OptimizedImage
                                src={`${assetBase}assets/Images/Conference.jpg`}
                                alt="Conference"
                                className="hero-conference-img"
                                loading="eager"
                                fetchPriority="high"
                                width={1200}
                                height={900}
                            />
                            <div className="hero-image-overlay" />
                            <div className="scanning-line" />
                            <div className="hero-image-ripple" aria-hidden="true" />
                        </motion.div>

                        <div className="hero-image-border-anim" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
