import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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

    async findAll({ expand }: QueryParams): Promise<User[]> {
        const findOptions: FindManyOptions = {
            ...buildJoinOpts(BaseField.User, expand),
        };

        return this.userRepository.find(findOptions);
    }

    // TODO: remove create & add sign-up to auth service
    async create(userData: CreateUserDto): Promise<User> {
        const { username, email, password } = userData;

        return this.userRepository.save(
            new User({
                username,
                email,
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
}
