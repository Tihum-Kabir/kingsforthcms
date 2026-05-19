import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Enum additions (must be separate execute — ALTER TYPE ADD VALUE cannot run in a transaction) ─
  await db.execute(sql`
    ALTER TYPE "public"."enum_resources_category" ADD VALUE IF NOT EXISTS 'Blog';
  `)
  await db.execute(sql`
    ALTER TYPE "public"."enum_resources_category" ADD VALUE IF NOT EXISTS 'Case Study';
  `)
  await db.execute(sql`
    ALTER TYPE "public"."enum_resources_category" ADD VALUE IF NOT EXISTS 'White Paper';
  `)

  // ── 2. Column additions ────────────────────────────────────────────────────
  await db.execute(sql`
    -- resources: fields added after initial migration
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "video_url" varchar;
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "pdf_file_id" integer;
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "docx_file_id" integer;
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "featured_in_nav" boolean DEFAULT false;
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "section_id" integer;

    CREATE INDEX IF NOT EXISTS "resources_pdf_file_idx" ON "resources" USING btree ("pdf_file_id");
    CREATE INDEX IF NOT EXISTS "resources_docx_file_idx" ON "resources" USING btree ("docx_file_id");
    CREATE INDEX IF NOT EXISTS "resources_section_idx" ON "resources" USING btree ("section_id");

    -- how_it_works_steps: media changed from text URL to upload relationship
    ALTER TABLE "how_it_works_steps" ADD COLUMN IF NOT EXISTS "media_id" integer;
    CREATE INDEX IF NOT EXISTS "how_it_works_steps_media_idx" ON "how_it_works_steps" USING btree ("media_id");
  `)

  // ── 3. FK constraints ──────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "resources"
        ADD CONSTRAINT "resources_pdf_file_id_media_id_fk"
        FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "resources"
        ADD CONSTRAINT "resources_docx_file_id_media_id_fk"
        FOREIGN KEY ("docx_file_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "resources"
        ADD CONSTRAINT "resources_section_id_resource_sections_id_fk"
        FOREIGN KEY ("section_id") REFERENCES "public"."resource_sections"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "how_it_works_steps"
        ADD CONSTRAINT "how_it_works_steps_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // down not implemented — apply forward only
}
