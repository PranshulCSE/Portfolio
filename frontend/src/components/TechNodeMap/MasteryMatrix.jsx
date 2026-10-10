// src/components/TechNodeMap/MasteryMatrix.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, Terminal, Cpu, CheckCircle } from 'lucide-react';
import { hudAudio } from './audioSynthesizer';

export default function MasteryMatrix({ skills = {} }) {
  const categories = [
    {
      title: 'Languages & Core Logic',
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      color: '#6366F1',
      items: skills.languages || ['C++', 'Java', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
      subtitle: 'Algorithmic Problem Solving & Object-Oriented Design',
    },
    {
      title: 'Frontend Engineering',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      color: '#06B6D4',
      items: skills.frontend || ['React.js', 'Next.js', 'Tailwind CSS', 'Responsive UI', 'Framer Motion'],
      subtitle: 'Component Architectures, Concurrent Rendering & Reactive Stores',
    },
    {
      title: 'Backend & Infrastructure',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      color: '#10B981',
      items: skills.backend || ['Node.js', 'Express.js', 'REST API Architecture', 'JWT', 'bcrypt', 'Judge0 API'],
      subtitle: 'Event Loops, Middleware Pipelines & Secure Authentication Gateways',
    },
    {
      title: 'Persistence & Distributed Caching',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      color: '#F59E0B',
      items: skills.database || ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose ODM'],
      subtitle: 'Aggregations, Compound Indexing, ACID Guarantees & Sub-Millisecond Caching',
    },
    {
      title: 'DSA & Computer Science',
      icon: <Terminal className="w-5 h-5 text-violet-400" />,
      color: '#8B5CF6',
      items: skills.dsaCS || ['Problem Solving (325+ Solved)', 'Time Complexity O(log N)', 'Dynamic Programming', 'Graph Theory', 'Trie & Trees'],
      subtitle: 'LeetCode & GeeksforGeeks Verified Practice with 100-Day Streak',
    },
    {
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
          whileHover={{ y: -5 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          style={{
            boxShadow: `0 4px 20px -10px ${cat.color}30`,
          }}
        >
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${cat.color}15`,
                  borderColor: `${cat.color}40`,
                }}
              >
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{cat.title}</h3>
                <p className="text-[10px] text-slate-400">{cat.items.length} Technologies</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">
              {cat.subtitle}
            </p>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, sidx) => (
                <span
                  key={sidx}
                  onMouseEnter={() => hudAudio.playHoverHum(480)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 text-slate-200 text-xs font-mono transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px]">
            <span className="text-slate-500">LAYER STATUS:</span>
            <span
              className="font-bold flex items-center gap-1"
              style={{ color: cat.color }}
            >
              <CheckCircle className="w-3 h-3" /> PRODUCTION READY
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
