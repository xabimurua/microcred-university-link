import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export type Enrollment = {
  id: string;
  user_id: string;
  program_id: number;
  enrolled_at: string;
  progress: number;
  status: string;
};

// localStorage helpers — used as fallback when Supabase table doesn't exist yet
const lsKey = (userId: string) => `enrollments_${userId}`;

const lsRead = (userId: string): Enrollment[] => {
  try {
    return JSON.parse(localStorage.getItem(lsKey(userId)) ?? "[]");
  } catch {
    return [];
  }
};

const lsWrite = (userId: string, data: Enrollment[]) => {
  localStorage.setItem(lsKey(userId), JSON.stringify(data));
};

// Returns true if the error is a missing-table error from Supabase
const isMissingTable = (err: unknown) => {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    // 42P01 = relation does not exist (PostgreSQL)
    // PGRST204 = schema cache miss
    return code === "42P01" || code === "PGRST204";
  }
  return false;
};

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    if (!user) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    // If we already know Supabase table is missing, read from localStorage
    if (useLocalStorage) {
      setEnrollments(lsRead(user.id));
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .order("enrolled_at", { ascending: false });

      if (error) throw error;
      setEnrollments(data ?? []);
    } catch (err) {
      if (isMissingTable(err)) {
        // Table doesn't exist yet — fall back to localStorage silently
        setUseLocalStorage(true);
        setEnrollments(lsRead(user.id));
      } else {
        console.error("Error fetching enrollments:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [user, useLocalStorage]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const isEnrolled = (programId: number) =>
    enrollments.some((e) => e.program_id === programId);

  const getEnrollment = (programId: number) =>
    enrollments.find((e) => e.program_id === programId);

  const enroll = async (programId: number): Promise<boolean> => {
    if (!user) return false;

    if (useLocalStorage) {
      const current = lsRead(user.id);
      if (current.some((e) => e.program_id === programId)) return true;
      const next: Enrollment[] = [
        ...current,
        {
          id: crypto.randomUUID(),
          user_id: user.id,
          program_id: programId,
          enrolled_at: new Date().toISOString(),
          progress: 0,
          status: "active",
        },
      ];
      lsWrite(user.id, next);
      setEnrollments(next);
      return true;
    }

    try {
      const { error } = await supabase
        .from("enrollments")
        .insert({ user_id: user.id, program_id: programId });
      if (error) throw error;
      await fetchEnrollments();
      return true;
    } catch (err) {
      if (isMissingTable(err)) {
        setUseLocalStorage(true);
        return enroll(programId); // retry with localStorage
      }
      console.error("Error enrolling:", err);
      return false;
    }
  };

  const unenroll = async (programId: number): Promise<boolean> => {
    if (!user) return false;

    if (useLocalStorage) {
      const next = lsRead(user.id).filter((e) => e.program_id !== programId);
      lsWrite(user.id, next);
      setEnrollments(next);
      return true;
    }

    try {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .eq("user_id", user.id)
        .eq("program_id", programId);
      if (error) throw error;
      await fetchEnrollments();
      return true;
    } catch (err) {
      if (isMissingTable(err)) {
        setUseLocalStorage(true);
        return unenroll(programId);
      }
      console.error("Error unenrolling:", err);
      return false;
    }
  };

  const updateProgress = async (programId: number, progress: number): Promise<boolean> => {
    if (!user) return false;
    const status = progress >= 100 ? "completed" : "active";

    if (useLocalStorage) {
      const next = lsRead(user.id).map((e) =>
        e.program_id === programId ? { ...e, progress, status } : e
      );
      lsWrite(user.id, next);
      setEnrollments(next);
      return true;
    }

    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ progress, status })
        .eq("user_id", user.id)
        .eq("program_id", programId);
      if (error) throw error;
      await fetchEnrollments();
      return true;
    } catch (err) {
      if (isMissingTable(err)) {
        setUseLocalStorage(true);
        return updateProgress(programId, progress);
      }
      console.error("Error updating progress:", err);
      return false;
    }
  };

  return {
    enrollments,
    loading,
    isEnrolled,
    getEnrollment,
    enroll,
    unenroll,
    updateProgress,
    refetch: fetchEnrollments,
  };
};
