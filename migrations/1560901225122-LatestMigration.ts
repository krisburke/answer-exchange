import {MigrationInterface, QueryRunner} from "typeorm";

export class LatestMigration1560901225122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE INDEX `IDX_fa1cf45c0ee075fd02b0009a0d` ON `question_tags_tag` (`questionId`)");
        await queryRunner.query("CREATE INDEX `IDX_c92b89d6b96fe844dce95d4e4b` ON `question_tags_tag` (`tagId`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_c92b89d6b96fe844dce95d4e4b` ON `question_tags_tag`");
        await queryRunner.query("DROP INDEX `IDX_fa1cf45c0ee075fd02b0009a0d` ON `question_tags_tag`");
    }

}
