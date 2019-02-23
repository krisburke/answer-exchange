import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@ApiUseTags('tag')
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @ApiOperation({ title: 'Get Tags' })
    @ApiResponse({ status: 200, description: 'Returns all tags.' })
    @Get()
    async findAll(@Query('query') query: { include: string }): Promise<Tag[]> {
        return this.tagService.findAll(query);
    }

    @ApiOperation({ title: 'Get Tag' })
    @ApiResponse({ status: 200, description: 'Returns a tag.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('query') query: { include: string },
    ): Promise<Tag> {
        return this.tagService.findOne(uuid, query);
    }
}
