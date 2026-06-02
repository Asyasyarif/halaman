import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { resolve } from 'node:path'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'

let _db: LibSQLDatabase | null = null

function resolveDbUrl(): string {
  const envUrl = process.env.DATABASE_URL
  if (envUrl && !envUrl.startsWith('file:')) return envUrl
  const filePath = envUrl ? envUrl.replace(/^file:/, '') : './data/halaman.db'
  return 'file:' + resolve(filePath)
}

function getDb(): LibSQLDatabase {
  if (!_db) {
    const url = resolveDbUrl()
    const authToken = process.env.DATABASE_AUTH_TOKEN

    const client = createClient({
      url,
      ...(authToken ? { authToken } : {}),
    })

    _db = drizzle({ client })
  }
  return _db
}

export const db = new Proxy({} as any, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop)
  },
}) as LibSQLDatabase
