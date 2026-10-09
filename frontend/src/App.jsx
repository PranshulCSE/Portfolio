import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ParticleField from './components/3D/ParticleField';
import ConnectToggle from './components/ConnectToggle';
import { useAuth } from './hooks/useAuth';

import './index.css';
import './styles/Admin.css';

// Lazy load public pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Page loading skeleton
const PageFallback = () => (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="gradient-text" style={{ fontFamily: 'JetBrains Mono', fontSize: '1rem' }}>
            Loading...
        </div>
    </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <PageFallback />;
    if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
    return children;
};

// Admin layout — no Navbar, no toggle, no particles
const AdminLayout = ({ children }) => (
    <div style={{ minHeight: '100vh' }}>
        <Suspense fallback={<PageFallback />}>
            {children}
        </Suspense>
    </div>
);

// Public layout — with Navbar, ParticleField, scroll progress, connect toggle
const PublicLayout = () => {
    const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem('loaderShown'));
    const scrollProgressRef = useRef(null);

    useEffect(() => {
        let animationFrameId = 0;

        const updateScrollProgress = () => {
            if (animationFrameId) return;
            animationFrameId = window.requestAnimationFrame(() => {
                animationFrameId = 0;
                const progressBar = scrollProgressRef.current;
                if (!progressBar) return;
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
                progressBar.style.transform = `scaleX(${scrollPercent})`;
            });
        };

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress, { passive: true });
        updateScrollProgress();

        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
            window.removeEventListener('resize', updateScrollProgress);
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleLoaderComplete = () => {
        sessionStorage.setItem('loaderShown', 'true');
        setShowLoader(false);
    };

    return (
        <div className="app">
            {/* Loader (first visit only) */}
            <AnimatePresence>
                {showLoader && <Loader onComplete={handleLoaderComplete} />}
            </AnimatePresence>

            {/* Background Particles */}
            <ParticleField />

            {/* Scroll Progress Bar */}
            <motion.div className="scroll-progress" ref={scrollProgressRef} />

            {/* Navbar */}
            <Navbar />

            {/* Main page content */}
            <main className="main" style={{ paddingTop: '80px' }}>
                <Suspense fallback={<PageFallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/achievements" element={<AchievementsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </Suspense>
            </main>

            {/* Floating "Connect with Me" Toggle */}
            <ConnectToggle />
        </div>
    );
};

function App() {
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'rgba(12, 18, 34, 0.95)',
                        color: '#f1f5f9',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        backdropFilter: 'blur(12px)',
                    },
                    success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                    error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
                }}
            />

            <Routes>
                {/* Admin routes */}
                <Route path="/admin/login" element={
                    <AdminLayout>
                        <AdminLogin />
                    </AdminLayout>
                } />
                <Route path="/admin" element={
                    <AdminLayout>
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    </AdminLayout>
                } />

                {/* All public routes rendered inside PublicLayout */}
                <Route path="/*" element={<PublicLayout />} />
            </Routes>
        </>
    );
}

export default App;
