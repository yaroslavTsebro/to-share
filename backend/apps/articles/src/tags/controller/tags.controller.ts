import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ITagService, TAG_SERVICE } from '../service/tag-service.interface';
import { TagDocument } from '../entity/schema/tag.schema';

@Controller('tags')
export class TagController {
  constructor(@Inject(TAG_SERVICE) private readonly tagService: ITagService) {}

  @Get(':name')
  async get7ByLikeOption(@Param('name') name: string): Promise<TagDocument[]> {
    return this.tagService.get7ByLikeOption(name);
  }
}
