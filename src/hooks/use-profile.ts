import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  birth_date: string | null;
  avatar_url: string | null;
};

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      // PGRST116 = row not found, treat as empty profile
      if (error && error.code !== "PGRST116") throw error;
      setProfile(
        data ?? {
          id: user.id,
          first_name: null,
          last_name: null,
          phone: null,
          birth_date: null,
          avatar_url: null,
        }
      );
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...updates,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      await fetchProfile();
      return true;
    } catch (err) {
      console.error("Error updating profile:", err);
      return false;
    }
  };

  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
      user?.email?.split("@")[0] ||
      "Usuario"
    : user?.email?.split("@")[0] || "Usuario";

  const initials = profile
    ? [profile.first_name?.[0], profile.last_name?.[0]]
        .filter(Boolean)
        .join("")
        .toUpperCase() || user?.email?.[0].toUpperCase() || "U"
    : user?.email?.[0].toUpperCase() || "U";

  return { profile, loading, updateProfile, refetch: fetchProfile, displayName, initials };
};
