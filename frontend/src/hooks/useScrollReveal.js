import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transitionProperty = 'opacity, transform';
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        elementRef.current.style.opacity = '0';
        elementRef.current.style.transform = 'translateY(50px)';
        elementRef.current.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        elementRef.current.style.willChange = 'opacity, transform';

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return elementRef;
};
