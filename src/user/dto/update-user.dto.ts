import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsAlphanumeric, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiModelPropertyOptional()
    @IsAlphanumeric()
    @IsOptional()
    readonly username: string;

    @ApiModelPropertyOptional()
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly displayName: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    readonly password: string;
}
