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

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = useCallback(async () => {
    if (!user) {
      setEnrollments([]);
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
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const isEnrolled = (programId: number) =>
    enrollments.some((e) => e.program_id === programId);

  const getEnrollment = (programId: number) =>
    enrollments.find((e) => e.program_id === programId);

  const enroll = async (programId: number): Promise<boolean> => {
    if (!user) return false;
    try {
      const { error } = await supabase
        .from("enrollments")
        .insert({ user_id: user.id, program_id: programId });
      if (error) throw error;
      await fetchEnrollments();
      return true;
    } catch (err) {
      console.error("Error enrolling:", err);
      return false;
    }
  };

  const unenroll = async (programId: number): Promise<boolean> => {
    if (!user) return false;
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
      console.error("Error unenrolling:", err);
      return false;
    }
  };

  const updateProgress = async (programId: number, progress: number): Promise<boolean> => {
    if (!user) return false;
    try {
      const status = progress >= 100 ? "completed" : "active";
      const { error } = await supabase
        .from("enrollments")
        .update({ progress, status })
        .eq("user_id", user.id)
        .eq("program_id", programId);
      if (error) throw error;
      await fetchEnrollments();
      return true;
    } catch (err) {
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
