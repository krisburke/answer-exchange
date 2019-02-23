import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async findAll(query: { include: string }): Promise<Tag[]> {
        const options = {
            relations: [],
        };

        if (query && query.include === 'questions') {
            options.relations.push('questions');
        }

        return this.tagRepository.find(options);
    }

    async findOne(uuid: string, query: { include: string }): Promise<Tag> {
        const options = {
            where: { uuid },
            relations: [],
        };

        if (query && query.include === 'questions') {
            options.relations.push('questions');
        }

        const tag = await this.tagRepository.findOne(options);

        if (!tag) {
            throw new NotFoundException(
                `Tag with UUID: ${uuid} does not exist.`,
            );
        }

        return tag;
    }
}
