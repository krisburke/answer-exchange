import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { buildJoinOpts } from '../common/helpers';
import { BaseField, QueryParams } from '../common/types';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

        const passwordHash = await this.hashPassword(password);

        return this.userRepository.save(
            new User({
                username,
                email,
                passwordHash,
            }),
        );
    }

    async update(uuid: string, userData: UpdateUserDto): Promise<User> {
        const userToUpdate = await this.findOne(uuid, { expand: 'none' });
        Object.assign(userToUpdate, userData);
        return this.userRepository.save(userToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.userRepository.delete({ uuid });
        return;
    }

    private hashPassword(password: string): Promise<string> {
        return argon2.hash(password, {
            type: argon2.argon2i,
        });
    }
}
