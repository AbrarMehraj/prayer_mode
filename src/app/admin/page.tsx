"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserWithRole } from "@/lib/getCurrentUser";
import { signOut } from "@/lib/auth";

// Admin index route – decide where to send the user.
// Uses Supabase user + profile role to redirect.
export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
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

      // Admin user – send to dashboard
      router.replace("/admin/dashboard");
    }

    run();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center">
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  );
}

