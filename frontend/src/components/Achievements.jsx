import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Achievements.css';

const Achievements = () => {
    const sectionRef = useScrollReveal();
    const { achievements } = portfolioData;
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Leadership', 'Technical', 'Academic', 'Learning'];

    const filteredAchievements = filter === 'All'
        ? achievements
        : achievements.filter(a => a.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="achievements" className="achievements section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">HIGHLIGHTS</p>
                    <h2 className="section-title">Hall of Fame</h2>
                    <p className="section-subtitle">
                        Key accomplishments and milestones
                    </p>
                </motion.div>

                {/* Filter */}
                <div className="achievement-filters">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={idx}
                            className={`filter-badge ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    className="achievements-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {filteredAchievements.map((achievement, idx) => (
                        <motion.div
                            key={achievement.id}
                            className="achievement-card"
                            variants={itemVariants}
                            onClick={() => setSelectedAchievement(achievement)}
                        >
                            <div className="achievement-image">
                                <div className="image-placeholder">
                                    <img src={achievement.img} alt={achievement.title} />
                                </div>
                                <div className="achievement-overlay">
                                    <button className="view-btn">View Details</button>
                                </div>
                            </div>
                            <div className="achievement-info">
                                <h3 className="achievement-title">{achievement.title}</h3>
                                <p className="achievement-category">{achievement.category}</p>
                                <p className="achievement-date">{achievement.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            {selectedAchievement && (
                <motion.div
                    className="lightbox-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedAchievement(null)}
                >
                    <motion.div
                        className="lightbox-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="lightbox-close"
                            onClick={() => setSelectedAchievement(null)}
                        >
                            <X size={32} />
                        </button>

                        <div className="lightbox-inner">
                            <div className="lightbox-image">
                                <div className="image-placeholder-large">
                                    <img src={selectedAchievement.img} alt={selectedAchievement.title} />
                                </div>
                            </div>
                            <div className="lightbox-info">
                                <h2 className="lightbox-title">{selectedAchievement.title}</h2>
                                <p className="lightbox-description">
                                    {selectedAchievement.description}
                                </p>
                                <div className="lightbox-meta">
                                    <span className="meta-category">{selectedAchievement.category}</span>
                                    <span className="meta-date">{selectedAchievement.date}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Achievements;
