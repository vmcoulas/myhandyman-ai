-- 0001_feedback_context.sql
-- Adds context fields to feedback and allows general (non-project) feedback.

ALTER TABLE "feedback" ALTER COLUMN "project_id" DROP NOT NULL;

ALTER TABLE "feedback" ADD COLUMN IF NOT EXISTS "page_path" text;
ALTER TABLE "feedback" ADD COLUMN IF NOT EXISTS "step_number" integer;
ALTER TABLE "feedback" ADD COLUMN IF NOT EXISTS "context" jsonb;
