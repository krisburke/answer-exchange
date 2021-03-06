import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Pagination } from '../paginate/pagination';

@ApiUseTags('questions')
@Controller('questions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @ApiOperation({ title: 'Get Questions' })
    @ApiResponse({ status: 200, description: 'Returns all questions.' })
    @Get()
    async findAll(
        @Query('skip') skip: number,
        @Query('take') take: number,
        @Query('expand') expand?: string,
    ): Promise<Pagination<Question>> {
        return this.questionService.findAll({ expand, skip, take });
    }

    @ApiOperation({ title: 'Get Question' })
    @ApiResponse({ status: 200, description: 'Returns a question.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('expand') expand?: string,
    ): Promise<Question> {
        return this.questionService.findOne(uuid, { expand });
    }

    @ApiOperation({ title: 'Create Question' })
    @ApiResponse({
        status: 201,
        description: 'The question has been created.',
    })
    @Post()
    async create(@Body() questionData: CreateQuestionDto): Promise<Question> {
        return this.questionService.create(questionData);
    }

    @ApiOperation({ title: 'Update Question' })
    @ApiResponse({
        status: 200,
        description: 'The question has been updated.',
    })
    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() questionData: UpdateQuestionDto,
    ): Promise<Question> {
        return this.questionService.update(uuid, questionData);
    }

    @ApiOperation({ title: 'Delete Question' })
    @ApiResponse({
        status: 204,
        description: 'The question has been deleted.',
    })
    @Delete(':uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.questionService.delete(uuid);
    }
}
