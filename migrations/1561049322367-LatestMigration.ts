import {MigrationInterface, QueryRunner} from "typeorm";

export class LatestMigration1561049322367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `vote` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `rating` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `voterId` int NULL, `questionId` int NULL, `answerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `vote` ADD CONSTRAINT `FK_9c72b23d6e8f221818d6a43caff` FOREIGN KEY (`voterId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vote` ADD CONSTRAINT `FK_b4f0f67acbc748e9722df9d6c23` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vote` ADD CONSTRAINT `FK_eaea7be3f5e66609590e40350a7` FOREIGN KEY (`answerId`) REFERENCES `answer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `vote` DROP FOREIGN KEY `FK_eaea7be3f5e66609590e40350a7`");
        await queryRunner.query("ALTER TABLE `vote` DROP FOREIGN KEY `FK_b4f0f67acbc748e9722df9d6c23`");
        await queryRunner.query("ALTER TABLE `vote` DROP FOREIGN KEY `FK_9c72b23d6e8f221818d6a43caff`");
        await queryRunner.query("DROP TABLE `vote`");
    }

}
