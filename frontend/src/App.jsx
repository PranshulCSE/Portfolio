import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import ParticleField from './components/3D/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './index.css';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
    const [showLoader, setShowLoader] = useState(true);
    const scrollProgressRef = useRef(null);

    useEffect(() => {
        const loaderShown = sessionStorage.getItem('loaderShown');
        if (loaderShown) {
            setShowLoader(false);
        }

        let animationFrameId = 0;

        const updateScrollProgress = () => {
            if (animationFrameId) {
                return;
            }

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
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    const handleLoaderComplete = () => {
        sessionStorage.setItem('loaderShown', 'true');
        setShowLoader(false);
    };

    return (
        <AnimatePresence>
            <div className="app">
                {/* Loader */}
                {showLoader && <Loader onComplete={handleLoaderComplete} />}

                {/* Cursor */}
                {/* Particle Field */}
                <ParticleField />

                {/* Scroll Progress Bar */}
                <motion.div className="scroll-progress" ref={scrollProgressRef} />

                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main className="main">
                    <Hero />
                    <Suspense fallback={null}>
                        <About />
                        <Experience />
                        <TechStack />
                        <Projects />
                        <Education />
                        <Achievements />
                        <Contact />
                        <Footer />
                    </Suspense>
                </main>
            </div>
        </AnimatePresence>
    );
}

export default App;
