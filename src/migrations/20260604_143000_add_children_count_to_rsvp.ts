import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "rsvp" ADD COLUMN IF NOT EXISTS "children_count" numeric DEFAULT 0;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "rsvp" DROP COLUMN IF EXISTS "children_count";
  `)
}
