"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check auth
    const stored = localStorage.getItem("freshlist_user");
    setUser(stored);
  }, [pathname]); // Re-check on nav change

  const handleLogout = () => {
    localStorage.removeItem("freshlist_user");
    setUser(null);
    router.push("/login");
  };

  if (pathname === "/login") return null;

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-primary transition-colors">
          FreshList<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/dashboard" ? "text-primary" : "text-slate-400")}>
                Dashboard
              </Link>
              <Link href="/meal-plans" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/meal-plans" ? "text-primary" : "text-slate-400")}>
                Meals
              </Link>
              <Link href="/grocery-list" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/grocery-list" ? "text-primary" : "text-slate-400")}>
                Groceries
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                Log In
              </Button>
            </Link>
          )}
          <Link href="/recruiter">
            <Button variant="outline" size="sm" className="hidden border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white sm:inline-flex">
              Recruiter Info
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
