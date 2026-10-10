// src/components/TechNodeMap/techConfig.jsx
import React from 'react';

const assetBase = typeof window !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/';

export const CATEGORIES = {
  FOUNDATION: { label: "Foundational Systems", color: "#6366F1", tag: "SYS_CORE" },
  FRONTEND: { label: "Frontend Layer", color: "#06B6D4", tag: "UI_LAYER" },
  BACKEND: { label: "Infrastructure Core", color: "#10B981", tag: "SRV_RUN" },
  DATABASE: { label: "Persistence Layer", color: "#F59E0B", tag: "DATA_ST" },
  CLOUD: { label: "Cloud Ecosystem", color: "#EC4899", tag: "OPS_DIST" },
};

// Flagship Projects registry for Hologram Previews
export const FLAGSHIP_PROJECTS = {
  GTECH_CODE: {
    id: "gtech-code",
    title: "GTECH Code",
    tagline: "AI-Augmented Competitive Online Judge Platform",
    description: "Multi-language online judge integrating Judge0 API, real-time code execution, Redis caching, and JWT authentication with an AI code assistant.",
    image: `${assetBase}assets/Projects/Gtech_Code.png`,
    metrics: ["40% Latency Drop (Redis)", "Multi-Lang Judge0", "325+ Algorithms Tested"],
    tags: ["MERN Stack", "Redis", "Judge0 API", "Docker", "JWT", "AI"],
    github: "https://github.com/PranshulCSE/gtech-code",
    live: null
  },
  KAIZEN_AI: {
    id: "kaizen-ai",
    title: "Kaizen - AI Resume Optimizer",
    tagline: "Generative AI Resume Parser & ATS Matcher",
    description: "Next.js & React centerpiece platform that analyzes resumes against job descriptions, runs semantic similarity embeddings, and streams feedback.",
    image: `${assetBase}assets/Projects/Gtech_Code.png`, // fallback or custom preview
    metrics: ["Next.js SSR Hydration", "Real-time AI Stream", "< 12ms Parsing"],
    tags: ["Next.js", "React.js", "Tailwind CSS", "Generative AI", "Node.js"],
    github: "https://github.com/PranshulCSE",
    live: null
  },
  SAJSSM: {
    id: "sajssm",
    title: "SAJSSM - Official Society Portal",
    tagline: "High-Traffic Community & Governance Platform",
    description: "Automated 5+ manual operations, reducing administrative workload by 50% while improving visitor engagement by 35% with 15+ feature releases.",
    image: `${assetBase}assets/Projects/SAJSSM.png`,
    metrics: ["35% ↑ Engagement", "50% ↓ Workload", "15+ Releases"],
    tags: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/PranshulCSE/Shri_Amarnath_Janshakti_Website.git",
    live: "https://shriamarnathjanshakti.app/"
  },
  ECOMMERCE: {
    id: "ecommerce",
    title: "E-Commerce Micro-Engine",
    tagline: "Scalable Full-Stack Store & Payment Gateway",
    description: "Dynamic catalog, cart state machines, and Razorpay API integration with resilient order fulfillment pipelines.",
    image: `${assetBase}assets/Projects/ECommerce.png`,
    metrics: ["Razorpay Webhooks", "Zero-Drift Inventory", "RESTful Schemas"],
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Razorpay"],
    github: "https://github.com/PranshulCSE/E-Commerce-Full-Stack-Web-Application-.git",
    live: null
  }
};

export const CORE_ENGINE_NODE = {
  id: "core-engine",
  title: "CORE ENGINE",
  subtitle: "AI & FULL-STACK REACTOR",
  brandColor: "#06B6D4",
  secondaryColor: "#8B5CF6",
  category: "REACTOR",
  telemetry: {
    status: "OPTIMAL",
    code: "[SYS_CORE::ONLINE]",
    logStream: [
      "[INITIALIZED] Hybrid Neural & Full-Stack Core Engine active.",
      "[TELEMETRY] 12 Distributed Sub-Nodes Linked // Zero Packet Loss.",
      "[STATE] Orchestrating SSR workflows, distributed caches & AI pipelines.",
      "[STATUS] Select any satellite node to stream live architecture telemetry."
    ],
    metrics: { uptime: "99.98%", load: "18.4%", latency: "1.2ms", throughput: "4.8 Gbps" },
    projectRef: "Portfolio Neural Architecture v4.8",
    projectKey: "GTECH_CODE"
  }
};

