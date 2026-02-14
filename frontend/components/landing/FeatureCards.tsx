"use client";

import React from "react";
import { motion } from "framer-motion";

type Feature = {
    title: string;
    description: string;
    icon: React.ReactNode;
    accent: string; // tailwind gradient classes
};

const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

function IconSparkle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 2l1.2 5.1L18 8.3l-4.2 2.4L12.6 16 12 13.2 7.2 12 12 10.8 12 2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M5 6l.7 2.1L8 9l-2.3.9L5 12l-.7-2.1L2 9l2.3-.9L5 6z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9L19 14z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconCart(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M6 6h15l-1.4 7.2a2 2 0 0 1-2 1.6H9.1a2 2 0 0 1-2-1.6L5.6 4.8A1.5 1.5 0 0 0 4.1 3.5H3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                stroke="currentColor"
                strokeWidth="1.6"
            />
        </svg>
    );
}

function IconChart(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M4 19V5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M4 19h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M7 15l3-3 3 2 5-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 8h2v2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const FEATURES: Feature[] = [
    {
        title: "Smart Grocery Habits",
        description:
            "Build lists that nudge you toward fresh, whole foods—without the guilt trip.",
        icon: <IconCart className="h-6 w-6" />,
        accent: "from-lime-400 via-emerald-400 to-sky-400",
    },
    {
        title: "Instant Suggestions",
        description:
            "Helpful swaps and add-ons that balance your cart in seconds.",
        icon: <IconSparkle className="h-6 w-6" />,
        accent: "from-pink-400 via-orange-300 to-yellow-300",
    },
    {
        title: "Weekly Insights",
        description:
            "See your fresh vs. processed ratio and small wins that compound over time.",
        icon: <IconChart className="h-6 w-6" />,
        accent: "from-sky-400 via-cyan-300 to-teal-300",
    },
];

export function FeatureCards() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="grid gap-5 md:grid-cols-3"
            >
                {FEATURES.map((f) => (
                    <motion.article
                        key={f.title}
                        variants={item}
                        whileHover={{ y: -6, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                    >
                        {/* animated gradient accent */}
                        <motion.div
                            aria-hidden
                            className={`absolute -top-16 left-0 right-0 h-28 bg-gradient-to-r ${f.accent} blur-2xl`}
                            initial={{ opacity: 0.5, x: -30 }}
                            whileHover={{ opacity: 0.9, x: 30 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 transition-colors duration-300" />

                        {/* subtle glow ring */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-black/10 dark:group-hover:ring-white/15" />

                        <div className="relative flex items-start gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-black/80 transition group-hover:bg-black/10 dark:bg-white/10 dark:text-white dark:group-hover:bg-white/15">
                                {f.icon}
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-base font-semibold tracking-tight text-black/90 dark:text-white">
                                    {f.title}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-black/65 dark:text-white/70">
                                    {f.description}
                                </p>
                            </div>
                        </div>

                        {/* little interactive footer */}
                        <div className="relative mt-4 flex items-center justify-between">
                            <span className="text-xs text-black/50 dark:text-white/55">
                                Learn more
                            </span>
                            <motion.span
                                className="text-xs font-medium text-black/70 dark:text-white/75"
                                initial={{ x: 0 }}
                                whileHover={{ x: 6 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}
