import fs from "fs";
import path from "path";
import { pool } from "./db";

/**
 * Simple migration runner.
 * - Reads .sql files from /migrations in filename order.
 * - Tracks applied migrations in a `_migrations` table so each file runs at most once.
 * - Safe to call on every server startup.
 */
export async function runMigrations(): Promise<void> {
  const migrationsDir = path.resolve(__dirname, "..", "migrations");

  if (!fs.existsSync(migrationsDir)) {
    console.log("[migrate] No migrations directory found — skipping.");
    return;
  }

  // Ensure tracking table exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // Get already-applied migrations
  const { rows: applied } = await pool.query(
    "SELECT name FROM _migrations ORDER BY name"
  );
  const appliedSet = new Set(applied.map((r: { name: string }) => r.name));

  // Read migration files, sorted alphabetically (0001, 0002, …)
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  let ranCount = 0;

  for (const file of files) {
    if (appliedSet.has(file)) {
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8").trim();

    if (!sql) {
      console.log(`[migrate] Skipping empty file: ${file}`);
      continue;
    }

    console.log(`[migrate] Running: ${file}`);
    try {
      await pool.query(sql);
      await pool.query("INSERT INTO _migrations (name) VALUES ($1)", [file]);
      console.log(`[migrate] ✓ ${file}`);
      ranCount++;
    } catch (err: any) {
      console.error(`[migrate] ✗ ${file} failed:`, err.message);
      // Don't throw — IF NOT EXISTS makes confidence migration idempotent,
      // but log clearly so we can see failures in Railway logs.
      // For truly breaking migrations, we'd want to throw here.
      throw err;
    }
  }

  if (ranCount === 0) {
    console.log("[migrate] All migrations already applied.");
  } else {
    console.log(`[migrate] Applied ${ranCount} new migration(s).`);
  }
}
