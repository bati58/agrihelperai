import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return setLoading(false);
        api
            .get('/api/auth/me')
            .then((r) => setUser(r.data))
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setLoading(false));
    }, []);

    // Listen for profile refresh events from Profile.jsx
    useEffect(() => {
        const handler = (e) => setUser(e.detail);
        window.addEventListener('auth:refresh', handler);
        return () => window.removeEventListener('auth:refresh', handler);
    }, []);

    const login = async (email, password) => {
        const r = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', r.data.token);
        setUser(r.data.user);
        return r.data.user;
    };

    const register = async (email, password, full_name) => {
        const r = await api.post('/api/auth/register', { email, password, full_name });
        localStorage.setItem('token', r.data.token);
        setUser(r.data.user);
        return r.data.user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);