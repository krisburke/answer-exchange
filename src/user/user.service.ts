import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOne(uuid: string): Promise<User> {
        const user = await this.userRepository.findOne({ uuid });

        if (!user) {
            throw new NotFoundException(
                `User with UUID: ${uuid} does not exist.`,
            );
        }

        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
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
        const userToUpdate = await this.findOne(uuid);
        Object.assign(userToUpdate, userData);
        return this.userRepository.save(userToUpdate);
    }

    async delete(uuid: string): Promise<void> {
        await this.userRepository.delete({ uuid });
        return;
    }
}
