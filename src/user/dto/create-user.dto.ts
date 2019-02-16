import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsAlphanumeric()
    @IsNotEmpty()
    readonly username: string;

    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
