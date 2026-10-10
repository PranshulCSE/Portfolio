import { useEffect, useRef, useState } from 'react';

const ParticleField = () => {
    const canvasRef = useRef(null);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        const checkMotionAndSize = () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isSmallScreen = window.innerWidth < 768;
            setIsEnabled(!prefersReducedMotion && !isSmallScreen);
        };

        checkMotionAndSize();
        window.addEventListener('resize', checkMotionAndSize, { passive: true });
        return () => window.removeEventListener('resize', checkMotionAndSize);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationId = 0;
        let isVisible = !document.hidden;
        let resizeTimeoutId;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvas();

        const handleResize = () => {
            window.clearTimeout(resizeTimeoutId);
            resizeTimeoutId = window.setTimeout(resizeCanvas, 150);
        };

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
            if (isVisible && !animationId) {
                lastTime = performance.now();
                animationId = requestAnimationFrame(animate);
            }
        };

        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

        // Generate subtle, lightweight particles
        const particleCount = Math.max(12, Math.min(24, Math.floor((width * height) / 65000)));

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
                this.y = initial ? Math.random() * height : Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 0.8;
                this.opacity = Math.random() * 0.35 + 0.15;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -10) this.x = width + 10;
                else if (this.x > width + 10) this.x = -10;
                if (this.y < -10) this.y = height + 10;
                else if (this.y > height + 10) this.y = -10;
            }

            draw() {
                ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = Array.from({ length: particleCount }, () => new Particle());

        let lastTime = performance.now();
        const fpsInterval = 1000 / 30; // Cap particle updates to smooth 30-40fps to save GPU/battery

        const animate = (currentTime) => {
            if (!isVisible) {
                animationId = 0;
                return;
            }

            animationId = requestAnimationFrame(animate);

            const elapsed = currentTime - lastTime;
            if (elapsed < fpsInterval) return;
            lastTime = currentTime - (elapsed % fpsInterval);

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            window.clearTimeout(resizeTimeoutId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isEnabled]);

    if (!isEnabled) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.6,
                transform: 'translateZ(0)',
                willChange: 'transform',
            }}
        />
    );
};

export default ParticleField;
