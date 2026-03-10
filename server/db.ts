import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 30000,
});

// Wake up Neon on startup so first user request doesn't timeout
pool.query('SELECT 1').then(() => {
  console.log('[db] Neon connection established');
}).catch((err) => {
  console.error('[db] Initial connection failed, will retry on first request:', err.message);
});

export const db = drizzle(pool, { schema });
