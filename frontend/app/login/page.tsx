"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    // Mock Auth
    const user = { name, email };
    localStorage.setItem("freshlist_user", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <CardHeader className="text-center space-y-2">
          <Badge variant="outline" className="w-fit mx-auto border-primary/50 text-primary">Demo Access</Badge>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-sm text-slate-400">Enter your details to access your plan.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Name</label>
              <Input
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-950/50 border-slate-800 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <Input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950/50 border-slate-800 focus:border-primary/50"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
              Get Started
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4">
              No password required for this demo.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}