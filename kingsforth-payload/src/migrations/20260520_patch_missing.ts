import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. site_settings: partner_logos_section_enabled was missed in v2 ───────
  // The field moved from flat `partnerLogosEnabled` into group `partnerLogosSection`,
  // so the DB column name changed from partner_logos_enabled → partner_logos_section_enabled.
  await db.execute(sql`
    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "partner_logos_section_enabled" boolean DEFAULT true;
  `)

  // ── 2. pricing_config global tables (never created in any prior migration) ──
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pricing_config" (
      "id" serial PRIMARY KEY NOT NULL,
      "headline" varchar DEFAULT 'Simple, Transparent Pricing',
      "subheadline" varchar DEFAULT 'Start with a base platform tier, then add the AI modules your operation needs. Scale up or down any time.',
      "billing_note" varchar DEFAULT 'Prices shown in BDT and exclude applicable taxes. All plans include a 14-day free trial. Cancel anytime.',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pricing_config_tiers" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "tagline" varchar,
      "description" varchar,
      "monthly_price" numeric,
      "is_custom_price" boolean DEFAULT false,
      "annual_discount" numeric DEFAULT 20,
      "is_popular" boolean DEFAULT false,
      "badge" varchar,
      "cta_label" varchar DEFAULT 'Select Plan',
      "cta_link" varchar DEFAULT '/contact'
    );
    CREATE INDEX IF NOT EXISTS "pricing_config_tiers_order_idx"
      ON "pricing_config_tiers" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pricing_config_tiers_parent_id_idx"
      ON "pricing_config_tiers" USING btree ("_parent_id");

    CREATE TABLE IF NOT EXISTS "pricing_config_tiers_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "included" boolean DEFAULT true,
      "note" varchar
    );
    CREATE INDEX IF NOT EXISTS "pricing_config_tiers_features_order_idx"
      ON "pricing_config_tiers_features" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pricing_config_tiers_features_parent_id_idx"
      ON "pricing_config_tiers_features" USING btree ("_parent_id");

    CREATE TABLE IF NOT EXISTS "pricing_config_service_add_ons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "service_slug" varchar NOT NULL,
      "service_title" varchar NOT NULL,
      "monthly_add_on_price" numeric NOT NULL,
      "annual_add_on_price" numeric,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "pricing_config_service_add_ons_order_idx"
      ON "pricing_config_service_add_ons" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pricing_config_service_add_ons_parent_id_idx"
      ON "pricing_config_service_add_ons" USING btree ("_parent_id");
  `)

  // ── 3. FK constraints ──────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pricing_config_tiers"
        ADD CONSTRAINT "pricing_config_tiers_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_config"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pricing_config_tiers_features"
        ADD CONSTRAINT "pricing_config_tiers_features_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_config_tiers"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pricing_config_service_add_ons"
        ADD CONSTRAINT "pricing_config_service_add_ons_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_config"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // down not implemented — apply forward only
}
