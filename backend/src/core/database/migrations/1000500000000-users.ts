import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1000500000000 implements MigrationInterface {
  name = 'users1000500000000';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"))',
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
