import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { buildJoinOpts } from '../common/helpers';
import { BaseField, QueryParams } from '../common/types';
import { CryptoService } from '../auth/crypto.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cryptoService: CryptoService,
    ) {}

    async findOne(uuid: string, { expand }: QueryParams): Promise<User> {
        const findOptions: FindOneOptions = {
            where: { uuid },
            ...buildJoinOpts(BaseField.User, expand),
        };

        const user = await this.userRepository.findOne(findOptions);

        if (!user) {
            throw new NotFoundException(
                `User with UUID: ${uuid} does not exist.`,
            );
        }

        return user;
    }

    async findOneByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
        });
    }

    async findAll({ expand }: QueryParams): Promise<User[]> {
        const findOptions: FindManyOptions = {
            ...buildJoinOpts(BaseField.User, expand),
        };

        return this.userRepository.find(findOptions);
    }

    async create(userData: CreateUserDto): Promise<User> {
        const { username, email, password } = userData;

        const passwordHash = await this.cryptoService.hashString(password);

        return this.userRepository.save(
            new User({
                username,
                email,
                passwordHash,
            }),
        );
    }

    async update(
        uuid: string,
        { password, ...restUpdateUserDto }: UpdateUserDto,
    ): Promise<User> {
        const userToUpdate = await this.findOne(uuid, { expand: 'none' });
        const passwordHash =
            password && (await this.cryptoService.hashString(password));

        Object.assign(userToUpdate, {
            ...restUpdateUserDto,
            ...(passwordHash && { passwordHash }),
        });

        return this.userRepository.save(userToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.userRepository.delete({ uuid });
        return;
    }

    async saveUser(user): Promise<User> {
        return this.userRepository.save(user);
    }
}
