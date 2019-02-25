import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { QueryParams, IncludeOpts } from '../common/types';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async findAll({ include }: QueryParams): Promise<Tag[]> {
        const options = {
            relations: [],
        };

        if (include === IncludeOpts.Questions) {
            options.relations.push(IncludeOpts.Questions);
        }

        return this.tagRepository.find(options);
    }

    async findOne(uuid: string, { include }: QueryParams): Promise<Tag> {
        const options = {
            where: { uuid },
            relations: [],
        };

        if (include === IncludeOpts.Questions) {
            options.relations.push(IncludeOpts.Questions);
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
