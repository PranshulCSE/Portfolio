// src/components/TechNodeMap/CertificationsVault.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Search, ExternalLink, CheckCircle2, ShieldCheck, Filter, Calendar } from 'lucide-react';
import { hudAudio } from './audioSynthesizer';

export default function CertificationsVault({ certifications = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('ALL');
  const [selectedCert, setSelectedCert] = useState(null);

  // Extract unique issuers
  const issuers = useMemo(() => {
    const list = new Set();
    certifications.forEach((c) => {
      const mainIssuer = c.issuer.split('(')[0].trim();
      list.add(mainIssuer);
    });
    return ['ALL', ...Array.from(list)];
  }, [certifications]);

  // Filtered certifications
  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIssuer =
        selectedIssuer === 'ALL' || cert.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
      return matchesSearch && matchesIssuer;
    });
  }, [certifications, searchTerm, selectedIssuer]);

  return (
    <div className="w-full text-slate-100 font-sans">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            placeholder="Search 26+ Certifications (C++, Python, Linux...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
          />
        </div>

        {/* Issuer Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {issuers.slice(0, 6).map((issuer) => (
            <button
              key={issuer}
              onClick={() => {
                hudAudio.playSelectChirp();
                setSelectedIssuer(issuer);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                selectedIssuer === issuer
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert, index) => (
          <motion.div
            key={cert.id || index}
            initial={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => {
              hudAudio.playSelectChirp();
              setSelectedCert(cert);
            }}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md shadow-lg group cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header with verified badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                {cert.title}
              </h4>

              {/* Issuer */}
              <p className="text-xs text-slate-400 font-medium mt-1 line-clamp-1">
                {cert.issuer}
              </p>
            </div>

            {/* Footer with date */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {cert.date || 'Verified'}
              </span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                [INSPECT ➜]
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
          No certifications matching "{searchTerm}". Try clearing your search query.
        </div>
      )}

      {/* Certification Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                  CREDENTIAL TELEMETRY
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-400 hover:text-white"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{selectedCert.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{selectedCert.issuer}</p>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">ISSUED:</span>
                  <span className="text-cyan-300">{selectedCert.date || 'Verified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AUTHENTICITY:</span>
                  <span className="text-emerald-400 font-bold">100% SECURE & CERTIFIED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-white">Active Credential</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                CONFIRM & CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
