import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_vendors_service') THEN
        CREATE TYPE "public"."enum_vendors_service" AS ENUM('makeup', 'pelamin', 'food', 'tent', 'other');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_vendors_vehicle_type') THEN
        CREATE TYPE "public"."enum_vendors_vehicle_type" AS ENUM('lorry', 'van', 'car', 'pickup', 'motorcycle', 'none', 'other');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "vendors" (
      "id" serial PRIMARY KEY,
      "service" "enum_vendors_service" NOT NULL,
      "custom_service" varchar,
      "company_name" varchar,
      "vehicle_type" "enum_vendors_vehicle_type" NOT NULL,
      "vehicle_brand" varchar,
      "plate_number" varchar,
      "arrival_date" timestamp with time zone NOT NULL,
      "arrival_time" varchar NOT NULL,
      "service_time" varchar NOT NULL,
      "service_duration" varchar NOT NULL,
      "number_of_workers" numeric DEFAULT 1 NOT NULL,
      "pic_name" varchar NOT NULL,
      "pic_phone" varchar NOT NULL,
      "notes" varchar,
      "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "vendors_created_at_idx" ON "vendors" ("created_at");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "vendors";
    DROP TYPE IF EXISTS "public"."enum_vendors_service";
    DROP TYPE IF EXISTS "public"."enum_vendors_vehicle_type";
  `)
}
