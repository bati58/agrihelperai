import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosClient';

/**
 * OAuthCallback — handles the redirect from Google OAuth.
 * The server redirects to /oauth-callback?token=...
 * This page stores the token, fetches the user, then redirects to /dashboard.
 */
export default function OAuthCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = params.get('token');
        if (!token) {
            navigate('/login?error=oauth');
            return;
        }
        localStorage.setItem('token', token);
        api.get('/api/auth/me')
            .then(r => {
                setUser(r.data);
                navigate('/dashboard');
            })
            .catch(() => {
                localStorage.removeItem('token');
                navigate('/login?error=oauth');
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Signing you in…</p>
            </div>
        </div>
    );
}
