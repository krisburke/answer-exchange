import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetAccessTokenDto } from './dto/get-access-token.dto';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ title: 'Login' })
    @ApiResponse({ status: 200, description: 'Returns an access token.' })
    @Post('login')
    async login(
        @Body() getAccessTokenDto: GetAccessTokenDto,
    ): Promise<AccessTokenResponseDto> {
        return this.authService.login(getAccessTokenDto);
    }

    @ApiOperation({ title: 'Register User' })
    @ApiResponse({
        status: 201,
        description: 'A user has been registered.',
    })
    @Post('register')
    async registerUser(@Body() userData: CreateUserDto): Promise<User> {
        return this.authService.registerUser(userData);
    }
}
