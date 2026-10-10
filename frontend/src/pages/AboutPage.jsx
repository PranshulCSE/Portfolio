import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, GraduationCap } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import OptimizedImage from '../components/OptimizedImage';
import Loader from '../components/Loader';
import '../styles/About.css';
import '../styles/Experience.css';
import '../styles/Education.css';

const AboutPage = () => {
    const { portfolio } = usePortfolioData();
    const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const assetBase = import.meta.env.BASE_URL || '/';

    const about = portfolio?.about || {
        bio: 'MCA Student and Full-Stack Developer.',
        philosophy: 'Clean code is a priority.',
        focus: [],
        stats: [],
    };

    const experience = portfolio?.experience || [];
    const education = portfolio?.education || [];
    const personal = portfolio?.personal || { name: 'Pranshul Threja' };

    return (
        <div className="about-page-container">
            {/* Bio & Profile Section */}
            <section className="about-bio-section section-padding">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="section-label">GET TO KNOW ME</p>
                        <h2 className="section-title">About Me</h2>
                    </motion.div>

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
                                    <OptimizedImage
                                        src={`${assetBase}assets/Images/Profile1.png`}
                                        alt={personal.name}
                                        className="about-profile-img"
                                        loading="lazy"
                                        width={800}
                                        height={800}
                                    />
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
                            <div className="about-text">
                                {about.bio.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            {about.focus.length > 0 && (
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
                            )}

                            <blockquote className="philosophy-quote">
                                "{about.philosophy}"
                            </blockquote>

                            {about.stats.length > 0 && (
                                <div className="about-stats" ref={statsRef}>
                                    {about.stats.map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="stat-card card"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <div className="stat-value">
                                                {statsInView ? (
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
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Timeline Section */}
            {experience.length > 0 && (
                <section className="experience-section section-padding">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="section-label">MY JOURNEY</p>
                            <h2 className="section-title">Work Experience</h2>
                        </motion.div>

                        <VerticalTimeline lineColor="rgba(6, 182, 212, 0.2)">
                            {experience.map((exp, idx) => (
                                <VerticalTimelineElement
                                    key={idx}
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(6, 182, 212, 0.2)',
                                        borderRadius: '0.75rem',
                                        backdropFilter: 'blur(10px)',
                                        padding: '2rem',
                                    }}
                                    contentArrowStyle={{
                                        borderRight: '7px solid rgba(6, 182, 212, 0.3)',
                                    }}
                                    date={exp.duration}
                                    dateClassName="timeline-date"
                                    icon={<Briefcase />}
                                    iconStyle={{
                                        background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                                        color: '#fff',
                                    }}
                                >
                                    <h3 className="exp-title">{exp.position}</h3>
                                    <h4 className="exp-company">{exp.company}</h4>
                                    <span className="exp-location">{exp.location}</span>

                                    <ul className="exp-achievements">
                                        {exp.achievements.map((achievement, aidx) => (
                                            <li key={aidx}>{achievement}</li>
                                        ))}
                                    </ul>

                                    <div className="exp-tags">
                                        {exp.technologies.map((tech, tidx) => (
                                            <span key={tidx} className="exp-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                </section>
            )}

            {/* Education Timeline Section */}
            {education.length > 0 && (
                <section className="education-section section-padding">
                    <div className="container">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="section-label">EDUCATION</p>
                            <h2 className="section-title">Academic Background</h2>
                        </motion.div>

                        <VerticalTimeline lineColor="rgba(139, 92, 246, 0.2)">
                            {education.map((edu, idx) => (
                                <VerticalTimelineElement
                                    key={idx}
                                    className="vertical-timeline-element--education"
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: '0.75rem',
                                        backdropFilter: 'blur(10px)',
                                        padding: '2rem',
                                    }}
                                    contentArrowStyle={{
                                        borderRight: '7px solid rgba(139, 92, 246, 0.3)',
                                    }}
                                    date={edu.duration}
                                    dateClassName="timeline-date"
                                    icon={<GraduationCap />}
                                    iconStyle={{
                                        background: 'linear-gradient(135deg, var(--violet), var(--fuchsia))',
                                        color: '#fff',
                                    }}
                                >
                                    <h3 className="edu-degree">{edu.degree}</h3>
                                    <h4 className="edu-school">{edu.school}</h4>
                                    <div className="edu-gpa-container">
                                        <span className="edu-gpa-label">SGPA/GPA:</span>
                                        <span className="edu-gpa-value">{edu.gpa}</span>
                                    </div>

                                    {edu.description && <p className="edu-desc">{edu.description}</p>}

                                    {edu.highlights && edu.highlights.length > 0 && (
                                        <div className="edu-highlights">
                                            <h5>Highlights:</h5>
                                            <ul>
                                                {edu.highlights.map((highlight, hidx) => (
                                                    <li key={hidx}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AboutPage;
