import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { IncludeOpts } from '../common/types';

@ApiUseTags('tags')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @ApiOperation({ title: 'Get Tags' })
    @ApiResponse({ status: 200, description: 'Returns all tags.' })
    @Get()
    async findAll(@Query('include') include: IncludeOpts): Promise<Tag[]> {
        return this.tagService.findAll({ include });
    }

    @ApiOperation({ title: 'Get Tag' })
    @ApiResponse({ status: 200, description: 'Returns a tag.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('include') include: IncludeOpts,
    ): Promise<Tag> {
        return this.tagService.findOne(uuid, { include });
    }
}
