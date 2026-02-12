"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import { ShoppingCart, Check, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GroceryListPage() {
  const [plan, setPlan] = useState<any>(null);
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("freshlist_current_plan");
    if (stored) {
      setPlan(JSON.parse(stored));
    }
  }, []);

  const generateList = async () => {
    if (!plan) return;
    setLoading(true);
    try {
      const data = await apiRequest("/grocerylists/from-mealplan", "POST", { plan });
      setList(data);
    } catch (err) {
      alert("Failed to generate list.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <ProtectedRoute>
        <div className="text-center py-20 space-y-4">
          <p className="text-slate-400">No active meal plan found.</p>
          <Link href="/meal-plans">
            <Button variant="outline">Create a Meal Plan First</Button>
          </Link>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Grocery List</h1>
        </div>

        {!list && (
          <Card className="border-slate-800 bg-slate-900/40 text-center py-10">
            <CardContent className="space-y-4">
              <ShoppingCart className="h-12 w-12 text-slate-600 mx-auto" />
              <p className="text-slate-400">Ready to shop for your weekly plan?</p>
              <Button onClick={generateList} disabled={loading} size="lg" className="gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                Generate List from Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {list && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(list.itemsByCategory).map(([category, items]: [string, any]) => (
              <Card key={category} className="border-slate-800 bg-slate-900/40 h-fit">
                <CardHeader className="pb-2 border-b border-slate-800/50">
                  <CardTitle className="text-lg text-primary flex justify-between items-center">
                    {category}
                    <Badge variant="secondary" className="bg-slate-800 text-slate-400">{items.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-start group">
                      <div className="flex gap-3 items-start">
                        <div className="h-5 w-5 rounded border border-slate-700 mt-0.5 group-hover:border-primary transition-colors cursor-pointer flex items-center justify-center text-primary">
                          {/* Checkbox simulation */}
                        </div>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.item}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">{item.qty}</span>
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