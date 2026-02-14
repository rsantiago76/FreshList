"use client";

import { motion } from "framer-motion";
import { Sparkles, ShoppingCart, BarChart3 } from "lucide-react";

const features = [
    {
        title: "Smart Grocery Habits",
        description:
            "Build lists that nudge you toward fresh, whole foods — without calorie obsession.",
        icon: ShoppingCart,
        gradient: "from-mint-400 via-emerald-300 to-lime-300",
    },
    {
        title: "Instant Suggestions",
        description:
            "Helpful swaps and balance insights that adjust your week in seconds.",
        icon: Sparkles,
        gradient: "from-lime-300 via-yellow-200 to-orange-200",
    },
    {
        title: "Weekly Insights",
        description:
            "Track your fresh-to-processed ratio and make small improvements over time.",
        icon: BarChart3,
        gradient: "from-sky-300 via-cyan-200 to-teal-200",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-slate-900 mb-16"
                >
                    Designed to Make Healthy Easy
                </motion.h2>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-3xl p-8 bg-white shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                            >
                                {/* Animated Gradient Background */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                                />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-mint-100 mb-6">
                                        <Icon className="w-6 h-6 text-mint-600" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
