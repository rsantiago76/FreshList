import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { StickyCTA } from "@/components/landing/StickyCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <InteractiveDemo />
      <Features />
      <StickyCTA />

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} FreshList. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}