"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";
import { getCurrentUserWithRole } from "@/lib/getCurrentUser";

// Admin login page – wired to Supabase email/password auth
const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If an admin session already exists, skip login.
  // If a non-admin session exists, clear it so admin can log in.
  useEffect(() => {
    async function checkExistingSession() {
      const data = await getCurrentUserWithRole();

      if (!data) return; // no session → show login

      if (data.profile && (data as any).profile.role === "admin") {
        router.replace("/admin/dashboard");
        return;
      }

      // Logged in but not admin – clear session so we can log in as admin
      await signOut();
    }

    checkExistingSession();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setErrorMessage("Invalid email or password. Please try again.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setErrorMessage("Something went wrong while signing you in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2 text-center">Admin Login</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Sign in to access the admin dashboard.
        </p>

        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/60 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

