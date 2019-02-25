import {MigrationInterface, QueryRunner} from "typeorm";

export class Initital1551066460815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `text` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `authorId` int NULL, `questionId` int NULL, `answerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `slug` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `displayName` varchar(255) NULL, `email` varchar(255) NOT NULL, `passwordHash` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `text` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `authorId` int NULL, `questionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question_tags_tag` (`questionId` int NOT NULL, `tagId` int NOT NULL, PRIMARY KEY (`questionId`, `tagId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_38c7b71e5d494309af3cb8a7d70` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`)");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_ac686892bd76cc014c367345af2` FOREIGN KEY (`answerId`) REFERENCES `answer`(`id`)");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_75fc761f2752712276be38e7d13` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_328f85639a97f8ff158e0cf7b1f` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_a4013f10cd6924793fbd5f0d637` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`)");
        await queryRunner.query("ALTER TABLE `question_tags_tag` ADD CONSTRAINT `FK_fa1cf45c0ee075fd02b0009a0d4` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `question_tags_tag` ADD CONSTRAINT `FK_c92b89d6b96fe844dce95d4e4bd` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question_tags_tag` DROP FOREIGN KEY `FK_c92b89d6b96fe844dce95d4e4bd`");
        await queryRunner.query("ALTER TABLE `question_tags_tag` DROP FOREIGN KEY `FK_fa1cf45c0ee075fd02b0009a0d4`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_a4013f10cd6924793fbd5f0d637`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_328f85639a97f8ff158e0cf7b1f`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_75fc761f2752712276be38e7d13`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_ac686892bd76cc014c367345af2`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_38c7b71e5d494309af3cb8a7d70`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("DROP TABLE `question_tags_tag`");
        await queryRunner.query("DROP TABLE `answer`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `tag`");
        await queryRunner.query("DROP TABLE `comment`");
    }

}
