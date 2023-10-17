import { Injectable } from '@nestjs/common';
import { ITagService } from './tag-service.interface';
import { TagRepository } from '../repository/tag.repository';
import { TagDocument } from '../entity/schema/tag.schema';

@Injectable()
export class TagService implements ITagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async get7ByLikeOption(name: string): Promise<TagDocument[]> {
    return await this.tagRepository.find(
      {
        name: new RegExp(`\s*(${name})`, 'i'),
      },
      { limit: 7 },
    );
  }
}
