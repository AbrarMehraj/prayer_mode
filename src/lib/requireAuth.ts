import { getCurrentUserWithRole } from "./getCurrentUser";

// Admin-only auth gate helper.
// For server-side protection you will typically call this
// inside server components / route handlers.
export async function requireAuth() {
  const data = await getCurrentUserWithRole();

  if (!data) {
    // Not logged in
    throw new Error("Unauthorized");
  }

  if (!data.profile || (data as any).profile.role !== "admin") {
    // Logged in but not admin
    throw new Error("Forbidden");
  }

  return data;
}

