import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly text: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly authorUserUuid: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly questionUuid: string;
}
