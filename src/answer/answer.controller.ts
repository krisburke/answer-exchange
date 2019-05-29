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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { Answer } from './answer.entity';

@ApiUseTags('questions/:questionUuid/answers')
@Controller('questions/:questionUuid/answers')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @ApiOperation({ title: 'Get Answers' })
    @ApiResponse({
        status: 200,
        description: 'Returns all answers to the question',
    })
    @Get()
    async findAll(
        @Param('questionUuid') questionUuid: string,
        @Query('expand') expand?: string,
    ): Promise<Answer[]> {
        return this.answerService.findAll(questionUuid, { expand });
    }

    @ApiOperation({ title: 'Get Answer' })
    @ApiResponse({ status: 200, description: 'Returns a answer.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('expand') expand?: string,
    ): Promise<Answer> {
        return this.answerService.findOne(uuid, { expand });
    }

    @ApiOperation({ title: 'Create Answer' })
    @ApiResponse({
        status: 201,
        description: 'The answer has been created.',
    })
    @Post()
    async create(@Body() answerData: CreateAnswerDto): Promise<Answer> {
        return this.answerService.create(answerData);
    }

    @ApiOperation({ title: 'Update Answer' })
    @ApiResponse({
        status: 200,
        description: 'The answer has been updated.',
    })
    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() answerData: UpdateAnswerDto,
    ): Promise<Answer> {
        return this.answerService.update(uuid, answerData);
    }

    @ApiOperation({ title: 'Delete Answer' })
    @ApiResponse({
        status: 204,
        description: 'The answer has been deleted.',
    })
    @Delete(':uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string) {
        return this.answerService.delete(uuid);
    }
}
