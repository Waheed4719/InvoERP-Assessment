-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."products" add column "stock" integer
--  not null default '0';
ALTER TABLE "public"."products" DROP COLUMN "stock";