import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAnswerDto {
    @ApiModelProperty()
    @IsString()
    readonly text: string;
}
