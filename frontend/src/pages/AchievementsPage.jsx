import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Award, ExternalLink, Calendar } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import OptimizedImage from '../components/OptimizedImage';
import Loader from '../components/Loader';
import '../styles/Achievements.css';

const AchievementsPage = () => {
    const { portfolio, loading } = usePortfolioData();
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [filter, setFilter] = useState('All');

    if (loading) return <Loader onComplete={() => {}} />;

    const achievements = portfolio?.achievements || [];
    const certifications = portfolio?.certifications || [];
    
    const categories = ['All', ...new Set(achievements.map(a => a.category))];

    const filteredAchievements = filter === 'All'
        ? achievements
        : achievements.filter(a => a.category === filter);

    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('data:')) return path;
        const base = import.meta.env.BASE_URL || '/';
        return `${base}${path.replace(/^\/+/, '')}`;
    };

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
        <section className="achievements section section-padding">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">HIGHLIGHTS</p>
                    <h2 className="section-title">Achievements & Certifications</h2>
                    <p className="section-subtitle">
                        Key academic, professional accomplishments and professional certifications
                    </p>
                </motion.div>

                {/* Tab title for Achievements */}
                <h3 className="sub-section-title">🏆 Key Accomplishments</h3>

                {/* Filter */}
                {categories.length > 1 && (
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
                )}

                {/* Achievements Grid */}
                {filteredAchievements.length > 0 ? (
                    <motion.div
                        className="achievements-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredAchievements.map((achievement) => (
                            <motion.div
                                key={achievement._id}
                                className="achievement-card card"
                                variants={itemVariants}
                                onClick={() => setSelectedAchievement(achievement)}
                            >
                                <div className="achievement-image">
                                    <div className="image-placeholder">
                                        <OptimizedImage
                                            src={getImageUrl(achievement.image)}
                                            alt={achievement.title}
                                            className="achievement-image-media"
                                            loading="lazy"
                                            width={1200}
                                            height={800}
                                        />
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
                ) : (
                    <div className="no-items"><p>No achievements found.</p></div>
                )}

                {/* Certifications Section */}
                {certifications.length > 0 && (
                    <div className="certifications-section section-padding">
                        <h3 className="sub-section-title">📜 Verified Certifications ({certifications.length})</h3>
                        
                        <div className="certs-grid">
                            {certifications.map((cert, index) => (
                                <motion.div 
                                    className="cert-card card"
                                    key={cert._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                >
                                    <div className="cert-icon-wrapper">
                                        <Award className="cert-icon" size={24} />
                                    </div>
                                    <div className="cert-info">
                                        <h4 className="cert-title">{cert.title}</h4>
                                        <p className="cert-issuer">{cert.issuer}</p>
                                        <div className="cert-meta">
                                            <span className="cert-date"><Calendar size={14} /> {cert.date}</span>
                                            {cert.link && (
                                                <a 
                                                    href={getImageUrl(cert.link)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="cert-link-anchor"
                                                >
                                                    View Certificate <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
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
                                    <OptimizedImage
                                        src={getImageUrl(selectedAchievement.image)}
                                        alt={selectedAchievement.title}
                                        className="achievement-lightbox-media"
                                        loading="lazy"
                                        width={1400}
                                        height={900}
                                    />
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

export default AchievementsPage;
