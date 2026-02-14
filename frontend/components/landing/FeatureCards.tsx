"use client";

import { motion } from "framer-motion";
import { Calendar, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        icon: <Calendar className="h-8 w-8 text-mint-500" />,
        title: "Smart Scheduling",
        description: "Algorithmic meal distribution based on your macro targets and preferences.",
        color: "bg-mint-50",
        border: "border-mint-100",
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-coral-500" />,
        title: "Instant Grocery List",
        description: "Convert your weekly plan into a categorized shopping list in one click.",
        color: "bg-coral-50",
        border: "border-coral-100",
    },
    {
        icon: <Sparkles className="h-8 w-8 text-lime-600" />,
        title: "Flexible Swaps",
        description: "Don't like a meal? Swap it out instantly without breaking your nutrition goals.",
        color: "bg-lime-50",
        border: "border-lime-100",
    },
];

export function FeatureCards() {
    return (
        <section className="py-24 bg-white relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className={`h-full border ${feature.border} shadow-sm hover:shadow-md transition-shadow`}>
                                <CardHeader>
                                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-slate-900">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
