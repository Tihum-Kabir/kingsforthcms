import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Fix enum values (must run before table operations) ────────────────
  await db.execute(sql`
    ALTER TYPE "public"."enum_solutions_category" ADD VALUE IF NOT EXISTS 'industry';
    ALTER TYPE "public"."enum_solutions_category" ADD VALUE IF NOT EXISTS 'use-case';
  `)

  // ── 2. All table / column additions ──────────────────────────────────────
  await db.execute(sql`

    -- ── resource_sections (new collection added after initial migration) ────
    CREATE TABLE IF NOT EXISTS "resource_sections" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "order_index" numeric DEFAULT 0,
      "is_published" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "resource_sections_slug_idx" ON "resource_sections" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "resource_sections_updated_at_idx" ON "resource_sections" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "resource_sections_created_at_idx" ON "resource_sections" USING btree ("created_at");

    -- ── payload_locked_documents_rels: add resource_sections_id ─────────────
    -- This missing column causes every admin query to 500
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "resource_sections_id" integer;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resource_sections_id_idx"
      ON "payload_locked_documents_rels" USING btree ("resource_sections_id");

    -- ── services: add color_theme ──────────────────────────────────────────
    ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "color_theme" varchar DEFAULT 'cyan';

    -- ── services_stats (new array field) ───────────────────────────────────
    CREATE TABLE IF NOT EXISTS "services_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "services_stats_order_idx" ON "services_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_stats_parent_id_idx" ON "services_stats" USING btree ("_parent_id");

    -- ── services_how_it_works (new array field) ────────────────────────────
    CREATE TABLE IF NOT EXISTS "services_how_it_works" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "services_how_it_works_order_idx" ON "services_how_it_works" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_how_it_works_parent_id_idx" ON "services_how_it_works" USING btree ("_parent_id");

    -- ── services_plans: add missing columns, drop NOT NULL on monthly_price ─
    ALTER TABLE "services_plans" ALTER COLUMN "monthly_price" DROP NOT NULL;
    ALTER TABLE "services_plans" ADD COLUMN IF NOT EXISTS "annual_price" numeric;
    ALTER TABLE "services_plans" ADD COLUMN IF NOT EXISTS "discount_note" varchar;
    ALTER TABLE "services_plans" ADD COLUMN IF NOT EXISTS "cta_label" varchar;

    -- ── services_gallery_images: add caption ───────────────────────────────
    ALTER TABLE "services_gallery_images" ADD COLUMN IF NOT EXISTS "caption" varchar;

    -- ── team_members: add motto ────────────────────────────────────────────
    ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "motto" varchar;

    -- ── solutions: add missing columns ────────────────────────────────────
    ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "short_description" varchar;
    ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "long_description" jsonb;
    ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;

    -- ── solutions_key_benefits (new array field) ───────────────────────────
    CREATE TABLE IF NOT EXISTS "solutions_key_benefits" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "solutions_key_benefits_order_idx" ON "solutions_key_benefits" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "solutions_key_benefits_parent_id_idx" ON "solutions_key_benefits" USING btree ("_parent_id");

    -- ── solutions_feature_sections (new array field) ───────────────────────
    CREATE TABLE IF NOT EXISTS "solutions_feature_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "solutions_feature_sections_order_idx" ON "solutions_feature_sections" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "solutions_feature_sections_parent_id_idx" ON "solutions_feature_sections" USING btree ("_parent_id");

    -- ── solutions_feature_sections_points ─────────────────────────────────
    CREATE TABLE IF NOT EXISTS "solutions_feature_sections_points" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point" varchar NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "solutions_feature_sections_points_order_idx" ON "solutions_feature_sections_points" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "solutions_feature_sections_points_parent_id_idx" ON "solutions_feature_sections_points" USING btree ("_parent_id");

    -- ── solutions_gallery_images ───────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS "solutions_gallery_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "caption" varchar
    );
    CREATE INDEX IF NOT EXISTS "solutions_gallery_images_order_idx" ON "solutions_gallery_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "solutions_gallery_images_parent_id_idx" ON "solutions_gallery_images" USING btree ("_parent_id");

    -- ── site_settings: add all missing hero / homepage columns ────────────
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_image_day_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_image_night_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_headline" varchar DEFAULT 'Engineering the Invisible';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_highlight_text" varchar DEFAULT 'the Invisible';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_subtitle" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_subtitle_size" numeric DEFAULT 19;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_c_t_a_text" varchar DEFAULT 'Get Started';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_c_t_a_link" varchar DEFAULT '/contact';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_secondary_c_t_a_text" varchar DEFAULT 'Watch Videos';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hero_secondary_c_t_a_link" varchar DEFAULT 'https://youtube.com';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_info_email" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_info_phone" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_info_phone2" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_info_address" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "contact_info_map_embed" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "resources_page_hero_heading" varchar DEFAULT 'Explore Our Resource Library';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "resources_page_hero_subheading" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "llm_section_heading" varchar DEFAULT 'Start a conversation to research Kingsforth on LLMs:';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "why_kingsforth_section_title" varchar DEFAULT 'Why Kingsforth';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "why_kingsforth_section_subtitle" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "why_kingsforth_section_subtitle_size" numeric DEFAULT 18;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_badge" varchar DEFAULT 'POWERED BY KINGSEYE';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_title" varchar DEFAULT 'KINGSEYE';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_subtitle" varchar DEFAULT 'Autonomous Intelligence Core, Not Just Another Dashboard';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_description" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_description_size" numeric DEFAULT 16;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "product_showcase_section_showcase_media_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "how_it_works_section_title" varchar DEFAULT 'How It Works';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "how_it_works_section_subtitle" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "how_it_works_section_subtitle_size" numeric DEFAULT 18;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "core_capabilities_section_title" varchar DEFAULT 'Core Capabilities';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "core_capabilities_section_subtitle" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "core_capabilities_section_subtitle_size" numeric DEFAULT 18;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_title" varchar DEFAULT 'Ready to Secure Your Future?';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_subtitle" jsonb;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_subtitle_size" numeric DEFAULT 18;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_primary_button_text" varchar DEFAULT 'Get a Demo';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_primary_button_link" varchar DEFAULT '/contact';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_secondary_button_text" varchar DEFAULT 'View Pricing';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "final_cta_section_secondary_button_link" varchar DEFAULT '/pricing';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "partner_logos_section_headline" varchar DEFAULT 'Trusted By Industry Pioneers';

    -- ── site_settings_page_heroes ─────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS "site_settings_page_heroes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "page_slug" varchar NOT NULL,
      "day_image_id" integer,
      "night_image_id" integer,
      "headline" varchar,
      "subtitle" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_settings_page_heroes_order_idx" ON "site_settings_page_heroes" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_page_heroes_parent_id_idx" ON "site_settings_page_heroes" USING btree ("_parent_id");

    -- ── site_settings_stats_section_stats ─────────────────────────────────
    CREATE TABLE IF NOT EXISTS "site_settings_stats_section_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL,
      "icon_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_settings_stats_section_stats_order_idx" ON "site_settings_stats_section_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_stats_section_stats_parent_id_idx" ON "site_settings_stats_section_stats" USING btree ("_parent_id");

    -- ── site_settings_how_it_works_section_steps ──────────────────────────
    CREATE TABLE IF NOT EXISTS "site_settings_how_it_works_section_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "step_number" varchar NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "icon_name" varchar,
      "color_theme" varchar,
      "media_id" integer,
      "media_type" varchar DEFAULT 'image',
      "media_fit" varchar DEFAULT 'cover'
    );
    CREATE INDEX IF NOT EXISTS "site_settings_how_it_works_section_steps_order_idx" ON "site_settings_how_it_works_section_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_how_it_works_section_steps_parent_id_idx" ON "site_settings_how_it_works_section_steps" USING btree ("_parent_id");

    -- ── site_settings_llm_links ───────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS "site_settings_llm_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "description" varchar,
      "url" varchar NOT NULL,
      "icon_color" varchar DEFAULT '#6b7280',
      "icon_letter" varchar,
      "enabled" boolean DEFAULT true
    );
    CREATE INDEX IF NOT EXISTS "site_settings_llm_links_order_idx" ON "site_settings_llm_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_llm_links_parent_id_idx" ON "site_settings_llm_links" USING btree ("_parent_id");

  `)

  // ── 3. Foreign key constraints (DO/EXCEPTION pattern — no IF NOT EXISTS) ─
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_resource_sections_fk"
        FOREIGN KEY ("resource_sections_id") REFERENCES "public"."resource_sections"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "services_stats"
        ADD CONSTRAINT "services_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "services_how_it_works"
        ADD CONSTRAINT "services_how_it_works_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "solutions_key_benefits"
        ADD CONSTRAINT "solutions_key_benefits_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "solutions_feature_sections"
        ADD CONSTRAINT "solutions_feature_sections_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "solutions_feature_sections_points"
        ADD CONSTRAINT "solutions_feature_sections_points_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_feature_sections"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "solutions_gallery_images"
        ADD CONSTRAINT "solutions_gallery_images_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "solutions" ADD CONSTRAINT "solutions_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_page_heroes"
        ADD CONSTRAINT "site_settings_page_heroes_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_stats_section_stats"
        ADD CONSTRAINT "site_settings_stats_section_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_how_it_works_section_steps"
        ADD CONSTRAINT "site_settings_how_it_works_section_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_llm_links"
        ADD CONSTRAINT "site_settings_llm_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_image_day_id_media_id_fk"
        FOREIGN KEY ("hero_image_day_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_image_night_id_media_id_fk"
        FOREIGN KEY ("hero_image_night_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_showcase_media_fk"
        FOREIGN KEY ("product_showcase_section_showcase_media_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // down not implemented — apply forward only
}
