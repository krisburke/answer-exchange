import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
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
