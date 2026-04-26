import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Loader.css';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 30;
            });
        }, 200);

        // Auto-complete after 2 seconds
        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setShow(false);
                onComplete?.();
            }, 300);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    if (!show) return null;

    return (
        <motion.div
            className="loader-container"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5 }}
        >
            <div className="loader-content">
                <motion.h1
                    className="loader-initials"
                    animate={{
                        textShadow: [
                            '-2px 0 #00d4ff, 2px 0 #7b2ff7',
                            '-2px 0 #7b2ff7, 2px 0 #00d4ff',
                            '2px 0 #00d4ff, -2px 0 #7b2ff7',
                            '2px 0 #7b2ff7, -2px 0 #00d4ff'
                        ]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                >
                    PT
                </motion.h1>
            </div>
            <div className="progress-bar">
                <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>
        </motion.div>
    );
};

export default Loader;
