import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchPortfolioData } from '../api/portfolioApi';
import { portfolioData as localFallbackData } from '../constants/data';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
    // Start with localFallbackData for instant 0ms render without lag or blocking spinners
    const [portfolio, setPortfolio] = useState(localFallbackData);
    const [loading, setLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setIsSyncing(true);
        try {
            const response = await fetchPortfolioData();
            if (response && response.success && response.data) {
                // Ensure socials and fallback fields are preserved
                const mergedData = {
                    ...localFallbackData,
                    ...response.data,
                    personal: {
                        ...localFallbackData.personal,
                        ...(response.data.personal || {}),
                    },
                    socials: {
                        ...localFallbackData.socials,
                        ...(response.data.socials || {}),
                    },
                    about: {
                        ...localFallbackData.about,
                        ...(response.data.about || {}),
                    },
                    skills: {
                        ...localFallbackData.skills,
                        ...(response.data.skills || {}),
                    },
                };
                setPortfolio(mergedData);
                setError(null);
            }
        } catch (err) {
            // Keep local data seamlessly
            setError(err.response?.data?.message || err.message || null);
        } finally {
            setIsSyncing(false);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <PortfolioContext.Provider value={{ portfolio, loading, isSyncing, error, refreshData: loadData }}>
            {children}
        </PortfolioContext.Provider>
    );
};
