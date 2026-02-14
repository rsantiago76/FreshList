"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Leaf, Beef, Fish, ChevronRight } from "lucide-react";

export function InteractiveDemo() {
    const [calories, setCalories] = useState(2000);
    const [diet, setDiet] = useState<"omnivore" | "vegan" | "keto">("omnivore");

    const diets = [
        { id: "omnivore", label: "Omnivore", icon: <Beef className="w-4 h-4" /> },
        { id: "vegan", label: "Vegan", icon: <Leaf className="w-4 h-4" /> },
        { id: "keto", label: "Keto", icon: <Fish className="w-4 h-4" /> },
    ];

    return (
        <section id="demo" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-mint-600 font-semibold tracking-wide uppercase text-sm">Experience the Power</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Build Your Week</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Controls */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">Daily Calories: {calories}</label>
                                    <input
                                        type="range"
                                        min="1200"
                                        max="3500"
                                        step="50"
                                        value={calories}
                                        onChange={(e) => setCalories(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-mint-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>1200</span>
                                        <span>3500</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">Diet Type</label>
                                    <div className="flex gap-2">
                                        {diets.map((d) => (
                                            <button
                                                key={d.id}
                                                onClick={() => setDiet(d.id as any)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${diet === d.id
                                                        ? "bg-slate-900 text-white shadow-md"
                                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {d.icon}
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-mint-50 rounded-2xl border border-mint-100">
                            <h3 className="text-mint-800 font-semibold mb-2">Live Projection</h3>
                            <p className="text-mint-700 text-sm">
                                Based on your {calories}kcal {diet} plan, you'll reach your protein goal of {Math.round(calories * 0.3 / 4)}g.
                            </p>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-mint-200 to-lime-200 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl" />
                        <Card className="relative border-slate-200 shadow-2xl overflow-hidden">
                            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                                <span className="font-medium">This Week's Plan</span>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{diet.toUpperCase()} • {calories} kcal</span>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto p-4 space-y-3 bg-slate-50">
                                {["Monday", "Tuesday", "Wednesday"].map((day, i) => (
                                    <div key={day} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                                            {diet === "vegan" ? "🥗" : diet === "keto" ? "🥑" : "🍗"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-slate-800">{day}</div>
                                            <div className="text-xs text-slate-500">
                                                {diet === "vegan" ? "Lentil Bowl & Tofu Stir-fry" : diet === "keto" ? "Steak & Asparagus" : "Chicken & Rice Bowl"}
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono text-slate-400">
                                            {Math.round(calories / 3)} kcal
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 rounded-lg border-2 border-dashed border-slate-200 text-center text-slate-400 text-sm">
                                    + 4 more days generated...
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white">
                                <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white">
                                    Generate Full Plan <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
