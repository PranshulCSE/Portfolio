import { motion } from 'framer-motion';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/TechStack.css';

const TechStack = () => {
    const sectionRef = useScrollReveal();
    const { skills } = portfolioData;

    const skillCategories = [
        { title: 'Languages', items: skills.languages },
        { title: 'Frontend', items: skills.frontend },
        { title: 'Backend', items: skills.backend },
        { title: 'Database', items: skills.database },
        { title: 'DSA & CS', items: skills.dsaCS },
        { title: 'Tools', items: skills.tools },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="skills" className="techstack section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">MY TOOLKIT</p>
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with
                    </p>
                </motion.div>

                {/* Skill Categories */}
                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            className="skill-category card"
                            variants={itemVariants}
                        >
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skill-tags">
                                {category.items.map((skill, sidx) => (
                                    <motion.span
                                        key={sidx}
                                        className="skill-tag"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: sidx * 0.05 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Currently Learning */}
                <motion.div
                    className="learning-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="learning-title">🚀 Currently Learning</h3>
                    <div className="learning-tags">
                        {skills.learning.map((item, idx) => (
                            <motion.span
                                key={idx}
                                className="learning-tag"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                📌 {item}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
