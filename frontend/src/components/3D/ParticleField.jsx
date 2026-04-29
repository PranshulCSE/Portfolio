import { useEffect, useRef } from 'react';

const ParticleField = () => {
    const canvasRef = useRef();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 1024;
    const isDisabled = prefersReducedMotion || isSmallScreen;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (isDisabled) {
            return undefined;
        }

        const ctx = canvas.getContext('2d');
        let animationId;
        let isVisible = true;
        let resizeTimeoutId;
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        const resizeCanvas = () => {
            canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
            canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        };

        resizeCanvas();
        const handleResize = () => {
            window.clearTimeout(resizeTimeoutId);
            resizeTimeoutId = window.setTimeout(resizeCanvas, 120);
        };

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
            if (isVisible && !animationId) {
                animate();
            }
        };

        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

        // Particles
        const particles = [];
        const particleCount = Math.max(18, Math.min(30, Math.floor((window.innerWidth * window.innerHeight) / 50000)));

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!isVisible) {
                animationId = 0;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.clearTimeout(resizeTimeoutId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationId);
        };
    }, []);

    if (isDisabled) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.5,
            }}
        />
    );
};

export default ParticleField;
