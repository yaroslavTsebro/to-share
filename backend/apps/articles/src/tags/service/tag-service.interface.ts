import { TagDocument } from '../entity/schema/tag.schema';

export const TAG_SERVICE = Symbol('tag-service');

export interface ITagService {
  get7ByLikeOption(name: string): Promise<TagDocument[]>;
}
