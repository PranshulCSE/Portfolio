// src/components/TechStack.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import TechNodeMap from './TechNodeMap';
import { Sparkles } from 'lucide-react';
import '../styles/TechStack.css';

const TechStack = () => {
    const { portfolio } = usePortfolioData();
    const skills = portfolio?.skills || {};
    const learning = skills.learning || [];

    return (
        <div className="techstack-wrapper w-full bg-[#06070a]">
            {/* The Master Console with 3 switchable views: Neural Graph, Stack Matrix, and Certifications */}
            <TechNodeMap />

            {/* Currently Learning / Next Horizons Cyber Strip */}
            {learning && learning.length > 0 && (
                <div className="bg-[#050811] border-t border-cyan-500/20 py-12 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="learning-section"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                                <h3 className="learning-title font-mono text-xs md:text-sm tracking-widest uppercase text-[#00f0ff] font-bold">
                                    ACTIVE HORIZONS & DEEP-DIVE RESEARCH // NEXTGEN TECH
                                </h3>
                            </div>
                            <div className="learning-tags flex flex-wrap gap-2.5">
                                {learning.map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="learning-tag bg-[#070b16] border border-cyan-500/30 hover:border-[#00f0ff] text-slate-200 text-xs px-3.5 py-1.5 rounded-full font-mono transition-all shadow-sm cursor-default"
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
