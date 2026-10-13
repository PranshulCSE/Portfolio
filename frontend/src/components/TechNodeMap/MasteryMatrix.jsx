// src/components/TechNodeMap/MasteryMatrix.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { hudAudio } from './audioSynthesizer';

export default function MasteryMatrix({ skills = {} }) {
  const categories = [
    {
      trackNumber: 'TRACK 01',
      title: 'Languages & Core Logic',
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      color: '#6366F1',
      items: skills.languages || ['C++', 'Java', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
      subtitle: 'Algorithmic Problem Solving & Object-Oriented Systems Design',
    },
    {
      trackNumber: 'TRACK 02',
      title: 'Frontend Engineering',
      icon: <Cpu className="w-5 h-5 text-[#00f0ff]" />,
      color: '#00f0ff',
      items: skills.frontend || ['React.js', 'Next.js', 'Tailwind CSS', 'Responsive UI', 'Framer Motion'],
      subtitle: 'Component Architectures, Concurrent Rendering & Reactive State Machines',
    },
    {
      trackNumber: 'TRACK 03',
      title: 'Backend & Infrastructure',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      color: '#10B981',
      items: skills.backend || ['Node.js', 'Express.js', 'REST API Architecture', 'JWT', 'bcrypt', 'Judge0 API'],
      subtitle: 'Event Loops, Middleware Pipelines & Secure Authentication Gateways',
    },
    {
      trackNumber: 'TRACK 04',
      title: 'Persistence & Distributed Caching',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      color: '#F59E0B',
      items: skills.database || ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose ODM'],
      subtitle: 'Aggregations, Compound Indexing, ACID Guarantees & Sub-Millisecond Caching',
    },
    {
      trackNumber: 'TRACK 05',
      title: 'DSA & Computer Science',
      icon: <Terminal className="w-5 h-5 text-violet-400" />,
      color: '#8B5CF6',
      items: skills.dsaCS || ['Problem Solving (325+ Solved)', 'Time Complexity O(log N)', 'Dynamic Programming', 'Graph Theory', 'Trie & Trees'],
      subtitle: 'LeetCode & GeeksforGeeks Verified Practice with 100-Day Streak',
    },
    {
      trackNumber: 'TRACK 06',
      title: 'Cloud, DevOps & Tooling',
      icon: <Cloud className="w-5 h-5 text-pink-400" />,
      color: '#EC4899',
      items: skills.tools || ['Git', 'GitHub Actions', 'Docker', 'AWS Basics', 'Postman', 'Vercel', 'Netlify'],
      subtitle: 'Automated CI/CD Deployments, Container Sandboxing & Cloud Infrastructure',
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {categories.map((cat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.01 }}
          className="p-5 rounded-2xl bg-[#070b16]/90 border border-cyan-500/25 hover:border-[#00f0ff] transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
          style={{
            boxShadow: `0 4px 25px -10px ${cat.color}35`,
          }}
        >
          <div>
            {/* Header matching Yugantran Track Cards */}
            <div className="flex items-center justify-between mb-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110 group-hover:shadow-[0_0_15px_#00f0ff]"
                style={{
                  backgroundColor: `${cat.color}15`,
                  borderColor: `${cat.color}50`,
                }}
              >
                {cat.icon}
              </div>
              <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#00f0ff] bg-cyan-950/50 border border-cyan-500/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-[#00f0ff]" /> {cat.trackNumber}
              </span>
            </div>

            <h3 className="font-extrabold text-base text-white group-hover:text-[#00f0ff] transition-colors mb-1">
              {cat.title}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">
              {cat.subtitle}
            </p>

            {/* Skill Tags Styled as Cyber Pills */}
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, sidx) => (
                <span
                  key={sidx}
                  onMouseEnter={() => hudAudio.playHoverHum(480)}
                  className="px-2.5 py-1 rounded-full bg-[#04060b] border border-cyan-500/30 hover:border-[#00f0ff] hover:text-[#00f0ff] text-slate-300 text-xs font-mono transition-all cursor-default shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[10px] text-slate-400">
            <span>{cat.items.length} Production Technologies</span>
            <span className="text-[#00f0ff] font-bold group-hover:translate-x-1 transition-transform">
              [LAYER ONLINE]
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
