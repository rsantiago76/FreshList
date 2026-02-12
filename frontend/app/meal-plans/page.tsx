"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import { RefreshCw, ChefHat, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MealPlansPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState<string | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      // Demo preferences
      const preferences = { dietStyle: "Balanced", calories: 2000 };
      const data = await apiRequest("/mealplans/generate", "POST", preferences);
      setPlan(data);
      // Persist plan for grocery list page
      localStorage.setItem("freshlist_current_plan", JSON.stringify(data));
    } catch (err) {
      alert("Failed to generate plan. Ensure API is running.");
    } finally {
      setLoading(false);
    }
  };

  const swapMeal = async (dayIndex: number, mealKey: string) => {
    setSwapping(`${dayIndex}-${mealKey}`);
    try {
      const currentDay = plan.days[dayIndex];
      const res = await apiRequest(`/mealplans/${plan.id}/swap`, "POST", {
        dayIndex,
        mealKey,
        currentDay: currentDay // Send context for stateless demo
      });

      // Update local state
      const newPlan = { ...plan };
      newPlan.days[dayIndex] = res.updatedDay;
      setPlan(newPlan);
      localStorage.setItem("freshlist_current_plan", JSON.stringify(newPlan));

    } catch (err) {
      alert("Failed to swap meal.");
    } finally {
      setSwapping(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Weekly Meal Plan</h1>
          <Button onClick={generatePlan} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {plan ? "Regenerate" : "Generate Plan"}
          </Button>
        </div>

        {!plan && !loading && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
            <ChefHat className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No plan generated yet.</p>
            <p className="text-slate-500 text-sm">Click the button above to create your first simplified menu.</p>
          </div>
        )}

        {plan && (
          <div className="grid grid-cols-1 gap-6">
            {plan.days.map((day: any, dIndex: number) => (
              <Card key={dIndex} className="border-slate-800 bg-slate-900/40">
                <CardHeader className="pb-3 border-b border-slate-800/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium text-primary">
                      Day {dIndex + 1} <span className="text-slate-500 text-sm font-normal ml-2">{day.date}</span>
                    </CardTitle>
                    <div className="flex gap-3 text-xs text-slate-400 font-mono">
                      <span>{day.totalCalories} kcal</span>
                      <span className="text-slate-600">|</span>
                      <span>{day.totalProtein}g protein</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealKey) => (
                    <div key={mealKey} className="group relative p-3 rounded-md bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1 font-bold">{mealKey}</p>
                      <p className="text-sm font-medium text-slate-200 truncate pr-6">{day.meals[mealKey].name}</p>
                      <div className="text-xs text-slate-500 mt-1 flex gap-2">
                        <span>{day.meals[mealKey].calories} cal</span>
                        <span>{day.meals[mealKey].protein}p</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => swapMeal(dIndex, mealKey)}
                        disabled={!!swapping}
                      >
                        {swapping === `${dIndex}-${mealKey}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}