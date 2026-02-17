"use client";

import { Layout } from "lucide-react";

export default function BoardFooter() {
    return (
        <footer className="border-t border-neutral-800 px-4 sm:px-6 py-5 flex items-center justify-between"
            style={{ background: 'var(--bg-secondary)' }}
        >
            <div className="flex items-center gap-2">
                <div>
                    <img src="/logo.png" alt="Logo" className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-neutral-400">TaskFlow</span>
            </div>
            <p className="text-sm text-neutral-500">
                © 2026 TaskFlow &middot; All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-neutral-500">
                <a href="#" className="hover:text-orange-500 transition-colors cursor-pointer">GitHub</a>
                <a href="#" className="hover:text-orange-500 transition-colors cursor-pointer">Privacy</a>
            </div>
        </footer>
    );
}
