import {MigrationInterface, QueryRunner} from "typeorm";

export class LatestMigration1560904249711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tag` ADD `uuid` varchar(36) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tag` DROP COLUMN `uuid`");
    }

}
