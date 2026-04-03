-- Add confidence indicator columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS confidence TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS confidence_reason TEXT;
