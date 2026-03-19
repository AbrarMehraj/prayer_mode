import { supabase } from "./supabase/client";

// Fetch the current Supabase auth user together with their profile row (including role)
export async function getCurrentUserWithRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile,
  };
}

