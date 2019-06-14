import {
    Body,
    Param,
    Get,
    Put,
    Delete,
    Controller,
    HttpCode,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ title: 'Get Users' })
    @ApiResponse({ status: 200, description: 'Returns all users.' })
    @Get()
    async findAll(@Query('expand') expand?: string): Promise<User[]> {
        return this.userService.findAll({ expand });
    }

    @ApiOperation({ title: 'Get User' })
    @ApiResponse({ status: 200, description: 'Returns a user.' })
    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string,
        @Query('expand') expand?: string,
    ): Promise<User> {
        return this.userService.findOne(uuid, { expand });
    }

    @ApiOperation({ title: 'Update User' })
    @ApiResponse({
        status: 200,
        description: 'The user has been updated.',
    })
    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() userData: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(uuid, userData);
    }

    @ApiOperation({ title: 'Delete User' })
    @ApiResponse({
        status: 204,
        description: 'The user has been deleted.',
    })
    @Delete(':uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.userService.delete(uuid);
    }
}
