import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
