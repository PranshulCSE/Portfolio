// src/components/TechNodeMap/CertificationsVault.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  Filter,
  Calendar,
  X,
  Sparkles,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { hudAudio } from './audioSynthesizer';

// Map known certification documents to public asset paths
const assetBase = typeof window !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/';

const CERT_DOCUMENTS_MAP = {
  'Computer Hardware Basics': `${assetBase}assets/Images/Computer_Hardware_Basics_certificate_threjapranshul-gmail-com_c1dc1a2e-6fe0-412a-b703-5e3afcb2c111 (1).pdf`,
  'Introduction to CSS': `${assetBase}assets/Images/CSS_Simplilearn.pdf`,
  'Introduction to Front End Development': `${assetBase}assets/Images/FRONT_END_Simplilearn.pdf`,
  'Introduction to HTML': `${assetBase}assets/Images/HTML_Simplilearn.pdf`,
  'Introduction to Network Analysis': `${assetBase}assets/Images/Introduction to Network Analysis-course_certificate.pdf`,
  'Introduction to Python': `${assetBase}assets/Images/Introduction to Python-course.pdf`,
  'Introduction to Threat Hunting': `${assetBase}assets/Images/Introduction to Threat Hunting-course.pdf`,
  'Data Structures in C++ Course': `${assetBase}assets/Images/DSA in CPP.png`,
  'Full Stack Development Bootcamp': `${assetBase}assets/Images/Full-Stack Bootcamp Pranshul.pdf`,
  'Certificate of Participation – Tech Show': `${assetBase}assets/Images/Google Pranshul Yugantran 2.O.pdf`,
};

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
        selectedIssuer === 'ALL' ||
        cert.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
      return matchesSearch && matchesIssuer;
    });
  }, [certifications, searchTerm, selectedIssuer]);

  // Derive track category for the cyber card top badge
  const getTrackTag = (title) => {
    const t = title.toLowerCase();
    if (t.includes('c++') || t.includes('data structures') || t.includes('algorithms')) return 'TRACK: DSA & CS';
    if (t.includes('python')) return 'TRACK: PYTHON';
    if (t.includes('network') || t.includes('hardware') || t.includes('cybersecurity') || t.includes('threat')) return 'TRACK: CYBER & SEC';
    if (t.includes('front end') || t.includes('css') || t.includes('html') || t.includes('bootstrap')) return 'TRACK: FRONTEND';
    if (t.includes('mern') || t.includes('full stack') || t.includes('node')) return 'TRACK: FULL-STACK';
    if (t.includes('linux') || t.includes('red hat')) return 'TRACK: LINUX / SYS';
    if (t.includes('ai') || t.includes('chatgpt')) return 'TRACK: AI & LLMS';
    return 'TRACK: CREDENTIAL';
  };

  return (
    <div className="w-full text-slate-100 font-sans">
      {/* ── Search & Filter Bar (Matching Cyber HUD) ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#070b16]/90 p-4 rounded-2xl border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.6)]">
        {/* Search Input */}
        <div className="relative w-full md:w-88">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00f0ff]" />
          <input
            type="text"
            placeholder="Search 26+ Credentials (C++, Python, Linux, MERN...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#04060b] border border-cyan-500/30 focus:border-[#00f0ff] focus:shadow-[0_0_20px_rgba(0,240,255,0.3)] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
          />
        </div>

        {/* Issuer Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0" />
          {issuers.slice(0, 7).map((issuer) => (
            <button
              key={issuer}
              onClick={() => {
                hudAudio.playSelectChirp();
                setSelectedIssuer(issuer);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedIssuer === issuer
                  ? 'cyber-btn-primary'
                  : 'cyber-btn-secondary'
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>
      </div>

      {/* ── Certifications Grid (Matching Yugantran Track Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCerts.map((cert, index) => {
          const trackTag = getTrackTag(cert.title);
          const hasDoc = CERT_DOCUMENTS_MAP[cert.title];

          return (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => {
                hudAudio.playSelectChirp();
                setSelectedCert({ ...cert, docUrl: hasDoc });
              }}
              className="p-5 rounded-2xl bg-[#070b16]/90 border border-cyan-500/25 hover:border-[#00f0ff] hover:shadow-[0_0_35px_rgba(0,240,255,0.35)] transition-all duration-300 backdrop-blur-xl group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Cyber Track Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/50 flex items-center justify-center text-[#00f0ff] group-hover:scale-110 group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#00f0ff] bg-cyan-950/50 border border-cyan-500/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-[#00f0ff]" /> {trackTag}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-extrabold text-sm text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-snug">
                  {cert.title}
                </h4>

                {/* Issuer */}
                <p className="text-xs text-slate-400 font-medium mt-1.5 line-clamp-1">
                  {cert.issuer}
                </p>
              </div>

              {/* Footer with date & Inspect CTA */}
              <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-cyan-400" /> {cert.date || 'Verified'}
                </span>
                <span className="text-[#00f0ff] font-bold group-hover:translate-x-1 transition-transform">
                  [INSPECT CREDENTIAL ➜]
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCerts.length === 0 && (
        <div className="text-center py-16 bg-[#070b16]/60 rounded-2xl border border-cyan-500/20 text-slate-400 font-mono text-xs">
          No certifications matching "{searchTerm}". Try clearing your search query.
        </div>
      )}

      {/* ── Credential Telemetry Inspection Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-lg bg-[#050812] border border-cyan-500/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-slate-100 overflow-hidden"
            >
              {/* Scanline top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-widest uppercase">
                    CREDENTIAL TELEMETRY // VERIFIED
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400 flex items-center justify-center text-[#00f0ff] flex-shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{selectedCert.issuer}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> OFFICIAL ACADEMIC / INDUSTRY ISSUER
                  </span>
                </div>
              </div>

              <div className="bg-[#070b16] p-3.5 rounded-xl border border-cyan-500/20 font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">ISSUE DATE:</span>
                  <span className="text-[#00f0ff] font-bold">{selectedCert.date || 'Verified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ISSUING BODY:</span>
                  <span className="text-slate-200">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AUTHENTICITY:</span>
                  <span className="text-emerald-400 font-bold">VERIFIED & TAMPER-PROOF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-[#00f0ff] font-bold">Active Professional Certification</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {selectedCert.docUrl ? (
                  <a
                    href={selectedCert.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full cyber-btn-primary flex items-center justify-center gap-2 text-xs uppercase"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official Certificate (PDF/PNG)</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      alert(`Verified Credential: "${selectedCert.title}" issued by ${selectedCert.issuer} in ${selectedCert.date}.`);
                    }}
                    className="flex-1 py-2.5 rounded-full cyber-btn-secondary flex items-center justify-center gap-2 text-xs uppercase"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>Verified Academic Record</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
