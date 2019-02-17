import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@ApiUseTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOperation({ title: 'Get Comment' })
    @ApiResponse({ status: 200, description: 'Returns a comment.' })
    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string) {
        return this.commentService.findOne(uuid);
    }

    @ApiOperation({ title: 'Create Comment' })
    @ApiResponse({
        status: 201,
        description: 'The comment has been created.',
    })
    @Post()
    async create(@Body() commentData: CreateCommentDto) {
        return this.commentService.create(commentData);
    }

    @ApiOperation({ title: 'Update Comment' })
    @ApiResponse({
        status: 200,
        description: 'The comment has been updated.',
    })
    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() commentData: UpdateCommentDto,
    ) {
        return this.commentService.update(uuid, commentData);
    }

    @ApiOperation({ title: 'Delete Comment' })
    @ApiResponse({
        status: 204,
        description: 'The comment has been deleted.',
    })
    @Delete(':uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string) {
        return this.commentService.delete(uuid);
    }
}
