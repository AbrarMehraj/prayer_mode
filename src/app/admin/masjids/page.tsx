"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getCurrentUserWithRole } from "@/lib/getCurrentUser";
import { signOut } from "@/lib/auth";

type Masjid = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
};

// Admin-only page to review and moderate pending masjids
const AdminMasjidsPage: React.FC = () => {
  const router = useRouter();
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingMosques, setLoadingMosques] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  // First, enforce that only admin can access this route
  useEffect(() => {
    async function checkAccess() {
      const data = await getCurrentUserWithRole();

      if (!data) {
        // Not logged in – send to admin login
        router.replace("/admin/login");
        return;
      }

      if (!data.profile || (data as any).profile.role !== "admin") {
        // Logged in but not admin – clear session and send to admin login
        await signOut();
        router.replace("/admin/login");
        return;
      }

      setLoadingAuth(false);
    }

    checkAccess();
  }, [router]);

  // Once auth is confirmed, load pending masjids
  useEffect(() => {
    if (loadingAuth) return;

    async function fetchMasjids() {
      const { data, error } = await supabase
        .from("mosques")
        .select("*")
        .eq("status", "pending");
      console.log("🚀 ~ fetchMasjids ~ data:", data)

      if (!error && data) {
        setMasjids(data as Masjid[]);
      }

      setLoadingMosques(false);
    }

    fetchMasjids();
  }, [loadingAuth]);

  async function updateStatus(id: number, status: "approved" | "rejected") {
    setActionLoadingId(id);

    const { error } = await supabase
      .from("mosques")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setMasjids((prev) => prev.filter((m) => m.id !== id));
    }

    setActionLoadingId(null);
  }

  if (loadingAuth || loadingMosques) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-4">
        <p className="text-sm text-gray-400">Loading pending masjids...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto flex gap-8">
        {/* Sidebar navigation */}
        <aside className="w-56 shrink-0 border border-gray-800 bg-gray-900/60 rounded-2xl p-4 h-fit">
          <h2 className="text-sm font-semibold text-gray-200 mb-3">
            Admin Navigation
          </h2>
          <nav className="space-y-1 text-sm">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="w-full text-left px-3 py-2 rounded-lg bg-transparent hover:bg-gray-800 text-gray-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/admin/masjids")}
              className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white"
            >
              Pending Masjids
            </button>
          </nav>
        </aside>

        {/* Content */}
        <section className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Pending Masjids</h1>
            <p className="text-sm text-gray-400 mt-1">
              Review and approve or reject masjid submissions from users.
            </p>
          </div>

          {masjids.length === 0 ? (
            <p className="text-gray-300">No pending masjids 🎉</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/60">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900">
                    <th className="px-4 py-3 text-left font-medium text-gray-300">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-300">
                      Location
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {masjids.map((masjid) => (
                    <tr
                      key={masjid.id}
                      className="border-t border-gray-800 hover:bg-gray-900/80"
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="font-semibold text-gray-100">
                          {masjid.name}
                        </div>
                      </td>
                    <td className="px-4 py-3 align-top">
                      <div className="text-gray-300">
                        {masjid.latitude}, {masjid.longitude}
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${masjid.latitude},${masjid.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      >
                        Open in Maps
                      </a>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <div className="inline-flex gap-2">
                          <button
                            onClick={() => updateStatus(masjid.id, "approved")}
                            disabled={actionLoadingId === masjid.id}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-800/60 text-white px-3 py-1 rounded text-xs"
                          >
                            {actionLoadingId === masjid.id
                              ? "Saving..."
                              : "Approve"}
                          </button>

                          <button
                            onClick={() => updateStatus(masjid.id, "rejected")}
                            disabled={actionLoadingId === masjid.id}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800/60 text-white px-3 py-1 rounded text-xs"
                          >
                            {actionLoadingId === masjid.id
                              ? "Saving..."
                              : "Reject"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminMasjidsPage;

