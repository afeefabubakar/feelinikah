import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_rsvp_side') THEN
        CREATE TYPE "public"."enum_rsvp_side" AS ENUM('groom', 'bride', 'friends');
      END IF;
    END $$;
    ALTER TABLE "rsvp" ADD COLUMN IF NOT EXISTS "children_count" numeric DEFAULT 0;
    ALTER TABLE "rsvp" ADD COLUMN IF NOT EXISTS "side" "enum_rsvp_side";
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "position" numeric DEFAULT 1;
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "hide" boolean DEFAULT false;
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "unclaimable" boolean DEFAULT false;
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "description";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "wishlist" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "rsvp" DROP COLUMN IF EXISTS "children_count";
    ALTER TABLE "rsvp" DROP COLUMN IF EXISTS "side";
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "position";
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "hide";
    ALTER TABLE "wishlist" DROP COLUMN IF EXISTS "unclaimable";
    DROP TYPE IF EXISTS "public"."enum_rsvp_side";
  `)
}
