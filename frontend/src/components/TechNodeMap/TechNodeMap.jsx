// src/components/TechNodeMap/TechNodeMap.jsx
import React, { useState, useMemo } from 'react';
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
  Cpu,
  Terminal,
  Play,
  Sparkles,
  Award,
  Layers,
  Network,
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
      color: node.brandColor || '#06B6D4',
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
      className="tech-node-map-section w-full min-h-screen py-12 px-4 md:px-8 text-slate-100 flex flex-col items-center justify-start font-sans"
    >
      {/* ── 1. HARDWARE-ACCELERATED CIRCUIT & BLUEPRINT BACKGROUND ── */}
      <div className="blueprint-grid-overlay" />
      <div className="radar-scan-line" />

      {/* Blueprint Radar Rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-cyan-500/10 rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] border border-indigo-500/5 rounded-full pointer-events-none" />

      {/* Radial Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(11,12,16,0.95)_75%,#0b0c10_100%)] pointer-events-none" />

      {/* ── 2. SECTION HEADER & HUD TELEMETRY BAR ── */}
      <div className="relative z-10 max-w-7xl w-full mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              FULL-STACK ENGINEERING CONSOLE // v4.8
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-300">
            Tech Architecture & Credentials
          </h2>
        </div>

        {/* View Mode Switcher + Audio Controls */}
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('NEURAL');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'NEURAL'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neural Graph</span>
          </button>

          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('MATRIX');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'MATRIX'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stack Matrix</span>
          </button>

          <button
            onClick={() => {
              hudAudio.playSelectChirp();
              setViewMode('CERTS');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'CERTS'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications ({rawCertifications.length || '26+'})</span>
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          {/* Audio Synthesizer Haptic Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioMuted ? 'Enable HUD Synthesizer Audio' : 'Mute HUD Audio'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE CONTAINER ── */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* VIEW 1: NEURAL GRAPH & REAL-TIME TELEMETRY */}
        {viewMode === 'NEURAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* DESKTOP 2D CANVAS GRAPH (Desktop lg: and up) */}
            <div className="hidden lg:block lg:col-span-7 relative h-[620px] w-full bg-slate-950/60 rounded-2xl border border-cyan-500/20 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Top Left Canvas HUD Controls */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  TOPOLOGY // 2D CLUSTER
                </span>
                <span className="text-slate-600">•</span>
                <span>VECTOR STREAMS: DYNAMIC</span>
              </div>

              {/* SVG Dynamic Vector Streams Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
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
                    <g key={`vector-${node.id}`} opacity={isDimmed ? 0.15 : 1}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(148, 163, 184, 0.12)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />

                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isSelected || isHovered ? node.brandColor : 'rgba(6, 182, 212, 0.25)'}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                        strokeDasharray={isSelected || isHovered ? '6 6' : 'none'}
                        animate={
                          isSelected || isHovered
                            ? { strokeDashoffset: [-30, 0] }
                            : { strokeDashoffset: 0 }
                        }
                        transition={{
                          repeat: Infinity,
                          ease: 'linear',
                          duration: isSelected ? 0.8 : 1.5,
                        }}
                        filter={isSelected || isHovered ? 'url(#vectorGlow)' : undefined}
                      />

                      {(isSelected || isHovered) && (
                        <motion.circle
                          r="3.5"
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
                    className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border"
                    style={{
                      left: `${burstEffect.x}%`,
                      top: `${burstEffect.y}%`,
                      borderColor: burstEffect.color,
                      boxShadow: `0 0 25px ${burstEffect.color}`,
                    }}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 160, height: 160, opacity: 0 }}
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
                <motion.div
                  className="absolute -inset-6 rounded-full border border-cyan-400/30 border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -inset-3 rounded-full border border-indigo-400/40 border-dotted"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                />

                <motion.div
                  className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center p-3 text-center transition-all duration-300 ${
                    selectedNode?.id === CORE_ENGINE_NODE.id
                      ? 'bg-gradient-to-b from-cyan-900/90 to-slate-950 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]'
                      : 'bg-slate-900/80 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-400 flex items-center justify-center mb-1 shadow-[0_0_12px_#06B6D4]">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                  </div>
                  <span className="font-mono text-[9px] font-bold tracking-wider text-cyan-300 uppercase leading-none">
                    CORE ENGINE
                  </span>
                  <span className="font-mono text-[7px] text-slate-400 mt-1 leading-tight">
                    AI & FULL-STACK
                  </span>
                </motion.div>
              </div>

              {/* Radiating Sub-Nodes */}
              {TECH_NODES.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                const isDimmed = activeCategory !== 'ALL' && node.category !== activeCategory;

                const floatDuration = 3.5 + (index % 4) * 0.5;
                const floatDelay = (index * 0.2) % 2;

                return (
                  <motion.div
                    key={node.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer ${
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
                    <motion.div
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md transition-colors duration-200 ${
                        isSelected
                          ? 'bg-slate-900 border-2'
                          : 'bg-slate-900/80 border border-slate-700/80 hover:border-slate-500'
                      }`}
                      style={{
                        borderColor: isSelected ? node.brandColor : undefined,
                        boxShadow: isSelected
                          ? `0 0 25px ${node.glowColor}`
                          : isHovered
                          ? `0 0 15px ${node.glowColor}`
                          : 'none',
                      }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex-shrink-0">{node.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-white tracking-wide leading-tight">
                          {node.name}
                        </span>
                        <span className="font-mono text-[8px] text-slate-400 uppercase leading-none mt-0.5">
                          {node.badge}
                        </span>
                      </div>

                      {isSelected && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: node.brandColor }}
                        />
                      )}
                    </motion.div>
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    activeCategory === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                      activeCategory === key
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div
                  onClick={() => handleSelectNode(CORE_ENGINE_NODE)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer col-span-2 sm:col-span-3 transition-all ${
                    selectedNode.id === CORE_ENGINE_NODE.id
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900/70 border-cyan-500/30'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">CORE ENGINE REACTOR</h4>
                    <p className="font-mono text-[9px] text-cyan-400">AI & FULL-STACK CONTROLLER</p>
                  </div>
                </div>

                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <div
                      key={`mobile-${node.id}`}
                      onClick={() => handleSelectNode(node)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-2 shadow-lg'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                      style={{
                        borderColor: isSelected ? node.brandColor : undefined,
                        boxShadow: isSelected ? `0 0 15px ${node.glowColor}` : undefined,
                      }}
                    >
                      <div className="flex-shrink-0">{node.icon}</div>
                      <div className="overflow-hidden">
                        <h5 className="font-semibold text-xs text-white truncate">{node.name}</h5>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
    <div className="w-full bg-slate-950/90 rounded-2xl border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-slate-400 font-semibold tracking-wider text-[11px]">
            CORE-TELEMETRY.LOG
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-950 border border-cyan-800 text-cyan-400 animate-pulse">
            LIVE_FEED
          </span>
          <span className="text-[10px] text-slate-500">v4.8</span>
        </div>
      </div>

      {/* Target Active Node Status Banner */}
      <div className="px-4 py-3 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: node.brandColor || '#06B6D4' }}
          />
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              {node.name || node.title}
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
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
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-950 border border-indigo-500/50 hover:bg-indigo-900 text-indigo-300 text-[10px] font-bold uppercase transition-all shadow-sm shadow-indigo-500/30 cursor-pointer"
            >
              <Play className="w-2.5 h-2.5" />
              Benchmark
            </button>
          )}

          <span
            className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${node.brandColor}18` || 'rgba(6,182,212,0.1)',
              color: node.brandColor || '#06B6D4',
              border: `1px solid ${node.brandColor}40` || 'rgba(6,182,212,0.3)',
            }}
          >
            {node.telemetry?.status || 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Streaming Console Terminal Body */}
      <div className="p-4 bg-black/40 min-h-[160px] max-h-[220px] overflow-y-auto space-y-2 text-slate-300 leading-relaxed font-mono telemetry-scroll">
        <div className="text-cyan-400/80 text-[10px] tracking-wider">
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
          if (isDeployed) lineClass = 'text-cyan-400 font-semibold';
          if (isOptimized) lineClass = 'text-amber-400 font-semibold';
          if (isContainer) lineClass = 'text-emerald-400 font-semibold';

          return (
            <div key={idx} className={`text-[11px] ${lineClass}`}>
              {line}
            </div>
          );
        })}

        {currentLineIndex < (node.telemetry?.logStream?.length || 0) && (
          <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
        )}
      </div>

      {/* Structured Telemetry Metrics Grid */}
      <div className="p-4 bg-slate-900/30 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
          <span>HARDWARE & RUNTIME METRICS</span>
          <span className="text-cyan-400 text-[9px]">REAL-TIME SYNC</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(node.telemetry?.metrics || {}).map(([key, val]) => (
            <div key={key} className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/80">
              <div className="text-[8px] text-slate-400 uppercase truncate">
                {key.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate">{val}</div>
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
        className="px-4 py-2.5 bg-cyan-950/30 border-t border-cyan-800/40 flex items-center justify-between cursor-pointer hover:bg-cyan-900/40 transition-colors group"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-cyan-400 text-[10px] font-mono">ASSOCIATED PROJECT:</span>
          <span className="text-white font-semibold text-[11px] truncate group-hover:text-cyan-300 transition-colors">
            {node.telemetry?.projectRef || 'Foundation Core'}
          </span>
        </div>
        <span className="text-[10px] text-cyan-400 font-mono group-hover:translate-x-1 transition-transform">
          [HOLOGRAM VIEW ➜]
        </span>
      </div>
    </div>
  );
}
