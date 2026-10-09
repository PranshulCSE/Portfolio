import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchPortfolioData } from '../api/portfolioApi';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchPortfolioData();
            if (response.success) {
                setPortfolio(response.data);
            } else {
                setError('Failed to fetch portfolio data');
            }
        } catch (err) {
            console.error('Portfolio data fetch failed:', err.message);
            setError(err.response?.data?.message || err.message || 'Failed to connect to backend server');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <PortfolioContext.Provider value={{ portfolio, loading, error, refreshData: loadData }}>
            {children}
        </PortfolioContext.Provider>
    );
};
