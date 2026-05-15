import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF');
  CREATE TYPE "public"."enum_companies_status" AS ENUM('active', 'suspended', 'deleted');
  CREATE TYPE "public"."enum_services_category" AS ENUM('surveillance', 'forensic', 'automation', 'iot', 'consulting', 'other');
  CREATE TYPE "public"."enum_solutions_content_blocks_align" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_solutions_category" AS ENUM('Industry', 'Use Case');
  CREATE TYPE "public"."enum_resources_category" AS ENUM('Documentation', 'Library', 'Customer Story', 'Partner', 'Grant', 'AI Agent');
  CREATE TYPE "public"."enum_product_features_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_product_features_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_how_it_works_steps_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_how_it_works_steps_media_fit" AS ENUM('cover', 'contain', 'fill');
  CREATE TYPE "public"."enum_subscriptions_status" AS ENUM('ACTIVE', 'CANCELLED', 'TRIAL');
  CREATE TYPE "public"."enum_invoices_status" AS ENUM('DRAFT', 'SENT', 'PAID', 'OVERDUE');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');
  CREATE TYPE "public"."enum_support_tickets_status" AS ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED');
  CREATE TYPE "public"."enum_email_campaigns_status" AS ENUM('draft', 'scheduled', 'sent', 'failed');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'STAFF' NOT NULL,
  	"company_id" integer,
  	"avatar_id" integer,
  	"phone" varchar,
  	"address" varchar,
  	"reset_code" varchar,
  	"reset_code_expiration" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"industry" varchar,
  	"address" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"website" varchar,
  	"logo_id" integer,
  	"description" varchar,
  	"status" "enum_companies_status" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "services_plans_plan_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "services_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"monthly_price" numeric NOT NULL,
  	"semi_annual_price" numeric,
  	"annual_price" numeric,
  	"description" varchar,
  	"is_popular" boolean DEFAULT false,
  	"badge" varchar
  );
  
  CREATE TABLE "services_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" jsonb,
  	"hero_image_id" integer,
  	"hero_video_url" varchar,
  	"icon" varchar,
  	"category" "enum_services_category" DEFAULT 'other',
  	"order_index" numeric DEFAULT 0,
  	"is_published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "solutions_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "solutions_content_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "solutions_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"image" varchar,
  	"align" "enum_solutions_content_blocks_align" DEFAULT 'right'
  );
  
  CREATE TABLE "solutions_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"category" "enum_solutions_category" DEFAULT 'Use Case',
  	"description" jsonb,
  	"hero_image" varchar,
  	"hero_video_url" varchar,
  	"map_embed_url" varchar,
  	"is_published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_resources_category" NOT NULL,
  	"summary" varchar,
  	"content" jsonb,
  	"cover_image_id" integer,
  	"external_link" varchar,
  	"is_published" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_features_features_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "product_features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"media_url" varchar,
  	"media_type" "enum_product_features_media_type" DEFAULT 'image',
  	"display_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"image_position" "enum_product_features_image_position" DEFAULT 'left',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "how_it_works_steps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"step_number" varchar NOT NULL,
  	"icon_name" varchar,
  	"media_url" varchar,
  	"media_type" "enum_how_it_works_steps_media_type" DEFAULT 'image',
  	"media_fit" "enum_how_it_works_steps_media_fit" DEFAULT 'cover',
  	"color_theme" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar DEFAULT 'General',
  	"sort_order" numeric DEFAULT 0,
  	"attachment_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"image_id" integer,
  	"social_linkedin" varchar,
  	"social_twitter" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_type" varchar NOT NULL,
  	"props" jsonb,
  	"pattern_preset" varchar,
  	"sort_order" numeric DEFAULT 0
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"meta_description" varchar,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partner_logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"logo_url" varchar,
  	"website_url" varchar,
  	"display_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"company_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "knowledge_base" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subscriptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_id" integer NOT NULL,
  	"service_id" integer NOT NULL,
  	"status" "enum_subscriptions_status" DEFAULT 'TRIAL' NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"next_billing_date" timestamp(3) with time zone,
  	"users_allowed" numeric DEFAULT 5,
  	"custom_price" numeric,
  	"stripe_subscription_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "invoices_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"unit_price" numeric NOT NULL,
  	"total" numeric NOT NULL
  );
  
  CREATE TABLE "invoices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subscription_id" integer NOT NULL,
  	"billing_period_start" timestamp(3) with time zone NOT NULL,
  	"billing_period_end" timestamp(3) with time zone NOT NULL,
  	"amount" numeric NOT NULL,
  	"vat" numeric DEFAULT 0,
  	"currency" varchar DEFAULT 'USD',
  	"status" "enum_invoices_status" DEFAULT 'DRAFT' NOT NULL,
  	"pdf_url" varchar,
  	"issued_at" timestamp(3) with time zone,
  	"paid_at" timestamp(3) with time zone,
  	"stripe_invoice_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"phone" varchar,
  	"message" varchar,
  	"source" varchar,
  	"status" "enum_leads_status" DEFAULT 'NEW',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "analytics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_id" integer,
  	"date" timestamp(3) with time zone NOT NULL,
  	"page_views" numeric DEFAULT 0,
  	"unique_visitors" numeric DEFAULT 0,
  	"service_usage" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "support_tickets_messages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"message" varchar NOT NULL,
  	"sent_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "support_tickets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"company_id" integer NOT NULL,
  	"submitted_by_id" integer NOT NULL,
  	"assigned_to_id" integer,
  	"status" "enum_support_tickets_status" DEFAULT 'OPEN' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_campaigns_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"sent_at" timestamp(3) with time zone,
  	"opened_at" timestamp(3) with time zone,
  	"clicked_at" timestamp(3) with time zone,
  	"bounced" boolean DEFAULT false,
  	"error_message" varchar
  );
  
  CREATE TABLE "email_campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"recipient_filter" jsonb,
  	"sent_to" numeric DEFAULT 0,
  	"opened" numeric DEFAULT 0,
  	"clicked" numeric DEFAULT 0,
  	"status" "enum_email_campaigns_status" DEFAULT 'draft',
  	"scheduled_at" timestamp(3) with time zone,
  	"sent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"action" varchar NOT NULL,
  	"entity_type" varchar NOT NULL,
  	"entity_id" varchar,
  	"changes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"companies_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"solutions_id" integer,
  	"resources_id" integer,
  	"product_features_id" integer,
  	"how_it_works_steps_id" integer,
  	"faqs_id" integer,
  	"team_members_id" integer,
  	"pages_id" integer,
  	"partner_logos_id" integer,
  	"knowledge_base_id" integer,
  	"subscriptions_id" integer,
  	"invoices_id" integer,
  	"leads_id" integer,
  	"analytics_id" integer,
  	"support_tickets_id" integer,
  	"email_campaigns_id" integer,
  	"audit_logs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_logo_id" integer,
  	"site_name" varchar DEFAULT 'Kingsforth',
  	"site_tagline" varchar DEFAULT 'Enterprise Intelligence Systems',
  	"social_links_facebook" varchar,
  	"social_links_instagram" varchar,
  	"social_links_twitter" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"partner_logos_enabled" boolean DEFAULT true,
  	"team_section_heading" varchar DEFAULT 'Meet The Operators',
  	"about_section_heading" varchar DEFAULT 'Our Mission',
  	"email_from_name" varchar DEFAULT 'Kingsforth Team',
  	"email_from_address" varchar DEFAULT 'noreply@kingsforth.net',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "about_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mission_title" varchar DEFAULT 'Our Mission',
  	"mission_content" varchar,
  	"mission_image_id" integer,
  	"vision_title" varchar DEFAULT 'Our Vision',
  	"vision_content" varchar,
  	"vision_image_id" integer,
  	"story_title" varchar DEFAULT 'Our Story',
  	"story_content" jsonb,
  	"story_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_plans_plan_features" ADD CONSTRAINT "services_plans_plan_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_plans" ADD CONSTRAINT "services_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_gallery_images" ADD CONSTRAINT "services_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_gallery_images" ADD CONSTRAINT "services_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_stats" ADD CONSTRAINT "solutions_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_content_blocks_list_items" ADD CONSTRAINT "solutions_content_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_content_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_content_blocks" ADD CONSTRAINT "solutions_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_faqs" ADD CONSTRAINT "solutions_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_tags" ADD CONSTRAINT "resources_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_features_features_list" ADD CONSTRAINT "product_features_features_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_attachment_id_media_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_sections" ADD CONSTRAINT "pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_logos" ADD CONSTRAINT "partner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partner_logos" ADD CONSTRAINT "partner_logos_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "invoices_items" ADD CONSTRAINT "invoices_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "analytics" ADD CONSTRAINT "analytics_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_tickets_messages" ADD CONSTRAINT "support_tickets_messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_tickets_messages" ADD CONSTRAINT "support_tickets_messages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support_tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_submitted_by_id_users_id_fk" FOREIGN KEY ("submitted_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "email_campaigns_recipients" ADD CONSTRAINT "email_campaigns_recipients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "email_campaigns_recipients" ADD CONSTRAINT "email_campaigns_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_features_fk" FOREIGN KEY ("product_features_id") REFERENCES "public"."product_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_how_it_works_steps_fk" FOREIGN KEY ("how_it_works_steps_id") REFERENCES "public"."how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_logos_fk" FOREIGN KEY ("partner_logos_id") REFERENCES "public"."partner_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_knowledge_base_fk" FOREIGN KEY ("knowledge_base_id") REFERENCES "public"."knowledge_base"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscriptions_fk" FOREIGN KEY ("subscriptions_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_invoices_fk" FOREIGN KEY ("invoices_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_analytics_fk" FOREIGN KEY ("analytics_id") REFERENCES "public"."analytics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_support_tickets_fk" FOREIGN KEY ("support_tickets_id") REFERENCES "public"."support_tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_campaigns_fk" FOREIGN KEY ("email_campaigns_id") REFERENCES "public"."email_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_site_logo_id_media_id_fk" FOREIGN KEY ("site_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_content_stats" ADD CONSTRAINT "about_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content" ADD CONSTRAINT "about_content_mission_image_id_media_id_fk" FOREIGN KEY ("mission_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_content" ADD CONSTRAINT "about_content_vision_image_id_media_id_fk" FOREIGN KEY ("vision_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_content" ADD CONSTRAINT "about_content_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_company_idx" ON "users" USING btree ("company_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "companies_logo_idx" ON "companies" USING btree ("logo_id");
  CREATE INDEX "companies_updated_at_idx" ON "companies" USING btree ("updated_at");
  CREATE INDEX "companies_created_at_idx" ON "companies" USING btree ("created_at");
  CREATE INDEX "media_tags_order_idx" ON "media_tags" USING btree ("_order");
  CREATE INDEX "media_tags_parent_id_idx" ON "media_tags" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_plans_plan_features_order_idx" ON "services_plans_plan_features" USING btree ("_order");
  CREATE INDEX "services_plans_plan_features_parent_id_idx" ON "services_plans_plan_features" USING btree ("_parent_id");
  CREATE INDEX "services_plans_order_idx" ON "services_plans" USING btree ("_order");
  CREATE INDEX "services_plans_parent_id_idx" ON "services_plans" USING btree ("_parent_id");
  CREATE INDEX "services_gallery_images_order_idx" ON "services_gallery_images" USING btree ("_order");
  CREATE INDEX "services_gallery_images_parent_id_idx" ON "services_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "services_gallery_images_image_idx" ON "services_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "solutions_stats_order_idx" ON "solutions_stats" USING btree ("_order");
  CREATE INDEX "solutions_stats_parent_id_idx" ON "solutions_stats" USING btree ("_parent_id");
  CREATE INDEX "solutions_content_blocks_list_items_order_idx" ON "solutions_content_blocks_list_items" USING btree ("_order");
  CREATE INDEX "solutions_content_blocks_list_items_parent_id_idx" ON "solutions_content_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "solutions_content_blocks_order_idx" ON "solutions_content_blocks" USING btree ("_order");
  CREATE INDEX "solutions_content_blocks_parent_id_idx" ON "solutions_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "solutions_faqs_order_idx" ON "solutions_faqs" USING btree ("_order");
  CREATE INDEX "solutions_faqs_parent_id_idx" ON "solutions_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "resources_tags_order_idx" ON "resources_tags" USING btree ("_order");
  CREATE INDEX "resources_tags_parent_id_idx" ON "resources_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "resources_slug_idx" ON "resources" USING btree ("slug");
  CREATE INDEX "resources_cover_image_idx" ON "resources" USING btree ("cover_image_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "product_features_features_list_order_idx" ON "product_features_features_list" USING btree ("_order");
  CREATE INDEX "product_features_features_list_parent_id_idx" ON "product_features_features_list" USING btree ("_parent_id");
  CREATE INDEX "product_features_updated_at_idx" ON "product_features" USING btree ("updated_at");
  CREATE INDEX "product_features_created_at_idx" ON "product_features" USING btree ("created_at");
  CREATE INDEX "how_it_works_steps_updated_at_idx" ON "how_it_works_steps" USING btree ("updated_at");
  CREATE INDEX "how_it_works_steps_created_at_idx" ON "how_it_works_steps" USING btree ("created_at");
  CREATE INDEX "faqs_attachment_idx" ON "faqs" USING btree ("attachment_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "team_members_image_idx" ON "team_members" USING btree ("image_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "pages_sections_order_idx" ON "pages_sections" USING btree ("_order");
  CREATE INDEX "pages_sections_parent_id_idx" ON "pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "partner_logos_logo_idx" ON "partner_logos" USING btree ("logo_id");
  CREATE INDEX "partner_logos_company_idx" ON "partner_logos" USING btree ("company_id");
  CREATE INDEX "partner_logos_updated_at_idx" ON "partner_logos" USING btree ("updated_at");
  CREATE INDEX "partner_logos_created_at_idx" ON "partner_logos" USING btree ("created_at");
  CREATE INDEX "knowledge_base_updated_at_idx" ON "knowledge_base" USING btree ("updated_at");
  CREATE INDEX "knowledge_base_created_at_idx" ON "knowledge_base" USING btree ("created_at");
  CREATE INDEX "subscriptions_company_idx" ON "subscriptions" USING btree ("company_id");
  CREATE INDEX "subscriptions_service_idx" ON "subscriptions" USING btree ("service_id");
  CREATE INDEX "subscriptions_updated_at_idx" ON "subscriptions" USING btree ("updated_at");
  CREATE INDEX "subscriptions_created_at_idx" ON "subscriptions" USING btree ("created_at");
  CREATE INDEX "invoices_items_order_idx" ON "invoices_items" USING btree ("_order");
  CREATE INDEX "invoices_items_parent_id_idx" ON "invoices_items" USING btree ("_parent_id");
  CREATE INDEX "invoices_subscription_idx" ON "invoices" USING btree ("subscription_id");
  CREATE INDEX "invoices_updated_at_idx" ON "invoices" USING btree ("updated_at");
  CREATE INDEX "invoices_created_at_idx" ON "invoices" USING btree ("created_at");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "analytics_company_idx" ON "analytics" USING btree ("company_id");
  CREATE INDEX "analytics_updated_at_idx" ON "analytics" USING btree ("updated_at");
  CREATE INDEX "analytics_created_at_idx" ON "analytics" USING btree ("created_at");
  CREATE INDEX "support_tickets_messages_order_idx" ON "support_tickets_messages" USING btree ("_order");
  CREATE INDEX "support_tickets_messages_parent_id_idx" ON "support_tickets_messages" USING btree ("_parent_id");
  CREATE INDEX "support_tickets_messages_user_idx" ON "support_tickets_messages" USING btree ("user_id");
  CREATE INDEX "support_tickets_company_idx" ON "support_tickets" USING btree ("company_id");
  CREATE INDEX "support_tickets_submitted_by_idx" ON "support_tickets" USING btree ("submitted_by_id");
  CREATE INDEX "support_tickets_assigned_to_idx" ON "support_tickets" USING btree ("assigned_to_id");
  CREATE INDEX "support_tickets_updated_at_idx" ON "support_tickets" USING btree ("updated_at");
  CREATE INDEX "support_tickets_created_at_idx" ON "support_tickets" USING btree ("created_at");
  CREATE INDEX "email_campaigns_recipients_order_idx" ON "email_campaigns_recipients" USING btree ("_order");
  CREATE INDEX "email_campaigns_recipients_parent_id_idx" ON "email_campaigns_recipients" USING btree ("_parent_id");
  CREATE INDEX "email_campaigns_recipients_user_idx" ON "email_campaigns_recipients" USING btree ("user_id");
  CREATE INDEX "email_campaigns_updated_at_idx" ON "email_campaigns" USING btree ("updated_at");
  CREATE INDEX "email_campaigns_created_at_idx" ON "email_campaigns" USING btree ("created_at");
  CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("companies_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_product_features_id_idx" ON "payload_locked_documents_rels" USING btree ("product_features_id");
  CREATE INDEX "payload_locked_documents_rels_how_it_works_steps_id_idx" ON "payload_locked_documents_rels" USING btree ("how_it_works_steps_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_partner_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_logos_id");
  CREATE INDEX "payload_locked_documents_rels_knowledge_base_id_idx" ON "payload_locked_documents_rels" USING btree ("knowledge_base_id");
  CREATE INDEX "payload_locked_documents_rels_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("subscriptions_id");
  CREATE INDEX "payload_locked_documents_rels_invoices_id_idx" ON "payload_locked_documents_rels" USING btree ("invoices_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_analytics_id_idx" ON "payload_locked_documents_rels" USING btree ("analytics_id");
  CREATE INDEX "payload_locked_documents_rels_support_tickets_id_idx" ON "payload_locked_documents_rels" USING btree ("support_tickets_id");
  CREATE INDEX "payload_locked_documents_rels_email_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("email_campaigns_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_site_logo_idx" ON "site_settings" USING btree ("site_logo_id");
  CREATE INDEX "about_content_stats_order_idx" ON "about_content_stats" USING btree ("_order");
  CREATE INDEX "about_content_stats_parent_id_idx" ON "about_content_stats" USING btree ("_parent_id");
  CREATE INDEX "about_content_mission_mission_image_idx" ON "about_content" USING btree ("mission_image_id");
  CREATE INDEX "about_content_vision_vision_image_idx" ON "about_content" USING btree ("vision_image_id");
  CREATE INDEX "about_content_story_story_image_idx" ON "about_content" USING btree ("story_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "companies" CASCADE;
  DROP TABLE "media_tags" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_plans_plan_features" CASCADE;
  DROP TABLE "services_plans" CASCADE;
  DROP TABLE "services_gallery_images" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "solutions_stats" CASCADE;
  DROP TABLE "solutions_content_blocks_list_items" CASCADE;
  DROP TABLE "solutions_content_blocks" CASCADE;
  DROP TABLE "solutions_faqs" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "resources_tags" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "product_features_features_list" CASCADE;
  DROP TABLE "product_features" CASCADE;
  DROP TABLE "how_it_works_steps" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "pages_sections" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "partner_logos" CASCADE;
  DROP TABLE "knowledge_base" CASCADE;
  DROP TABLE "subscriptions" CASCADE;
  DROP TABLE "invoices_items" CASCADE;
  DROP TABLE "invoices" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "analytics" CASCADE;
  DROP TABLE "support_tickets_messages" CASCADE;
  DROP TABLE "support_tickets" CASCADE;
  DROP TABLE "email_campaigns_recipients" CASCADE;
  DROP TABLE "email_campaigns" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "about_content_stats" CASCADE;
  DROP TABLE "about_content" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_companies_status";
  DROP TYPE "public"."enum_services_category";
  DROP TYPE "public"."enum_solutions_content_blocks_align";
  DROP TYPE "public"."enum_solutions_category";
  DROP TYPE "public"."enum_resources_category";
  DROP TYPE "public"."enum_product_features_media_type";
  DROP TYPE "public"."enum_product_features_image_position";
  DROP TYPE "public"."enum_how_it_works_steps_media_type";
  DROP TYPE "public"."enum_how_it_works_steps_media_fit";
  DROP TYPE "public"."enum_subscriptions_status";
  DROP TYPE "public"."enum_invoices_status";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_support_tickets_status";
  DROP TYPE "public"."enum_email_campaigns_status";`)
}
