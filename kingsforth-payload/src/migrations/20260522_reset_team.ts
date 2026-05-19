import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Delete all existing team members so auto-seed re-runs with updated founders list
  await db.execute(sql`DELETE FROM "team_members";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // down not implemented — apply forward only
}
