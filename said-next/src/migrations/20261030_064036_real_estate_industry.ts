import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_case_studies_industry" ADD VALUE 'Real Estate & Infrastructure' BEFORE 'Education';
  ALTER TYPE "public"."enum__case_studies_v_version_industry" ADD VALUE 'Real Estate & Infrastructure' BEFORE 'Education';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" ALTER COLUMN "industry" SET DATA TYPE text;
  DROP TYPE "public"."enum_case_studies_industry";
  CREATE TYPE "public"."enum_case_studies_industry" AS ENUM('Global Capability Centres', 'Pharma & Healthcare', 'BFSI / NBFC', 'Manufacturing', 'Automobile', 'Retail', 'IT / ITES', 'Media', 'Startups', 'Education');
  ALTER TABLE "case_studies" ALTER COLUMN "industry" SET DATA TYPE "public"."enum_case_studies_industry" USING "industry"::"public"."enum_case_studies_industry";
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_industry" SET DATA TYPE text;
  DROP TYPE "public"."enum__case_studies_v_version_industry";
  CREATE TYPE "public"."enum__case_studies_v_version_industry" AS ENUM('Global Capability Centres', 'Pharma & Healthcare', 'BFSI / NBFC', 'Manufacturing', 'Automobile', 'Retail', 'IT / ITES', 'Media', 'Startups', 'Education');
  ALTER TABLE "_case_studies_v" ALTER COLUMN "version_industry" SET DATA TYPE "public"."enum__case_studies_v_version_industry" USING "version_industry"::"public"."enum__case_studies_v_version_industry";`)
}
