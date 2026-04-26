import { motion } from 'framer-motion';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Experience.css';

const Experience = () => {
    const sectionRef = useScrollReveal();
    const { experience } = portfolioData;

    return (
        <section id="experience" className="experience section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">MY JOURNEY</p>
                    <h2 className="section-title">Work Experience</h2>
                    <p className="section-subtitle">
                        Building products and solving problems at scale
                    </p>
                </motion.div>

                <VerticalTimeline lineColor="rgba(0, 212, 255, 0.2)">
                    {experience.map((exp, idx) => (
                        <VerticalTimelineElement
                            key={idx}
                            className="vertical-timeline-element--work"
                            contentStyle={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(0, 212, 255, 0.2)',
                                borderRadius: '0.75rem',
                                backdropFilter: 'blur(10px)',
                                padding: '2rem',
                            }}
                            contentArrowStyle={{
                                borderRight: '7px solid rgba(0, 212, 255, 0.3)',
                            }}
                            date={exp.duration}
                            dateClassName="timeline-date"
                            icon={<Briefcase />}
                            iconStyle={{
                                background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                                color: '#fff',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <h3 className="exp-title">{exp.position}</h3>
                                <p className="exp-company">{exp.company}</p>
                                <p className="exp-location">{exp.location}</p>

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
                            </motion.div>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </section>
    );
};

export default Experience;
