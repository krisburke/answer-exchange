import {MigrationInterface, QueryRunner} from "typeorm";

export class LatestMigration1561902133900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `passwordResetHash` varchar(255) NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `user` ADD `passwordResetExpiry` bigint NULL DEFAULT null");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `passwordResetExpiry`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `passwordResetHash`");
    }

}
