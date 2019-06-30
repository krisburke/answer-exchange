import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {
    ForgotPasswordDto,
    GetAccessTokenDto,
    AccessTokenResponseDto,
    ResetPasswordDto,
} from './dto';
import { AuthService } from './auth.service';
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

    @ApiOperation({ title: 'Forgot Password' })
    @ApiResponse({
        status: 200,
        description:
            'If the email exists, sends an email with a link to reset password.',
    })
    @Post('forgot-password')
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @ApiOperation({ title: 'Reset Password' })
    @ApiResponse({
        status: 200,
        description: 'Resets a user password to the provided password',
    })
    @Post('reset-password')
    async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
    ): Promise<User> {
        return this.authService.resetPassword(resetPasswordDto);
    }
}
