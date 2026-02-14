"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StickyCTA() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        if (latest > vh * 0.5) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex justify-between items-center md:justify-center md:gap-8"
        >
            <div className="hidden md:block">
                <p className="font-semibold text-slate-900">Ready to automate your nutrition?</p>
                <p className="text-xs text-slate-500">Free 14-day trial. No credit card required.</p>
            </div>
            <Link href="/login">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                    Get Started
                </Button>
            </Link>
        </motion.div>
    );
}
