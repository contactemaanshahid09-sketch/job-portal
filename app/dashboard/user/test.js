"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/signin");
            return;
        }

        if (session.user.role !== "user") {
            router.push("/dashboard");
        }
    }, [session, status, router]);

    if (!session || session.user.role !== "user") return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
                <h1 className="text-4xl font-bold text-indigo-600">User Dashboard</h1>
                <p className="text-gray-600 mt-4">
                    Welcome {session.user.name}
                </p>
            </div>
        </div>
    );
}
