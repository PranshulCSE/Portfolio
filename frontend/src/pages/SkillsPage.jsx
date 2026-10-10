import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Loader from '../components/Loader';
import '../styles/TechStack.css';

const categoryLabels = {
    languages: 'Languages',
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Databases',
    dsaCS: 'DSA & CS Fundamentals',
    tools: 'Tools & DevOps',
};

const SkillsPage = () => {
    const { portfolio } = usePortfolioData();

    const skills = portfolio?.skills || {};
    const learning = skills.learning || [];

    const categories = Object.keys(skills)
        .filter(key => key !== 'learning' && categoryLabels[key])
        .map(key => ({
            key,
            title: categoryLabels[key],
            items: skills[key] || [],
        }));

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
        <section className="techstack section section-padding">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">MY TOOLKIT</p>
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle">
                        Technologies, frameworks, and tools I use to build scalable web applications
                    </p>
                </motion.div>

                {/* Skill Categories */}
                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.key}
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
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: sidx * 0.05 }}
                                        whileHover={{ scale: 1.05, background: 'rgba(6, 182, 212, 0.15)' }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Currently Learning */}
                {learning.length > 0 && (
                    <motion.div
                        className="learning-section"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <h3 className="learning-title">🚀 Currently Deep Diving & Learning</h3>
                        <div className="learning-tags">
                            {learning.map((item, idx) => (
                                <motion.span
                                    key={idx}
                                    className="learning-tag"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    📌 {item}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default SkillsPage;
