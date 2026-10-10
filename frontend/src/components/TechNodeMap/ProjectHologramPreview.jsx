// src/components/TechNodeMap/ProjectHologramPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X, Sparkles } from 'lucide-react';
import { hudAudio } from './audioSynthesizer';

export default function ProjectHologramPreview({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg bg-slate-950/95 border border-cyan-500/50 rounded-2xl p-5 shadow-[0_0_50px_rgba(6,182,212,0.35)] backdrop-blur-2xl text-slate-100 z-50 overflow-hidden font-sans"
    >
      {/* Hologram Scan Line Animation */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
              HOLOGRAM PROJECT TELEMETRY
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-0.5 tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 font-medium">{project.tagline}</p>
        </div>

        <button
          onClick={() => {
            hudAudio.playSelectChirp();
            onClose();
          }}
          className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Project Image Preview with Hologram Tint */}
      {project.image && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-900 mb-4 group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-2 left-3 flex gap-1.5 flex-wrap">
            {project.metrics?.map((metric, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-semibold"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => hudAudio.playSelectChirp()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition-all shadow-md"
          >
            <Github className="w-3.5 h-3.5" />
            Source Repository
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => hudAudio.playLaserPulse()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-slate-950 transition-all shadow-lg shadow-cyan-500/25"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Deployment
          </a>
        )}
      </div>
    </motion.div>
  );
}
