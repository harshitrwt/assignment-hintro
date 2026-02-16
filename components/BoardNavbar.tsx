"use client";

import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Layout, Search, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function BoardNavbar() {
    const { user, logout } = useAuth();
    const { dispatch } = useApp();
    const router = useRouter();
    const [searchFocused, setSearchFocused] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };
    const handleHome = () => {
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50  px-4 sm:px-6 py-3 flex items-center justify-between gap-4"
            style={{ background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(12px)' }}
        >
            <div className="flex items-center gap-3 flex-shrink-0">
                <div>
                    <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                </div>
                <span onClick={handleHome} className="text-lg font-bold cursor-pointer text-white">
                    Task<span className="text-orange-500">Flow</span>
                </span>
            </div>

            <div className={`relative flex-1 max-w-md transition-all ${searchFocused ? 'max-w-lg' : ''}`}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    style={{ background: 'var(--bg-card)' }}
                    onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800"
                    style={{ background: 'var(--bg-card)' }}
                >
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-neutral-300 hidden sm:block">{user?.email || "User"}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </nav>
    );
}
