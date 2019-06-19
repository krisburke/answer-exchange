import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsKebabCase } from '../../common/decorators/IsKebabCase';

export class CreateTagDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @IsKebabCase()
    readonly slug: string;
}
