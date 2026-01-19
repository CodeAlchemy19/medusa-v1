import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260116183354 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "attribute" ("id" text not null, "code" text not null, "unit" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "attribute_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_attribute_deleted_at" ON "attribute" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "attribute_value" ("id" text not null, "attribute_id" text not null, "value_number" integer null, "value_text" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "attribute_value_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_attribute_value_attribute_id" ON "attribute_value" ("attribute_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_attribute_value_deleted_at" ON "attribute_value" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "brand" ("id" text not null, "name" text not null, "code" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "brand_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_brand_deleted_at" ON "brand" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "part_reference" ("id" text not null, "reference_type" text not null, "reference_value" text not null, "manufacturer" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "part_reference_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_part_reference_deleted_at" ON "part_reference" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "vehicle_brand" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vehicle_brand_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_brand_deleted_at" ON "vehicle_brand" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "vehicle_model" ("id" text not null, "name" text not null, "brand_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vehicle_model_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_model_brand_id" ON "vehicle_model" ("brand_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_model_deleted_at" ON "vehicle_model" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "vehicle_generation" ("id" text not null, "year_from" integer not null, "year_to" integer null, "model_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vehicle_generation_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_generation_model_id" ON "vehicle_generation" ("model_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_generation_deleted_at" ON "vehicle_generation" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "vehicle_engine" ("id" text not null, "engine_code" text not null, "fuel_type" text not null, "displacement_cc" integer not null, "horsepower" integer not null, "generation_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vehicle_engine_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_engine_generation_id" ON "vehicle_engine" ("generation_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vehicle_engine_deleted_at" ON "vehicle_engine" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "fitment" ("id" text not null, "vehicle_engine_id" text not null, "position" text not null, "criteria" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "fitment_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_fitment_vehicle_engine_id" ON "fitment" ("vehicle_engine_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_fitment_deleted_at" ON "fitment" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "attribute_value" add constraint "attribute_value_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade;`);

    this.addSql(`alter table if exists "vehicle_model" add constraint "vehicle_model_brand_id_foreign" foreign key ("brand_id") references "vehicle_brand" ("id") on update cascade;`);

    this.addSql(`alter table if exists "vehicle_generation" add constraint "vehicle_generation_model_id_foreign" foreign key ("model_id") references "vehicle_model" ("id") on update cascade;`);

    this.addSql(`alter table if exists "vehicle_engine" add constraint "vehicle_engine_generation_id_foreign" foreign key ("generation_id") references "vehicle_generation" ("id") on update cascade;`);

    this.addSql(`alter table if exists "fitment" add constraint "fitment_vehicle_engine_id_foreign" foreign key ("vehicle_engine_id") references "vehicle_engine" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "attribute_value" drop constraint if exists "attribute_value_attribute_id_foreign";`);

    this.addSql(`alter table if exists "vehicle_model" drop constraint if exists "vehicle_model_brand_id_foreign";`);

    this.addSql(`alter table if exists "vehicle_generation" drop constraint if exists "vehicle_generation_model_id_foreign";`);

    this.addSql(`alter table if exists "vehicle_engine" drop constraint if exists "vehicle_engine_generation_id_foreign";`);

    this.addSql(`alter table if exists "fitment" drop constraint if exists "fitment_vehicle_engine_id_foreign";`);

    this.addSql(`drop table if exists "attribute" cascade;`);

    this.addSql(`drop table if exists "attribute_value" cascade;`);

    this.addSql(`drop table if exists "brand" cascade;`);

    this.addSql(`drop table if exists "part_reference" cascade;`);

    this.addSql(`drop table if exists "vehicle_brand" cascade;`);

    this.addSql(`drop table if exists "vehicle_model" cascade;`);

    this.addSql(`drop table if exists "vehicle_generation" cascade;`);

    this.addSql(`drop table if exists "vehicle_engine" cascade;`);

    this.addSql(`drop table if exists "fitment" cascade;`);
  }

}
