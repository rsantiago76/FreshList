"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { StickyCTA } from "@/components/landing/StickyCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-mint-100">
      <Hero />
      <InteractiveDemo />
      <Features />
      <StickyCTA />
    </main>
  );
}