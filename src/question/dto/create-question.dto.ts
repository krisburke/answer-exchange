import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { IsKebabCase } from '../../common/decorators/IsKebabCase';

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

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsArray()
    // @IsKebabCase() FIXME handle array of tags
    readonly tagSlugs?: string[];
}
