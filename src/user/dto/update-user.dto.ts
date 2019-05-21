import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsAlphanumeric, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiModelProperty()
    @IsAlphanumeric()
    @IsOptional()
    readonly username: string;

    @ApiModelProperty()
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly displayName: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly password: string;
}
