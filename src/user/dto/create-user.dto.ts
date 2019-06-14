import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsAlphanumeric,
    IsOptional,
} from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsAlphanumeric()
    @IsNotEmpty()
    readonly username: string;

    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly displayName: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
