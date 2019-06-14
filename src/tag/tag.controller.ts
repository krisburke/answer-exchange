import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('tags')
@Controller('tags')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @ApiOperation({ title: 'Get Tags' })
    @ApiResponse({ status: 200, description: 'Returns all tags.' })
    @Get()
    async findAll(@Query('expand') expand?: string): Promise<Tag[]> {
        return this.tagService.findAll({ expand });
    }

    @ApiOperation({ title: 'Get Tag' })
    @ApiResponse({ status: 200, description: 'Returns a tag.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('expand') expand?: string,
    ): Promise<Tag> {
        return this.tagService.findOne(uuid, { expand });
    }
}
