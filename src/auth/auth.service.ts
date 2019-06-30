import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { distanceInWordsToNow } from 'date-fns';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import {
    GetAccessTokenDto,
    AccessTokenResponseDto,
    ForgotPasswordDto,
    ResetPasswordDto,
} from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../user/dto';
import { MailerService } from '../mailer/mailer.service';
import { CryptoService } from './crypto.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly cryptoService: CryptoService,
        private readonly mailerService: MailerService,
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

    async forgotPassword({ email }: ForgotPasswordDto) {
        const passwordExpirationTime = new Date().valueOf() + 1000 * 60 * 60;
        const passwordResetToken = await this.createPasswordResetToken(
            email,
            passwordExpirationTime,
        );
        const passwordExpirationText = distanceInWordsToNow(
            passwordExpirationTime,
        );
        const passwordResetLink = `${
            process.env.SITE_URL
        }/reset-password?email=${email}&token=${passwordResetToken}`;

        if (passwordResetToken) {
            await this.mailerService.sendPasswordResetEmail(
                passwordResetLink,
                passwordExpirationText,
                email,
            );
        }
        return;
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
        const { token, password, email } = resetPasswordDto;
        const user = await this.userService.findOneByEmail(email);
        const { isVerified, message } = await this.verifyPasswordResetToken(
            token,
            user,
        );

        if (!isVerified) {
            throw new BadRequestException(message);
        }

        Object.assign(user, {
            passwordHash: await this.cryptoService.hashString(password),
            passwordResetHash: null,
            passwordResetExpiry: null,
        });

        return this.userService.saveUser(user);
    }

    private async createPasswordResetToken(email: string, expires: number) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return;
        }

        const token = this.cryptoService.getRandomizedToken();
        const tokenHash = await this.cryptoService.hashString(token);

        Object.assign(user, {
            passwordResetHash: tokenHash,
            passwordResetExpiry: expires,
        });

        await this.userService.saveUser(user);
        return token;
    }

    private async validateCredentials(
        email: string,
        password: string,
    ): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            return null;
        }

        const isValid = await this.cryptoService.verifyHash(
            user.passwordHash,
            password,
        );

        return isValid ? user : null;
    }

    private async verifyPasswordResetToken(
        token: string,
        user: User,
    ): Promise<{ isVerified: boolean; message: string }> {
        const invalidTokenMessage = 'Invalid token.';
        const expiredTokenMessage = 'Token has expired.';

        if (!user || !token) {
            return {
                isVerified: false,
                message: invalidTokenMessage,
            };
        }
        if (
            !user.passwordResetExpiry ||
            user.passwordResetExpiry.valueOf() <= new Date().valueOf()
        ) {
            return {
                isVerified: false,
                message: expiredTokenMessage,
            };
        }
        const isVerified = await this.cryptoService.verifyHash(
            user.passwordResetHash,
            token,
        );
        const message = isVerified ? '' : invalidTokenMessage;
        return { isVerified, message };
    }

    private async generateToken(user: User): Promise<string> {
        const payload: JwtPayload = { email: user.email };

        return this.jwtService.sign(payload);
    }
}
