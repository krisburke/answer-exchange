import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsAlphanumeric } from 'class-validator';

export class UpdateUserDto {
    @ApiModelProperty()
    @IsAlphanumeric()
    readonly username: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly displayName: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;
}
