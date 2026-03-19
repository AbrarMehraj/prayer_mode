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
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sm bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-medium text-gray-300 mb-2">Overview</h2>
            <p className="text-xs text-gray-400">
              Quick snapshot of key metrics can go here (downloads, active users, beta usage, etc.).
            </p>
          </div>
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-medium text-gray-300 mb-2">Releases</h2>
            <p className="text-xs text-gray-400">
              You could later list app versions or toggle beta availability from this section.
            </p>
          </div>
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-medium text-gray-300 mb-2">Notes</h2>
            <p className="text-xs text-gray-400">
              Space for internal notes, upcoming features, or quick links for you as the admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


