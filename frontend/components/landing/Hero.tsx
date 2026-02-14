"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cream-50">
            {/* Background Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute -top-1/2 -left-1/2 w-[80vw] h-[80vw] bg-mint-100/50 rounded-full blur-3xl mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute -bottom-1/2 -right-1/2 w-[80vw] h-[80vw] bg-lime-100/50 rounded-full blur-3xl mix-blend-multiply"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-mint-100 text-mint-700 text-sm font-medium mb-6">
                        ✨ Nutrition Automopilot
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                        Healthy eating, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-lime-400">
                            simplified.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The intelligent meal planner that adapts to your life.
                        Generate custom weekly plans, automate grocery lists, and hit your macros without the stress.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                                Try Demo User <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#demo">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm transition-all text-slate-600">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
