import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VoteRating } from '../../common/types';

export class CreateVoteDto {
    @ApiModelProperty()
    @IsEnum(VoteRating)
    readonly rating: VoteRating;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly voterUuid: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    readonly questionUuid?: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    readonly answerUuid?: string;
}
