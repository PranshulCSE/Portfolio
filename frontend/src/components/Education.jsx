import { motion } from 'framer-motion';
import { GraduationCap, Star } from 'lucide-react';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Education.css';

const Education = () => {
    const sectionRef = useScrollReveal();
    const { education } = portfolioData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="education" className="education section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">ACADEMIC BACKGROUND</p>
                    <h2 className="section-title">Education</h2>
                    <p className="section-subtitle">
                        Building knowledge and expertise
                    </p>
                </motion.div>

                <motion.div
                    className="education-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            className={`education-card card ${idx % 2 === 0 ? 'left' : 'right'}`}
                            variants={itemVariants}
                        >
                            <div className="edu-icon">
                                <GraduationCap size={32} />
                            </div>

                            <div className="edu-content">
                                <h3 className="edu-degree">{edu.degree}</h3>
                                <p className="edu-school">{edu.school}</p>
                                <p className="edu-duration">{edu.duration}</p>

                                {/* GPA */}
                                <div className="edu-gpa">
                                    <span className="gpa-label">GPA:</span>
                                    <span className="gpa-value">{edu.gpa}</span>
                                    <div className="gpa-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < Math.floor(edu.gpa) ? 'filled' : ''}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="edu-description">{edu.description}</p>

                                {/* Highlights */}
                                {edu.highlights.length > 0 && (
                                    <div className="edu-highlights">
                                        {edu.highlights.map((highlight, hidx) => (
                                            <span key={hidx} className="highlight">{highlight}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
