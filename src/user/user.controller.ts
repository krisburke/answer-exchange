import {
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    Controller,
    HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ title: 'Get Users' })
    @ApiResponse({ status: 200, description: 'Returns all users.' })
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiOperation({ title: 'Get User' })
    @ApiResponse({ status: 200, description: 'Returns a user.' })
    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string) {
        return this.userService.findOne(uuid);
    }

    @ApiOperation({ title: 'Create User' })
    @ApiResponse({
        status: 201,
        description: 'The user has been created.',
    })
    @Post()
    async create(@Body() userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @ApiOperation({ title: 'Update User' })
    @ApiResponse({
        status: 200,
        description: 'The user has been updated.',
    })
    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() userData: UpdateUserDto) {
        return this.userService.update(uuid, userData);
    }

    @ApiOperation({ title: 'Delete User' })
    @ApiResponse({
        status: 204,
        description: 'The user has been deleted.',
    })
    @Delete(':uuid')
    @HttpCode(204)
    async delete(@Param('uuid') uuid: string) {
        return this.userService.delete(uuid);
    }
}
