import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly title: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly text: string;
}
