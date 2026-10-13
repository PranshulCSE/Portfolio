// src/components/TechNodeMap/TechNodeMap.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CORE_ENGINE_NODE,
  TECH_NODES,
  CATEGORIES,
  FLAGSHIP_PROJECTS,
} from './techConfig';
import { hudAudio } from './audioSynthesizer';
import BenchmarkSimulator from './BenchmarkSimulator';
import ProjectHologramPreview from './ProjectHologramPreview';
import CertificationsVault from './CertificationsVault';
import MasteryMatrix from './MasteryMatrix';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import {
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  Award,
  Layers,
  Network,
  Activity,
  Terminal,
} from 'lucide-react';
import './TechNodeMap.css';

export default function TechNodeMap() {
  const { portfolio } = usePortfolioData();
  const rawCertifications = portfolio?.certifications || [];
  const rawSkills = portfolio?.skills || {};

  // View Mode: 'NEURAL' | 'MATRIX' | 'CERTS'
  const [viewMode, setViewMode] = useState('NEURAL');

  // Node Map State
  const [selectedNode, setSelectedNode] = useState(CORE_ENGINE_NODE);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [burstEffect, setBurstEffect] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(() => hudAudio.isMuted());

  // Interactive Modals
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const toggleSound = () => {
    const nextState = hudAudio.toggleMute();
    setIsAudioMuted(nextState);
  };

  const handleSelectNode = (node) => {
    setSelectedNode(node);
    hudAudio.playSelectChirp();

    setBurstEffect({
      id: node.id,
      x: node.coords ? node.coords.x : 50,
      y: node.coords ? node.coords.y : 50,
      color: node.brandColor || '#00f0ff',
    });
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node);
    if (node) {
      hudAudio.playHoverHum(node.id === 'core-engine' ? 680 : 540);
    }
  };

  const filteredNodes = useMemo(() => {
    if (activeCategory === 'ALL') return TECH_NODES;
    return TECH_NODES.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="tech-stack"
      className="tech-node-map-section w-full min-h-screen py-16 px-4 md:px-8 text-slate-100 flex flex-col items-center justify-start font-sans"
    >
      {/* ── 1. HARDWARE-ACCELERATED CIRCUIT & MATRIX RAIN BACKGROUND ── */}
      <div className="blueprint-grid-overlay" />
      <div className="matrix-stream-overlay" />
      <div className="radar-scan-line" />

      {/* Blueprint Radar Rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-cyan-500/15 rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] border border-indigo-500/10 rounded-full pointer-events-none" />

      {/* Radial Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.06)_0%,rgba(6,7,10,0.92)_70%,#06070a_100%)] pointer-events-none" />

      {/* ── 2. HERO HEADLINE & HUD BAR (MATCHING USER SCREENSHOT SPEC) ── */}
      <div className="relative z-10 max-w-5xl w-full mb-10 flex flex-col items-center text-center">
        {/* Top Centered Cyber Badge Pill */}
        <div className="cyber-badge-pill mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span>CORE ARCHITECTURE // SYSTEM TELEMETRY</span>
        </div>

        {/* Big Bold Impact Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-center leading-[1.15] mb-4">
          <span className="text-white">Where Engineering </span>
          <span className="text-[#00f0ff] [text-shadow:0_0_30px_rgba(0,240,255,0.65)]">
            Meets Neural{' '}
          </span>
          <span className="text-white">Intelligence</span>
        </h2>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 text-center max-w-3xl leading-relaxed mb-8">
          Architected by <span className="text-[#00f0ff] font-semibold">Pranshul Threja</span> — An interactive neural cluster mapping{' '}
          <span className="text-white font-semibold">Full-Stack MERN systems</span>,{' '}
          <span className="text-[#00f0ff] font-semibold">DSA algorithmic pipelines (325+ Solved)</span>,{' '}
          <span className="text-white font-semibold">distributed Redis caches</span>, and{' '}
          <span className="text-[#00f0ff] font-semibold">containerized Judge0 sandboxes</span>.
        </p>

        {/* High-Impact Cyber CTA Buttons (Matching Screenshot Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('NEURAL');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              viewMode === 'NEURAL'
                ? 'cyber-btn-primary'
                : 'cyber-btn-secondary'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Neural Graph</span>
          </button>

          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('MATRIX');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              viewMode === 'MATRIX'
                ? 'cyber-btn-primary'
                : 'cyber-btn-secondary'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Stack Matrix</span>
          </button>

          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('CERTS');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              viewMode === 'CERTS'
                ? 'cyber-btn-primary'
                : 'cyber-btn-secondary'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications ({rawCertifications.length || '26+'})</span>
          </button>

          {/* Audio Synthesizer Haptic Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioMuted ? 'Enable HUD Synthesizer Audio' : 'Mute HUD Audio'}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full cyber-btn-secondary"
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            )}
            <span className="text-[10px] hidden sm:inline">
              {isAudioMuted ? 'SFX MUTED' : 'SFX LIVE'}
            </span>
          </button>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE CONTAINER ── */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* VIEW 1: NEURAL GRAPH & REAL-TIME TELEMETRY */}
        {viewMode === 'NEURAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* DESKTOP 2D CANVAS GRAPH (Desktop lg: and up) */}
            <div className="hidden lg:block lg:col-span-7 relative h-[660px] w-full bg-[#050811]/90 rounded-2xl border border-cyan-500/30 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              {/* Corner HUD Brackets */}
              <div className="absolute top-2 left-2 text-cyan-500/40 font-mono text-[9px] pointer-events-none z-30">
                +--[HUD_TOPOLOGY]--+
              </div>
              <div className="absolute top-2 right-2 text-cyan-500/40 font-mono text-[9px] pointer-events-none z-30">
                +--[CORE_REACTOR]--+
              </div>
              <div className="absolute bottom-2 left-2 text-cyan-500/40 font-mono text-[9px] pointer-events-none z-30">
                +--[60_FPS_GPU]--+
              </div>
              <div className="absolute bottom-2 right-2 text-cyan-500/40 font-mono text-[9px] pointer-events-none z-30">
                +--[VECTOR_DYNAMIC]--+
              </div>

              {/* Top Left Canvas HUD Controls */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-[#00f0ff] font-bold">
                  ORBITAL CLUSTER // DUAL-RING
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">14 NODES ONLINE</span>
              </div>

              {/* SVG Dynamic Vector Streams Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {TECH_NODES.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoveredNode?.id === node.id;
                  const isDimmed = activeCategory !== 'ALL' && node.category !== activeCategory;

                  const x1 = '50%';
                  const y1 = '50%';
                  const x2 = `${node.coords.x}%`;
                  const y2 = `${node.coords.y}%`;

                  return (
                    <g key={`vector-${node.id}`} opacity={isDimmed ? 0.12 : 1}>
                      {/* Subtle structural trace */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(0, 240, 255, 0.12)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />

                      {/* Active / Hovered Laser Vector Stream */}
                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isSelected || isHovered ? node.brandColor : 'rgba(0, 240, 255, 0.25)'}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                        strokeDasharray={isSelected || isHovered ? '6 6' : 'none'}
                        animate={
                          isSelected || isHovered
                            ? { strokeDashoffset: [-36, 0] }
                            : { strokeDashoffset: 0 }
                        }
                        transition={{
                          repeat: Infinity,
                          ease: 'linear',
                          duration: isSelected ? 0.8 : 1.5,
                        }}
                        filter={isSelected || isHovered ? 'url(#vectorGlow)' : undefined}
                      />

                      {/* Moving Photon Packet */}
                      {(isSelected || isHovered) && (
                        <motion.circle
                          r="4"
                          fill={node.brandColor}
                          animate={{
                            cx: ['50%', `${node.coords.x}%`],
                            cy: ['50%', `${node.coords.y}%`],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: 'easeInOut',
                          }}
                          filter="url(#vectorGlow)"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Localized Soundwave Burst */}
              <AnimatePresence>
                {burstEffect && (
                  <motion.div
                    key={`burst-${burstEffect.id}-${Date.now()}`}
                    className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border-2"
                    style={{
                      left: `${burstEffect.x}%`,
                      top: `${burstEffect.y}%`,
                      borderColor: burstEffect.color,
                      boxShadow: `0 0 35px ${burstEffect.color}`,
                    }}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 180, height: 180, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>

              {/* Core Engine Power Reactor Node */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                onClick={() => handleSelectNode(CORE_ENGINE_NODE)}
                onMouseEnter={() => handleNodeHover(CORE_ENGINE_NODE)}
                onMouseLeave={() => handleNodeHover(null)}
              >
                {/* Outer spinning dashed reticle */}
                <motion.div
                  className="absolute -inset-7 rounded-full border border-cyan-400/40 border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                />
                {/* Middle counter-spinning dotted reticle */}
                <motion.div
                  className="absolute -inset-3.5 rounded-full border border-indigo-400/50 border-dotted"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                />

                {/* Core Reactor Sphere */}
                <motion.div
                  className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center p-3 text-center transition-all duration-300 ${
                    selectedNode?.id === CORE_ENGINE_NODE.id
                      ? 'bg-gradient-to-tr from-cyan-950 via-[#071322] to-slate-950 border-2 border-[#00f0ff] shadow-[0_0_45px_rgba(0,240,255,0.75)]'
                      : 'bg-[#070d18]/90 backdrop-blur-2xl border border-cyan-500/50 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]'
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00f0ff] to-indigo-500 flex items-center justify-center mb-1.5 shadow-[0_0_15px_#00f0ff]">
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  </div>
                  <span className="font-mono text-[10px] font-black tracking-widest text-[#00f0ff] uppercase leading-none">
                    CORE ENGINE
                  </span>
                  <span className="font-mono text-[7px] text-slate-300 font-bold mt-1 tracking-wider uppercase leading-tight">
                    AI & FULL-STACK
                  </span>
                </motion.div>
              </div>

              {/* Radiating Sub-Nodes (Sleek Circular Cyber-Pods) */}
              {TECH_NODES.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                const isDimmed = activeCategory !== 'ALL' && node.category !== activeCategory;

                const floatDuration = 3.5 + (index % 4) * 0.5;
                const floatDelay = (index * 0.2) % 2;

                return (
                  <motion.div
                    key={node.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center ${
                      isDimmed ? 'opacity-20 pointer-events-none' : 'opacity-100'
                    }`}
                    style={{
                      left: `${node.coords.x}%`,
                      top: `${node.coords.y}%`,
                    }}
                    animate={{
                      y: [-3, 3, -3],
                      x: [-1.5, 1.5, -1.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: floatDuration,
                      delay: floatDelay,
                      ease: 'easeInOut',
                    }}
                    onClick={() => handleSelectNode(node)}
                    onMouseEnter={() => handleNodeHover(node)}
                    onMouseLeave={() => handleNodeHover(null)}
                  >
                    {/* Sleek Circular Pod */}
                    <motion.div
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#080e1c] border-2'
                          : 'bg-[#070b16]/90 border border-slate-700/80 hover:border-cyan-400'
                      }`}
                      style={{
                        borderColor: isSelected ? node.brandColor : undefined,
                        boxShadow: isSelected
                          ? `0 0 30px ${node.glowColor}`
                          : isHovered
                          ? `0 0 20px ${node.glowColor}`
                          : '0 4px 15px rgba(0,0,0,0.5)',
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* SVG Brand Icon */}
                      <div className="flex items-center justify-center">
                        {node.icon}
                      </div>

                      {/* Active / Brand Status Beacon */}
                      {isSelected && (
                        <span
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 animate-ping"
                          style={{ backgroundColor: node.brandColor }}
                        />
                      )}
                    </motion.div>

                    {/* Floating Label Pill Directly Underneath */}
                    <div
                      className={`mt-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-slate-950 text-[#00f0ff] border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                          : 'bg-black/90 text-slate-200 border-cyan-500/30'
                      }`}
                    >
                      {node.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* MOBILE ADAPTIVE VIEW (<lg screens) */}
            <div className="lg:hidden col-span-1 w-full flex flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => {
                    setActiveCategory('ALL');
                    hudAudio.playSelectChirp();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    activeCategory === 'ALL'
                      ? 'cyber-btn-primary'
                      : 'cyber-btn-secondary'
                  }`}
                >
                  ALL SYSTEMS ({TECH_NODES.length})
                </button>
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      hudAudio.playSelectChirp();
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                      activeCategory === key
                        ? 'cyber-btn-primary'
                        : 'cyber-btn-secondary'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => handleSelectNode(CORE_ENGINE_NODE)}
                  className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer col-span-2 sm:col-span-3 transition-all ${
                    selectedNode.id === CORE_ENGINE_NODE.id
                      ? 'bg-cyan-950/70 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.5)]'
                      : 'bg-[#070c18]/80 border-cyan-500/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-[#00f0ff] flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">CORE ENGINE REACTOR</h4>
                    <p className="font-mono text-[9px] text-[#00f0ff]">AI & FULL-STACK CONTROLLER</p>
                  </div>
                </div>

                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <div
                      key={`mobile-${node.id}`}
                      onClick={() => handleSelectNode(node)}
                      className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-2 shadow-lg'
                          : 'bg-[#070b16]/80 border-slate-800 hover:border-cyan-500/40'
                      }`}
                      style={{
                        borderColor: isSelected ? node.brandColor : undefined,
                        boxShadow: isSelected ? `0 0 20px ${node.glowColor}` : undefined,
                      }}
                    >
                      <div className="flex-shrink-0">{node.icon}</div>
                      <div className="overflow-hidden">
                        <h5 className="font-bold text-xs text-white truncate">{node.name}</h5>
                        <p className="font-mono text-[8px] text-slate-400 truncate">{node.badge}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REAL-TIME TELEMETRY TERMINAL DOCK (`CORE-TELEMETRY.LOG`) */}
            <div className="col-span-1 lg:col-span-5 w-full">
              <TelemetryTerminal
                node={selectedNode}
                onOpenBenchmark={() => setShowBenchmark(true)}
                onOpenProject={(projKey) => {
                  const proj = FLAGSHIP_PROJECTS[projKey] || FLAGSHIP_PROJECTS.GTECH_CODE;
                  setActiveProjectModal(proj);
                }}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: FULL-STACK MASTERY MATRIX */}
        {viewMode === 'MATRIX' && <MasteryMatrix skills={rawSkills} />}

        {/* VIEW 3: VERIFIED CERTIFICATIONS VAULT */}
        {viewMode === 'CERTS' && <CertificationsVault certifications={rawCertifications} />}
      </div>

      {/* OPTION B: BENCHMARK SIMULATOR MODAL */}
      <AnimatePresence>
        {showBenchmark && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-2xl">
              <BenchmarkSimulator
                type={selectedNode?.benchmarkType || 'BINARY_SEARCH'}
                onClose={() => setShowBenchmark(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* OPTION C: HOLOGRAM PROJECT PREVIEW MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <ProjectHologramPreview
              project={activeProjectModal}
              onClose={() => setActiveProjectModal(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── REAL-TIME TELEMETRY TERMINAL SUB-COMPONENT ─────────────────────────────
function TelemetryTerminal({ node, onOpenBenchmark, onOpenProject }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, [node.id]);

  useEffect(() => {
    if (!node.telemetry?.logStream) return;
    const lines = node.telemetry.logStream;

    if (currentLineIndex < lines.length) {
      const fullLine = lines[currentLineIndex];
      if (currentCharIndex < fullLine.length) {
        const timer = setTimeout(() => {
          setDisplayedLines((prev) => {
            const next = [...prev];
            next[currentLineIndex] = fullLine.substring(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 12);
        return () => clearTimeout(timer);
      } else {
        const linePause = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 90);
        return () => clearTimeout(linePause);
      }
    }
  }, [node, currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full bg-[#050812]/95 rounded-2xl border border-cyan-500/35 shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-[#080d1a] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 inline-block shadow-[0_0_6px_#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block shadow-[0_0_6px_#f59e0b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block shadow-[0_0_6px_#10b981]" />
          </div>
          <span className="ml-2 text-[#00f0ff] font-bold tracking-wider text-[11px]">
            CORE-TELEMETRY.LOG
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[9px] bg-cyan-950 border border-cyan-500/60 text-[#00f0ff] animate-pulse font-bold">
            LIVE_FEED
          </span>
          <span className="text-[10px] text-slate-500">v4.8</span>
        </div>
      </div>

      {/* Target Active Node Status Banner */}
      <div className="px-4 py-3 bg-[#070d18]/60 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 animate-pulse"
            style={{ backgroundColor: node.brandColor || '#00f0ff' }}
          />
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              {node.name || node.title}
            </div>
            <div className="text-[10px] text-cyan-400 font-sans font-medium">
              {node.categoryKey || node.subtitle || 'CORE ARCHITECTURE'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(node.hasBenchmark || node.id === 'cpp' || node.id === 'dsa' || node.id === 'redis') && (
            <button
              onClick={() => {
                hudAudio.playSelectChirp();
                onOpenBenchmark();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-500/60 hover:bg-indigo-900 text-indigo-300 text-[10px] font-bold uppercase transition-all shadow-md shadow-indigo-500/30 cursor-pointer"
            >
              <Play className="w-2.5 h-2.5" />
              Benchmark
            </button>
          )}

          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${node.brandColor}18` || 'rgba(0,240,255,0.1)',
              color: node.brandColor || '#00f0ff',
              border: `1px solid ${node.brandColor}50` || 'rgba(0,240,255,0.3)',
            }}
          >
            {node.telemetry?.status || 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Streaming Console Terminal Body */}
      <div className="p-4 bg-black/60 min-h-[170px] max-h-[230px] overflow-y-auto space-y-2 text-slate-300 leading-relaxed font-mono telemetry-scroll">
        <div className="text-cyan-400/90 text-[10px] tracking-wider">
          {`>>> TARGET_ADDR: 0x${(node.id || 'SYS').toUpperCase()} // ${
            node.telemetry?.code || '[STREAM_READY]'
          }`}
        </div>

        {displayedLines.map((line, idx) => {
          const isSuccess = line.includes('[SUCCESS]');
          const isDeployed = line.includes('[DEPLOYED]');
          const isOptimized = line.includes('[OPTIMIZED]');
          const isContainer = line.includes('[CONTAINERIZED]');

          let lineClass = 'text-slate-300';
          if (isSuccess) lineClass = 'text-indigo-400 font-semibold';
          if (isDeployed) lineClass = 'text-[#00f0ff] font-semibold';
          if (isOptimized) lineClass = 'text-amber-400 font-semibold';
          if (isContainer) lineClass = 'text-emerald-400 font-semibold';

          return (
            <div key={idx} className={`text-[11px] ${lineClass}`}>
              {line}
            </div>
          );
        })}

        {currentLineIndex < (node.telemetry?.logStream?.length || 0) && (
          <span className="inline-block w-2 h-3.5 bg-[#00f0ff] ml-1 animate-pulse align-middle" />
        )}
      </div>

      {/* Structured Telemetry Metrics Grid */}
      <div className="p-4 bg-[#070b16]/70 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
          <span>HARDWARE & RUNTIME METRICS</span>
          <span className="text-[#00f0ff] text-[9px] font-bold">REAL-TIME SYNC</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(node.telemetry?.metrics || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
              <div className="text-[8px] text-slate-400 uppercase truncate">
                {key.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="text-xs font-bold text-[#00f0ff] mt-0.5 truncate">{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Project Association Ribbon */}
      <div
        onClick={() => {
          hudAudio.playSelectChirp();
          onOpenProject(node.telemetry?.projectKey || 'GTECH_CODE');
        }}
        className="px-4 py-3 bg-cyan-950/40 border-t border-cyan-500/30 flex items-center justify-between cursor-pointer hover:bg-cyan-900/50 transition-colors group"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0" />
          <span className="text-[#00f0ff] text-[10px] font-mono font-bold">ASSOCIATED PROJECT:</span>
          <span className="text-white font-semibold text-[11px] truncate group-hover:text-[#00f0ff] transition-colors">
            {node.telemetry?.projectRef || 'Foundation Core'}
          </span>
        </div>
        <span className="text-[10px] text-[#00f0ff] font-mono font-bold group-hover:translate-x-1 transition-transform">
          [HOLOGRAM VIEW ➜]
        </span>
      </div>
    </div>
  );
}
