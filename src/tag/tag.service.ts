import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { BaseField, QueryParams } from '../common/types';
import { buildJoinOpts } from '../common/helpers';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async findAll({ expand }: QueryParams): Promise<Tag[]> {
        const options: FindManyOptions = {
            ...buildJoinOpts(BaseField.Tag, expand),
        };

        return this.tagRepository.find(options);
    }

    async findOne(uuid: string, { expand }: QueryParams): Promise<Tag> {
        const options: FindOneOptions = {
            where: { uuid },
            ...buildJoinOpts(BaseField.Tag, expand),
        };

        const tag = await this.tagRepository.findOne(options);

        if (!tag) {
            throw new NotFoundException(
                `Tag with UUID: ${uuid} does not exist.`,
            );
        }

        return tag;
    }
}
