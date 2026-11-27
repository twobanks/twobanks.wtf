// src/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { env } from '@/env';

let sqlInstance: ReturnType<typeof neon> | null = null;
let dbInstance: NeonHttpDatabase<typeof schema> | null = null;

// Se DATABASE_URL estiver disponível no ambiente (ex.: .env.local), inicializa
// imediatamente para que módulos como src/auth.ts (DrizzleAdapter) recebam
// uma instância real de drizzle no topo do módulo durante o next build.
if (process.env.DATABASE_URL) {
  sqlInstance = neon(process.env.DATABASE_URL);
  dbInstance = drizzle(sqlInstance, { schema });
}

function initDb(): NeonHttpDatabase<typeof schema> {
  if (!dbInstance) {
    if (!env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL não está configurada. Defina-a no .env antes de usar o banco de dados.'
      );
    }
    sqlInstance = neon(env.DATABASE_URL);
    dbInstance = drizzle(sqlInstance, { schema });
  }
  return dbInstance;
}

export function ensureDb() {
  return initDb();
}

export const db = dbInstance ??
  (new Proxy({} as NeonHttpDatabase<typeof schema>, {
    get(_, prop: string) {
      return initDb()[prop as keyof NeonHttpDatabase<typeof schema>];
    },
  }) as NeonHttpDatabase<typeof schema>);