export const TECH_NODES = [
  // ── Foundational Systems ──────────────────────────────────────────
  {
    id: "cpp",
    name: "C++",
    category: "FOUNDATION",
    categoryKey: "FOUNDATIONAL SYSTEMS",
    brandColor: "#00599C",
    glowColor: "rgba(0, 89, 156, 0.45)",
    coords: { x: 22, y: 24 },
    mobileOrder: 1,
    badge: "Native / Low-Level",
    hasBenchmark: true,
    benchmarkType: "BINARY_SEARCH",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#00599C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0,89,156,0.15)"/>
        <path d="M9.5 9.5a3.5 3.5 0 1 0 0 5M15.5 12h3M17 10.5v3M19.5 12h3M21 10.5v3" stroke="#61AFEF" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    telemetry: {
      status: "COMPILED",
      code: "[LOW_LEVEL::EXEC]",
      logStream: [
        "[COMPILED] Target Architecture: x86_64 // Direct Memory Pointer Management.",
        "[PERF] RAII-compliant structures with zero-cost abstractions active.",
        "[BENCH] Algorithmic execution latency minimized to sub-millisecond precision."
      ],
      metrics: { executionSpeed: "0.14ms", memoryFootprint: "4.2MB", threads: "Multi-Threaded" },
      projectRef: "High-Performance Computational Subroutines",
      projectKey: "GTECH_CODE"
    }
  },
  {
    id: "dsa",
    name: "DSA",
    fullName: "Data Structures & Algorithms",
    category: "FOUNDATION",
    categoryKey: "FOUNDATIONAL SYSTEMS",
    brandColor: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.45)",
    coords: { x: 34, y: 16 },
    mobileOrder: 2,
    badge: "O(log N) Focus",
    hasBenchmark: true,
    benchmarkType: "BINARY_SEARCH",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="5" r="3" stroke="#6366F1" strokeWidth="1.8" fill="rgba(99, 102, 241, 0.2)"/>
        <circle cx="5" cy="18" r="3" stroke="#818CF8" strokeWidth="1.8" fill="rgba(99, 102, 241, 0.2)"/>
        <circle cx="19" cy="18" r="3" stroke="#818CF8" strokeWidth="1.8" fill="rgba(99, 102, 241, 0.2)"/>
        <path d="M10 7.5L6.5 15.5M14 7.5L17.5 15.5" stroke="#A5B4FC" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
    telemetry: {
      status: "SUCCESS",
      code: "[METRICS_PARSED]",
      logStream: [
        "[SUCCESS] Metrics parsed // Solved 325+ Algorithms on LeetCode & HackerRank.",
        "[ANALYTICS] Core Complexity Target: O(log N) for Search & Tree Traversal routines.",
        "[VALIDATION] High-efficiency Dynamic Programming, Graph Theory & Trie pipelines."
      ],
      metrics: { problemsSolved: "325+", rankPercentile: "Top 4.8%", primaryComplexity: "O(log N)" },
      projectRef: "Foundation Layer for Competitive Logic",
      projectKey: "GTECH_CODE"
    }
  },

  // ── Frontend Layer ────────────────────────────────────────────────
  {
    id: "react",
    name: "React.js",
    category: "FRONTEND",
    categoryKey: "FRONTEND LAYER",
    brandColor: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.45)",
    coords: { x: 74, y: 22 },
    mobileOrder: 3,
    badge: "Virtual DOM v18+",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      </svg>
    ),
    telemetry: {
      status: "DEPLOYED",
      code: "[UI_ARCHITECTURE]",
      logStream: [
        "[DEPLOYED] Parsing UI Architecture // Reactive Concurrent Rendering active.",
        "[STATE] Mapping custom react hook states, memoized selectors & context stores.",
        "[SHOWCASE] Centerpiece UI framework for 'Kaizen (Generative AI Resume Optimizer)'."
      ],
      metrics: { renderBudget: "< 16ms (60FPS)", vDomDiff: "Optimized", concurrentMode: "Active" },
      projectRef: "Kaizen - AI Resume Optimizer",
      projectKey: "KAIZEN_AI"
    }
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "FRONTEND",
    categoryKey: "FRONTEND LAYER",
    brandColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.4)",
    coords: { x: 86, y: 38 },
    mobileOrder: 4,
    badge: "App Router / SSR",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="1.6" fill="rgba(255,255,255,0.06)"/>
        <path d="M8 8v8M16 8v8l-8-8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    telemetry: {
      status: "STREAMING",
      code: "[SSR_ENGINE]",
      logStream: [
        "[STREAMING] Initiating Next.js App Router SSR & Edge API Runtime workflows.",
        "[EDGE] Hydration overhead reduced by 65% using Server Components.",
        "[ROUTING] Dynamic route prefetching and incremental static regeneration active."
      ],
      metrics: { TTFB: "42ms", lighthouseScore: "99/100", caching: "Full ISR" },
      projectRef: "Kaizen - AI Resume Optimizer",
      projectKey: "KAIZEN_AI"
    }
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "FRONTEND",
    categoryKey: "FRONTEND LAYER",
    brandColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    coords: { x: 82, y: 64 },
    mobileOrder: 5,
    badge: "JIT Engine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M6 12c.5-2 2-3.5 4.5-3.5 3.5 0 4 2.5 6 2.5s3-.5 3.5-2.5c-.5 2-2 3.5-4.5 3.5-3.5 0-4-2.5-6-2.5S6.5 10 6 12zM2 17c.5-2 2-3.5 4.5-3.5 3.5 0 4 2.5 6 2.5s3-.5 3.5-2.5c-.5 2-2 3.5-4.5 3.5-3.5 0-4-2.5-6-2.5S2.5 15 2 17z" stroke="#38BDF8" strokeWidth="1.8" fill="rgba(56, 189, 248, 0.15)"/>
      </svg>
    ),
    telemetry: {
      status: "STYLED",
      code: "[CSS_ENGINE]",
      logStream: [
        "[STYLED] JIT compilation generating sub-10kB critical CSS bundles.",
        "[AESTHETICS] Precision design token mapping for futuristic dark HUD themes.",
        "[RESPONSIVE] Multi-breakpoint adaptive scaling with fluid clamp() functions."
      ],
      metrics: { bundleSize: "8.4 kB", compileTime: "12ms", gpuLayers: "Composited" },
      projectRef: "SAJSSM Society Portal",
      projectKey: "SAJSSM"
    }
  },

  // ── Infrastructure Core ───────────────────────────────────────────
  {
    id: "nodejs",
    name: "Node.js",
    category: "BACKEND",
    categoryKey: "INFRASTRUCTURE CORE",
    brandColor: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.45)",
    coords: { x: 68, y: 82 },
    mobileOrder: 6,
    badge: "Event Loop v20",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" stroke="#22C55E" strokeWidth="1.6" fill="rgba(34, 197, 94, 0.12)"/>
        <path d="M12 7v10M7.5 9.5l9 5M7.5 14.5l9-5" stroke="#4ADE80" strokeWidth="1.4"/>
      </svg>
    ),
    telemetry: {
      status: "CONTAINERIZED",
      code: "[EVENT_LOOP::ACTIVE]",
      logStream: [
        "[CONTAINERIZED] Isolated async microservices spinning up on Node.js v20 runtime.",
        "[EVENT] Non-blocking I/O multiplexer handling concurrent socket payloads.",
        "[INTEGRATION] Initializing Judge0 API and generative model stream pipelines."
      ],
      metrics: { eventLoopLag: "< 1.5ms", activeHandles: "1,240", memoryRSS: "48MB" },
      projectRef: "GTECH Code Judge & Microservice Engine",
      projectKey: "GTECH_CODE"
    }
  },
  {
    id: "express",
    name: "Express.js",
    category: "BACKEND",
    categoryKey: "INFRASTRUCTURE CORE",
    brandColor: "#A3E635",
    glowColor: "rgba(163, 230, 53, 0.4)",
    coords: { x: 50, y: 88 },
    mobileOrder: 7,
    badge: "Middleware Stack",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#A3E635" strokeWidth="1.8" fill="rgba(163, 230, 53, 0.1)"/>
        <path d="M7 9l5 3-5 3M14 15h3" stroke="#A3E635" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    telemetry: {
      status: "ROUTING",
      code: "[MIDDLEWARE::CHAIN]",
      logStream: [
        "[ROUTING] RESTful endpoint routers and JWT authentication interceptors online.",
        "[SECURITY] Helmet, rate-limiter, and sanitize middleware pipelines operational.",
        "[ERROR] Global fault-tolerant error boundaries capturing unhandled exceptions."
      ],
      metrics: { throughput: "9,800 req/s", errorRate: "0.001%", avgResponse: "4.8ms" },
      projectRef: "E-Commerce Platform Backend",
      projectKey: "ECOMMERCE"
    }
  },
  {
    id: "restapi",
    name: "REST APIs",
    category: "BACKEND",
    categoryKey: "INFRASTRUCTURE CORE",
    brandColor: "#14B8A6",
    glowColor: "rgba(20, 184, 166, 0.4)",
    coords: { x: 32, y: 84 },
    mobileOrder: 8,
    badge: "OpenAPI 3.0",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="8" cy="7" r="2" fill="#2DD4BF"/>
        <circle cx="16" cy="12" r="2" fill="#2DD4BF"/>
        <circle cx="10" cy="17" r="2" fill="#2DD4BF"/>
      </svg>
    ),
    telemetry: {
      status: "SYNCHRONIZED",
      code: "[API_CONTRACT]",
      logStream: [
        "[SYNCHRONIZED] Deterministic JSON schemas validated via Zod payloads.",
        "[CACHE] ETag HTTP headers generating 304 Not Modified cache hits.",
        "[ENDPOINTS] 24 Custom endpoints powering portfolio data sync and analytics."
      ],
      metrics: { p99Latency: "18ms", serialization: "Fast-JSON", protocol: "HTTP/2 & HTTPS" },
      projectRef: "Real-time Telemetry & Data Layer",
      projectKey: "SAJSSM"
    }
  },

  // ── Persistence Layer ─────────────────────────────────────────────
  {
    id: "mongodb",
    name: "MongoDB",
    category: "DATABASE",
    categoryKey: "PERSISTENCE LAYER",
    brandColor: "#10AA50",
    glowColor: "rgba(16, 170, 80, 0.45)",
    coords: { x: 18, y: 68 },
    mobileOrder: 9,
    badge: "NoSQL / Document",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2C8.5 7 6 11 6 15a6 6 0 0 0 12 0c0-4-2.5-8-6-13z" stroke="#10AA50" strokeWidth="1.8" fill="rgba(16, 170, 80, 0.15)"/>
        <path d="M12 2v20" stroke="#4ADE80" strokeWidth="1.4"/>
      </svg>
    ),
    telemetry: {
      status: "CONNECTED",
      code: "[DOC_STORE::ONLINE]",
      logStream: [
        "[CONNECTED] MongoDB Atlas cluster replica set healthy (PRIMARY node 0).",
        "[INDEX] Compound index execution with covered aggregation pipeline queries.",
        "[ODM] Mongoose strict schema validation ensuring ACID transactions."
      ],
      metrics: { queryTime: "2.1ms", storageEngine: "WiredTiger", replicaLag: "0ms" },
      projectRef: "SAJSSM Society Portal",
      projectKey: "SAJSSM"
    }
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "DATABASE",
    categoryKey: "PERSISTENCE LAYER",
    brandColor: "#336791",
    glowColor: "rgba(51, 103, 145, 0.45)",
    coords: { x: 12, y: 46 },
    mobileOrder: 10,
    badge: "Relational / ACID",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3C7 3 4 6.5 4 11c0 3.5 2 7 5 9 1-1.5 1-3.5 1-5h4c0 1.5 0 3.5 1 5 3-2 5-5.5 5-9 0-4.5-3-8-8-8z" stroke="#336791" strokeWidth="1.8" fill="rgba(51, 103, 145, 0.15)"/>
        <circle cx="9" cy="9" r="1.2" fill="#60A5FA"/>
        <circle cx="15" cy="9" r="1.2" fill="#60A5FA"/>
      </svg>
    ),
    telemetry: {
      status: "CONSISTENT",
      code: "[SQL_ENGINE::ISOLATION]",
      logStream: [
        "[CONSISTENT] Serialized transaction isolation level verified.",
        "[RELATIONAL] Foreign key constraints, CTEs & JSONB columnar data active.",
        "[CONNECTION] Connection pooler scaling concurrent workers seamlessly."
      ],
      metrics: { poolHealth: "100%", bufferHitRatio: "99.4%", WAL_Status: "Synchronized" },
      projectRef: "Enterprise Analytical Storage",
      projectKey: "GTECH_CODE"
    }
  },
  {
    id: "redis",
    name: "Redis",
    category: "DATABASE",
    categoryKey: "PERSISTENCE LAYER",
    brandColor: "#DC382D",
    glowColor: "rgba(220, 56, 45, 0.45)",
    coords: { x: 24, y: 38 },
    mobileOrder: 11,
    badge: "In-Memory Cache",
    hasBenchmark: true,
    benchmarkType: "CACHE_SIM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3l9 4.5v9L12 21 3 16.5v-9L12 3z" stroke="#DC382D" strokeWidth="1.6" fill="rgba(220, 56, 45, 0.15)"/>
        <path d="M3 7.5l9 4.5 9-4.5M12 12v9" stroke="#F87171" strokeWidth="1.4"/>
      </svg>
    ),
    telemetry: {
      status: "OPTIMIZED",
      code: "[CACHE_LAYER::HIT]",
      logStream: [
        "[OPTIMIZED] Verifying pipeline telemetry // Database caching layers established.",
        "[SPEED] Achieved 40% latency reduction via Redis hash structures & TTL invalidation.",
        "[FEATURE] Backend infrastructure for 'GTECH Code (Competitive Programming Platform)'."
      ],
      metrics: { cacheHitRate: "94.2%", latency: "0.4ms", memoryUsed: "64MB" },
      projectRef: "GTECH Code (Competitive Platform)",
      projectKey: "GTECH_CODE"
    }
  },

  // ── Cloud Ecosystem ───────────────────────────────────────────────
  {
    id: "aws",
    name: "AWS Cloud",
    category: "CLOUD",
    categoryKey: "CLOUD ECOSYSTEM",
    brandColor: "#FF9900",
    glowColor: "rgba(255, 153, 0, 0.45)",
    coords: { x: 50, y: 12 },
    mobileOrder: 12,
    badge: "S3 / EC2 / Lambda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M6 14.5a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.5 1.5 4 4 0 0 1 1 7.5H6z" stroke="#FF9900" strokeWidth="1.8" fill="rgba(255, 153, 0, 0.15)"/>
        <path d="M7 17.5c3 2 7 2 10 0M17 17l.5 1.5M17 17l-1.5.5" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    telemetry: {
      status: "PROVISIONED",
      code: "[CLOUD_FABRIC::ONLINE]",
      logStream: [
        "[PROVISIONED] Multi-AZ resilient cloud infrastructure configured.",
        "[STORAGE] High-throughput S3 asset pipelines and IAM least-privilege security.",
        "[SERVERLESS] Lambda event-driven triggers handling background tasks."
      ],
      metrics: { availability: "99.99%", cloudRegions: "ap-south-1", egress: "Optimized" },
      projectRef: "Production Cloud Pipeline",
      projectKey: "GTECH_CODE"
    }
  },
  {
    id: "docker",
    name: "Docker",
    category: "CLOUD",
    categoryKey: "CLOUD ECOSYSTEM",
    brandColor: "#2496ED",
    glowColor: "rgba(36, 150, 237, 0.45)",
    coords: { x: 68, y: 16 },
    mobileOrder: 13,
    badge: "Containerization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="4" y="9" width="3" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="8" y="9" width="3" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="9" width="3" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="8" y="5.5" width="3" height="3" rx="0.5" fill="#2496ED"/>
        <rect x="12" y="5.5" width="3" height="3" rx="0.5" fill="#2496ED"/>
        <path d="M2 13c1 4 4.5 7 10 7s9-3 10-7c-1-1-3-1-4 0-1.5 1.5-3.5 1.5-5 0-1.5-1.5-3.5-1.5-5 0-1.5 1.5-3.5 1.5-5 0-.5-.5-1-.5-1 0z" stroke="#2496ED" strokeWidth="1.6" fill="rgba(36, 150, 237, 0.12)"/>
      </svg>
    ),
    telemetry: {
      status: "ORCHESTRATED",
      code: "[CONTAINER::RUNNING]",
      logStream: [
        "[ORCHESTRATED] Multi-stage lightweight Alpine Linux images built.",
        "[MICROSERVICES] Isolated microservices spinning up with deterministic networking.",
        "[JUDGE] Initializing Judge0 sandbox execution containers securely."
      ],
      metrics: { imageSize: "42MB", startDuration: "0.4s", isolation: "Full cgroups" },
      projectRef: "Judge0 Sandbox Containers",
      projectKey: "GTECH_CODE"
    }
  },
  {
    id: "github",
    name: "GitHub / CI-CD",
    category: "CLOUD",
    categoryKey: "CLOUD ECOSYSTEM",
    brandColor: "#F3F4F6",
    glowColor: "rgba(243, 244, 246, 0.4)",
    coords: { x: 88, y: 52 },
    mobileOrder: 14,
    badge: "Workflows / VCS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" stroke="#F3F4F6" strokeWidth="1.2" fill="rgba(255,255,255,0.12)"/>
      </svg>
    ),
    telemetry: {
      status: "AUTOMATED",
      code: "[CI_CD::PIPELINE]",
      logStream: [
        "[AUTOMATED] GitHub Actions workflow triggers on push to main branch.",
        "[LINT] ESLint, Prettier, and Jest test suites passing with 100% green status.",
        "[DEPLOY] Automatic webhook deployment to production Vercel & Cloud clusters."
      ],
      metrics: { buildTime: "38s", testPassRate: "100%", branchesProtected: "true" },
      projectRef: "Automated Deployment Engine",
      projectKey: "GTECH_CODE"
    }
  }
];
