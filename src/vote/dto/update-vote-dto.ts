import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { VoteRating } from '../../common/types';

export class UpdateVoteDto {
    @ApiModelProperty()
    @IsEnum(VoteRating)
    readonly rating: VoteRating;
}
