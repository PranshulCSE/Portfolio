// src/components/TechStack.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import TechNodeMap from './TechNodeMap';
import '../styles/TechStack.css';

const TechStack = () => {
    const { portfolio } = usePortfolioData();
    const skills = portfolio?.skills || {};
    const learning = skills.learning || [];

    return (
        <div className="techstack-wrapper w-full bg-[#0b0c10]">
            {/* The Master Console with 3 switchable views: Neural Graph, Stack Matrix, and Certifications */}
            <TechNodeMap />

            {/* Currently Learning / Next Horizons Footer Strip */}
            {learning && learning.length > 0 && (
                <div className="bg-[#0b0c10] border-t border-cyan-500/10 py-12 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="learning-section"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                <h3 className="learning-title font-mono text-sm tracking-wider uppercase text-cyan-400">
                                    🚀 Active Horizons & Deep-Dive Research
                                </h3>
                            </div>
                            <div className="learning-tags flex flex-wrap gap-2">
                                {learning.map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="learning-tag bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs px-3 py-1.5 rounded-lg font-mono transition-all"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                    >
                                        📌 {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechStack;
