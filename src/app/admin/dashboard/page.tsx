"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { getCurrentUserWithRole } from "@/lib/getCurrentUser";

// Admin dashboard – protects itself with a role check and shows loader on logout
const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function check() {
      const data = await getCurrentUserWithRole();

      if (!data) {
        // Not logged in
        router.replace("/admin/login");
        return;
      }

      if (!data.profile || (data as any).profile.role !== "admin") {
        // Logged in but not admin – clear session and send to admin login
        await signOut();
        router.replace("/admin/login");
        return;
      }

      setIsCheckingSession(false);
    }

    check();
  }, [router]);

  async function handleLogout() {
    setIsLoggingOut(true);
    await signOut();
    router.replace("/admin/login");
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center">
        <p className="text-sm text-gray-400">loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Quick access to your admin tools.
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        {/* Key admin actions */}
        <section className="grid gap-6 md:grid-cols-3">
          <button
            type="button"
            onClick={() => router.push("/admin/masjids")}
            className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 text-left hover:border-blue-500/60 hover:bg-gray-900 transition-colors"
          >
            <h2 className="text-sm font-medium text-gray-100 mb-2">
              Pending Masjids
            </h2>
            <p className="text-xs text-gray-400">
              Review and approve or reject new masjid submissions.
            </p>
          </button>

          
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


