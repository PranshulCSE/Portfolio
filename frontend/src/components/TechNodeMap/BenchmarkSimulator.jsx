// src/components/TechNodeMap/BenchmarkSimulator.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hudAudio } from './audioSynthesizer';

export default function BenchmarkSimulator({ type = 'BINARY_SEARCH', onClose }) {
  const [activeTab, setActiveTab] = useState(type);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  // Binary Search State
  const initialArray = [3, 8, 14, 23, 31, 45, 59, 72, 88, 96, 104, 128];
  const [targetVal, setTargetVal] = useState(72);
  const [leftPtr, setLeftPtr] = useState(null);
  const [midPtr, setMidPtr] = useState(null);
  const [rightPtr, setRightPtr] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [stepsCount, setStepsCount] = useState(0);

  // Redis Cache Simulation State
  const [redisTrials, setRedisTrials] = useState({
    cacheHitRatio: 94.8,
    dbLatency: 48.2, // ms
    redisLatency: 1.4, // ms
    throughput: 12450, // req/sec
    simulatedPings: 0,
  });

  const runBinarySearch = async () => {
    setIsRunning(true);
    setFoundIndex(null);
    setLogs([`[INIT] Binary Search started on ${initialArray.length} sorted elements.`]);
    hudAudio.playSelectChirp();

    let l = 0;
    let r = initialArray.length - 1;
    let steps = 0;
    let found = -1;

    setLeftPtr(l);
    setRightPtr(r);

    while (l <= r) {
      steps++;
      setStepsCount(steps);
      const m = Math.floor((l + r) / 2);
      setMidPtr(m);

      setLogs((prev) => [
        ...prev,
        `[STEP ${steps}] L=${l} (${initialArray[l]}), M=${m} (${initialArray[m]}), R=${r} (${initialArray[r]})`,
      ]);
      hudAudio.playTypewriterTick();

      await new Promise((res) => setTimeout(res, 450));

      if (initialArray[m] === targetVal) {
        found = m;
        setFoundIndex(m);
        setLogs((prev) => [
          ...prev,
          `[FOUND] Element ${targetVal} located at Index ${m} in ${steps} steps! (O(log N))`,
        ]);
        hudAudio.playSelectChirp();
        break;
      } else if (initialArray[m] < targetVal) {
        l = m + 1;
        setLeftPtr(l);
        setLogs((prev) => [...prev, `[EVAL] ${initialArray[m]} < ${targetVal} → Search right half (L = ${l})`]);
      } else {
        r = m - 1;
        setRightPtr(r);
        setLogs((prev) => [...prev, `[EVAL] ${initialArray[m]} > ${targetVal} → Search left half (R = ${r})`]);
      }
      await new Promise((res) => setTimeout(res, 250));
    }

    if (found === -1) {
      setLogs((prev) => [...prev, `[TERMINATED] Value ${targetVal} not found in array.`]);
    }
    setIsRunning(false);
  };

  const runRedisBenchmark = async () => {
    setIsRunning(true);
    hudAudio.playLaserPulse();
    setLogs([`[BENCH] Firing 100 concurrent async read requests through Redis memory cache...`]);

    for (let i = 1; i <= 5; i++) {
      await new Promise((res) => setTimeout(res, 200));
      hudAudio.playTypewriterTick();
      const currentHits = (92 + Math.random() * 6).toFixed(1);
      const currentRedisMs = (1.1 + Math.random() * 0.6).toFixed(2);
      const currentDbMs = (44 + Math.random() * 12).toFixed(1);

      setRedisTrials((prev) => ({
        ...prev,
        cacheHitRatio: parseFloat(currentHits),
        redisLatency: parseFloat(currentRedisMs),
        dbLatency: parseFloat(currentDbMs),
        simulatedPings: i * 20,
      }));

      setLogs((prev) => [
        ...prev,
        `[BATCH ${i}/5] Cache Hit Rate: ${currentHits}% // Redis Latency: ${currentRedisMs}ms // Direct SQL Latency: ${currentDbMs}ms`,
      ]);
    }

    setLogs((prev) => [
      ...prev,
      `[COMPLETE] Redis caching layer yielded 96.2% latency reduction vs disk queries!`,
    ]);
    hudAudio.playSelectChirp();
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="w-full bg-slate-950/95 border-2 border-cyan-500/40 rounded-2xl p-4 md:p-5 shadow-[0_0_40px_rgba(6,182,212,0.25)] text-slate-200 font-mono text-xs overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-cyan-400 tracking-wider text-sm">
            INTERACTIVE ALGORITHM BENCHMARK
          </span>
        </div>
        <button
          onClick={onClose}
          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          [ESC / CLOSE]
        </button>
      </div>

      {/* Simulator Selector Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setActiveTab('BINARY_SEARCH');
            setLogs([]);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'BINARY_SEARCH'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Binary Search (O(log N))
        </button>
        <button
          onClick={() => {
            setActiveTab('CACHE_SIM');
            setLogs([]);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'CACHE_SIM'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Redis Cache vs DB Latency
        </button>
      </div>

      {/* TAB 1: BINARY SEARCH SIMULATOR */}
      {activeTab === 'BINARY_SEARCH' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Target Value:</span>
              <select
                value={targetVal}
                disabled={isRunning}
                onChange={(e) => setTargetVal(Number(e.target.value))}
                className="bg-slate-950 border border-cyan-500/40 text-cyan-300 px-2 py-1 rounded font-bold outline-none"
              >
                {initialArray.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={runBinarySearch}
              disabled={isRunning}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-lg shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isRunning ? 'EXECUTING...' : 'RUN BENCHMARK ➜'}
            </button>
          </div>

          {/* Array Visualizer */}
          <div className="bg-black/50 p-4 rounded-xl border border-slate-800/80 overflow-x-auto">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">
              SORTED MEMORY ARRAY (N = 12)
            </div>
            <div className="flex gap-2 min-w-max justify-center">
              {initialArray.map((val, idx) => {
                const isMid = midPtr === idx;
                const isLeft = leftPtr === idx;
                const isRight = rightPtr === idx;
                const isFound = foundIndex === idx;

                let borderClass = 'border-slate-800 bg-slate-900/60 text-slate-300';
                if (isFound) borderClass = 'border-emerald-400 bg-emerald-950 text-emerald-300 shadow-[0_0_15px_#10b981]';
                else if (isMid) borderClass = 'border-cyan-400 bg-cyan-950 text-cyan-200 shadow-[0_0_12px_#06b6d4]';
                else if (isLeft || isRight) borderClass = 'border-indigo-400 bg-indigo-950/60 text-indigo-300';

                return (
                  <motion.div
                    key={idx}
                    animate={{ scale: isMid || isFound ? 1.1 : 1 }}
                    className={`w-12 h-14 rounded-lg border-2 flex flex-col items-center justify-center relative transition-all ${borderClass}`}
                  >
                    <span className="text-[9px] text-slate-500 font-mono">[{idx}]</span>
                    <span className="font-bold text-sm">{val}</span>
                    {isMid && (
                      <span className="absolute -bottom-4 text-[8px] font-bold text-cyan-400">
                        MID
                      </span>
                    )}
                    {isLeft && !isMid && (
                      <span className="absolute -top-4 text-[8px] font-bold text-indigo-400">
                        L
                      </span>
                    )}
                    {isRight && !isMid && (
                      <span className="absolute -top-4 text-[8px] font-bold text-indigo-400">
                        R
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REDIS CACHE LATENCY BENCHMARK */}
      {activeTab === 'CACHE_SIM' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-300 text-xs">
              Simulate high-concurrency read operations against Redis vs Direct Disk Queries.
            </span>
            <button
              onClick={runRedisBenchmark}
              disabled={isRunning}
              className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isRunning ? 'TESTING...' : 'RUN LATENCY TEST ➜'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Redis Metric Card */}
            <div className="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-1">
                <span>REDIS IN-MEMORY HIT</span>
                <span className="font-bold">FAST PATH</span>
              </div>
              <div className="text-2xl font-black text-emerald-300">
                {redisTrials.redisLatency} ms
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, redisTrials.redisLatency * 20)}%` }}
                />
              </div>
            </div>

            {/* Direct DB Metric Card */}
            <div className="bg-slate-900/90 border border-red-500/30 p-3 rounded-xl">
              <div className="flex items-center justify-between text-[10px] text-red-400 mb-1">
                <span>UNCACHED DISK QUERY</span>
                <span className="font-bold">SLOW PATH</span>
              </div>
              <div className="text-2xl font-black text-red-400">
                {redisTrials.dbLatency} ms
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-red-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (redisTrials.dbLatency / 60) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Live Telemetry Output Stream */}
      <div className="mt-4 bg-black/60 p-3 rounded-xl border border-slate-800/80 max-h-36 overflow-y-auto space-y-1 text-[11px] text-slate-300">
        <div className="text-cyan-400/80 text-[10px]">[CONSOLE TRACE]</div>
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">Click [RUN BENCHMARK] to initiate execution stream...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="text-cyan-300 font-mono">
              {log}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
