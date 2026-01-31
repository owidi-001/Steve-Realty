'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { USER_TYPES } from '@/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({
    children,
    requireAdmin = false
}: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            // Not authenticated - redirect to login
            if (!isAuthenticated) {
                router.push('/admin/login');
                return;
            }

            // Require admin role but user is not admin
            if (requireAdmin && user?.user_type !== USER_TYPES.ADMIN) {
                router.push('/unauthorized');
            }
        }
    }, [isAuthenticated, isLoading, user, requireAdmin, router]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children until authentication is verified
    if (!isAuthenticated || (requireAdmin && user?.user_type !== USER_TYPES.ADMIN)) {
        return null;
    }

    return <>{children}</>;
}