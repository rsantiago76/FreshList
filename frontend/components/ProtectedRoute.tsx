"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("freshlist_user");
        if (!user) {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-800 border-t-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
