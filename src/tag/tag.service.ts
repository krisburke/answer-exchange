import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { BaseField, QueryParams } from '../common/types';
import { buildJoinOpts } from '../common/helpers';
import { CreateTagDto } from './dto/create-tag-dto';

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

    async findOneByUuid(uuid: string, { expand }: QueryParams): Promise<Tag> {
        const tag = await this.tagRepository.findOne({
            where: { uuid },
            ...buildJoinOpts(BaseField.Tag, expand),
        });

        if (!tag) {
            throw new NotFoundException(
                `A tag does not exist with uuid: ${uuid}`,
            );
        }

        return tag;
    }

    async findOneBySlug(slug: string, { expand }: QueryParams): Promise<Tag> {
        return this.tagRepository.findOne({
            where: { slug },
            ...buildJoinOpts(BaseField.Tag, expand),
        });
    }

    async create({ slug }: CreateTagDto): Promise<Tag> {
        const exists = await this.findOneBySlug(slug, { expand: 'none' });

        if (exists) {
            throw new UnprocessableEntityException(
                `Tag with slug: ${slug} already exists. Must be unique`,
            );
        }

        return this.tagRepository.save(new Tag({ slug }));
    }
}
