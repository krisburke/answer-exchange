import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly text: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly authorUserUuid: string;
}
