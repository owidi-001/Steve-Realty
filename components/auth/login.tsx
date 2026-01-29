
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function LoginPage() {
    const { login, isLoggingIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ email, password });
            // Redirect to dashboard
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}