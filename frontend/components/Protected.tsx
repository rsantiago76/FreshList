
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDemoUser } from "@/lib/auth";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const u = getDemoUser();
    if (!u) router.replace("/login");
    else setOk(true);
  }, [router]);

  if (!ok) {
    return (
      <div className="card">
        <h2 className="h2">Checking session…</h2>
        <p className="p">This app uses mock auth stored in localStorage.</p>
      </div>
    );
  }
  return <>{children}</>;
}
