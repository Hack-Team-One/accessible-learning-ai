import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsersTable1000500000000 implements MigrationInterface {
  name = 'addUsersTable1000500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "email" character varying(100) NOT NULL,
        "password" character varying(100) NOT NULL,
        "firstName" character varying(100),
        "lastName" character varying(100),
        "emailVerificationCode" character varying(50),
        "emailVerified" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "created_by_user_id" integer,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_by_user_id" integer,
        "deletedAt" TIMESTAMP,
        "deleted_by_user_id" integer,
        CONSTRAINT "PK_users_primary_key" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_unique" UNIQUE ("email")
      )
    `);

    await queryRunner.query('CREATE INDEX "IDX_users_createdAt" ON "users" ("createdAt") ');
    await queryRunner.query('CREATE INDEX "IDX_users_updatedAt" ON "users" ("updatedAt") ');
    await queryRunner.query('CREATE INDEX "IDX_users_deletedAt" ON "users" ("deletedAt") ');

    await queryRunner.query(`
      CREATE TABLE "users__LOG" (
        "email" character varying(100) NOT NULL,
        "password" character varying(100) NOT NULL,
        "firstName" character varying(100),
        "lastName" character varying(100),
        "emailVerificationCode" character varying(50),
        "emailVerified" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "created_by_user_id" integer,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_by_user_id" integer,
        "deletedAt" TIMESTAMP,
        "deleted_by_user_id" integer,
        "id" integer NOT NULL,
        "logId" SERIAL NOT NULL,
        "logAction" character varying(8) NOT NULL,
        "logTime" TIMESTAMP NOT NULL,
        "logUserName" character varying(63) NOT NULL,
        "logTransactionId" bigint NOT NULL,
        CONSTRAINT "PK_users_LOG_primary_key" PRIMARY KEY ("logId")
      )
    `);

    await queryRunner.query('CREATE INDEX "IDX_users_LOG_createdAt" ON "users__LOG" ("createdAt") ');
    await queryRunner.query('CREATE INDEX "IDX_users_LOG_updatedAt" ON "users__LOG" ("updatedAt") ');
    await queryRunner.query('CREATE INDEX "IDX_users_LOG_deletedAt" ON "users__LOG" ("deletedAt") ');
    await queryRunner.query('CREATE INDEX "IDX_users_LOG_id" ON "users__LOG" ("id") ');

    await queryRunner.query(`
      ALTER TABLE "users"
      ADD CONSTRAINT "FK_users_created_by_user_id"
      FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      ADD CONSTRAINT "FK_users_updated_by_user_id"
      FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      ADD CONSTRAINT "FK_users_deleted_by_user_id"
      FOREIGN KEY ("deleted_by_user_id") REFERENCES "users"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query("SELECT upsert_shadow_triggers('public', 'users');");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_users_deleted_by_user_id"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_users_updated_by_user_id"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_users_created_by_user_id"');

    await queryRunner.query('DROP INDEX "IDX_users_LOG_id"');
    await queryRunner.query('DROP INDEX "IDX_users_LOG_deletedAt"');
    await queryRunner.query('DROP INDEX "IDX_users_LOG_updatedAt"');
    await queryRunner.query('DROP INDEX "IDX_users_LOG_createdAt"');

    await queryRunner.query('DROP TABLE "users__LOG"');

    await queryRunner.query('DROP INDEX "IDX_users_deletedAt"');
    await queryRunner.query('DROP INDEX "IDX_users_updatedAt"');
    await queryRunner.query('DROP INDEX "IDX_users_createdAt"');

    await queryRunner.query('DROP TABLE "users"');
  }
}
