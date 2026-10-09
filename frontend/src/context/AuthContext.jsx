import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loginAdmin, verifyAdminToken } from '../api/adminApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('adminToken');
        setUser(null);
    }, []);

    const verifyToken = useCallback(async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const result = await verifyAdminToken();
            if (result.success) {
                setUser(result.user);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Session verification failed:', error.message);
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const result = await loginAdmin(username, password);
            if (result.success && result.token) {
                localStorage.setItem('adminToken', result.token);
                setUser(result.user);
                return { success: true };
            }
            return { success: false, message: 'Invalid credentials' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login request failed',
            };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
