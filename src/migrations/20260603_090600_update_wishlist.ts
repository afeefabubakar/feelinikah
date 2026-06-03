import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "position" numeric DEFAULT 0;
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "unclaimable" boolean DEFAULT false;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "position";
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "unclaimable";
  `)
}
