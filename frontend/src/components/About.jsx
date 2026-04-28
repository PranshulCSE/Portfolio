import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';

const About = () => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const sectionRef = useScrollReveal();
    const { about } = portfolioData;

    return (
        <section id="about" className="about section" ref={sectionRef}>
            <div className="container">
                <div className="about-grid">
                    {/* Left - Image */}
                    <motion.div
                        className="about-image"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="image-frame">
                            <div className="image-placeholder">
                                <img src="/assets/Images/Profile1.png"></img>
                            </div>
                            <div className="image-border" />
                            <div className="image-corners" />
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">About Me</h2>

                        <div className="about-text">
                            {about.bio.split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Focus Areas */}
                        <div className="focus-areas">
                            <h3>Current Focus</h3>
                            <div className="focus-tags">
                                {about.focus.map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="focus-tag"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        📌 {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Philosophy Quote */}
                        <blockquote className="philosophy-quote">
                            "{about.philosophy}"
                        </blockquote>

                        {/* Stats */}
                        <div className="about-stats" ref={ref}>
                            {about.stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="stat-card card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="stat-value">
                                        {inView ? (
                                            <CountUp
                                                start={0}
                                                end={stat.value}
                                                duration={2}
                                            />
                                        ) : (
                                            0
                                        )}
                                        <span>{stat.suffix}</span>
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
