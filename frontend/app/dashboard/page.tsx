"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Utensils, ShoppingCart, Activity } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("freshlist_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Hi, <span className="text-primary">{user?.name}</span>
            </h1>
            <p className="text-slate-400">Here's your nutrition summary for the week.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/meal-plans">
              <Button size="lg" className="shadow-lg shadow-primary/10">
                Generate Meal Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            label="Daily Calories"
            value="2,150"
            unit="kcal"
            icon={<Activity className="text-primary" />}
          />
          <StatsCard
            label="Daily Protein"
            value="145"
            unit="g"
            icon={<Activity className="text-indigo-400" />}
          />
          <StatsCard
            label="Plan Status"
            value="Active"
            unit=""
            icon={<Utensils className="text-emerald-400" />}
          />
        </div>

        {/* Actions */}
        <h2 className="text-2xl font-bold pt-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="View Meal Plan"
            desc="Check what's for dinner or swap meals."
            href="/meal-plans"
            icon={<Utensils className="h-6 w-6 text-white" />}
            bg="bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20"
          />
          <ActionCard
            title="Grocery List"
            desc="See ingredients needed for your plan."
            href="/grocery-list"
            icon={<ShoppingCart className="h-6 w-6 text-white" />}
            bg="bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function StatsCard({ label, value, unit, icon }: any) {
  return (
    <Card className="border-slate-800 bg-slate-900/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">
          {value}<span className="text-lg text-slate-500 font-normal ml-1">{unit}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ActionCard({ title, desc, href, icon, bg }: any) {
  return (
    <Link href={href}>
      <Card className={`h-full cursor-pointer transition-all hover:border-slate-600 ${bg}`}>
        <CardHeader>
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">{desc}</p>
        </CardContent>
      </Card>
    </Link>
  )
}