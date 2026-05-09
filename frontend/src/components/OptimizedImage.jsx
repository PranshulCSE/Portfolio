import { useState } from 'react';

const defaultFallbackSrc = `${import.meta.env.BASE_URL}assets/Images/Profile2.png`;

const OptimizedImage = ({
    src,
    alt,
    className,
    fallbackSrc = defaultFallbackSrc,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority,
    width,
    height,
    sizes,
    style,
    ...rest
}) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasFallbackError, setHasFallbackError] = useState(false);

    const handleError = () => {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            return;
        }

        setHasFallbackError(true);
    };

    if (hasFallbackError) {
        return (
            <div
                className={className}
                role="img"
                aria-label={alt}
                style={style}
                {...rest}
            />
        );
    }

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            loading={loading}
            decoding={decoding}
            fetchpriority={fetchPriority}
            width={width}
            height={height}
            sizes={sizes}
            style={style}
            onError={handleError}
            {...rest}
        />
    );
};

export default OptimizedImage;
