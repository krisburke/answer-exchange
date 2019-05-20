import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly text: string;
}
