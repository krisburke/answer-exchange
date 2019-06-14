import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
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
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('questions/questionUuid')
@Controller('questions/questionUuid')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOperation({ title: 'Create Question Comment' })
    @ApiResponse({
        status: 201,
        description: 'The comment has been created.',
    })
    @Post('comments')
    async createQuestionComment(
        @Param('questionUuid') questionUuid: string,
        @Body() commentData: CreateCommentDto,
    ) {
        return this.commentService.createQuestionComment(
            questionUuid,
            commentData,
        );
    }

    @ApiOperation({ title: 'Get Question Comment' })
    @ApiResponse({ status: 200, description: 'Returns a comment.' })
    @Get('comments/:uuid')
    async findOneQuestionComment(@Param('uuid') uuid: string) {
        return this.commentService.findOne(uuid);
    }

    @ApiOperation({ title: 'Update Question Comment' })
    @ApiResponse({
        status: 200,
        description: 'The comment has been updated.',
    })
    @Put('comments/:uuid')
    async updateQuestionComment(
        @Param('uuid') uuid: string,
        @Body() commentData: UpdateCommentDto,
    ) {
        return this.commentService.update(uuid, commentData);
    }

    @ApiOperation({ title: 'Delete Question Comment' })
    @ApiResponse({
        status: 204,
        description: 'The comment has been deleted.',
    })
    @Delete('comments/:uuid')
    @HttpCode(204)
    async deleteQuestionComment(@Param('uuid') uuid: string) {
        return this.commentService.delete(uuid);
    }

    @ApiOperation({ title: 'Create Answer Comment' })
    @ApiResponse({
        status: 201,
        description: 'The comment has been created.',
    })
    @Post('answers/:answerUuid/comments')
    async createAnswerComment(
        @Param(':answerUuid') answerUuid: string,
        @Body() commentData: CreateCommentDto,
    ) {
        return this.commentService.createAnswerComment(answerUuid, commentData);
    }

    @ApiOperation({ title: 'Get Answer Comment' })
    @ApiResponse({ status: 200, description: 'Returns a comment.' })
    @Get('answers/:answerUuid/comments/:uuid')
    async findOneAnswerComment(@Param('uuid') uuid: string) {
        return this.commentService.findOne(uuid);
    }

    @ApiOperation({ title: 'Update Answer Comment' })
    @ApiResponse({
        status: 200,
        description: 'The comment has been updated.',
    })
    @Put('answers/:answerUuid/comments/:uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() commentData: UpdateCommentDto,
    ) {
        return this.commentService.update(uuid, commentData);
    }

    @ApiOperation({ title: 'Delete Answer Comment' })
    @ApiResponse({
        status: 204,
        description: 'The comment has been deleted.',
    })
    @Delete('answers/:answerUuid/comments/:uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string) {
        return this.commentService.delete(uuid);
    }
}
