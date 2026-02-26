import { env } from 'bun'

const DATABASE_URL = env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

export const config = {
  databaseUrl: DATABASE_URL,
}
