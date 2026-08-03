import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_rsvp_side" AS ENUM('groom', 'bride', 'friends');
  ALTER TABLE "rsvp" ADD COLUMN "children_count" numeric DEFAULT 0;
  ALTER TABLE "rsvp" ADD COLUMN "side" "enum_rsvp_side";
  ALTER TABLE "wishlist" ADD COLUMN "position" numeric DEFAULT 1;
  ALTER TABLE "wishlist" ADD COLUMN "hide" boolean DEFAULT false;
  ALTER TABLE "wishlist" ADD COLUMN "unclaimable" boolean DEFAULT false;
  ALTER TABLE "wishlist" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "wishlist" ADD COLUMN "description" varchar;
  ALTER TABLE "rsvp" DROP COLUMN "children_count";
  ALTER TABLE "rsvp" DROP COLUMN "side";
  ALTER TABLE "wishlist" DROP COLUMN "position";
  ALTER TABLE "wishlist" DROP COLUMN "hide";
  ALTER TABLE "wishlist" DROP COLUMN "unclaimable";
  DROP TYPE "public"."enum_rsvp_side";`)
}
