import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, ShoppingCart, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 py-20">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm text-slate-400 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now in Public Beta
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
          Healthy eating, <br />
          <span className="text-primary glow">simplified.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The intelligent meal planner that automates your nutrition and grocery shopping.
          Stop guessing, start thriving.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/login">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5">
              Try Demo User
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/recruiter">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-all">
              Recruiter Info
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <FeatureCard
          icon={<Calendar className="h-8 w-8 text-primary" />}
          title="Smart Scheduling"
          description="Algorithmic meal distribution based on your macro targets and preferences."
          delay={0}
        />
        <FeatureCard
          icon={<ShoppingCart className="h-8 w-8 text-primary" />}
          title="Instant Grocery List"
          description="Convert your weekly plan into a categorized shopping list in one click."
          delay={100}
        />
        <FeatureCard
          icon={<Sparkles className="h-8 w-8 text-primary" />}
          title="Flexible Swaps"
          description="Don't like a meal? Swap it out instantly without breaking your nutrition goals."
          delay={200}
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700 transition-colors group">
      <CardHeader>
        <div className="mb-4 inline-block rounded-lg bg-slate-950 p-3 border border-slate-800 shadow-inner group-hover:border-primary/50 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}