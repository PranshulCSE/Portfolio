import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/Loader.css';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const next = prev + Math.random() * 25 + 10;
                return next >= 100 ? 100 : next;
            });
        }, 120);

        const timer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setShow(false);
                onCompleteRef.current?.();
            }, 250);
        }, 1200);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    if (!show) return null;

    return (
        <motion.div
            className="loader-container"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="loader-content">
                <h1 className="loader-initials gradient-text">
                    PT
                </h1>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                        transition: 'width 0.15s ease-out',
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Loader;
