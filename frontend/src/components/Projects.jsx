import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import OptimizedImage from './OptimizedImage';
import '../styles/Projects.css';

const Projects = () => {
    const sectionRef = useScrollReveal();
    const { projects } = portfolioData;
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="projects" className="projects section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">MY WORKS</p>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        Showcase of my best work and contributions
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={idx}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            className="project-card card"
                            variants={itemVariants}
                        >
                            {/* Image */}
                            <div className="project-image">
                                <div className="image-placeholder">
                                    <OptimizedImage
                                        src={project.img}
                                        alt={project.title}
                                        className="project-image-media"
                                        loading="lazy"
                                        width={1200}
                                        height={800}
                                    />
                                </div>
                                {project.featured && (
                                    <div className="featured-badge">⭐ Featured</div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                {/* Metrics */}
                                {project.metrics && (
                                    <div className="project-metrics">
                                        {project.metrics.map((metric, midx) => (
                                            <span key={midx} className="metric">{metric}</span>
                                        ))}
                                    </div>
                                )}

                                {/* Tags */}
                                <div className="project-tags">
                                    {project.tags.map((tag, tidx) => (
                                        <span key={tidx} className="project-tag">{tag}</span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <Github size={18} />
                                        GitHub
                                    </a>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <ExternalLink size={18} />
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
