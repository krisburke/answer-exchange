import {MigrationInterface, QueryRunner} from "typeorm";

export class LatestMigration1561068835119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `vote` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `vote` DROP COLUMN `rating`");
        await queryRunner.query("ALTER TABLE `vote` ADD `rating` enum ('1', '0', '-1') NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `vote` DROP COLUMN `rating`");
        await queryRunner.query("ALTER TABLE `vote` ADD `rating` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vote` DROP COLUMN `updatedAt`");
    }

}
