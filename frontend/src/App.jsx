import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/3D/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Education from './components/Education';

import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
    const [showLoader, setShowLoader] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Check if loader has been shown before
        const loaderShown = sessionStorage.getItem('loaderShown');
        if (loaderShown) {
            setShowLoader(false);
        }

        // Handle scroll progress
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                <CustomCursor />

                {/* Particle Field */}
                <ParticleField />

                {/* Scroll Progress Bar */}
                <motion.div
                    className="scroll-progress"
                    style={{ width: `${scrollProgress}%` }}
                />

                {/* Navigation */}
                <Navbar />

                {/* Main Content */}
                <main className="main">
                    <Hero />
                    <About />
                    <Experience />
                    <TechStack />
                    <Projects />
                    <Education />

                    <Achievements />
                    <Contact />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </AnimatePresence>
    );
}

export default App;
