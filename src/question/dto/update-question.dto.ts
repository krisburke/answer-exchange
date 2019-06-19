import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsKebabCase } from '../../common/decorators/IsKebabCase';

export class UpdateQuestionDto {
    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly title: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly text: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsArray()
    // @IsKebabCase() FIXME handle an array of tags
    readonly tagSlugs?: string[];
}
