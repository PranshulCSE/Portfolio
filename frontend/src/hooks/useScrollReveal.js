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
                }
            },
            { threshold: 0.2 }
        );

        elementRef.current.style.opacity = '0';
        elementRef.current.style.transform = 'translateY(50px)';
        elementRef.current.style.transition = 'all 0.6s ease-out';

        observer.observe(elementRef.current);

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return elementRef;
};
