"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Layout, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import DotGrid from "./DotGrid";
import { useTheme } from "@/context/ThemeContext";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dotColor = theme === "dark" ? "#111111" : "#e5e5e5";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    const success = login(email, password, rememberMe);

    if (!success) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/board");
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center bg-center bg-cover"
        style={{
          backgroundColor: '#111',
          backgroundImage:
            "url('https://i.pinimg.com/1200x/c1/bd/a4/c1bda4431b85a0ff175e0e9105ab273d.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-85"></div>
        <div className="relative z-10 text-center px-12 max-w-lg">
          <div>
            <img src="/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Task<span className="text-orange-500">Flow</span>
          </h1>
          <p className="text-neutral-400 text-md leading-relaxed mb-8">
            Your personal Kanban board. Organize tasks, track progress, and stay productive, all in your browser.
          </p>

          <div className="space-y-4 text-left">
            {[
              "Drag & drop feature for each task managment ",
              "Real-time search & filtering based on priority of tasks",
              "Activity logging & tracking info about task movements",
              "Persistent local storage to activity logs across sessions",
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                </div>
                <span className="text-sm text-neutral-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DotGrid
            dotSize={3}
            gap={15}
            baseColor={dotColor}
            activeColor="#e0421a"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="relative z-10 w-full max-w-md">

          <div className="lg:hidden flex items-center gap-3 mb-10 z-10">

            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">
              Task<span className="text-orange-500">Flow</span>
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-primary">Welcome back</h2>
            <p className="text-secondary">
              Sign in to continue managing your tasks
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  placeholder="intern@demo.com"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-primary placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  style={{ background: 'var(--bg-secondary)' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="intern123"
                  className="w-full h-12 pl-10 pr-12 rounded-xl border border-neutral-200 dark:border-neutral-700 text-primary placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  style={{ background: 'var(--bg-secondary)' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>



            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-secondary cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="z-50 rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-xs text-orange-600 dark:text-orange-300">
              <strong>Demo Credentials:</strong> intern@demo.com / intern123
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full h-12 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-secondary hover:text-orange-500 transition-colors cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
