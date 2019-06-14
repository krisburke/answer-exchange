import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly title: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly text: string;
}
