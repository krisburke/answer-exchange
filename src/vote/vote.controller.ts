import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote-dto';
import { Vote } from './vote.entity';
import { UpdateVoteDto } from './dto/update-vote-dto';

@ApiUseTags('vote')
@Controller('vote')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VoteController {
    constructor(private readonly voteService: VoteService) {}

    @ApiOperation({ title: 'Create Vote' })
    @ApiResponse({
        status: 201,
        description: 'The vote has been created.',
    })
    @Post()
    async create(@Body() createVoteDto: CreateVoteDto): Promise<Vote> {
        return this.voteService.create(createVoteDto);
    }

    @ApiOperation({ title: 'Update Vote' })
    @ApiResponse({
        status: 200,
        description: 'The vote has been updated.',
    })
    @Put(':voteUuid')
    async update(
        @Param('voteUuid') voteUuid: string,
        @Body() updateVoteDto: UpdateVoteDto,
    ): Promise<Vote> {
        return this.voteService.update(voteUuid, updateVoteDto);
    }
}
