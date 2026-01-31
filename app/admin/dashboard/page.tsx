'use client';

import { useAuth } from '@/hooks/useAuth';

import { useRouter } from 'next/router';
import { Building2, LogOut, User, Settings } from 'lucide-react';
import ProtectedRoute from '@/components/admin/protected-route';

function DashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Steve's Realty</h1>
                                <p className="text-xs text-gray-500">Admin Dashboard</p>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">
                                        {user?.first_name} {user?.last_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.first_name}!
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Here's what's happening with your properties today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600">Total Properties</h3>
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">248</p>
                        <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600">Active Listings</h3>
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <Settings className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">142</p>
                        <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600">Total Agents</h3>
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">24</p>
                        <p className="text-sm text-green-600 mt-2">↑ 2 new this month</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600">Total Clients</h3>
                            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">1,284</p>
                        <p className="text-sm text-green-600 mt-2">↑ 18% from last month</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    New property listing added
                                </p>
                                <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    New agent registered
                                </p>
                                <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Property inquiry received
                                </p>
                                <p className="text-xs text-gray-500">3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <ProtectedRoute requireAdmin={true}>
            <DashboardContent />
        </ProtectedRoute>
    );
}