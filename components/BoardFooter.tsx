"use client";

import { Layout } from "lucide-react";

export default function BoardFooter() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 py-5 flex items-center justify-between"
            style={{ background: 'var(--bg-secondary)' }}
        >
            <div className="flex items-center gap-2">
                <div>
                    <img src="/logo.png" alt="Logo" className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-secondary">TaskFlow</span>
            </div>
            <p className="text-sm text-secondary">
                © 2026 TaskFlow &middot; All rights reserved.
            </p>
        </footer>
    );
}
