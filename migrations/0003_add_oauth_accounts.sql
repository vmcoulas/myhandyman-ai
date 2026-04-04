-- Migration: Add oauth_accounts table for Google/Apple sign-in
-- Run against Neon PostgreSQL before deploying the auth feature

CREATE TABLE IF NOT EXISTS "oauth_accounts" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" varchar NOT NULL,
  "provider" varchar NOT NULL,
  "provider_account_id" varchar NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "oauth_accounts_provider_unique" UNIQUE ("provider", "provider_account_id")
);

DO $$ BEGIN
  ALTER TABLE "oauth_accounts"
    ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "oauth_accounts_provider_account_idx"
  ON "oauth_accounts" ("provider", "provider_account_id");
