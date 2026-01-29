'use client';

import { Home, BarChart3, Building2, FileText, MapPin, Users, UserCheck, DollarSign, CreditCard, Award, MessageSquare, Settings, ChevronDown, Search, Bell, User, LogOut } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('dashboard');
    const [showUserMenu, setShowUserMenu] = useState(false);

    const navigation = [
        {
            section: 'Main',
            items: [
                { id: 'dashboard', name: 'Dashboard', icon: Home, badge: null },
                { id: 'analytics', name: 'Analytics', icon: BarChart3, badge: null },
            ]
        },
        {
            section: 'Listings',
            items: [
                { id: 'listings', name: 'All Listings', icon: Building2, badge: '248' },
                { id: 'categories', name: 'Categories', icon: FileText, badge: null },
                { id: 'locations', name: 'Locations', icon: MapPin, badge: null },
            ]
        },
        {
            section: 'Users & Agents',
            items: [
                { id: 'users', name: 'Users', icon: Users, badge: '1,240' },
                { id: 'agents', name: 'Agents', icon: UserCheck, badge: '84' },
                { id: 'offices', name: 'Offices', icon: Building2, badge: '12' },
            ]
        },
        {
            section: 'Financial',
            items: [
                { id: 'payments', name: 'Payments', icon: DollarSign, badge: '23' },
                { id: 'commissions', name: 'Commissions', icon: CreditCard, badge: null },
                { id: 'packages', name: 'Ad Packages', icon: Award, badge: null },
            ]
        },
        {
            section: 'Engagement',
            items: [
                { id: 'inquiries', name: 'Inquiries', icon: MessageSquare, badge: '45' },
                { id: 'reviews', name: 'Reviews', icon: Award, badge: '12' },
            ]
        },
        {
            section: 'System',
            items: [
                { id: 'settings', name: 'Settings', icon: Settings, badge: null },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-gray-200`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Steve's Realty</div>
                                <div className="text-xs text-gray-500">Admin</div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center mx-auto">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
                    {navigation.map((section) => (
                        <div key={section.section}>
                            {isSidebarOpen && (
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                                    {section.section}
                                </div>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activePage === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActivePage(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            {isSidebarOpen && (
                                                <>
                                                    <span className="flex-1 text-left text-sm font-medium">
                                                        {item.name}
                                                    </span>
                                                    {item.badge && (
                                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isActive
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                            }`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                    {isSidebarOpen ? (
                        <ChevronDown className="w-3 h-3 text-gray-600 rotate-90" />
                    ) : (
                        <ChevronDown className="w-3 h-3 text-gray-600 -rotate-90" />
                    )}
                </button>
            </aside>

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    {/* Search */}
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search listings, users, agents..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <div className="text-sm font-semibold text-gray-900">Admin User</div>
                                    <div className="text-xs text-gray-500">admin@stevesrealty.com</div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {/* Dropdown */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </a>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </a>
                                    <hr className="my-2 border-gray-200" />
                                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
