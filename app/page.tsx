"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CheckCircle, Zap, Shield, Layout, ArrowRight, Sparkles, BarChart3, Users } from "lucide-react";
import HomeIcon from "@/components/ui/home-icon";
import Ribbons from "@/components/Ribbons";
import DotGrid from "@/components/DotGrid";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Aurora from "@/components/Aurora";
import { motion, easeInOut } from "framer-motion";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};



export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/board");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>

      <Ribbons />
      {/* for Navigation */}
      <nav className="sticky top-0 z-50 border-b border-transparent dark:border-white/5" style={{ background: 'var(--bg-primary)', backdropFilter: 'blur(12px)' }}>
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-primary">
              Task<span className="text-orange-500">Flow</span>
            </span>
          </div>



          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={() => router.push("/board")}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-all cursor-pointer"
              >
                Board
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Sign In
                </button>

              </>
            )}
            <AnimatedThemeToggler />
          </div>

        </div>
      </nav>

      <main className="flex-1">


        {/* Hero Section part from here */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-16 sm:pt-28 pb-16 text-center">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <DotGrid
              dotSize={5}
              gap={15}
              baseColor="#111111"
              activeColor="#e0421a"
              proximity={160}
              shockRadius={300}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </div>

          <motion.div className="relative z-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible">


            <motion.div variants={fadeUp} className="inline-flex z-20 items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 mb-8">
              <HomeIcon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-500 dark:text-orange-300">
                Built for productivity enthusiasts
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-primary">Manage tasks</span>
              <br />
              <span className="text-orange-500">with zero friction.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-8 text-secondary">
              TaskFlow is the lightning-fast, client-side task manager designed for focus.
              Drag, drop, organize, all your Tasks. No download, no excuses.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="group rounded-xl bg-orange-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-orange-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </motion.div>

            <motion.div variants={fadeUp}  className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
              {[
                { value: "100%", label: "Client-Side" },
                { value: "0ms", label: "Server Latency" },
                { value: "∞", label: "Tasks Supported" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-500">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-secondary mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>


        <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Everything you need to stay productive
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-secondary max-w-xl mx-auto">
              Powerful features packed into a sleek, modern interface
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layout className="w-6 h-6" />,
                title: "Kanban Board",
                desc: "Visual task management with drag-and-drop columns — To Do, Doing, and Done.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Search",
                desc: "Find any task in milliseconds with real-time search and smart filters.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Protected Access",
                desc: "Secure login with session persistence. Only authenticated users see the board.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Activity Tracking",
                desc: "Complete history of task creates, edits, moves, and deletions — all logged.",
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Persistent Storage",
                desc: "Browser localStorage keeps your data safe across refreshes. No backend needed.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Priority System",
                desc: "Tag tasks with Low, Medium, or High priority. Filter and sort in one click.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 transition-all hover:border-orange-500/40  cursor-pointer shadow-sm shadow-orange-400"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 text-orange-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>


        <section id="workflow" className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <Aurora
              colorStops={["#f06114", "#e6edef", "#d2c9f8"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          <div className="mx-auto max-w-5xl">

            <motion.div variants={fadeUp} className="z-10 text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                How it <span className="text-orange-500">works</span>
              </h2>
              <p className="mt-4 text-secondary">Three simple steps to organized productivity</p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Sign In",
                  desc: "Log in with hardcoded credentials. Your session persists in localStorage.",
                },
                {
                  step: "02",
                  title: "Create Tasks",
                  desc: "Add tasks with title, description, and priority. They appear in the To Do column.",
                },
                {
                  step: "03",
                  title: "Track Progress",
                  desc: "Drag tasks between columns, edit, delete, and watch your activity log grow.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="text-5xl font-extrabold text-orange-500 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>





        <motion.section variants={fadeUp} className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12" style={{ background: 'var(--bg-secondary)' }}>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                Ready to get <span className="text-orange-500">organized</span>?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-secondary mb-8 max-w-lg mx-auto">
                Start managing your tasks right now. No sign-up forms, no credit cards, no backend dependencies.
              </motion.p>
              <motion.button variants={fadeUp}
                onClick={handleGetStarted}
                className="group rounded-xl bg-orange-500 px-10 py-4 text-base font-semibold text-white hover:bg-orange-600 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                {isAuthenticated ? "Open Dashboard" : "Start Now — It's Free"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>


      <footer className="border-t border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 py-12 sm:py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-10">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                </div>
                <span className="text-3xl font-bold text-primary">TaskFlow</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                A lightweight, client-side task management board. Organize your workflow with drag-and-drop Kanban columns.
              </p>
            </div>


            <div>
              <h4 className="text-sm font-semibold text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-secondary hover:text-orange-500 transition-colors cursor-pointer">Features</a></li>
                <li><a href="#workflow" className="text-sm text-secondary hover:text-orange-500 transition-colors cursor-pointer">How it Works</a></li>
                <li><a href="#faq" className="text-sm text-secondary hover:text-orange-500 transition-colors cursor-pointer">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary mb-4">Built With</h4>
              <ul className="space-y-2">
                <li className="text-sm text-secondary">Next.js</li>
                <li className="text-sm text-secondary">React &amp; TypeScript</li>
                <li className="text-sm text-secondary">localStorage</li>
                <li className="text-sm text-secondary">dnd-kit</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © 2026 TaskFlow. All data stored locally in your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}