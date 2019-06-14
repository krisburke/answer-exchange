import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { GetAccessTokenDto } from './dto/get-access-token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';
import { CreateUserDto } from '../user/dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async login({
        email,
        password,
    }: GetAccessTokenDto): Promise<AccessTokenResponseDto> {
        const validUser = await this.validateCredentials(email, password);

        if (!validUser) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.generateToken(validUser),
            userUuid: validUser.uuid,
            expiresIn: process.env.jwtExpiration,
        };
    }

    async registerUser(userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    async validateUser({ email }: JwtPayload): Promise<User> {
        return this.userService.findOneByEmail(email);
    }

    private async validateCredentials(
        email: string,
        password: string,
    ): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            return null;
        }

        const isValid = await argon2.verify(user.passwordHash, password);

        return isValid ? user : null;
    }

    private async generateToken(user: User): Promise<string> {
        const payload: JwtPayload = { email: user.email };

        return this.jwtService.sign(payload);
    }
}
