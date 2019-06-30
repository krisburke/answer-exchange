import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
