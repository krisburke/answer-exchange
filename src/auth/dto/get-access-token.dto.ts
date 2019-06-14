import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetAccessTokenDto {
    @ApiModelProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
