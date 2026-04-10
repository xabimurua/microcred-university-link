-- Enrollments: tracks which user is enrolled in which program
CREATE TABLE IF NOT EXISTS public.enrollments (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  program_id  integer     NOT NULL,
  enrolled_at timestamptz DEFAULT now() NOT NULL,
  progress    integer     DEFAULT 0 NOT NULL CHECK (progress >= 0 AND progress <= 100),
  status      text        DEFAULT 'active' NOT NULL CHECK (status IN ('active','completed','paused')),
  UNIQUE (user_id, program_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own enrollments"
  ON public.enrollments FOR DELETE
  USING (auth.uid() = user_id);
