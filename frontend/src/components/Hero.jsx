import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { portfolioData } from '../constants/data';
import '../styles/Hero.css';

const Hero = () => {
    const { personal, socials } = portfolioData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                {/* Left Column */}
                <motion.div
                    className="hero-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="hero-title" variants={itemVariants}>
                        Hi, I'm{' '}
                        <span className="gradient-text">{personal.name}</span>
                    </motion.h1>

                    <motion.div className="hero-subtitle" variants={itemVariants}>
                        <TypeAnimation
                            sequence={[
                                'Aspiring Software Development Engineer',
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
                            View My Work →
                        </a>
                        <a href="../public/Documents/Resume.pdf" download className="btn btn-secondary">
                            <Download size={18} />
                            Resume
                        </a>
                    </motion.div>

                    <motion.div className="hero-socials" variants={itemVariants}>
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Github size={24} />
                        </a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Linkedin size={24} />
                        </a>
                        <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Code2 size={24} />
                        </a>
                        <a href={socials.email} className="social-link">
                            <Mail size={24} />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column - Conference Image */}
                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    <div className="hero-image-wrapper">
                        <motion.div
                            className="hero-image-glow"
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(123, 47, 247, 0.15)',
                                    '0 0 50px rgba(123, 47, 247, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)',
                                    '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(123, 47, 247, 0.15)',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.img
                            src="/assets/Images/Conference.jpg"
                            alt="Conference"
                            className="hero-conference-img"
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <div className="hero-image-border-anim" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
