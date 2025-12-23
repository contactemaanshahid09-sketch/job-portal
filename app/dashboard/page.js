"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signin");
      return;
    }

    if (session.user.role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  }, [session, status, router]);

  return (
   
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-4 border-t-indigo-600 border-r-purple-600 border-b-pink-600 border-l-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-700 text-xl font-medium">Initializing dashboard...</p>
        </div>
      </div>
    
  );
}
