import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateQuestionDto {
    @ApiModelProperty()
    @IsString()
    readonly title: string;

    @ApiModelProperty()
    @IsString()
    readonly text: string;
}
